import { ArrowIcon } from "../ui/ArrowIcon";
import { Reveal } from "../ui/Reveal";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { ServiceCarousel } from "./ServiceCarousel";
import styles from "./Services.module.css";

function MoreLink({ className }: { className: string }) {
  return (
    <a href="#kontakt" className={className}>
      <span className={`font-barlow-condensed ${styles.moreLabel}`}>Več o storitvah</span>
      <span className={styles.moreArrow}>
        <ArrowIcon />
      </span>
    </a>
  );
}

export function Services() {
  return (
    <section id="storitve" className={styles.services}>
      <div className={styles.introWrap}>
        <Reveal style={{ width: "100%" }}>
          <div className={styles.intro}>
            <div>
              <SectionEyebrow index="02" label="Storitve" />
              <h2 className={`font-archivo ${styles.title}`}>
                Celovite storitve,
                <br />
                za vaš projekt.
              </h2>
            </div>
            <div className={styles.introCopy}>
              <span className={styles.introDivider} aria-hidden />
              <p className={styles.introText}>
                Od prve ideje do predaje objekta. Povezujemo znanje, izkušnje in odgovornost, da lahko vaš projekt
                poteka enostavno, varno in zanesljivo.
              </p>
            </div>
            <div className={styles.moreDesktop}>
              <span className={styles.moreRule} />
              <MoreLink className={styles.moreDesktopLink} />
              <span className={styles.moreRule} />
            </div>
          </div>
        </Reveal>
      </div>

      <ServiceCarousel />

      <div className={styles.moreMobile}>
        <MoreLink className={styles.moreMobileLink} />
      </div>
    </section>
  );
}
