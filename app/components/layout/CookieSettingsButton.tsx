"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "../../lib/consent";

/** Reopens the cookie banner. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}>
      Nastavitve piškotkov
    </button>
  );
}
