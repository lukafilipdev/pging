"use client";

import { useEffect } from "react";

const REVEAL_FALLBACK_MS = 3000;
const REVEAL_SETTLE_MS = 1000;
const QUOTE_PARALLAX_PX = 60;

/** Animates every [data-reveal] block in once it scrolls into view. */
function observeReveals() {
  const pending = new Set(document.querySelectorAll<HTMLElement>('[data-reveal=""]'));
  const timers: number[] = [];

  const show = (el: HTMLElement) => {
    if (!pending.delete(el)) return;
    el.dataset.reveal = "shown";
    const delay = parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0;
    timers.push(window.setTimeout(() => (el.dataset.reveal = "settled"), REVEAL_SETTLE_MS + delay));
  };

  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        show(entry.target as HTMLElement);
      }),
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  pending.forEach((el) => io.observe(el));

  // Never leave content hidden if an observer callback is missed.
  timers.push(window.setTimeout(() => pending.forEach(show), REVEAL_FALLBACK_MS));

  return () => {
    io.disconnect();
    timers.forEach(clearTimeout);
  };
}

/** Pins the hero to the visible viewport height (excludes mobile browser chrome). */
function syncHeroHeight() {
  const hero = document.getElementById("top");
  if (!hero) return () => {};
  const vv = window.visualViewport;
  const apply = () => {
    hero.style.minHeight = `${vv?.height ?? window.innerHeight}px`;
  };
  apply();
  window.addEventListener("resize", apply);
  window.addEventListener("orientationchange", apply);
  vv?.addEventListener("resize", apply);
  return () => {
    window.removeEventListener("resize", apply);
    window.removeEventListener("orientationchange", apply);
    vv?.removeEventListener("resize", apply);
  };
}

/** Gentle vertical drift on [data-parallax] images relative to their section. */
function parallaxDrift() {
  const imgs = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
  let raf = 0;
  const apply = () =>
    imgs.forEach((img) => {
      const section = img.parentElement;
      if (!section) return;
      const r = section.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      img.style.translate = `0 ${((progress - 0.5) * QUOTE_PARALLAX_PX).toFixed(1)}px`;
    });
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(apply);
  };
  apply();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
  };
}

/** Page-level motion. Renders nothing; wires up effects after hydration. */
export function ScrollEffects() {
  useEffect(() => {
    // Always open at the hero rather than a restored mid-page position.
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const cleanups = [observeReveals(), syncHeroHeight(), parallaxDrift()];

    // GSAP is loaded after first paint so it stays out of the critical bundle.
    let revert: (() => void) | undefined;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("../../lib/scrollFx")]).then(
      ([{ gsap }, { ScrollTrigger }, { setupScrollFx }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => setupScrollFx(gsap, ScrollTrigger));
        revert = () => ctx.revert();
      }
    );

    return () => {
      cancelled = true;
      revert?.();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
