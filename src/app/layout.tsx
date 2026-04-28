import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bbosong.vercel.app"),
  title: {
    default: "뽀송 | 고양시 청소 전문업체 - 입주청소, 화장실청소, 주방청소",
    template: "%s | 뽀송 청소 전문업체",
  },
  description:
    "고양시, 파주시, 김포시 청소 전문업체 뽀송입니다. 입주청소, 화장실청소, 주방청소, 상가청소, 새집증후군 케어까지. 풍부한 경력의 전문가가 깨끗하고 건강한 공간을 만들어 드립니다. 무료 견적 문의하세요.",
  keywords: [
    "청소 전문업체",
    "고양시 청소",
    "파주시 청소",
    "김포시 청소",
    "입주청소",
    "이사청소",
    "화장실청소",
    "주방청소",
    "상가청소",
    "사무실청소",
    "새집증후군",
    "경기도 청소업체",
    "일산 청소",
    "덕양구 청소",
  ],
  authors: [{ name: "뽀송" }],
  creator: "뽀송",
  publisher: "뽀송",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://bbosong.vercel.app",
    siteName: "뽀송 청소 전문업체",
    title: "뽀송 | 고양시 청소 전문업체 - 입주청소, 화장실청소, 주방청소",
    description:
      "고양시, 파주시, 김포시 청소 전문업체. 입주청소, 화장실청소, 주방청소, 상가청소, 새집증후군 케어. 풍부한 경력의 전문가의 깨끗한 청소 서비스.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "뽀송 청소 전문업체",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "뽀송 | 고양시 청소 전문업체",
    description:
      "고양시, 파주시, 김포시 청소 전문업체. 입주청소, 화장실청소, 주방청소, 상가청소, 새집증후군 케어.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // 나중에 Google Search Console, Naver Webmaster 등록 시 추가
    // google: "구글 인증 코드",
    // other: { "naver-site-verification": "네이버 인증 코드" },
  },
  alternates: {
    canonical: "https://bbosong.vercel.app",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="geo.region" content="KR-41" />
        <meta name="geo.placename" content="고양시, 경기도" />
        <meta name="geo.position" content="37.6584;126.8320" />
        <meta name="ICBM" content="37.6584, 126.8320" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
