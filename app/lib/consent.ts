export type ConsentChoice = "accepted" | "rejected";

const STORAGE_KEY = "pg_cookie_consent";

/** Fired by the footer "Nastavitve piškotkov" link to reopen the banner. */
export const OPEN_COOKIE_SETTINGS_EVENT = "pg:open-cookie-settings";

export function getConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage blocked (private mode): the choice just isn't remembered.
  }
}
