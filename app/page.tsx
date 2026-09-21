"use client";

import { useEffect, useRef, useState, type FormEvent, type CSSProperties } from "react";
import styles from "./page.module.css";
import { heroMarks, principles, services, steps } from "./lib/data";
import { useActiveSection, useHeaderSolid, useQuoteParallax, useReveal } from "./lib/hooks";
import { useScrollFx, type ScrollFxRefs } from "./lib/scrollFx";

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
  const heroBgWrapRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const quoteImgRef = useRef<HTMLImageElement>(null);
  const quoteSectionRef = useRef<HTMLElement>(null);
  const quoteHeadingRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutImgRef = useRef<HTMLImageElement>(null);
  const aboutVignetteRef = useRef<HTMLDivElement>(null);
  const principleDividerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const serviceRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const serviceLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepsBarRef = useRef<HTMLDivElement>(null);
  const stepDotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stepNumRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const contactSectionRef = useRef<HTMLElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);
  const contactGlowRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const solid = useHeaderSolid(heroRef);
  const activeSection = useActiveSection(["top", "o-podjetju", "storitve", "kontakt"]);
  useQuoteParallax(quoteImgRef);

  const fxRefs: ScrollFxRefs = {
    topBar: topBarRef,
    heroSection: heroRef,
    heroBgWrap: heroBgWrapRef,
    heroContent: heroContentRef,
    aboutSection: aboutSectionRef,
    aboutImg: aboutImgRef,
    aboutVignette: aboutVignetteRef,
    principleDividers: principleDividerRefs,
    quoteSection: quoteSectionRef,
    quoteHeading: quoteHeadingRef,
    serviceRows: serviceRowRefs,
    serviceLines: serviceLineRefs,
    stepsContainer: stepsContainerRef,
    stepsBar: stepsBarRef,
    stepDots: stepDotRefs,
    stepNums: stepNumRefs,
    contactCard: contactCardRef,
    contactGlow: contactGlowRef,
    contactSection: contactSectionRef,
  };
  useScrollFx(fxRefs);

  const linkColor = solid ? "#4a453f" : "#fff";
  const inkLabelColor = solid ? "rgba(38,35,31,.62)" : "rgba(255,255,255,.95)";
  const headerTextShadow = solid ? "none" : "0 1px 8px rgba(0,0,0,.4)";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const containerStyle: CSSProperties = {
    maxWidth: 2100,
    margin: "0 auto",
    paddingLeft: "clamp(24px,5vw,110px)",
    paddingRight: "clamp(24px,5vw,110px)",
  };

  const navItems = [
    { href: "#top", label: "Domov" },
    { href: "#o-podjetju", label: "O podjetju" },
    { href: "#storitve", label: "Storitve" },
    { href: "#kontakt", label: "Kontakt" },
  ];

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
          ref={topBarRef}
          style={{
            height: "100%",
            width: "100%",
            background: "var(--accent)",
            transform: "scaleX(0)",
            transformOrigin: "left center",
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
              src={solid ? "/uploads/logo.png" : "/uploads/logo-white.png"}
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
                textShadow: headerTextShadow,
                transition: "color .5s ease",
              }}
            >
              Inženiring
              <br />
              d.o.o.
            </span>
          </a>
          <div className={styles.navLinks} style={{ justifySelf: "center", transform: "translateX(clamp(0px,2vw,32px))" }}>
            {navItems.map((l) => {
              const isActive = activeSection === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={styles.navLink}
                  style={
                    {
                      "--link-color": isActive ? "var(--accent)" : linkColor,
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 500,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      textShadow: headerTextShadow,
                      paddingBottom: 6,
                    } as React.CSSProperties
                  }
                >
                  {l.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 2,
                        borderRadius: 2,
                        background: "var(--accent)",
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 16, justifySelf: "end" }}>
            <a
              href="#kontakt"
              className={styles.headerCta}
              style={
                {
                  "--cta-border": solid ? "rgba(38,35,31,.4)" : "rgba(255,255,255,.75)",
                  "--cta-color": linkColor,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: 2,
                  padding: "10px 18px",
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  textShadow: headerTextShadow,
                } as React.CSSProperties
              }
            >
              Povpraševanje
              <span aria-hidden className={styles.ctaArrow} style={{ display: "inline-flex", alignItems: "center" }}>
                <svg width="15" height="11" viewBox="0 0 16 12" fill="none">
                  <path
                    d="M1 6H15M15 6L10 1M15 6L10 11"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
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
            {navItems.map((l, i, arr) => {
              const isActive = activeSection === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: "14px 2px",
                    borderBottom: i < arr.length - 1 ? "1px solid #f0ebe6" : undefined,
                    fontSize: 17,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--accent)" : "#26231f",
                  }}
                >
                  {l.label}
                </a>
              );
            })}
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
        }}
      >
        <div ref={heroBgWrapRef} style={{ position: "absolute", top: "8%", left: 0, right: 0, bottom: "-10%" }}>
          <img
            src="/uploads/hero2.jpeg"
            alt="Sodobna vila v večernem svetlobi"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 0%",
              transform: "scale(1)",
              animation: "pgBurns 30s ease-in-out infinite alternate",
              willChange: "transform",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,8,6,.6) 0%, rgba(10,8,6,.22) 26%, rgba(10,8,6,0) 48%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            paddingTop: "clamp(96px,11vh,132px)",
          }}
        >
          <div className={styles.heroTopSpacer} aria-hidden />

          <div ref={heroContentRef} style={{ ...containerStyle, width: "100%" }}>
            <div
              className={`font-barlow-condensed ${styles.mobileEyebrow}`}
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".26em",
                textTransform: "uppercase",
                textAlign: "center",
                color: "rgba(255,255,255,.8)",
                margin: "0 0 clamp(16px,4vh,28px)",
                textShadow: "0 1px 8px rgba(0,0,0,.6)",
                animation: "pgUp 1s .2s cubic-bezier(.16,1,.3,1) both",
              }}
            >
              Od ideje do izvedbe.
            </div>

            <h1
              className="font-display"
              style={{
                fontWeight: 400,
                fontSize: "clamp(70px,19.6vw,406px)",
                lineHeight: 1.14,
                letterSpacing: "0em",
                textTransform: "uppercase",
                margin: 0,
                color: "#fff",
                textShadow: "0 2px 34px rgba(0,0,0,.42)",
                whiteSpace: "nowrap",
                textAlign: "center",
                animation: "pgUp 1.1s .2s cubic-bezier(.16,1,.3,1) both",
              }}
            >
              PG Inženiring
            </h1>

            <div
              className={styles.mobileSubcopy}
              style={{
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                marginTop: "clamp(20px,4vh,32px)",
                animation: "pgUp 1s .4s cubic-bezier(.16,1,.3,1) both",
              }}
            >
              <span style={{ width: 44, height: 2, background: "var(--accent)" }} />
              <p
                className="font-barlow-condensed"
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  lineHeight: 1.9,
                  color: "rgba(255,255,255,.8)",
                  margin: 0,
                  textShadow: "0 1px 8px rgba(0,0,0,.6)",
                }}
              >
                Z znanjem. Z odgovornostjo.
                <br />
                Za ljudi in prostor.
              </p>
            </div>
          </div>

          <div className={styles.heroMidSpacer} aria-hidden />

          <div
            style={{
              ...containerStyle,
              width: "100%",
              paddingBottom: "clamp(28px,5vh,64px)",
            }}
          >
          <div
            className={styles.desktopBottomContent}
            style={{
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px,4vh,44px)" }}>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  animation: "pgUp 1s .5s cubic-bezier(.16,1,.3,1) both",
                }}
              >
                <span style={{ width: 2, alignSelf: "stretch", flexShrink: 0, background: "var(--accent)", opacity: 0.5 }} />
                <p
                  style={{
                    maxWidth: "38ch",
                    fontSize: "clamp(15px,1.1vw,17px)",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,.92)",
                    margin: 0,
                    textShadow: "0 1px 16px rgba(0,0,0,.7), 0 1px 3px rgba(0,0,0,.6)",
                    textWrap: "pretty",
                  }}
                >
                  Od ideje do izvedbe.
                  <br />
                  Z znanjem. Z odgovornostjo.
                  <br />
                  Za ljudi in prostor.
                </p>
              </div>

              <a
                href="#o-podjetju"
                aria-label="Pomaknite se navzdol"
                className={styles.scrollCue}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 14,
                  animation: "pgUp 1s .8s cubic-bezier(.16,1,.3,1) both",
                }}
              >
                <span className={styles.scrollCueTrack} aria-hidden>
                  <span className={styles.scrollCueDot} />
                </span>
                <span
                  className="font-barlow-condensed"
                  style={{ fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}
                >
                  Razišči
                </span>
              </a>
            </div>

            <div
              className={styles.heroMarkCardWrap}
              style={{
                width: "clamp(220px,17vw,260px)",
                marginRight: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {heroMarks.map((m, i) => (
                <a
                  key={m.title}
                  href="#storitve"
                  className={styles.heroIndexBox}
                  style={{
                    display: "block",
                    padding: "16px 18px",
                    animation: `pgUp .8s ${(0.85 + i * 0.1).toFixed(2)}s cubic-bezier(.16,1,.3,1) backwards`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span
                      className="font-archivo"
                      style={{ fontWeight: 700, fontSize: 12, letterSpacing: ".08em", color: "rgba(255,255,255,.45)" }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="font-archivo"
                      style={{ fontWeight: 700, fontSize: 15, letterSpacing: ".03em", textTransform: "uppercase", color: "#fff" }}
                    >
                      {m.title}
                    </span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.55)", lineHeight: 1.4, marginTop: 6 }}>{m.text}</div>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.mobileBottomContent}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {heroMarks.map((m, i) => (
                <a
                  key={m.title}
                  href="#storitve"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "0 6px",
                    borderLeft: i > 0 ? "1px solid rgba(255,255,255,.15)" : "none",
                    animation: `pgUp .8s ${(0.85 + i * 0.1).toFixed(2)}s cubic-bezier(.16,1,.3,1) backwards`,
                  }}
                >
                  <div className="font-archivo" style={{ fontWeight: 700, fontSize: 22, color: "rgba(255,255,255,.5)" }}>
                    0{i + 1}
                  </div>
                  <div
                    className="font-archivo"
                    style={{ fontWeight: 700, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: "#fff", marginTop: 6 }}
                  >
                    {m.title}
                  </div>
                  <span
                    style={{
                      display: "block",
                      width: 32,
                      height: 2,
                      margin: "12px auto 0",
                      background: i === 0 ? "var(--accent)" : "rgba(255,255,255,.28)",
                    }}
                  />
                </a>
              ))}
            </div>

            <a
              href="#o-podjetju"
              aria-label="Pomaknite se navzdol"
              className={styles.scrollCue}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                marginTop: "clamp(28px,6vh,44px)",
                animation: "pgUp 1s .8s cubic-bezier(.16,1,.3,1) both",
              }}
            >
              <span className={styles.scrollCueTrack} aria-hidden>
                <span className={styles.scrollCueDot} />
              </span>
              <span
                className="font-barlow-condensed"
                style={{ fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}
              >
                Razišči
              </span>
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true">
                <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
        </div>
      </section>

      <section id="o-podjetju" ref={aboutSectionRef} className={styles.aboutSection}>
        <div
          style={{
            ...containerStyle,
            paddingTop: "clamp(64px,9vw,120px)",
            paddingBottom: "clamp(64px,9vw,120px)",
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
                  fontSize: "clamp(17px,1.5vw,21px)",
                  lineHeight: 1.75,
                  color: "#5a544c",
                  margin: "28px 0 0",
                  maxWidth: "54ch",
                  textWrap: "pretty",
                }}
              >
                PG INŽENIRING d.o.o. je majhno podjetje iz Gornjih Slavečev v Prekmurju, ki projektira, gradi
                in nadzira vse vrste objektov — vse pod eno streho. Pri izdelavi dokumentacije upoštevamo
                vaše želje, ne le svoje izkušnje, in ostajamo v neposrednem stiku z vami od prvega obiska
                parcele do predaje ključev.
              </p>
            </Reveal>

            <div className={styles.principlesGrid} style={{ marginTop: "clamp(40px,5vw,64px)" }}>
              {principles.map((p, i) => (
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
                    <div
                      ref={(el) => {
                        principleDividerRefs.current[i] = el;
                      }}
                      style={{ width: 28, height: 2, background: "var(--accent)", marginTop: 10 }}
                    />
                    <div style={{ fontSize: 14, lineHeight: 1.55, color: "#7d766d", marginTop: 8, textWrap: "pretty" }}>
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
                src="/uploads/photo2.png"
                alt="Delovni prostor s projektno dokumentacijo"
                style={{
                  position: "absolute",
                  inset: "-6% 0",
                  width: "100%",
                  height: "112%",
                  objectFit: "cover",
                  objectPosition: "50% 45%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(20,17,14,0) 55%, rgba(20,17,14,.6) 100%)",
                }}
              />
              <div
                ref={aboutVignetteRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  background: "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 45%, rgba(10,8,6,.75) 100%)",
                  pointerEvents: "none",
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

      <section ref={quoteSectionRef} style={{ position: "relative", overflow: "hidden", background: "#14110e" }}>
        <img
          ref={quoteImgRef}
          src="/uploads/photo3.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "55% 30%",
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
          <div ref={quoteHeadingRef}>
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
            {services.map((s, i) => (
              <div
                key={s.num}
                ref={(el) => {
                  serviceRowRefs.current[i] = el;
                }}
                className={styles.serviceCard}
                style={{
                  position: "relative",
                  borderBottom: "1px solid #e9e2d9",
                  padding: "clamp(28px,3.4vw,44px) clamp(4px,1.4vw,22px)",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))",
                  gap: "clamp(18px,3vw,48px)",
                  alignItems: "start",
                  opacity: 1,
                }}
              >
                <div
                  ref={(el) => {
                    serviceLineRefs.current[i] = el;
                  }}
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
              ref={stepsBarRef}
              style={{
                position: "absolute",
                left: 0,
                top: 5,
                height: 1,
                width: "100%",
                background: "var(--accent)",
                transform: "scaleX(1)",
                transformOrigin: "left center",
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
              {steps.map((st, i) => (
                <Reveal key={st.num} delay={st.delay} style={{ paddingRight: "clamp(0px,1.5vw,24px)" }}>
                  <span
                    ref={(el) => {
                      stepDotRefs.current[i] = el;
                    }}
                    style={{
                      display: "block",
                      width: 11,
                      height: 11,
                      background: "var(--accent)",
                      borderRadius: "50%",
                      boxShadow: "0 0 0 5px #fff, 0 0 0 3px rgba(232,116,36,.18)",
                      marginBottom: "clamp(22px,2.6vw,32px)",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span
                      ref={(el) => {
                        stepNumRefs.current[i] = el;
                      }}
                      className="font-archivo"
                      style={{
                        fontWeight: 700,
                        fontSize: "clamp(30px,3vw,40px)",
                        lineHeight: 0.9,
                        letterSpacing: "-.03em",
                        color: "#dcd4c9",
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
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" ref={contactSectionRef} style={{ background: "#fbfaf9", borderTop: "1px solid #f0ebe5", position: "relative" }}>
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

          <div ref={contactCardRef} style={{ position: "relative", opacity: 1 }}>
            <div
              ref={contactGlowRef}
              aria-hidden
              style={{
                position: "absolute",
                inset: "-10%",
                opacity: 0,
                background: "radial-gradient(60% 60% at 50% 60%, rgba(232,116,36,.45) 0%, rgba(232,116,36,0) 70%)",
                filter: "blur(30px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <form
              onSubmit={handleSubmit}
              style={{
                position: "relative",
                zIndex: 1,
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
          </div>
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
