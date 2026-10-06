import type gsapType from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type Gsap = typeof gsapType;

const fx = <T extends Element = HTMLElement>(name: string) => document.querySelector<T>(`[data-fx="${name}"]`);
const fxAll = <T extends Element = HTMLElement>(name: string) => [...document.querySelectorAll<T>(`[data-fx="${name}"]`)];

const STEP_IDLE = "#e6ded3";
const STEP_ACTIVE = "#e87424";
const STEP_NUM_IDLE = "#e9e2d8";
const STEP_NUM_ACTIVE = "#f0a46b";
const ringShadow = (spread: number) => `0 0 0 5px #fff, 0 0 0 ${spread}px rgba(232,116,36,.18)`;

/** Hint the compositor only while a scrubbed element is actually moving. */
function willChangeWhileActive(el: HTMLElement) {
  return {
    onToggle: (self: ScrollTriggerType) => {
      el.style.willChange = self.isActive ? "transform" : "auto";
    },
  };
}

/**
 * Scroll-linked effects. Call inside a gsap.context(); everything created here
 * is reverted with it. Skipped entirely when the user prefers reduced motion.
 */
export function setupScrollFx(gsap: Gsap, ScrollTrigger: typeof ScrollTriggerType) {
  const mm = gsap.matchMedia();

  mm.add(
    {
      motionOK: "(prefers-reduced-motion: no-preference)",
      isDesktop: "(min-width: 900px)",
      isStepsVertical: "(max-width: 859px)",
    },
    (context) => {
      const { motionOK, isDesktop, isStepsVertical } = context.conditions as Record<string, boolean>;
      if (!motionOK) return;

      // Reading progress bar along the top edge.
      const bar = fx("progress");
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.create({
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
        });
      }

      // Hero: background drifts down, copy drifts up.
      const hero = document.getElementById("top");
      const heroBg = fx("hero-bg");
      const heroContent = fx("hero-content");
      if (hero && heroBg) {
        // y: 0 replaces the CSS starting offset instead of stacking on it.
        gsap.fromTo(
          heroBg,
          { y: 0, yPercent: -8 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1.2, ...willChangeWhileActive(heroBg) },
          }
        );
      }
      if (hero && heroContent) {
        gsap.fromTo(
          heroContent,
          { yPercent: 0 },
          { yPercent: -14, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1.2 } }
        );
      }

      // About (desktop): slow zoom + vignette across the section.
      const about = document.getElementById("o-podjetju");
      const aboutImg = fx("about-img");
      if (isDesktop && about && aboutImg) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: about, start: "top top", end: "bottom bottom", scrub: 1, ...willChangeWhileActive(aboutImg) },
        });
        tl.fromTo(aboutImg, { scale: 1 }, { scale: 1.05, ease: "none" }, 0);
        const vignette = fx("about-vignette");
        if (vignette) tl.fromTo(vignette, { opacity: 0 }, { opacity: 0.45, ease: "none" }, 0);
      }

      // Principle accent rules draw in.
      fxAll("principle-rule").forEach((rule, i) => {
        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.create({
          trigger: rule,
          start: "top 85%",
          onEnter: () => gsap.to(rule, { scaleX: 1, duration: 0.7, delay: i * 0.08, ease: "cubic-bezier(0.16,1,0.3,1)" }),
          onLeaveBack: () => gsap.to(rule, { scaleX: 0, duration: 0.4, ease: "power2.in" }),
        });
      });

      // Quote: rounded inset opens to full bleed; heading drifts.
      const quote = fx("quote");
      if (quote) {
        gsap.set(quote, { clipPath: isDesktop ? "inset(8% 4% round 16px)" : "inset(6% 3% round 8px)" });
        gsap.to(quote, {
          clipPath: "inset(0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: quote, start: "top 90%", end: "top 30%", scrub: 1 },
        });
        const heading = fx("quote-heading");
        if (heading) {
          gsap.fromTo(
            heading,
            { yPercent: 6 },
            { yPercent: -6, ease: "none", scrollTrigger: { trigger: quote, start: "top bottom", end: "bottom top", scrub: 1.4 } }
          );
        }
      }

      // Process timeline: the rail fills and each step lights up as it's reached.
      const steps = fx("steps");
      const stepsBar = fx("steps-bar");
      if (steps && stepsBar) {
        const dots = fxAll("step-dot");
        const nums = fxAll("step-num");
        const barProp = isStepsVertical ? "scaleY" : "scaleX";
        gsap.set(stepsBar, {
          scaleX: 1,
          scaleY: 1,
          [barProp]: 0,
          transformOrigin: isStepsVertical ? "center top" : "left center",
        });
        dots.forEach((d) => gsap.set(d, { backgroundColor: STEP_IDLE, scale: 1, boxShadow: ringShadow(0) }));
        nums.forEach((n) => gsap.set(n, { color: STEP_NUM_IDLE }));

        if (dots.length > 1) {
          const active = dots.map(() => false);
          ScrollTrigger.create({
            trigger: steps,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1,
            onUpdate: (self) => {
              gsap.set(stepsBar, { [barProp]: self.progress });
              dots.forEach((dot, i) => {
                const isActive = self.progress >= i / (dots.length - 1) - 0.02;
                if (isActive === active[i]) return;
                active[i] = isActive;
                gsap.to(dot, {
                  backgroundColor: isActive ? STEP_ACTIVE : STEP_IDLE,
                  scale: isActive ? 1.15 : 1,
                  boxShadow: ringShadow(isActive ? 3 : 0),
                  duration: 0.45,
                  ease: "power2.out",
                  overwrite: true,
                });
                if (nums[i]) gsap.to(nums[i], { color: isActive ? STEP_NUM_ACTIVE : STEP_NUM_IDLE, duration: 0.6, overwrite: true });
              });
            },
          });
        }
      }

      // Inquiry form fades up.
      const card = fx("contact-card");
      if (card) {
        gsap.set(card, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          onEnter: () => gsap.to(card, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }),
          onLeaveBack: () => gsap.to(card, { y: 30, opacity: 0, duration: 0.5, ease: "power2.in" }),
        });
      }
    }
  );
}
