import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { company } from "../lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Politika zasebnosti | PG INŽENIRING d.o.o.",
  description: "Politika zasebnosti in uporabe piškotkov na spletni strani PG INŽENIRING d.o.o.",
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={`font-archivo ${styles.sectionTitle}`}>{title}</h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  const email = <a href={company.emailHref}>{company.email}</a>;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.column} ${styles.headerInner}`}>
          <Link href="/" className={styles.logoLink}>
            <Image src="/uploads/logo.png" alt="PG Inženiring" width={60} height={60} preload className={styles.logo} />
          </Link>
        </div>
      </header>

      <main className={`${styles.column} ${styles.main}`}>
        <Link href="/" className={styles.back}>
          ← Nazaj na domov stran
        </Link>

        <h1 className={`font-archivo ${styles.title}`}>Politika zasebnosti</h1>
        <p className={styles.updated}>Zadnja posodobitev: september 2026</p>

        <Section title="1. Upravljavec osebnih podatkov">
          <p>
            Upravljavec osebnih podatkov, zbranih prek te spletne strani, je:
            <br />
            <strong>{company.name}</strong>
            <br />
            {company.street}, Slovenija
            <br />
            Matična številka: 2366380000
            <br />
            E-pošta: {email}
            <br />
            Telefon: {company.phone}
          </p>
          <p>Za vsa vprašanja v zvezi z obdelavo osebnih podatkov nas lahko kontaktirate na zgornje kontaktne podatke.</p>
        </Section>

        <Section title="2. Katere podatke zbiramo in zakaj">
          <p>
            Prek kontaktnega obrazca na strani zbiramo podatke, ki nam jih posredujete sami: ime, e-poštni naslov in/ali
            telefonsko številko ter vsebino sporočila. Te podatke uporabimo izključno za to, da odgovorimo na vaše
            povpraševanje in po potrebi pripravimo ponudbo za projektiranje, gradnjo ali nadzor.
          </p>
          <p>
            Pravna podlaga za obdelavo je vaša privolitev, izražena z oddajo obrazca, oziroma izvajanje ukrepov na vašo
            zahtevo pred sklenitvijo pogodbe (člen 6(1)(a) in (b) Splošne uredbe o varstvu podatkov, GDPR).
          </p>
        </Section>

        <Section title="3. Piškotki">
          <p>
            Spletna stran za svoje osnovno delovanje ne potrebuje piškotkov. Vašo odločitev glede soglasja (sprejem ali
            zavrnitev) shranimo lokalno v vašem brskalniku (localStorage), da vas ob naslednjem obisku ne sprašujemo
            znova.
          </p>
          <p>
            Z vašim soglasjem lahko uporabimo analitične piškotke (npr. Google Analytics ali podobno orodje) za
            spremljanje obiskanosti strani in izboljšanje uporabniške izkušnje. Ti piškotki se naložijo šele, ko kliknete
            &quot;Sprejmi&quot; v pasici s piškotki, in nikoli pred tem. Soglasje lahko kadarkoli umaknete prek povezave
            &quot;Nastavitve piškotkov&quot; v nogi strani.
          </p>
        </Section>

        <Section title="4. Hramba podatkov">
          <p>
            Podatke, posredovane prek kontaktnega obrazca, hranimo toliko časa, kolikor je potrebno za obravnavo vašega
            povpraševanja in morebitno sklenitev ter izvedbo pogodbe, oziroma do vašega izrecnega preklica, razen če nam
            zakon nalaga daljšo hrambo (npr. računovodska in davčna zakonodaja za sklenjene posle).
          </p>
        </Section>

        <Section title="5. Prejemniki podatkov">
          <p>
            Osebnih podatkov ne prodajamo ali posredujemo tretjim osebam za njihove trženjske namene. Podatke lahko
            obdelujejo naši pogodbeni obdelovalci, ki nam zagotavljajo storitve gostovanja spletne strani in pošiljanja
            e-pošte, in sicer izključno v obsegu, potrebnem za opravljanje teh storitev, ter v skladu z GDPR.
          </p>
        </Section>

        <Section title="6. Vaše pravice">
          <p>V zvezi z vašimi osebnimi podatki imate pravico do:</p>
          <ul className={styles.list}>
            <li>dostopa do podatkov, ki jih obdelujemo,</li>
            <li>popravka netočnih podatkov,</li>
            <li>izbrisa podatkov (&quot;pravica do pozabe&quot;),</li>
            <li>omejitve obdelave,</li>
            <li>ugovora obdelavi,</li>
            <li>prenosljivosti podatkov.</li>
          </ul>
          <p>
            Zahtevo lahko kadarkoli naslovite na {email}. Če menite, da obdelava vaših podatkov krši GDPR, imate pravico
            vložiti pritožbo pri Informacijskem pooblaščencu Republike Slovenije (www.ip-rs.si).
          </p>
        </Section>

        <Section title="7. Sprememba politike zasebnosti">
          <p>
            To politiko lahko občasno posodobimo, na primer ob uvedbi novih orodij ali storitev na spletni strani.
            Aktualna različica je vedno objavljena na tej strani.
          </p>
        </Section>
      </main>
    </div>
  );
}
