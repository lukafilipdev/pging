import Link from "next/link";
import { company } from "../../lib/content";
import { CookieSettingsButton } from "./CookieSettingsButton";
import styles from "./Footer.module.css";

const pageLinks = [
  { href: "#o-podjetju", label: "O podjetju" },
  { href: "#storitve", label: "Storitve" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <div className={`font-archivo ${styles.brandName}`}>{company.name}</div>
          <div className={styles.brandAddress}>
            {company.street}
            <br />
            {company.region}
          </div>
        </div>

        <nav className={styles.col} aria-label="Stran">
          <div className={`font-barlow-condensed ${styles.label}`}>Stran</div>
          {pageLinks.map(({ href, label }) => (
            <a key={href} href={href} className={styles.item}>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.col}>
          <div className={`font-barlow-condensed ${styles.label}`}>Kontakt</div>
          <a href={company.phoneHref} className={styles.item}>
            {company.phone}
          </a>
          <a href={company.emailHref} className={`${styles.item} ${styles.itemBreak}`}>
            {company.email}
          </a>
        </div>
      </div>

      <div className="container">
        <div className={`font-archivo ${styles.wordmark}`} aria-hidden>
          PG INŽENIRING
        </div>
      </div>

      <div className={styles.barWrap}>
        <div className={`container ${styles.bar}`}>
          <span>© {new Date().getFullYear()} {company.name} Vse pravice pridržane.</span>
          <div className={styles.barLinks}>
            <Link href="/politika-zasebnosti" className={styles.barLink}>
              Politika zasebnosti
            </Link>
            <CookieSettingsButton className={styles.barLink} />
          </div>
          <span>Projektiranje · Gradnja · Nadzor</span>
        </div>
      </div>
    </footer>
  );
}
