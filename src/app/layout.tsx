import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ADSENSE_CLIENT = "ca-pub-9173489799974007";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://biwaza.jp"),
  title: {
    default: "ビワザ — みんなの美容ワザ共有サイト",
    template: "%s | ビワザ",
  },
  description:
    "美容テクニック・セルフケアのワザをみんなで共有するコミュニティ。スキンケア、ヘアケア、ダイエットなど、試してよかった美容ワザを投稿・評価できます。",
  keywords: ["美容", "美容ワザ", "スキンケア", "ヘアケア", "ダイエット", "セルフケア", "美容テクニック"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "ビワザ",
    locale: "ja_JP",
    url: "https://biwaza.jp",
    title: "ビワザ — みんなの美容ワザ共有サイト",
    description:
      "試してよかった美容テクニックをみんなで共有。スキンケア・ヘアケア・ダイエット・メイクなど、みんなの「ワザ」が集まるコミュニティ。",
  },
  twitter: {
    card: "summary_large_image",
    title: "ビワザ — みんなの美容ワザ共有サイト",
    description:
      "試してよかった美容テクニックをみんなで共有。スキンケア・ヘアケア・ダイエット・メイクなど。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] font-[var(--font-geist-sans)] text-[#3D3D3D]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
