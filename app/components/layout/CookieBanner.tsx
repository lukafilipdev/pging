"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, OPEN_COOKIE_SETTINGS_EVENT, type ConsentChoice } from "../../lib/consent";
import styles from "./CookieBanner.module.css";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Read storage after mount so the server markup (hidden) matches the first client render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(getConsent() === null);
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setVisible(false);
  };

  return (
    <div role="dialog" aria-modal="false" aria-label="Piškotki" className={styles.banner}>
      <p className={styles.text}>
        Ta spletna stran za svoje delovanje ne potrebuje piškotkov, lahko pa jih z vašim soglasjem uporabimo za analitiko
        obiska.{" "}
        <Link href="/politika-zasebnosti" className={styles.link}>
          Politika zasebnosti
        </Link>
        .
      </p>
      <div className={styles.actions}>
        <button type="button" onClick={() => choose("rejected")} className={`${styles.button} ${styles.reject}`}>
          Zavrni
        </button>
        <button type="button" onClick={() => choose("accepted")} className={`${styles.button} ${styles.accept}`}>
          Sprejmi
        </button>
      </div>
    </div>
  );
}
