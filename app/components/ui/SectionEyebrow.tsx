import styles from "./SectionEyebrow.module.css";

/** Section index + label, e.g. "01  O PODJETJU". */
export function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className={styles.eyebrow}>
      <span className={`font-archivo ${styles.index}`}>{index}</span>
      <span className={`font-barlow-condensed ${styles.label}`}>{label}</span>
    </div>
  );
}
