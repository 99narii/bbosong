"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase, Portfolio } from "@/lib/supabase";

export default function PortfolioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!supabase || !params.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Error fetching portfolio:", error);
      } else {
        setPortfolio(data);
      }
      setLoading(false);
    };

    fetchPortfolio();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <div className="inline-block w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">로딩 중...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!portfolio) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <p className="text-gray-500 mb-4">포트폴리오를 찾을 수 없습니다.</p>
            <Link
              href="/portfolio"
              className="text-teal-500 hover:text-teal-600 font-medium"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-teal-500 mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              목록으로
            </button>

            {/* Title */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {portfolio.title}
              </h1>
              <span className="px-3 py-1 bg-teal-500 text-white text-sm font-medium rounded-full whitespace-nowrap">
                {portfolio.category}
              </span>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {portfolio.location}
              </div>
              {portfolio.cleaning_scope && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  청소 범위: {portfolio.cleaning_scope}
                </div>
              )}
            </div>

            {/* Description */}
            {portfolio.description && (
              <p className="mt-4 text-gray-600 text-lg">{portfolio.description}</p>
            )}

            {/* 대표 이미지 (썸네일) */}
            <div className="mt-8 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Before */}
                <div className="relative">
                  <img
                    src={portfolio.thumbnail_before}
                    alt="대표 Before"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-gray-800/80 text-white text-sm font-medium rounded-lg">
                    Before
                  </div>
                </div>
                {/* After */}
                <div className="relative">
                  <img
                    src={portfolio.thumbnail_after}
                    alt="대표 After"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-teal-500 text-white text-sm font-medium rounded-lg">
                    After
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 상세 이미지 Section */}
        {portfolio.images && portfolio.images.length > 0 && (
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                상세 사진
              </h2>

              <div className="space-y-8">
                {portfolio.images.slice(0, 6).map((image, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    {/* Before/After Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {/* Before */}
                      <div className="relative">
                        <img
                          src={image.before_image}
                          alt={`Before ${index + 1}`}
                          className="w-full h-64 sm:h-80 object-cover"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1.5 bg-gray-800/80 text-white text-sm font-medium rounded-lg">
                          Before
                        </div>
                      </div>
                      {/* After */}
                      <div className="relative">
                        <img
                          src={image.after_image}
                          alt={`After ${index + 1}`}
                          className="w-full h-64 sm:h-80 object-cover"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1.5 bg-teal-500 text-white text-sm font-medium rounded-lg">
                          After
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {image.description && (
                      <div className="p-5 border-t border-gray-100">
                        <p className="text-gray-700">{image.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600 mb-6">
              이런 깔끔한 청소, 우리 집도 받아보고 싶다면?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-600 transition-all hover:shadow-lg hover:shadow-teal-200"
            >
              무료 견적 받기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
