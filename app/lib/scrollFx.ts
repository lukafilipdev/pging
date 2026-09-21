"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollFxRefs {
  topBar: RefObject<HTMLDivElement | null>;
  heroSection: RefObject<HTMLElement | null>;
  heroBgWrap: RefObject<HTMLDivElement | null>;
  heroContent: RefObject<HTMLDivElement | null>;
  aboutSection: RefObject<HTMLElement | null>;
  aboutImg: RefObject<HTMLImageElement | null>;
  aboutVignette: RefObject<HTMLDivElement | null>;
  principleDividers: RefObject<(HTMLDivElement | null)[]>;
  quoteSection: RefObject<HTMLElement | null>;
  quoteHeading: RefObject<HTMLDivElement | null>;
  serviceRows: RefObject<(HTMLDivElement | null)[]>;
  serviceLines: RefObject<(HTMLDivElement | null)[]>;
  stepsContainer: RefObject<HTMLDivElement | null>;
  stepsBar: RefObject<HTMLDivElement | null>;
  stepDots: RefObject<(HTMLSpanElement | null)[]>;
  stepNums: RefObject<(HTMLSpanElement | null)[]>;
  contactCard: RefObject<HTMLDivElement | null>;
  contactGlow: RefObject<HTMLDivElement | null>;
  contactSection: RefObject<HTMLElement | null>;
}

function willChangeToggle(el: Element) {
  return {
    onToggle: (self: ScrollTrigger) => {
      (el as HTMLElement).style.willChange = self.isActive ? "transform" : "auto";
    },
  };
}

export function useScrollFx(refs: ScrollFxRefs) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motionOK: "(prefers-reduced-motion: no-preference)",
          isDesktop: "(min-width: 900px)",
        },
        (context) => {
          const { motionOK, isDesktop } = (context.conditions ?? {}) as Record<string, boolean>;
          if (!motionOK) return;

          const cleanups: Array<() => void> = [];

          if (refs.topBar.current) {
            const bar = refs.topBar.current;
            gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
            const st = ScrollTrigger.create({
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
              onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
            });
            cleanups.push(() => st.kill());
          }

          if (refs.heroSection.current && refs.heroBgWrap.current) {
            const el = refs.heroBgWrap.current;
            const tween = gsap.fromTo(
              el,
              { yPercent: -8 },
              {
                yPercent: 12,
                ease: "none",
                scrollTrigger: {
                  trigger: refs.heroSection.current,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1.2,
                  ...willChangeToggle(el),
                },
              }
            );
            cleanups.push(() => tween.scrollTrigger?.kill());
          }

          if (refs.heroSection.current && refs.heroContent.current) {
            const tween = gsap.fromTo(
              refs.heroContent.current,
              { yPercent: 0 },
              {
                yPercent: -14,
                ease: "none",
                scrollTrigger: {
                  trigger: refs.heroSection.current,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1.2,
                },
              }
            );
            cleanups.push(() => tween.scrollTrigger?.kill());
          }

          if (isDesktop && refs.aboutSection.current && refs.aboutImg.current) {
            const img = refs.aboutImg.current;
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: refs.aboutSection.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                ...willChangeToggle(img),
              },
            });
            tl.fromTo(img, { scale: 1 }, { scale: 1.05, ease: "none" }, 0);
            if (refs.aboutVignette.current) {
              tl.fromTo(refs.aboutVignette.current, { opacity: 0 }, { opacity: 0.45, ease: "none" }, 0);
            }
            cleanups.push(() => tl.scrollTrigger?.kill());
          }

          (refs.principleDividers.current || []).forEach((el, i) => {
            if (!el) return;
            gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
            const st = ScrollTrigger.create({
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
              onEnter: () =>
                gsap.to(el, { scaleX: 1, duration: 0.7, delay: i * 0.08, ease: "cubic-bezier(0.16,1,0.3,1)" }),
              onLeaveBack: () => gsap.to(el, { scaleX: 0, duration: 0.4, ease: "power2.in" }),
            });
            cleanups.push(() => st.kill());
          });

          if (refs.quoteSection.current) {
            const el = refs.quoteSection.current;
            gsap.set(el, { clipPath: "inset(8% 4% round 16px)" });
            const tween = gsap.to(el, {
              clipPath: "inset(0% 0% round 0px)",
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 90%", end: "top 30%", scrub: 1 },
            });
            cleanups.push(() => tween.scrollTrigger?.kill());
          }

          if (refs.quoteSection.current && refs.quoteHeading.current) {
            const tween = gsap.fromTo(
              refs.quoteHeading.current,
              { yPercent: 6 },
              {
                yPercent: -6,
                ease: "none",
                scrollTrigger: { trigger: refs.quoteSection.current, start: "top bottom", end: "bottom top", scrub: 1.4 },
              }
            );
            cleanups.push(() => tween.scrollTrigger?.kill());
          }

          const rows = refs.serviceRows.current || [];
          const lines = refs.serviceLines.current || [];
          rows.forEach((row, i) => {
            if (!row) return;
            gsap.set(row, { opacity: 0.35, x: -12 });
            const line = lines[i];
            if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
            const tl = gsap.timeline({
              scrollTrigger: { trigger: row, start: "top 88%", end: "bottom 12%", scrub: 1 },
            });
            tl.fromTo(row, { opacity: 0.35, x: -12 }, { opacity: 1, x: 0, ease: "none", duration: 0.5 }, 0);
            tl.to(row, { opacity: 0.35, ease: "none", duration: 0.5 }, 0.5);
            if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 0.5 }, 0);
            cleanups.push(() => tl.scrollTrigger?.kill());
          });

          if (refs.stepsContainer.current && refs.stepsBar.current) {
            const bar = refs.stepsBar.current;
            const dots = refs.stepDots.current || [];
            const nums = refs.stepNums.current || [];
            const count = dots.length;
            gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
            dots.forEach((d) => {
              if (d) gsap.set(d, { backgroundColor: "#e6ded3", scale: 1, boxShadow: "0 0 0 5px #fff, 0 0 0 0px rgba(232,116,36,.18)" });
            });
            nums.forEach((n) => {
              if (n) gsap.set(n, { color: "#e6ded3" });
            });
            if (count > 1) {
              const activeFlags = new Array(count).fill(false);
              const st = ScrollTrigger.create({
                trigger: refs.stepsContainer.current,
                start: "top 80%",
                end: "bottom 30%",
                scrub: 1,
                onUpdate: (self) => {
                  gsap.set(bar, { scaleX: self.progress });
                  dots.forEach((d, i) => {
                    const active = self.progress >= i / (count - 1) - 0.02;
                    if (active === activeFlags[i]) return;
                    activeFlags[i] = active;
                    if (d) {
                      gsap.to(d, {
                        backgroundColor: active ? "#e87424" : "#e6ded3",
                        scale: active ? 1.15 : 1,
                        boxShadow: active
                          ? "0 0 0 5px #fff, 0 0 0 3px rgba(232,116,36,.18)"
                          : "0 0 0 5px #fff, 0 0 0 0px rgba(232,116,36,.18)",
                        duration: 0.45,
                        ease: "power2.out",
                        overwrite: true,
                      });
                    }
                    const n = nums[i];
                    if (n) gsap.to(n, { color: active ? "#dcd4c9" : "#e6ded3", duration: 0.45, overwrite: true });
                  });
                },
              });
              cleanups.push(() => st.kill());
            }
          }

          if (refs.contactCard.current) {
            const el = refs.contactCard.current;
            gsap.set(el, { y: 30, opacity: 0 });
            const st = ScrollTrigger.create({
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
              onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }),
              onLeaveBack: () => gsap.to(el, { y: 30, opacity: 0, duration: 0.5, ease: "power2.in" }),
            });
            cleanups.push(() => st.kill());
          }

          if (refs.contactSection.current && refs.contactGlow.current) {
            const el = refs.contactGlow.current;
            gsap.set(el, { opacity: 0 });
            const tween = gsap.to(el, {
              opacity: 0.55,
              ease: "none",
              scrollTrigger: { trigger: refs.contactSection.current, start: "bottom 90%", end: "bottom 25%", scrub: 1 },
            });
            cleanups.push(() => tween.scrollTrigger?.kill());
          }

          return () => cleanups.forEach((fn) => fn());
        }
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
