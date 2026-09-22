import type { Metadata } from "next";
import { Archivo, Barlow, Barlow_Condensed, Bebas_Neue } from "next/font/google";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "PG INŽENIRING d.o.o. — Projektiranje, gradnja, nadzor",
  description:
    "Majhno inženirsko podjetje z osebnim pristopom. Od prve ideje in projektne dokumentacije do izvedbe in strokovnega nadzora nad gradnjo — vse na enem mestu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sl"
      className={`${archivo.variable} ${barlow.variable} ${barlowCondensed.variable} ${bebasNeue.variable}`}
    >
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
