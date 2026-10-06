"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { company, navItems } from "../../lib/content";
import { useActiveSection, useBodyScrollLock, useHeightVar, useScrolledPastHero } from "../../lib/hooks";
import { indexLabel } from "../../lib/utils";
import { ArrowIcon } from "../ui/ArrowIcon";
import styles from "./Header.module.css";

const sectionIds = navItems.map((item) => item.id);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pastHero = useScrolledPastHero();
  const activeSection = useActiveSection(sectionIds);
  useHeightVar(headerRef, "--header-h");
  useBodyScrollLock(menuOpen);

  const solid = pastHero && !menuOpen;
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className={styles.progress} aria-hidden>
        <div className={styles.progressBar} data-fx="progress" />
      </div>

      <header ref={headerRef} className={styles.header} data-solid={solid}>
        <div className={`container ${styles.bar}`}>
          <a href="#top" className={styles.brand} onClick={closeMenu}>
            <Image
              src={solid ? "/uploads/logo.png" : "/uploads/logo-white.png"}
              alt="PG Inženiring"
              width={74}
              height={74}
              preload
              className={styles.logo}
            />
            <span className={`font-barlow-condensed ${styles.logoLabel}`}>Inženiring d.o.o.</span>
          </a>

          <nav className={styles.navLinks} aria-label="Glavna navigacija">
            {navItems.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <a key={id} href={`#${id}`} className={styles.navLink} aria-current={isActive || undefined}>
                  {label}
                  {isActive && <span className={styles.navLinkMark} />}
                </a>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <a href="#kontakt" className={styles.cta}>
              Povpraševanje
              <span className={styles.ctaArrow}>
                <ArrowIcon />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Zapri meni" : "Meni"}
              aria-expanded={menuOpen}
              className={styles.burger}
              data-open={menuOpen}
            >
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
            </button>
          </div>
        </div>
      </header>

      <div className={styles.menu} data-open={menuOpen} aria-hidden={!menuOpen}>
        <nav className={styles.menuNav} aria-label="Meni">
          {navItems.map(({ id, label }, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={closeMenu}
              className={styles.menuLink}
              aria-current={activeSection === id || undefined}
              style={{ "--i": i } as CSSProperties}
            >
              <span className={styles.menuLinkNum}>{indexLabel(i)}</span>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.menuFooter}>
          <a href="#kontakt" onClick={closeMenu} className={styles.menuCta}>
            Povpraševanje
            <span className={styles.menuCtaArrow}>
              <ArrowIcon />
            </span>
          </a>
          <div className={styles.menuContact}>
            <a href={company.phoneHref}>{company.phone}</a>
            <a href={company.emailHref}>{company.email}</a>
          </div>
        </div>
      </div>
    </>
  );
}
