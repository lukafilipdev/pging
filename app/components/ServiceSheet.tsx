"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "../lib/data";
import styles from "./ServiceSheet.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="15" height="11" viewBox="0 0 16 12" fill="none" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M1 6H15M15 6L10 1M15 6L10 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ServiceSheet({
  index,
  onClose,
  onNavigate,
}: {
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Keep the last shown service while the sheet animates out, and bump a key
  // on every open so the entry animation replays.
  const [shown, setShown] = useState(0);
  const [openCount, setOpenCount] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(index);
  if (index !== prevIndex) {
    setPrevIndex(index);
    if (index !== null) {
      setShown(index);
      if (prevIndex === null) setOpenCount((c) => c + 1);
    }
  }

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      openerRef.current?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [shown]);

  const s = services[shown];
  const prev = (shown - 1 + services.length) % services.length;
  const next = (shown + 1) % services.length;

  function goToContact(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    onClose();
    requestAnimationFrame(() => {
      document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className={styles.root} data-open={open} inert={!open} aria-hidden={!open}>
      <div className={styles.backdrop} onClick={onClose} />
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-sheet-title"
      >
        <div className={styles.bar}>
          <span className={`font-barlow-condensed ${styles.barLabel}`}>
            Storitve <span className={styles.barCount}>{pad(shown + 1)} / {pad(services.length)}</span>
          </span>
          <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
            <span className="font-barlow-condensed">Zapri</span>
            <span className={styles.closeIcon} aria-hidden />
          </button>
        </div>

        <div ref={scrollRef} className={styles.scroll}>
          <div key={`${openCount}-${shown}`} className={styles.content}>
            <div className={styles.media}>
              <img src={s.image} alt={s.alt} className={styles.mediaImg} />
              <div className={styles.mediaShade} aria-hidden />
              <div className={styles.mediaCaption}>
                <span className={`font-archivo ${styles.num}`}>{s.num}</span>
                <h2 id="service-sheet-title" className={`font-archivo ${styles.title}`}>
                  {s.title}
                </h2>
              </div>
            </div>

            <div className={styles.body}>
              <p className={`font-barlow-condensed ${styles.tagline}`}>
                <span className={styles.accent} aria-hidden />
                {s.tagline}
              </p>
              <p className={`font-archivo ${styles.lead}`}>{s.lead}</p>
              {s.body.map((para) => (
                <p key={para} className={styles.text}>
                  {para}
                </p>
              ))}

              <div className={styles.scope}>
                <span className={`font-barlow-condensed ${styles.scopeLabel}`}>Obseg storitve</span>
                <ul className={styles.scopeList}>
                  {s.items.map((it, i) => (
                    <li key={it}>
                      <span className={`font-archivo ${styles.scopeNum}`}>{pad(i + 1)}</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#kontakt" className={styles.cta} onClick={goToContact}>
                <span className="font-barlow-condensed">Pošljite povpraševanje</span>
                <span className={styles.ctaArrow} aria-hidden>
                  <Arrow />
                </span>
              </a>
            </div>

            <nav className={styles.pager} aria-label="Druge storitve">
              <button type="button" className={styles.pagerBtn} onClick={() => onNavigate(prev)}>
                <span className={styles.pagerArrow} aria-hidden>
                  <Arrow flip />
                </span>
                <span className={`font-archivo ${styles.pagerNum}`}>{services[prev].num}</span>
                <span className={`font-archivo ${styles.pagerTitle}`}>{services[prev].title}</span>
              </button>
              <button type="button" className={`${styles.pagerBtn} ${styles.pagerNext}`} onClick={() => onNavigate(next)}>
                <span className={`font-archivo ${styles.pagerNum}`}>{services[next].num}</span>
                <span className={`font-archivo ${styles.pagerTitle}`}>{services[next].title}</span>
                <span className={styles.pagerArrow} aria-hidden>
                  <Arrow />
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
