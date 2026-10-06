import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import { heroMarks } from "../../lib/content";
import { indexLabel } from "../../lib/utils";
import styles from "./Hero.module.css";

// Art direction: portrait crop on phones, landscape above.
const heroImg = { alt: "Sodobna vila v večernem svetlobi", sizes: "100vw", fetchPriority: "high", loading: "eager" } as const;
const { srcSet: mobileSrcSet } = getImageProps({ ...heroImg, src: "/uploads/mobilehero.jpeg", width: 1536, height: 2752 }).props;
const { props: desktopImgProps } = getImageProps({ ...heroImg, src: "/uploads/hero2.jpeg", width: 2752, height: 1536 });

/** Entrance animation timing (seconds), consumed by .enter in the module CSS. */
const enter = (duration: number, delay: number) => ({ "--enter-dur": `${duration}s`, "--enter-delay": `${delay}s` }) as CSSProperties;
const markEnter = (i: number) => enter(0.8, 0.85 + i * 0.1);

function ScrollCue({ className, labelClassName, chevron }: { className: string; labelClassName: string; chevron?: boolean }) {
  return (
    <a href="#o-podjetju" aria-label="Pomaknite se navzdol" className={`${styles.scrollCue} ${className} ${styles.enter}`} style={enter(1, 0.8)}>
      <span className={styles.scrollCueTrack} aria-hidden>
        <span className={styles.scrollCueDot} />
      </span>
      <span className={`font-barlow-condensed ${labelClassName}`}>Razišči</span>
      {chevron && (
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden>
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  );
}

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.composition}>
        <div className={styles.background} data-fx="hero-bg">
          <picture>
            <source media="(max-width: 680px)" srcSet={mobileSrcSet} sizes="100vw" />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is provided by desktopImgProps */}
            <img {...desktopImgProps} className={styles.backgroundImg} />
          </picture>
        </div>
        <div className={styles.shade} aria-hidden />

        <div className={styles.grid}>
          <div className={`container ${styles.content}`} data-fx="hero-content">
            <p className={`font-barlow-condensed ${styles.eyebrow} ${styles.enter}`} style={enter(1, 0.2)}>
              Od ideje do izvedbe.
            </p>

            <h1 className={`font-display ${styles.title} ${styles.enter}`} style={enter(1.1, 0.2)}>
              PG Inženiring
            </h1>

            <div className={`${styles.subcopy} ${styles.enter}`} style={enter(1, 0.4)}>
              <span className={styles.subcopyRule} aria-hidden />
              <p className={`font-barlow-condensed ${styles.subcopyText}`}>
                Z znanjem. Z odgovornostjo.
                <br />
                Za ljudi in prostor.
              </p>
            </div>
          </div>

          <div className={`container ${styles.bottom}`}>
            {/* Desktop: intro copy + scroll cue on the left, service index cards on the right. */}
            <div className={styles.desktopBottom}>
              <div className={styles.intro}>
                <div className={`${styles.introCopy} ${styles.enter}`} style={enter(1, 0.5)}>
                  <span className={styles.introRule} aria-hidden />
                  <p className={styles.introText}>
                    Od ideje do izvedbe.
                    <br />
                    Z znanjem. Z odgovornostjo.
                    <br />
                    Za ljudi in prostor.
                  </p>
                </div>
                <ScrollCue className={styles.scrollCueRow} labelClassName={styles.scrollCueLabel} />
              </div>

              <div className={styles.cards}>
                {heroMarks.map((mark, i) => (
                  <a key={mark.title} href="#storitve" className={`${styles.card} ${styles.enterBackwards}`} style={markEnter(i)}>
                    <span className={styles.cardHead}>
                      <span className={`font-archivo ${styles.cardNum}`}>{indexLabel(i)}</span>
                      <span className={`font-archivo ${styles.cardTitle}`}>{mark.title}</span>
                    </span>
                    <span className={styles.cardText}>{mark.text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Phones: compact three-up service index + centred scroll cue. */}
            <div className={styles.mobileBottom}>
              <div className={styles.marks}>
                {heroMarks.map((mark, i) => (
                  <a key={mark.title} href="#storitve" className={`${styles.mark} ${styles.enterBackwards}`} style={markEnter(i)}>
                    <span className={`font-archivo ${styles.markNum}`}>{indexLabel(i)}</span>
                    <span className={`font-barlow-condensed ${styles.markTitle}`}>{mark.title}</span>
                    <span className={styles.markRule} aria-hidden />
                  </a>
                ))}
              </div>
              <ScrollCue className={styles.scrollCueStack} labelClassName={styles.scrollCueLabelMobile} chevron />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
