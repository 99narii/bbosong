import siteData from "@/data/site.json";

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "신뢰와 안전",
    description: "신원 확인된 전문 인력만 파견하며, 보험 가입으로 안전하게 서비스합니다.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "친환경 세제",
    description: "아이와 반려동물에게도 안전한 친환경 세제만 사용합니다.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "신속한 서비스",
    description: "예약 후 48시간 이내 서비스 제공, 긴급 청소도 가능합니다.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "전문 인력",
    description: "체계적인 교육을 이수한 청소 전문가가 서비스합니다.",
  },
];

export default function About() {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - siteData.company.established;

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
              {yearsInBusiness}년 이상의 경험,
              <br />
              <span className="text-teal-500">{siteData.company.name}</span>이 함께합니다
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {siteData.company.established}년 설립 이후, 저희 {siteData.company.name}은 고객님의 소중한 공간을
              깨끗하게 관리하는 일에 전념해 왔습니다.
              5,000명 이상의 고객님께서 저희 서비스에 만족하셨으며,
              높은 재이용률이 저희의 자부심입니다.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              단순히 청소하는 것이 아닌, 고객님의 건강하고 쾌적한 생활 환경을
              만들어 드리는 것이 저희의 목표입니다. 친환경 세제 사용,
              체계적인 청소 프로세스, 그리고 철저한 사후 관리로
              최상의 서비스를 약속드립니다.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {siteData.aboutStats.map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-teal-500">{stat.number}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-500">
                  {value.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
