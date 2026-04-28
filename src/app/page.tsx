import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";

// JSON-LD 구조화 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // LocalBusiness 스키마 (지역 비즈니스 정보)
    {
      "@type": "LocalBusiness",
      "@id": "https://bbosong.vercel.app/#business",
      name: "뽀송 청소 전문업체",
      alternateName: "뽀송",
      description:
        "고양시, 파주시, 김포시 청소 전문업체. 입주청소, 화장실청소, 주방청소, 상가청소, 새집증후군 케어 서비스를 제공합니다.",
      url: "https://bbosong.vercel.app",
      telephone: "010-2488-1056",
      email: "clean.bbosong@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "성사동",
        addressLocality: "고양시 덕양구",
        addressRegion: "경기도",
        postalCode: "10584",
        addressCountry: "KR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 37.6584,
        longitude: 126.832,
      },
      areaServed: [
        {
          "@type": "City",
          name: "고양시",
          containedInPlace: { "@type": "State", name: "경기도" },
        },
        {
          "@type": "City",
          name: "파주시",
          containedInPlace: { "@type": "State", name: "경기도" },
        },
        {
          "@type": "City",
          name: "김포시",
          containedInPlace: { "@type": "State", name: "경기도" },
        },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
      priceRange: "₩₩",
      image: "https://bbosong.vercel.app/og-image.png",
      sameAs: [
        "https://www.instagram.com/clean_bbosong/",
        "https://open.kakao.com/me/bbosongclean",
      ],
    },
    // Service 스키마 (서비스 목록)
    {
      "@type": "Service",
      "@id": "https://bbosong.vercel.app/#service-move-in",
      name: "입주청소",
      description:
        "새 집으로 이사하기 전 깨끗하게 청소해 드립니다. 신축 아파트, 빌라, 오피스텔 입주 전 전체 청소 서비스.",
      provider: { "@id": "https://bbosong.vercel.app/#business" },
      areaServed: ["고양시", "파주시", "김포시"],
      serviceType: "입주청소",
    },
    {
      "@type": "Service",
      "@id": "https://bbosong.vercel.app/#service-bathroom",
      name: "화장실청소",
      description:
        "곰팡이, 물때, 석회질 제거. 화장실 전문 청소 서비스로 위생적인 공간을 만들어 드립니다.",
      provider: { "@id": "https://bbosong.vercel.app/#business" },
      areaServed: ["고양시", "파주시", "김포시"],
      serviceType: "화장실청소",
    },
    {
      "@type": "Service",
      "@id": "https://bbosong.vercel.app/#service-kitchen",
      name: "주방청소",
      description:
        "기름때, 찌든때 완벽 제거. 가스레인지, 후드, 싱크대 등 주방 전체 청소 서비스.",
      provider: { "@id": "https://bbosong.vercel.app/#business" },
      areaServed: ["고양시", "파주시", "김포시"],
      serviceType: "주방청소",
    },
    {
      "@type": "Service",
      "@id": "https://bbosong.vercel.app/#service-commercial",
      name: "상가청소",
      description:
        "사무실, 상가, 매장 등 상업시설 전문 청소 서비스. 정기 청소 계약도 가능합니다.",
      provider: { "@id": "https://bbosong.vercel.app/#business" },
      areaServed: ["고양시", "파주시", "김포시"],
      serviceType: "상가청소",
    },
    {
      "@type": "Service",
      "@id": "https://bbosong.vercel.app/#service-sick-house",
      name: "새집증후군 케어",
      description:
        "포름알데히드, 휘발성 유기화합물 제거. 신축 건물의 새집증후군을 케어하여 건강한 공간을 만들어 드립니다.",
      provider: { "@id": "https://bbosong.vercel.app/#business" },
      areaServed: ["고양시", "파주시", "김포시"],
      serviceType: "새집증후군케어",
    },
    // FAQ 스키마 (자주 묻는 질문 - AEO 최적화)
    {
      "@type": "FAQPage",
      "@id": "https://bbosong.vercel.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "고양시에서 입주청소 비용은 얼마인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "입주청소 비용은 평수와 상태에 따라 다릅니다. 무료 견적을 통해 정확한 비용을 안내해 드립니다. 전화 010-2488-1056 또는 카카오톡으로 문의해 주세요.",
          },
        },
        {
          "@type": "Question",
          name: "청소 서비스 가능 지역은 어디인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "뽀송은 고양시(덕양구, 일산동구, 일산서구), 파주시, 김포시 지역에 청소 서비스를 제공하고 있습니다.",
          },
        },
        {
          "@type": "Question",
          name: "청소 예약은 어떻게 하나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "전화(010-2488-1056), 문자, 카카오톡으로 예약 가능합니다. 원하시는 서비스, 지역, 희망 일정을 알려주시면 빠르게 안내해 드립니다.",
          },
        },
        {
          "@type": "Question",
          name: "새집증후군 케어는 어떻게 진행되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "새집증후군 케어는 포름알데히드, 휘발성 유기화합물(VOC) 등 유해물질을 제거하는 서비스입니다. 전문 장비와 친환경 약품을 사용하여 안전하게 진행됩니다.",
          },
        },
        {
          "@type": "Question",
          name: "청소 시 사용하는 세제는 안전한가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "네, 뽀송은 100% 친환경 세제를 사용합니다. 아이와 반려동물이 있는 가정에서도 안심하고 이용하실 수 있습니다.",
          },
        },
      ],
    },
    // WebSite 스키마
    {
      "@type": "WebSite",
      "@id": "https://bbosong.vercel.app/#website",
      url: "https://bbosong.vercel.app",
      name: "뽀송 청소 전문업체",
      description: "고양시, 파주시, 김포시 청소 전문업체",
      publisher: { "@id": "https://bbosong.vercel.app/#business" },
      inLanguage: "ko-KR",
    },
  ],
};

export default function Home() {
  return (
    <>
      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
      </main>
      <Footer />
    </>
  );
}
