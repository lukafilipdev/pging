"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./ContactForm.module.css";

type Field = {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  autoComplete?: string;
  required?: boolean;
  /** Span both columns of the two-column desktop layout. */
  full?: boolean;
};

const fields: Field[] = [
  { id: "kf-ime", name: "ime", label: "Ime in priimek", type: "text", autoComplete: "name", required: true, full: true },
  { id: "kf-email", name: "email", label: "E-pošta", type: "email", autoComplete: "email", required: true },
  { id: "kf-tel", name: "telefon", label: "Telefon", type: "tel", autoComplete: "tel" },
  { id: "kf-opis", name: "sporocilo", label: "Kratek opis projekta", type: "textarea", full: true },
];

// TODO: submissions aren't delivered anywhere yet; wire up an email service or server action.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {fields.map((field) => (
        <div key={field.id} className={field.full ? `${styles.field} ${styles.full}` : styles.field}>
          <label htmlFor={field.id} className={`font-barlow-condensed ${styles.label}`}>
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea id={field.id} name={field.name} rows={3} className={`${styles.input} ${styles.textarea}`} />
          ) : (
            <input
              id={field.id}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              className={styles.input}
            />
          )}
        </div>
      ))}

      <div className={`${styles.footer} ${styles.full}`}>
        <button type="submit" className={`font-archivo ${styles.submit}`}>
          Pošlji povpraševanje
          <span className={styles.submitArrow} aria-hidden>
            →
          </span>
        </button>
        <p className={styles.note}>
          Z oddajo se strinjate z našo{" "}
          <Link href="/politika-zasebnosti" className={styles.noteLink}>
            politiko zasebnosti
          </Link>
          .
        </p>
      </div>

      <div className={styles.full} role="status" aria-live="polite">
        {sent && <p className={styles.success}>Hvala, sporočilo je zabeleženo. Oglasili se bomo v najkrajšem času.</p>}
      </div>
    </form>
  );
}
