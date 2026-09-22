export type ConsentChoice = "accepted" | "rejected";

const STORAGE_KEY = "pg_cookie_consent";
export const CONSENT_CHANGE_EVENT = "pg:cookie-consent-change";
export const OPEN_COOKIE_SETTINGS_EVENT = "pg:open-cookie-settings";

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // localStorage unavailable (private mode, blocked storage) — consent
    // simply won't be remembered across visits; the banner will re-appear.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: choice }));
}

// Analytics (e.g. Google Analytics) should be loaded from a client component
// that calls getConsent() === "accepted" before injecting any script, and
// should listen for CONSENT_CHANGE_EVENT to react if the visitor changes
// their choice later via the "Nastavitve piškotkov" footer link.
export function hasAnalyticsConsent(): boolean {
  return getConsent() === "accepted";
}
