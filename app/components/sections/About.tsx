import Image from "next/image";
import { principles } from "../../lib/content";
import { indexLabel, STAGGER_MS } from "../../lib/utils";
import { Reveal } from "../ui/Reveal";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="o-podjetju" className={styles.about}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <Reveal>
            <SectionEyebrow index="01" label="O podjetju" />
          </Reveal>
          <Reveal delay={90}>
            <h2 className={`font-archivo ${styles.title}`}>
              Najprej poslušamo,
              <br />
              <span className={styles.titleAccent}>šele nato načrtujemo.</span>
            </h2>
            <div className={styles.titleRule} />
          </Reveal>
          <Reveal delay={170}>
            <p className={styles.lead}>
              PG INŽENIRING d.o.o. je majhno podjetje iz Gornjih Slaveč v Prekmurju, katero projektira, gradi in
              nadzira vse vrste objektov, pod eno streho. Vaše želje povezujemo z našim znanjem in izkušnjami ter vas
              osebno vodimo skozi celoten proces, od prvega ogleda parcele do trenutka, ko vam predamo ključe vašega
              novega doma.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className={styles.imageReveal}>
          <div className={styles.image}>
            <Image
              src="/uploads/photo2.png"
              alt="Delovni prostor s projektno dokumentacijo"
              width={1672}
              height={941}
              sizes="(min-width: 900px) 52vw, 100vw"
              className={styles.imageImg}
              data-fx="about-img"
            />
            <div className={styles.imageShade} />
            <div className={styles.imageVignette} data-fx="about-vignette" />
            <div className={styles.caption}>
              <span className={styles.captionRule} />
              <span className={`font-barlow-condensed ${styles.captionText}`}>Prekmurje, Slovenija</span>
            </div>
          </div>
        </Reveal>

        <div className={styles.points}>
          {principles.map((principle, i) => (
            <Reveal key={principle.title} delay={120 + i * STAGGER_MS}>
              <div className={styles.point}>
                <span className={`font-archivo ${styles.pointNum}`}>{indexLabel(i)}</span>
                <h3 className={`font-archivo ${styles.pointTitle}`}>{principle.title}</h3>
                <div className={styles.pointRule} data-fx="principle-rule" />
                <p className={styles.pointText}>{principle.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
