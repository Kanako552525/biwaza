import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ビワザ — みんなの美容ワザ共有サイト",
  description:
    "美容テクニック・セルフケアのワザをみんなで共有するコミュニティ。スキンケア、ヘアケア、ダイエットなど、試してよかった美容ワザを投稿・評価できます。",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] font-[var(--font-geist-sans)] text-[#3D3D3D]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
