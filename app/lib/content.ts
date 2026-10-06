// Site copy and contact details. Numbering ("01", "02"…) and reveal delays are
// derived from list order, so reordering or adding items needs no other edits.

export const company = {
  name: "PG INŽENIRING d.o.o.",
  street: "Gornji Slaveči 97, 9263 Kuzma",
  region: "Prekmurje, Slovenija",
  phone: "070 799 810",
  phoneHref: "tel:070799810",
  email: "info@pg-inzeniring.si",
  emailHref: "mailto:info@pg-inzeniring.si",
};

export const navItems = [
  { id: "top", label: "Domov" },
  { id: "o-podjetju", label: "O podjetju" },
  { id: "storitve", label: "Storitve" },
  { id: "kontakt", label: "Kontakt" },
];

export const heroMarks = [
  { title: "Projektiranje", text: "Visoke in nizke gradnje" },
  { title: "Gradnja", text: "Novogradnje in obnove" },
  { title: "Nadzor", text: "Strokovni nadzor izvedbe" },
];

export const principles = [
  {
    title: "Osebni pristop",
    text: "Ena kontaktna oseba od prvega pogovora do predaje, brez vmesnih posrednikov.",
  },
  {
    title: "Jasen postopek",
    text: "Vsak korak projekta je pregleden, o poteku in dogovorjenih rokih pa vas sproti obveščamo.",
  },
  {
    title: "Doma v Prekmurju",
    text: "Poznamo lokalne razmere in upravne postopke, delujemo pa tudi po vsej Sloveniji.",
  },
];

export const services = [
  {
    title: "Projektiranje",
    tagline: "Dobre ideje ustvarijo trajno vrednost.",
    lead: "Projektiramo vse vrste objektov, od stanovanjskih hiš do zahtevnih visokih in nizkih gradenj.",
    body: [
      "Projektno dokumentacijo pripravljamo na podlagi lastnega znanja in izkušenj, vendar vedno z vami v središču. Vaše želje in vizijo prevedemo v premišljen in izvedljiv načrt.",
      "Tako bo vaša investicija tudi čez leta takšna, kot ste si jo zamislili.",
    ],
    items: ["Idejna zasnova in študije", "Projektna dokumentacija", "Svetovanje in optimizacija"],
    image: "/uploads/photo2.png",
    alt: "Delovna miza z arhitekturnimi načrti in skicami",
  },
  {
    title: "Gradnja",
    tagline: "Od načrta do realnosti.",
    lead: "Pri novogradnji, rekonstrukciji, obnovi ali adaptaciji vas razbremenimo skrbi, povezanih z izvedbo.",
    body: [
      "Če niste vešči gradbene stroke ali preprosto nimate časa za aktivno sodelovanje, lahko vse aktivnosti, povezane z izgradnjo objekta, prevzamemo mi.",
      "Vi spremljate napredek, mi poskrbimo za izvedbo.",
    ],
    items: ["Novogradnje", "Adaptacije in prenove", "Celovita izvedba"],
    image: "/uploads/photo3.png",
    alt: "Sodobna hiša v fazi gradnje ob sončnem zahodu",
  },
  {
    title: "Nadzor",
    tagline: "Kakovost v vsakem koraku.",
    lead: "S strokovnim nadzorom nad gradnjo poskrbimo, da vaša investicija doseže želeno kakovost.",
    body: [
      "Nadzornik vas kot investitorja spremlja skozi celotno gradnjo. S skrbnostjo dobrega gospodarja bdi nad dogovorjenim obsegom del vse do uspešnega zaključka.",
      "Cilj je preprost: objekt, s katerim ste v celoti zadovoljni.",
    ],
    items: ["Gradbeni nadzor", "Tehnično svetovanje", "Kontrola kakovosti in skladnosti"],
    image: "/uploads/hero1.jpeg",
    alt: "Dokončana sodobna vila s pogledom na pokrajino",
  },
];

export type Service = (typeof services)[number];

export const steps = [
  {
    title: "Posvet",
    text: "Povejte, kaj načrtujete. Pridemo na teren, pogledamo parcelo in se pogovorimo brez obveznosti.",
  },
  {
    title: "Načrt",
    text: "Pripravimo idejno zasnovo in dokumentacijo, ki upošteva vaše želje, proračun in predpise.",
  },
  {
    title: "Gradnja",
    text: "Organiziramo izvedbo, uskladimo izvajalce in vas razbremenimo vsakodnevnih skrbi.",
  },
  {
    title: "Predaja",
    text: "Nadzorujemo kvaliteto do konca in objekt predamo takšen, kot je bil dogovorjen.",
  },
];
