import { Metadata } from "next";

export const metadata: Metadata = {
  title: "전후 사진 | 청소 포트폴리오",
  description:
    "뽀송 청소 전문업체의 청소 전/후 사진을 확인하세요. 입주청소, 화장실청소, 주방청소, 상가청소, 새집증후군 케어 실제 작업 사례입니다.",
  keywords: [
    "청소 전후 사진",
    "입주청소 후기",
    "청소 포트폴리오",
    "고양시 청소 사례",
    "청소 작업 사진",
  ],
  openGraph: {
    title: "청소 전후 사진 | 뽀송 청소 전문업체",
    description:
      "입주청소, 화장실청소, 주방청소, 상가청소 실제 작업 전/후 사진을 확인하세요.",
    url: "https://bbosong.vercel.app/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
