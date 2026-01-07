import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const baskerville = Libre_Baskerville({
  weight: ["400", "700"],
  variable: "--font-baskerville",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amytis | Digital Garden",
  description: "A minimalist digital garden for growing thoughts and sharing knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${baskerville.variable} antialiased bg-[#fdfcfb] text-slate-900 font-sans min-h-screen`}
      >
        <div className="selection:bg-emerald-100 selection:text-emerald-900">
          {children}
        </div>
      </body>
    </html>
  );
}