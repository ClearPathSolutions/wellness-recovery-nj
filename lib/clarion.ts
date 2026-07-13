// Client-side helper for Clarion form capture.
// The forms-capture.v1.js script (mounted once in <Clarion />) exposes
// window.ClarionForms.submit(...). This wrapper is fire-and-forget: if Clarion
// is down it must never block the user's submission from completing.

import type { ClarionFormKey } from './site';

type ClarionForms = {
  submit: (payload: { form_key: ClarionFormKey; data: Record<string, unknown> }) => Promise<void>;
};

declare global {
  interface Window {
    ClarionForms?: ClarionForms;
  }
}

export async function captureLead(
  formKey: ClarionFormKey,
  data: Record<string, unknown>,
): Promise<void> {
  try {
    await window.ClarionForms?.submit({ form_key: formKey, data });
  } catch {
    // Best-effort telemetry only — swallow errors so the real submission proceeds.
  }
}
