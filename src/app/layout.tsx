import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Eleanor & Alexander — Wedding Celebration",
  description: "Join us in celebrating the wedding of Eleanor Vance & Alexander Wright on September 20, 2026 at Villa Bella Vista, Florence.",
  openGraph: {
    title: "Eleanor & Alexander — Wedding Invitation",
    description: "Join us in celebrating our wedding on September 20, 2026.",
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
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth h-full antialiased`}
    >
      <body className="font-sans bg-[#FAF8F5] text-[#1A1A1A] min-h-full flex flex-col selection:bg-[#C5A059]/20 selection:text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
