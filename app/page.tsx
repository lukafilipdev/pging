"use client";

import { useRef, useState, type FormEvent, type CSSProperties } from "react";
import styles from "./page.module.css";
import { heroMarks, principles, services, steps } from "./lib/data";
import {
  useHeaderSolid,
  useHeroParallax,
  useParallaxDrift,
  useQuoteParallax,
  useReveal,
  useScrollProgress,
  useSectionProgress,
} from "./lib/hooks";

function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, style: revealStyle } = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} style={{ ...style, ...revealStyle }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const quoteImgRef = useRef<HTMLImageElement>(null);
  const aboutImgRef = useRef<HTMLImageElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  const solid = useHeaderSolid(heroRef);
  const topProgress = useScrollProgress();
  useHeroParallax(heroRef, heroImgRef);
  useQuoteParallax(quoteImgRef);
  useParallaxDrift(aboutImgRef, 36);
  const stepsProgress = useSectionProgress(stepsContainerRef);

  const linkColor = solid ? "#4a453f" : "#fff";
  const inkLabelColor = solid ? "rgba(38,35,31,.62)" : "rgba(255,255,255,.82)";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const containerStyle: CSSProperties = {
    maxWidth: 2100,
    margin: "0 auto",
    paddingLeft: "clamp(16px,2.4vw,48px)",
    paddingRight: "clamp(16px,2.4vw,48px)",
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 60,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${topProgress * 100}%`,
            background: "var(--accent)",
          }}
        />
      </div>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: solid ? "rgba(251,250,249,.92)" : "transparent",
          backdropFilter: solid ? "blur(14px)" : "none",
          transition: "background .5s ease, backdrop-filter .5s ease",
        }}
      >
        <div
          style={{
            ...containerStyle,
            paddingTop: 14,
            paddingBottom: 14,
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            gap: 20,
          }}
        >
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <img
              src="/uploads/logo.png"
              alt="PG Inženiring"
              className={styles.logoImg}
              style={{
                width: 74,
                height: "auto",
                filter: solid ? "none" : "drop-shadow(0 2px 10px rgba(0,0,0,.45))",
                transition: "filter .5s ease, width .3s ease",
              }}
            />
            <span
              className={`font-barlow-condensed ${styles.logoLabel}`}
              style={{
                fontWeight: 600,
                letterSpacing: ".14em",
                fontSize: 13,
                color: inkLabelColor,
                textTransform: "uppercase",
                lineHeight: 1.2,
                transition: "color .5s ease",
              }}
            >
              Inženiring
              <br />
              d.o.o.
            </span>
          </a>
          <div className={styles.navLinks} style={{ justifySelf: "center" }}>
            {[
              { href: "#o-podjetju", label: "O podjetju" },
              { href: "#storitve", label: "Storitve" },
              { href: "#kontakt", label: "Kontakt" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={styles.navLink}
                style={
                  {
                    "--link-color": linkColor,
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                  } as React.CSSProperties
                }
              >
                {l.label}
              </a>
            ))}
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 16, justifySelf: "end" }}>
            <a
              href="tel:070799810"
              className={styles.phoneBtn}
              style={{
                background: "var(--accent)",
                color: "#fff",
                padding: "11px 20px",
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              070 799 810
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Meni"
              className={styles.burger}
              style={{
                background: solid ? "transparent" : "rgba(0,0,0,.18)",
                border: `1px solid ${solid ? "#e0dad3" : "rgba(255,255,255,.45)"}`,
                borderRadius: 2,
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <span style={{ display: "block", width: 18, height: 2, background: solid ? "#4a453f" : "#fff" }} />
              <span style={{ display: "block", width: 18, height: 2, background: solid ? "#4a453f" : "#fff" }} />
            </button>
          </nav>
        </div>
        {menuOpen && (
          <div
            className={styles.mobileMenu}
            style={{
              background: "#fbfaf9",
              borderTop: "1px solid #eae5e0",
              padding: "10px 22px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {[
              { href: "#o-podjetju", label: "O podjetju" },
              { href: "#storitve", label: "Storitve" },
              { href: "#kontakt", label: "Kontakt" },
            ].map((l, i, arr) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "14px 2px",
                  borderBottom: i < arr.length - 1 ? "1px solid #f0ebe6" : undefined,
                  fontSize: 17,
                  fontWeight: 500,
                  color: "#26231f",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <section
        id="top"
        ref={heroRef}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#14110e",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            ref={heroImgRef}
            src="/uploads/hero.jpeg"
            alt="Sodobna vila v sončnem zahodu"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "64% 50%",
              transform: "scale(1.06)",
              animation: "pgBurns 26s ease-in-out infinite alternate",
              willChange: "transform",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,11,8,.92) 0%, rgba(14,11,8,.62) 26%, rgba(14,11,8,.16) 56%, rgba(14,11,8,.34) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, rgba(14,11,8,.78) 0%, rgba(14,11,8,.42) 40%, rgba(14,11,8,0) 72%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            ...containerStyle,
            position: "relative",
            width: "100%",
            paddingTop: "clamp(130px,18vh,190px)",
            paddingBottom: "clamp(34px,5vh,54px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              animation: "pgUp .9s .15s cubic-bezier(.2,.7,.2,1) both",
            }}
          >
            <span
              style={{
                display: "block",
                width: 44,
                height: 2,
                background: "var(--accent)",
                transformOrigin: "left",
                animation: "pgLine .9s .35s cubic-bezier(.2,.7,.2,1) both",
              }}
            />
            <span
              className="font-barlow-condensed"
              style={{
                fontSize: "clamp(12px,1.1vw,14px)",
                fontWeight: 600,
                letterSpacing: ".26em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.88)",
              }}
            >
              Gornji Slaveči · Prekmurje
            </span>
          </div>

          <h1
            className="font-archivo"
            style={{
              fontWeight: 700,
              fontSize: "clamp(42px,7.4vw,96px)",
              lineHeight: 0.98,
              letterSpacing: "-.03em",
              margin: "clamp(18px,2.4vh,28px) 0 0",
              color: "#fff",
              textShadow: "0 2px 34px rgba(0,0,0,.42)",
              textWrap: "balance",
            }}
          >
            <span style={{ display: "block", overflow: "hidden" }}>
              <span style={{ display: "block", animation: "pgUp 1.1s .2s cubic-bezier(.16,1,.3,1) both" }}>
                Projektiranje,
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span style={{ display: "block", animation: "pgUp 1.1s .34s cubic-bezier(.16,1,.3,1) both" }}>
                gradnja in
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span
                style={{
                  display: "block",
                  color: "var(--accent-light)",
                  animation: "pgUp 1.1s .48s cubic-bezier(.16,1,.3,1) both",
                }}
              >
                nadzor.
              </span>
            </span>
          </h1>

          <p
            style={{
              maxWidth: "52ch",
              fontSize: "clamp(16px,1.45vw,20px)",
              lineHeight: 1.65,
              color: "rgba(255,255,255,.9)",
              margin: "clamp(20px,2.6vh,30px) 0 0",
              animation: "pgUp 1s .66s cubic-bezier(.16,1,.3,1) both",
              textWrap: "pretty",
            }}
          >
            Majhno inženirsko podjetje z osebnim pristopom. Od prve ideje in projektne dokumentacije do
            izvedbe in strokovnega nadzora nad gradnjo — vse na enem mestu.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              marginTop: "clamp(26px,3.4vh,40px)",
              animation: "pgUp 1s .8s cubic-bezier(.16,1,.3,1) both",
            }}
          >
            <a
              href="#kontakt"
              className={styles.ctaPrimary}
              style={{
                background: "var(--accent)",
                color: "#fff",
                padding: "17px 32px",
                borderRadius: 2,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: ".1em",
                textTransform: "uppercase",
              }}
            >
              Povprašajte nas
            </a>
            <a
              href="#storitve"
              className={styles.ctaSecondary}
              style={{
                border: "1px solid rgba(255,255,255,.5)",
                color: "#fff",
                padding: "17px 32px",
                borderRadius: 2,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                backdropFilter: "blur(6px)",
              }}
            >
              Naše storitve
            </a>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,.18)",
            animation: "pgIn 1.2s 1s ease both",
          }}
        >
          <div
            style={{
              ...containerStyle,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "stretch",
              justifyContent: "space-between",
              gap: 0,
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", flex: "1 1 auto" }}>
              {heroMarks.map((m) => (
                <div
                  key={m.title}
                  style={{
                    padding: "20px 30px 22px 0",
                    marginRight: 30,
                    borderRight: "1px solid rgba(255,255,255,.14)",
                  }}
                >
                  <div
                    className="font-archivo"
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(15px,1.3vw,18px)",
                      letterSpacing: "-.01em",
                      color: "#fff",
                    }}
                  >
                    {m.title}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.62)", marginTop: 4, lineHeight: 1.45 }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#o-podjetju"
              className={styles.scrollHint}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 0" }}
            >
              <span
                className="font-barlow-condensed"
                style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}
              >
                Pomaknite navzdol
              </span>
              <span style={{ display: "block", animation: "pgBob 2.4s ease-in-out infinite" }}>
                <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
                  <path d="M7 0v19M1 13l6 7 6-7" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="o-podjetju" className={styles.aboutSection}>
        <div
          style={{
            ...containerStyle,
            paddingTop: "clamp(40px,6vw,88px)",
            paddingBottom: "clamp(32px,5vw,64px)",
          }}
          className={styles.aboutGrid}
        >
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span className="font-archivo" style={{ fontWeight: 700, fontSize: 12, letterSpacing: ".12em", color: "#cfc7bd" }}>
                  01
                </span>
                <span
                  className="font-barlow-condensed"
                  style={{ fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: "#a09889" }}
                >
                  O podjetju
                </span>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <h2
                className="font-archivo"
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(30px,3.6vw,48px)",
                  lineHeight: 1.06,
                  letterSpacing: "-.028em",
                  margin: "16px 0 0",
                  textWrap: "balance",
                }}
              >
                Najprej poslušamo, <span style={{ color: "var(--accent)" }}>šele nato rišemo.</span>
              </h2>
              <div style={{ width: 56, height: 2, background: "var(--accent)", marginTop: 22 }} />
            </Reveal>

            <Reveal delay={170}>
              <p
                style={{
                  fontSize: "clamp(16px,1.3vw,19px)",
                  lineHeight: 1.6,
                  color: "#5a544c",
                  margin: "22px 0 0",
                  maxWidth: "56ch",
                  textWrap: "pretty",
                }}
              >
                PG INŽENIRING d.o.o. je majhno podjetje iz Gornjih Slavečev v Prekmurju, ki projektira, gradi
                in nadzira vse vrste objektov — vse pod eno streho. Pri izdelavi dokumentacije upoštevamo
                vaše želje, ne le svoje izkušnje, in ostajamo v neposrednem stiku z vami od prvega obiska
                parcele do predaje ključev.
              </p>
            </Reveal>

            <div className={styles.principlesGrid} style={{ marginTop: "clamp(28px,4vw,44px)" }}>
              {principles.map((p) => (
                <Reveal key={p.title} delay={220 + p.delay}>
                  <div className={styles.principleCard}>
                    <div
                      className={`font-archivo ${styles.principleNum}`}
                      style={{ fontWeight: 700, fontSize: "clamp(22px,2.2vw,28px)", letterSpacing: "-.02em", color: "#cfc7bd" }}
                    >
                      {p.num}
                    </div>
                    <div
                      className="font-archivo"
                      style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-.01em", marginTop: 8 }}
                    >
                      {p.title}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.55, color: "#7d766d", marginTop: 6, textWrap: "pretty" }}>
                      {p.text}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={140}>
            <div className={styles.aboutImageFrame}>
              <img
                ref={aboutImgRef}
                src="/uploads/hero.png"
                alt="Arhitekturna zasnova sodobne vile"
                style={{
                  position: "absolute",
                  inset: "-6% 0",
                  width: "100%",
                  height: "112%",
                  objectFit: "cover",
                  objectPosition: "30% 25%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(20,17,14,0) 55%, rgba(20,17,14,.6) 100%)",
                }}
              />
              <div style={{ position: "absolute", left: 18, right: 18, bottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 22, height: 2, background: "var(--accent-light)", flexShrink: 0 }} />
                <span
                  className="font-barlow-condensed"
                  style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#fff" }}
                >
                  Prekmurje, Slovenija
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ position: "relative", overflow: "hidden", background: "#14110e" }}>
        <img
          ref={quoteImgRef}
          src="/uploads/hero.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 40%",
            opacity: 0.4,
            transform: "scale(1.08)",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(100deg, rgba(14,11,8,.94) 0%, rgba(14,11,8,.78) 46%, rgba(14,11,8,.5) 100%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ ...containerStyle, position: "relative", paddingTop: "clamp(80px,11vw,150px)", paddingBottom: "clamp(80px,11vw,150px)" }}>
          <Reveal style={{ maxWidth: 900 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ display: "block", width: 40, height: 2, background: "var(--accent)" }} />
              <span
                className="font-barlow-condensed"
                style={{ fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(255,255,255,.66)" }}
              >
                Naše prepričanje
              </span>
            </div>
            <blockquote
              className="font-archivo"
              style={{
                margin: "clamp(22px,3vw,34px) 0 0",
                fontWeight: 600,
                fontSize: "clamp(26px,4vw,52px)",
                lineHeight: 1.16,
                letterSpacing: "-.028em",
                color: "#fff",
                textWrap: "pretty",
              }}
            >
              Vsaka hiša, ki jo narišemo, bo nekoga dom. Zato se za vsak načrt{" "}
              <span style={{ color: "var(--accent-light)" }}>usedemo za mizo</span> — z vami, ne brez vas.
            </blockquote>
            <div
              className="font-barlow-condensed"
              style={{
                fontSize: 13,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.56)",
                marginTop: "clamp(24px,3vw,36px)",
              }}
            >
              Ekipa PG Inženiring
            </div>
          </Reveal>
        </div>
      </section>

      <section id="storitve" style={{ background: "#fbfaf9", position: "relative" }}>
        <div style={{ ...containerStyle, paddingTop: "clamp(72px,10vw,140px)", paddingBottom: "clamp(56px,7vw,110px)" }}>
          <Reveal
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
              gap: "clamp(20px,4vw,60px)",
              alignItems: "end",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span className="font-archivo" style={{ fontWeight: 700, fontSize: 12, letterSpacing: ".12em", color: "#cfc7bd" }}>
                  02
                </span>
                <span
                  className="font-barlow-condensed"
                  style={{ fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: "#a09889" }}
                >
                  Storitve
                </span>
              </div>
              <h2
                className="font-archivo"
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(32px,4.4vw,58px)",
                  lineHeight: 1.04,
                  letterSpacing: "-.028em",
                  margin: "20px 0 0",
                  textWrap: "balance",
                }}
              >
                Tri storitve,
                <br />
                en partner.
              </h2>
            </div>
            <p style={{ fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.75, color: "#7d766d", margin: 0, maxWidth: "44ch", textWrap: "pretty" }}>
              Vsako od njih lahko prevzamemo posamično — največ pa vam prihranimo, ko jih združimo v eno
              pot od načrta do predaje.
            </p>
          </Reveal>

          <div style={{ marginTop: "clamp(44px,6vw,80px)", borderTop: "1px solid #e9e2d9" }}>
            {services.map((s) => (
              <Reveal key={s.num} delay={s.delay}>
                <div
                  className={styles.serviceCard}
                  style={{
                    position: "relative",
                    borderBottom: "1px solid #e9e2d9",
                    padding: "clamp(28px,3.4vw,44px) clamp(4px,1.4vw,22px)",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))",
                    gap: "clamp(18px,3vw,48px)",
                    alignItems: "start",
                  }}
                >
                  <div
                    className={styles.cardBar}
                    style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: "var(--accent)" }}
                  />
                  <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(14px,2vw,26px)" }}>
                    <div
                      className="font-archivo"
                      style={{ fontWeight: 700, fontSize: "clamp(28px,3.4vw,46px)", lineHeight: 0.9, letterSpacing: "-.03em", color: "#dcd4c9" }}
                    >
                      {s.num}
                    </div>
                    <h3 className="font-archivo" style={{ fontWeight: 700, fontSize: "clamp(26px,3vw,40px)", lineHeight: 1.02, letterSpacing: "-.028em", margin: 0 }}>
                      {s.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.75, color: "#5a544c", margin: 0, maxWidth: "42ch", textWrap: "pretty" }}>
                    {s.text}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {s.items.map((it) => (
                      <li key={it} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, color: "#4a453f", lineHeight: 1.5 }}>
                        <span style={{ flexShrink: 0, width: 5, height: 5, background: "var(--accent)", marginTop: 8, borderRadius: "50%" }} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#fff" }}>
        <div style={{ ...containerStyle, paddingTop: "clamp(72px,10vw,140px)", paddingBottom: "clamp(72px,10vw,140px)" }}>
          <Reveal style={{ maxWidth: 640 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span className="font-archivo" style={{ fontWeight: 700, fontSize: 12, letterSpacing: ".12em", color: "#cfc7bd" }}>
                03
              </span>
              <span
                className="font-barlow-condensed"
                style={{ fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: "#a09889" }}
              >
                Kako poteka
              </span>
            </div>
            <h2
              className="font-archivo"
              style={{
                fontWeight: 700,
                fontSize: "clamp(32px,4.4vw,58px)",
                lineHeight: 1.04,
                letterSpacing: "-.028em",
                margin: "20px 0 0",
                textWrap: "balance",
              }}
            >
              Od klepeta do ključa
            </h2>
          </Reveal>
          <div ref={stepsContainerRef} style={{ position: "relative", marginTop: "clamp(44px,6vw,72px)" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 5, height: 1, background: "#efe9e2" }} />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 5,
                height: 1,
                background: "var(--accent)",
                width: `${stepsProgress * 100}%`,
              }}
            />
            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,210px),1fr))",
                gap: "clamp(28px,3.4vw,44px)",
              }}
            >
              {steps.map((st, i) => {
                const active = stepsProgress >= i / (steps.length - 1) - 0.02;
                return (
                  <Reveal key={st.num} delay={st.delay} style={{ paddingRight: "clamp(0px,1.5vw,24px)" }}>
                    <span
                      style={{
                        display: "block",
                        width: 11,
                        height: 11,
                        background: active ? "var(--accent)" : "#e6ded3",
                        borderRadius: "50%",
                        boxShadow: `0 0 0 5px #fff, 0 0 0 ${active ? 3 : 0}px rgba(232,116,36,.18)`,
                        marginBottom: "clamp(22px,2.6vw,32px)",
                        transform: active ? "scale(1.15)" : "scale(1)",
                        transition: "background .5s ease, box-shadow .5s ease, transform .5s cubic-bezier(.2,.7,.2,1)",
                      }}
                    />
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span
                        className="font-archivo"
                        style={{
                          fontWeight: 700,
                          fontSize: "clamp(30px,3vw,40px)",
                          lineHeight: 0.9,
                          letterSpacing: "-.03em",
                          color: active ? "#dcd4c9" : "#e6ded3",
                          transition: "color .5s ease",
                        }}
                      >
                        {st.num}
                      </span>
                      <span className="font-archivo" style={{ fontWeight: 700, fontSize: "clamp(19px,1.7vw,23px)", letterSpacing: "-.015em" }}>
                        {st.title}
                      </span>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5a544c", margin: "14px 0 0", textWrap: "pretty" }}>{st.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" style={{ background: "#fbfaf9", borderTop: "1px solid #f0ebe5" }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: "clamp(64px,9vw,120px)",
            paddingBottom: "clamp(64px,9vw,120px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
            gap: "clamp(36px,5vw,72px)",
          }}
        >
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span className="font-archivo" style={{ fontWeight: 700, fontSize: 12, letterSpacing: ".12em", color: "#cfc7bd" }}>
                04
              </span>
              <span
                className="font-barlow-condensed"
                style={{ fontSize: 13, letterSpacing: ".26em", textTransform: "uppercase", color: "#a09889" }}
              >
                Kontakt
              </span>
            </div>
            <h2
              className="font-archivo"
              style={{
                fontWeight: 700,
                fontSize: "clamp(32px,4.4vw,58px)",
                lineHeight: 1.04,
                letterSpacing: "-.028em",
                margin: "20px 0 22px",
                textWrap: "balance",
              }}
            >
              Pogovorimo se o vaši investiciji
            </h2>
            <p style={{ fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.7, color: "#5a544c", margin: "0 0 clamp(34px,4vw,48px)", maxWidth: "44ch", textWrap: "pretty" }}>
              Pokličite ali pišite — svetujemo vam že pred začetkom, brezplačno in brez obveznosti.
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <a
                href="tel:070799810"
                className={styles.contactLine}
                style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 18, padding: "20px 2px", borderTop: "1px solid #e9e2d9", color: "#26231f" }}
              >
                <span className="font-barlow-condensed" style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "#a09889" }}>
                  Mobitel
                </span>
                <span className="font-archivo" style={{ fontWeight: 600, fontSize: "clamp(18px,1.7vw,23px)", letterSpacing: "-.015em" }}>
                  070 799 810
                </span>
              </a>
              <a
                href="tel:059942613"
                className={styles.contactLine}
                style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 18, padding: "20px 2px", borderTop: "1px solid #e9e2d9", color: "#26231f" }}
              >
                <span className="font-barlow-condensed" style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "#a09889" }}>
                  Telefon
                </span>
                <span className="font-archivo" style={{ fontWeight: 600, fontSize: "clamp(18px,1.7vw,23px)", letterSpacing: "-.015em" }}>
                  05 994 26 13
                </span>
              </a>
              <a
                href="mailto:info@pg-inzeniring.si"
                className={styles.contactLine}
                style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 18, padding: "20px 2px", borderTop: "1px solid #e9e2d9", color: "#26231f" }}
              >
                <span className="font-barlow-condensed" style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "#a09889" }}>
                  E-pošta
                </span>
                <span className="font-archivo" style={{ fontWeight: 600, fontSize: "clamp(16px,1.5vw,21px)", letterSpacing: "-.015em", wordBreak: "break-word" }}>
                  info@pg-inzeniring.si
                </span>
              </a>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 18,
                  padding: "20px 2px",
                  borderTop: "1px solid #e9e2d9",
                  borderBottom: "1px solid #e9e2d9",
                }}
              >
                <span className="font-barlow-condensed" style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "#a09889" }}>
                  Naslov
                </span>
                <span style={{ fontSize: 16, lineHeight: 1.5, textAlign: "right", color: "#4a453f" }}>
                  PG INŽENIRING d.o.o.
                  <br />
                  Kuzma 24, 9263 Kuzma
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <form
              onSubmit={handleSubmit}
              style={{
                background: "#fff",
                border: "1px solid #eee7e0",
                borderRadius: 3,
                padding: "clamp(26px,3.4vw,44px)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                boxShadow: "0 40px 80px -60px rgba(38,35,31,.5)",
              }}
            >
              <div>
                <div className="font-archivo" style={{ fontWeight: 700, fontSize: "clamp(21px,1.9vw,26px)", letterSpacing: "-.018em" }}>
                  Pošljite povpraševanje
                </div>
                <div style={{ fontSize: 14, color: "#8a8378", marginTop: 8, lineHeight: 1.55 }}>
                  Odgovorimo v enem delovnem dnevu.
                </div>
              </div>
              <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "#8a8378" }}>
                Ime in priimek
                <input
                  name="ime"
                  required
                  className={styles.field}
                  style={{
                    background: "#fff",
                    border: "1px solid #e4ddd5",
                    borderRadius: 2,
                    padding: "14px 15px",
                    fontSize: 16,
                    letterSpacing: "normal",
                    textTransform: "none",
                    color: "#26231f",
                  }}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "#8a8378" }}>
                E-pošta ali telefon
                <input
                  name="kontakt"
                  required
                  className={styles.field}
                  style={{
                    background: "#fff",
                    border: "1px solid #e4ddd5",
                    borderRadius: 2,
                    padding: "14px 15px",
                    fontSize: 16,
                    letterSpacing: "normal",
                    textTransform: "none",
                    color: "#26231f",
                  }}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "#8a8378" }}>
                Kaj načrtujete?
                <textarea
                  name="sporocilo"
                  rows={4}
                  className={styles.field}
                  style={{
                    background: "#fff",
                    border: "1px solid #e4ddd5",
                    borderRadius: 2,
                    padding: "14px 15px",
                    fontSize: 16,
                    letterSpacing: "normal",
                    textTransform: "none",
                    color: "#26231f",
                    resize: "vertical",
                    fontFamily: "var(--font-barlow), sans-serif",
                  }}
                />
              </label>
              <button
                type="submit"
                className={styles.submitBtn}
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 2,
                  padding: "16px 22px",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Pošlji povpraševanje
              </button>
              {sent && (
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #dfe8dc",
                    borderRadius: 2,
                    padding: "14px 16px",
                    fontSize: 15,
                    color: "#42603b",
                    animation: "pgUp .4s ease both",
                  }}
                >
                  Hvala, sporočilo je zabeleženo. Oglasili se bomo v najkrajšem času.
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <footer style={{ background: "#14110e", color: "#e7e2db", overflow: "hidden" }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: "clamp(56px,7vw,96px)",
            paddingBottom: "clamp(32px,4vw,48px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
            gap: "clamp(30px,4vw,60px)",
            alignItems: "start",
          }}
        >
          <div>
            <div className="font-archivo" style={{ fontWeight: 700, fontSize: "clamp(20px,1.8vw,24px)", letterSpacing: "-.018em", color: "#fff" }}>
              PG INŽENIRING d.o.o.
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.7, color: "#9a938a", marginTop: 12 }}>
              Kuzma 24, 9263 Kuzma
              <br />
              Prekmurje, Slovenija
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="font-barlow-condensed" style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "#6f685f" }}>
              Stran
            </div>
            <a href="#o-podjetju" className={styles.footerLink} style={{ color: "#e7e2db", fontSize: 15 }}>
              O podjetju
            </a>
            <a href="#storitve" className={styles.footerLink} style={{ color: "#e7e2db", fontSize: 15 }}>
              Storitve
            </a>
            <a href="#kontakt" className={styles.footerLink} style={{ color: "#e7e2db", fontSize: 15 }}>
              Kontakt
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="font-barlow-condensed" style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "#6f685f" }}>
              Kontakt
            </div>
            <a href="tel:070799810" className={styles.footerLink} style={{ color: "#e7e2db", fontSize: 15 }}>
              070 799 810
            </a>
            <a href="tel:059942613" className={styles.footerLink} style={{ color: "#e7e2db", fontSize: 15 }}>
              05 994 26 13
            </a>
            <a href="mailto:info@pg-inzeniring.si" className={styles.footerLink} style={{ color: "#e7e2db", fontSize: 15, wordBreak: "break-word" }}>
              info@pg-inzeniring.si
            </a>
          </div>
        </div>
        <div style={containerStyle}>
          <div
            className="font-archivo"
            style={{
              fontWeight: 700,
              fontSize: "clamp(52px,13vw,190px)",
              lineHeight: 0.82,
              letterSpacing: "-.045em",
              color: "rgba(255,255,255,.055)",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            PG INŽENIRING
          </div>
        </div>
        <div style={{ borderTop: "1px solid #2b2620", marginTop: "clamp(22px,3vw,34px)" }}>
          <div
            style={{
              ...containerStyle,
              paddingTop: 18,
              paddingBottom: 18,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "space-between",
              fontSize: 13,
              color: "#7d766d",
            }}
          >
            <span>© 2026 PG INŽENIRING d.o.o. Vse pravice pridržane.</span>
            <span>Projektiranje · Gradnja · Nadzor</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
