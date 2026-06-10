import type { Metadata } from "next";
import { Oswald, Inter, Archivo } from "next/font/google";
import "./globals.css";

const display = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

// Heavy, extended grotesque for the case-study marketing surface, standing in
// for Ladder's headline face (EK Modena Extended Heavy). The phone prototype
// keeps Oswald/Inter; this only powers the case study.
const ek = Archivo({
  variable: "--font-ek",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "A Day with Ladder · Coach in your pocket",
  description:
    "A design-exercise concept for Ladder: an always-on assistant that carries your coach all day and bridges training and nutrition, so the relationship, not the software, is the interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${ek.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
