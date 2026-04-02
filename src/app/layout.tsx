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
  title: "뽀송 | 청소 전문업체",
  description: "깨끗한 공간, 건강한 생활. 뽀송 청소 전문업체가 함께합니다. 가정, 사무실, 상업시설 전문 청소 서비스를 제공합니다.",
  keywords: ["청소", "전문업체", "가정청소", "사무실청소", "입주청소", "이사청소"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
