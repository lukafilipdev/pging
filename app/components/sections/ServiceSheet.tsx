"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { services } from "../../lib/content";
import { useBodyScrollLock } from "../../lib/hooks";
import { indexLabel } from "../../lib/utils";
import { ArrowIcon } from "../ui/ArrowIcon";
import styles from "./ServiceSheet.module.css";

type ServiceSheetProps = {
  /** Service to show, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
};

/** Side sheet (full screen on phones) with a service's full description. */
export function ServiceSheet({ index, onClose, onNavigate }: ServiceSheetProps) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(open);

  // Keep the last service visible while the sheet animates out, and bump a key
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

  // Focus the close button while open, Escape closes, focus returns to the opener.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [shown]);

  const service = services[shown];
  const prev = (shown - 1 + services.length) % services.length;
  const next = (shown + 1) % services.length;

  const goToContact = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    requestAnimationFrame(() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className={styles.root} data-open={open} inert={!open} aria-hidden={!open}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="service-sheet-title">
        <div className={styles.bar}>
          <span className={`font-barlow-condensed ${styles.barLabel}`}>
            Storitve{" "}
            <span className={styles.barCount}>
              {indexLabel(shown)} / {indexLabel(services.length - 1)}
            </span>
          </span>
          <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
            <span className="font-barlow-condensed">Zapri</span>
            <span className={styles.closeIcon} aria-hidden />
          </button>
        </div>

        <div ref={scrollRef} className={styles.scroll}>
          <div key={`${openCount}-${shown}`} className={styles.content}>
            <div className={styles.media}>
              <Image src={service.image} alt={service.alt} fill sizes="(min-width: 760px) 760px, 100vw" className={styles.mediaImg} />
              <div className={styles.mediaShade} aria-hidden />
              <div className={styles.mediaCaption}>
                <span className={`font-archivo ${styles.num}`}>{indexLabel(shown)}</span>
                <h2 id="service-sheet-title" className={`font-archivo ${styles.title}`}>
                  {service.title}
                </h2>
              </div>
            </div>

            <div className={styles.body}>
              <p className={`font-barlow-condensed ${styles.tagline}`}>
                <span className={styles.accent} aria-hidden />
                {service.tagline}
              </p>
              <p className={`font-archivo ${styles.lead}`}>{service.lead}</p>
              {service.body.map((paragraph) => (
                <p key={paragraph} className={styles.text}>
                  {paragraph}
                </p>
              ))}

              <div className={styles.scope}>
                <span className={`font-barlow-condensed ${styles.scopeLabel}`}>Obseg storitve</span>
                <ul className={styles.scopeList}>
                  {service.items.map((item, i) => (
                    <li key={item}>
                      <span className={`font-archivo ${styles.scopeNum}`}>{indexLabel(i)}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#kontakt" className={styles.cta} onClick={goToContact}>
                <span className="font-barlow-condensed">Pošljite povpraševanje</span>
                <span className={styles.ctaArrow} aria-hidden>
                  <ArrowIcon />
                </span>
              </a>
            </div>

            <nav className={styles.pager} aria-label="Druge storitve">
              <button type="button" className={styles.pagerBtn} onClick={() => onNavigate(prev)}>
                <span className={styles.pagerArrow} aria-hidden>
                  <ArrowIcon direction="left" />
                </span>
                <span className={`font-archivo ${styles.pagerNum}`}>{indexLabel(prev)}</span>
                <span className={`font-archivo ${styles.pagerTitle}`}>{services[prev].title}</span>
              </button>
              <button type="button" className={`${styles.pagerBtn} ${styles.pagerNext}`} onClick={() => onNavigate(next)}>
                <span className={`font-archivo ${styles.pagerNum}`}>{indexLabel(next)}</span>
                <span className={`font-archivo ${styles.pagerTitle}`}>{services[next].title}</span>
                <span className={styles.pagerArrow} aria-hidden>
                  <ArrowIcon />
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
