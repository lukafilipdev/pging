"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { services } from "../../lib/content";
import { indexLabel, STAGGER_MS } from "../../lib/utils";
import { ArrowIcon } from "../ui/ArrowIcon";
import { Reveal } from "../ui/Reveal";
import { ServiceSheet } from "./ServiceSheet";
import styles from "./Services.module.css";

const total = indexLabel(services.length - 1);

/**
 * Service panels: a three-column grid on desktop, a scroll-snap carousel below
 * 900px (with tabs that track the snapped card). "Več" opens the detail sheet.
 */
export function ServiceCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeSheet = useCallback(() => setOpenIndex(null), []);

  // Track which card is most visible inside the carousel.
  useEffect(() => {
    const panels = panelRefs.current;
    const io = new IntersectionObserver(
      (entries) => {
        let best = -1;
        let bestRatio = 0;
        entries.forEach((entry) => {
          const i = panels.indexOf(entry.target as HTMLElement);
          if (i !== -1 && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            best = i;
          }
        });
        if (best !== -1) setActive(best);
      },
      { root: trackRef.current, threshold: [0.5, 0.75, 1] }
    );
    panels.forEach((panel) => panel && io.observe(panel));
    return () => io.disconnect();
  }, []);

  const scrollToPanel = (i: number) =>
    panelRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });

  return (
    <>
      <div className={styles.tabs}>
        {services.map((service, i) => (
          <button
            key={service.title}
            type="button"
            onClick={() => scrollToPanel(i)}
            className={styles.tab}
            data-active={active === i}
          >
            <span className={styles.tabNum}>{indexLabel(i)}</span>
            <span className={styles.tabTitle}>{service.title}</span>
          </button>
        ))}
      </div>

      <div className={styles.trackWrap}>
        <div className={styles.track} ref={trackRef}>
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * STAGGER_MS} style={{ height: "100%" }}>
              <article
                className={styles.panel}
                data-active={active === i}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 900px) 34vw, (min-width: 600px) 62vw, 90vw"
                  className={styles.panelImg}
                />
                <div className={styles.panelShade} aria-hidden />
                <div className={styles.panelHead} aria-hidden>
                  <span className={`font-archivo ${styles.panelNum}`}>{indexLabel(i)}</span>
                  <span className={styles.panelRule} />
                  <span className={`font-barlow-condensed ${styles.panelTotal}`}>/ {total}</span>
                </div>
                <div className={styles.panelBody}>
                  <span className={styles.panelAccent} aria-hidden />
                  <h3 className={`font-archivo ${styles.panelTitle}`}>{service.title}</h3>
                  <p className={`font-barlow-condensed ${styles.panelTagline}`}>{service.tagline}</p>
                  <ul className={styles.panelList}>
                    {service.items.map((item) => (
                      <li key={item}>
                        <span className={styles.panelDot} aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className={styles.panelCta}
                    onClick={() => setOpenIndex(i)}
                    aria-haspopup="dialog"
                    aria-label={`Več o storitvi ${service.title}`}
                  >
                    <span className={`font-barlow-condensed ${styles.panelCtaLabel}`}>Več</span>
                    <span className={styles.panelCtaArrow}>
                      <ArrowIcon />
                    </span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <ServiceSheet index={openIndex} onClose={closeSheet} onNavigate={setOpenIndex} />
    </>
  );
}
