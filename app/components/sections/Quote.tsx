import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import styles from "./Quote.module.css";

export function Quote() {
  return (
    <section className={styles.quote} data-fx="quote">
      <Image src="/uploads/photo3.png" alt="" fill sizes="100vw" className={styles.image} data-parallax="" />
      <div className={styles.shade} />
      <div className={`container ${styles.inner}`}>
        <div data-fx="quote-heading">
          <Reveal className={styles.body}>
            <div className={styles.label}>
              <span className={styles.labelRule} />
              <span className={`font-barlow-condensed ${styles.labelText}`}>Naše prepričanje</span>
            </div>
            <blockquote className={`font-archivo ${styles.text}`}>
              Najboljši projekti nastanejo, ko se <span className={styles.textAccent}>vaše želje</span> srečajo z našim
              znanjem, izkušnjami in odgovornostjo.
            </blockquote>
            <div className={`font-barlow-condensed ${styles.sign}`}>Ekipa PG Inženiring</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
