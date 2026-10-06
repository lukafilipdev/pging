import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Extra delay before this block animates in, in ms. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Scroll-reveal wrapper. Server-safe: it only marks the element; a single
 * observer in <ScrollEffects> animates every [data-reveal] on the page.
 */
export function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const revealStyle = delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style;
  return (
    <div data-reveal="" className={className} style={revealStyle}>
      {children}
    </div>
  );
}
