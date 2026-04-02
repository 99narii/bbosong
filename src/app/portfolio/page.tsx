"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase, Portfolio } from "@/lib/supabase";

const categories = ["전체", "입주청소", "상가청소", "가정청소", "새집증후군"];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching portfolios:", error);
      } else {
        setPortfolios(data || []);
      }
      setLoading(false);
    };

    fetchPortfolios();
  }, []);

  const filteredPortfolios = activeCategory === "전체"
    ? portfolios
    : portfolios.filter(item => item.category === activeCategory);

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              전후 사진
            </h1>
            <p className="text-gray-600 text-lg">
              뽀송의 청소 전/후 사진을 확인해보세요.
            </p>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-200"
                      : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-500"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500">로딩 중...</p>
              </div>
            ) : !supabase ? (
              <div className="text-center py-16">
                <p className="text-gray-500">Supabase 설정이 필요합니다.</p>
              </div>
            ) : filteredPortfolios.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500">등록된 사진이 없습니다.</p>
              </div>
            ) : (
              /* Portfolio Grid - 2 columns */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPortfolios.map((item) => (
                  <Link
                    key={item.id}
                    href={`/portfolio/${item.id}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer block"
                  >
                    {/* Before/After Images */}
                    <div className="grid grid-cols-2">
                      {/* Before */}
                      <div className="relative h-48">
                        <img
                          src={item.thumbnail_before}
                          alt={`${item.title} - Before`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-1 bg-gray-800/70 text-white text-xs font-medium rounded">
                          Before
                        </div>
                      </div>
                      {/* After */}
                      <div className="relative h-48">
                        <img
                          src={item.thumbnail_after}
                          alt={`${item.title} - After`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-1 bg-teal-500 text-white text-xs font-medium rounded">
                          After
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg text-gray-900">
                          {item.title}
                        </h3>
                        <span className="px-2 py-1 bg-teal-50 text-teal-600 text-xs font-medium rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.location}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="text-center mt-16">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-600 transition-all hover:shadow-lg hover:shadow-teal-200"
              >
                무료 견적 받기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
