import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thasni & Midlaj — Wedding Celebration",
  description: "Join us in celebrating the wedding of Thasni & Midlaj on September 6, 2026 at Parkon Auditorium.",
  openGraph: {
    title: "Thasni & Midlaj — Wedding Invitation",
    description: "Join us in celebrating our wedding on September 6, 2026 at Parkon Auditorium.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable} scroll-smooth h-full antialiased`}
    >
      <body className="font-sans bg-[#080c17] text-[#E2E8F0] min-h-full flex flex-col selection:bg-amber-500/20 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
