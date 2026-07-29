/**
 * Team roster, merged with the Quadrant support portal
 * (support.quadranthealthgroup.com/dev/staff).
 *
 * The portal is the source of truth for bio text, titles and credentials. This
 * site keeps anyone the portal does not carry, so nobody disappears when the
 * portal's roster is narrower.
 *
 * Merge rules:
 *   - person in both  -> portal's title/credentials/bio, local photo retained
 *   - local only      -> kept exactly as authored here
 *   - portal only     -> appended
 *
 * Fails soft: if the portal is unreachable the local roster renders unchanged.
 */

const FEED_ORIGIN =
  process.env.STAFF_FEED_ORIGIN ?? 'https://support.quadranthealthgroup.com';

type FeedPerson = {
  name: string;
  title: string;
  credentials: string | null;
  bio: string | null;
  photoUrl: string | null;
};

export type Member = {
  name: string;
  credentials: string;
  role: string;
  bio?: string;
};

/** First + last name only, so "Parneet “Pam” Sahota" matches "Parneet Sahota". */
function nameKey(raw: string): string {
  const cleaned = raw
    .replace(/^(dr|mr|mrs|ms)\.?\s+/i, '')
    .replace(/[“”"'’]/g, '')
    .replace(/,.*$/, '')
    .replace(/\s+(sr|jr|ii|iii)\.?$/i, '')
    .replace(/[^a-z ]/gi, '')
    .trim()
    .toLowerCase();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return parts.length >= 2 ? `${parts[0]} ${parts[parts.length - 1]}` : cleaned;
}

export async function mergedTeam(
  facility: string,
  local: readonly Member[],
): Promise<Member[]> {
  let feed: FeedPerson[] = [];
  try {
    const res = await fetch(
      `${FEED_ORIGIN}/api/public/facilities/${encodeURIComponent(facility)}/staff`,
      { next: { revalidate: 300 } },
    );
    if (res.ok) {
      feed = ((await res.json()) as { staff?: FeedPerson[] }).staff ?? [];
    }
  } catch {
    return [...local];
  }
  if (feed.length === 0) return [...local];

  const byKey = new Map(feed.map((p) => [nameKey(p.name), p]));
  const merged: Member[] = local.map((m) => {
    const p = byKey.get(nameKey(m.name));
    if (!p) return m;
    byKey.delete(nameKey(m.name));
    return {
      ...m,
      // Portal text wins; it has no photos, so anything local keeps its own.
      credentials: p.credentials ?? m.credentials,
      role: p.title || m.role,
      bio: p.bio ?? m.bio,
    };
  });

  for (const p of byKey.values()) {
    merged.push({
      name: p.name,
      credentials: p.credentials ?? '',
      role: p.title,
      bio: p.bio ?? undefined,
    });
  }
  return merged;
}
