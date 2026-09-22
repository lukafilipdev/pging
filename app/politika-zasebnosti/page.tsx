import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politika zasebnosti — PG INŽENIRING d.o.o.",
  description: "Politika zasebnosti in uporabe piškotkov na spletni strani PG INŽENIRING d.o.o.",
};

const containerStyle = {
  maxWidth: 820,
  margin: "0 auto",
  paddingLeft: "clamp(24px,5vw,40px)",
  paddingRight: "clamp(24px,5vw,40px)",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 40 }}>
      <h2
        className="font-archivo"
        style={{ fontSize: "clamp(19px,2.2vw,24px)", fontWeight: 700, letterSpacing: "-.01em", margin: "0 0 14px" }}
      >
        {title}
      </h2>
      <div style={{ fontSize: 16, lineHeight: 1.75, color: "#4a453f" }}>{children}</div>
    </section>
  );
}

export default function PolitikaZasebnostiPage() {
  return (
    <div style={{ background: "#fbfaf9", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #ece6dd" }}>
        <div style={{ ...containerStyle, paddingTop: 24, paddingBottom: 24 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <img src="/uploads/logo.png" alt="PG Inženiring" style={{ width: 60, height: "auto" }} />
          </Link>
        </div>
      </header>

      <main style={{ ...containerStyle, paddingTop: "clamp(48px,7vw,80px)", paddingBottom: "clamp(64px,9vw,110px)" }}>
        <Link href="/" style={{ fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase", color: "#a09889" }}>
          ← Nazaj na domov stran
        </Link>

        <h1
          className="font-archivo"
          style={{ fontSize: "clamp(32px,4.4vw,48px)", fontWeight: 700, letterSpacing: "-.02em", margin: "18px 0 6px" }}
        >
          Politika zasebnosti
        </h1>
        <p style={{ fontSize: 14, color: "#a09889" }}>Zadnja posodobitev: september 2026</p>

        <Section title="1. Upravljavec osebnih podatkov">
          <p>
            Upravljavec osebnih podatkov, zbranih prek te spletne strani, je:
            <br />
            <strong>PG INŽENIRING d.o.o.</strong>
            <br />
            Kuzma 24, 9263 Kuzma, Slovenija
            <br />
            Matična številka: 2366380000
            <br />
            E-pošta: <a href="mailto:info@pg-inzeniring.si">info@pg-inzeniring.si</a>
            <br />
            Telefon: 070 799 810
          </p>
          <p>Za vsa vprašanja v zvezi z obdelavo osebnih podatkov nas lahko kontaktirate na zgornje kontaktne podatke.</p>
        </Section>

        <Section title="2. Katere podatke zbiramo in zakaj">
          <p>
            Prek kontaktnega obrazca na strani zbiramo podatke, ki nam jih posredujete sami: ime, e-poštni naslov
            in/ali telefonsko številko ter vsebino sporočila. Te podatke uporabimo izključno za to, da odgovorimo na
            vaše povpraševanje in po potrebi pripravimo ponudbo za projektiranje, gradnjo ali nadzor.
          </p>
          <p>
            Pravna podlaga za obdelavo je vaša privolitev, izražena z oddajo obrazca, oziroma izvajanje ukrepov na
            vašo zahtevo pred sklenitvijo pogodbe (člen 6(1)(a) in (b) Splošne uredbe o varstvu podatkov – GDPR).
          </p>
        </Section>

        <Section title="3. Piškotki">
          <p>
            Spletna stran za svoje osnovno delovanje ne potrebuje piškotkov. Vašo odločitev glede soglasja (sprejem
            ali zavrnitev) shranimo lokalno v vašem brskalniku (localStorage), da vas ob naslednjem obisku ne
            sprašujemo znova.
          </p>
          <p>
            Z vašim soglasjem lahko uporabimo analitične piškotke (npr. Google Analytics ali podobno orodje) za
            spremljanje obiskanosti strani in izboljšanje uporabniške izkušnje. Ti piškotki se naložijo šele, ko
            kliknete &quot;Sprejmi&quot; v pasici s piškotki, in nikoli pred tem. Soglasje lahko kadarkoli umaknete
            prek povezave &quot;Nastavitve piškotkov&quot; v nogi strani.
          </p>
        </Section>

        <Section title="4. Hramba podatkov">
          <p>
            Podatke, posredovane prek kontaktnega obrazca, hranimo toliko časa, kolikor je potrebno za obravnavo
            vašega povpraševanja in morebitno sklenitev ter izvedbo pogodbe, oziroma do vašega izrecnega preklica,
            razen če nam zakon nalaga daljšo hrambo (npr. računovodska in davčna zakonodaja za sklenjene posle).
          </p>
        </Section>

        <Section title="5. Prejemniki podatkov">
          <p>
            Osebnih podatkov ne prodajamo ali posredujemo tretjim osebam za njihove trženjske namene. Podatke lahko
            obdelujejo naši pogodbeni obdelovalci, ki nam zagotavljajo storitve gostovanja spletne strani in
            pošiljanja e-pošte, in sicer izključno v obsegu, potrebnem za opravljanje teh storitev, ter v skladu z
            GDPR.
          </p>
        </Section>

        <Section title="6. Vaše pravice">
          <p>V zvezi z vašimi osebnimi podatki imate pravico do:</p>
          <ul style={{ margin: "10px 0", paddingLeft: 20 }}>
            <li>dostopa do podatkov, ki jih obdelujemo,</li>
            <li>popravka netočnih podatkov,</li>
            <li>izbrisa podatkov (&quot;pravica do pozabe&quot;),</li>
            <li>omejitve obdelave,</li>
            <li>ugovora obdelavi,</li>
            <li>prenosljivosti podatkov.</li>
          </ul>
          <p>
            Zahtevo lahko kadarkoli naslovite na <a href="mailto:info@pg-inzeniring.si">info@pg-inzeniring.si</a>.
            Če menite, da obdelava vaših podatkov krši GDPR, imate pravico vložiti pritožbo pri Informacijskem
            pooblaščencu Republike Slovenije (www.ip-rs.si).
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
