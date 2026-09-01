/**
 * Team roster, merged with the Quadrant support portal
 * (support.quadranthealthgroup.com/dev/staff).
 *
 * `lib/team.ts` is the published roster: it decides who appears, in what
 * order, and under which title and credentials. The portal is the source of
 * truth for bio prose, which changes far more often than a job title does, so
 * a bio edited in the portal shows up here without a deploy.
 *
 * Merge rules:
 *   - person in both  -> local name/title/credentials/photo, portal's bio
 *   - local only      -> kept exactly as authored, local bio and all
 *   - portal only     -> ignored, so a departure or a roster the facility has
 *                        not signed off on cannot appear on the site by itself
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
  slug?: string;
  image?: string;
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
  return local.map((m) => {
    const p = byKey.get(nameKey(m.name));
    return p?.bio ? { ...m, bio: p.bio } : m;
  });
}
