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
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth h-full antialiased`}
    >
      <body className="font-sans bg-[#0B0F17] text-[#E2E8F0] min-h-full flex flex-col items-center justify-center selection:bg-amber-500/20 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
