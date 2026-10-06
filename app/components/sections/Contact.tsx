import { company } from "../../lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { ContactForm } from "./ContactForm";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="kontakt" className={styles.contact}>
      <div className={`container ${styles.grid}`}>
        <Reveal>
          <SectionEyebrow index="04" label="Kontakt" />
          <h2 className={`font-archivo ${styles.title}`}>Pogovorimo se o vaši investiciji</h2>
          <p className={styles.lead}>Pokličite ali pišite. Svetujemo vam že pred začetkom, brezplačno in brez obveznosti.</p>

          <div className={styles.details}>
            <a href={company.phoneHref} className={`${styles.row} ${styles.rowLink}`}>
              <span className={`font-barlow-condensed ${styles.rowLabel}`}>Mobitel</span>
              <span className={`font-archivo ${styles.rowValue} ${styles.phone}`}>{company.phone}</span>
            </a>
            <a href={company.emailHref} className={`${styles.row} ${styles.rowLink}`}>
              <span className={`font-barlow-condensed ${styles.rowLabel}`}>E-pošta</span>
              <span className={`font-archivo ${styles.rowValue} ${styles.email}`}>{company.email}</span>
            </a>
            <div className={`${styles.row} ${styles.rowLast}`}>
              <span className={`font-barlow-condensed ${styles.rowLabel}`}>Naslov</span>
              <span className={styles.address}>
                {company.name}
                <br />
                {company.street}
              </span>
            </div>
          </div>

          {/* Phones only: the form sits further down, so give it a clear way in. */}
          <a href="#povprasevanje" className={`font-archivo ${styles.mobileCta}`}>
            Pošlji povpraševanje
            <span className={styles.mobileCtaArrow} aria-hidden>
              →
            </span>
          </a>
        </Reveal>

        <div id="povprasevanje" className={styles.inquiry} data-fx="contact-card">
          <div className={styles.inquiryLabel}>
            <span className={styles.inquiryRule} />
            <span className={`font-barlow-condensed ${styles.inquiryLabelText}`}>Povpraševanje</span>
          </div>
          <h3 className={`font-archivo ${styles.inquiryTitle}`}>Povejte nam, kaj načrtujete.</h3>
          <p className={styles.inquiryNote}>Odgovorimo v enem delovnem dnevu.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
