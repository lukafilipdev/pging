"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, OPEN_COOKIE_SETTINGS_EVENT } from "../lib/consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Read localStorage only after mount so the server-rendered markup
    // (always hidden) matches the client's first render and hydration is safe.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(getConsent() === null);
    const onOpenSettings = () => setVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
  }, []);

  if (!visible) return null;

  const choose = (choice: "accepted" | "rejected") => {
    setConsent(choice);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Piškotki"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        background: "#14110e",
        color: "#e7e2db",
        borderTop: "1px solid #2b2620",
        padding: "20px clamp(20px,4vw,40px)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#c9c2b8", maxWidth: 640 }}>
        Ta spletna stran za svoje delovanje ne potrebuje piškotkov, lahko pa jih z vašim soglasjem uporabimo za
        analitiko obiska.{" "}
        <Link href="/politika-zasebnosti" style={{ color: "#f2903f" }}>
          Politika zasebnosti
        </Link>
        .
      </p>
      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => choose("rejected")}
          style={{
            background: "transparent",
            color: "#e7e2db",
            border: "1px solid rgba(255,255,255,.28)",
            borderRadius: 2,
            padding: "11px 18px",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Zavrni
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          style={{
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: 2,
            padding: "11px 18px",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Sprejmi
        </button>
      </div>
    </div>
  );
}
