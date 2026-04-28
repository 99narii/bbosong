import { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의하기 | 무료 견적",
  description:
    "뽀송 청소 전문업체에 무료 견적을 문의하세요. 고양시, 파주시, 김포시 지역 입주청소, 화장실청소, 주방청소, 상가청소 서비스. 전화, 문자, 카카오톡으로 간편하게 문의 가능합니다.",
  keywords: [
    "청소 견적",
    "청소 문의",
    "고양시 청소 예약",
    "입주청소 견적",
    "청소 비용",
  ],
  openGraph: {
    title: "무료 견적 문의 | 뽀송 청소 전문업체",
    description:
      "고양시, 파주시, 김포시 청소 무료 견적. 전화, 문자, 카카오톡으로 간편하게 문의하세요.",
    url: "https://bbosong.vercel.app/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
