import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { contact, site } from "@/content/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.acronym} — ${site.name}`,
    template: `%s | ${site.acronym}`,
  },
  description: site.description,
  applicationName: site.acronym,
  openGraph: {
    type: "website",
    locale: "fr_CD",
    siteName: `${site.acronym} — ${site.name}`,
    title: `${site.acronym} — ${site.name}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0f3d2e",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: `${site.acronym} — ${site.name}`,
  alternateName: site.acronym,
  url: site.url,
  description: site.description,
  areaServed: site.country,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    addressLocality: contact.address.city,
    addressCountry: "CD",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
        >
          Aller au contenu
        </a>
        <DemoBanner />
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
