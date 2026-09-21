"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const t = setTimeout(() => setShown(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    const fallback = setTimeout(() => setShown(true), 3000);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(() => setSettled(true), 900 + delay + 100);
    return () => clearTimeout(t);
  }, [shown, delay]);

  const style: CSSProperties = settled
    ? { opacity: 1, transform: "none", clipPath: "none" }
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(24px)",
        clipPath: shown ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        transition: [
          `opacity .9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
          `transform .9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
          `clip-path .9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ].join(", "),
      };

  return { ref, style };
}

export function useHeaderSolid(heroRef: RefObject<HTMLElement | null>) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      const y = window.scrollY || 0;
      setSolid(y > hero.offsetHeight - 90);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [heroRef]);

  return solid;
}

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return active;
}

export function useParallaxDrift(imgRef: RefObject<HTMLImageElement | null>, strength = 60) {
  useEffect(() => {
    const img = imgRef.current;
    const sec = img?.parentElement;
    if (!img || !sec) return;
    let raf = 0;
    const apply = () => {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      img.style.translate = "0 " + ((p - 0.5) * strength).toFixed(1) + "px";
    };
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
  }, [imgRef, strength]);
}

export function useQuoteParallax(imgRef: RefObject<HTMLImageElement | null>) {
  useParallaxDrift(imgRef, 60);
}
