import { steps } from "../../lib/content";
import { indexLabel, STAGGER_MS } from "../../lib/utils";
import { Reveal } from "../ui/Reveal";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import styles from "./Process.module.css";

/** "Od klepeta do ključa": four steps on a rail that fills as you scroll. */
export function Process() {
  return (
    <section className={styles.process}>
      <div className={`container ${styles.inner}`}>
        <Reveal style={{ maxWidth: 640 }}>
          <SectionEyebrow index="03" label="Kako poteka" />
          <h2 className={`font-archivo ${styles.title}`}>Od klepeta do ključa</h2>
        </Reveal>

        <div className={styles.timeline} data-fx="steps">
          <div className={styles.rail} />
          <div className={styles.railFill} data-fx="steps-bar" />
          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * STAGGER_MS}>
                  <div className={styles.step}>
                    <span className={styles.dot} data-fx="step-dot" />
                    <div className={styles.stepBody}>
                      <span className={`font-archivo ${styles.stepNum}`} data-fx="step-num">
                        {indexLabel(i)}
                      </span>
                      <h3 className={`font-archivo ${styles.stepTitle}`}>{step.title}</h3>
                      <p className={styles.stepText}>{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
