"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import siteData from "@/data/site.json";
import servicesData from "@/data/services.json";
import regionsData from "@/data/regions.json";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    service: "",
    region: "",
    date: "",
  });

  const handleSMS = () => {
    if (!formData.service || !formData.region || !formData.date) {
      alert("서비스, 지역, 희망 일정을 모두 선택해주세요.");
      return;
    }

    const selectedService = servicesData.services.find(s => s.id === formData.service);
    const serviceName = selectedService?.title || formData.service;

    const message = `[뽀송 문의]\n서비스: ${serviceName}\n지역: ${formData.region}\n희망일정: ${formData.date}`;
    const encodedMessage = encodeURIComponent(message);

    window.location.href = `sms:${siteData.contact.phone}?body=${encodedMessage}`;
  };

  const handleCall = () => {
    window.location.href = `tel:${siteData.contact.phone}`;
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "전화 문의",
      value: siteData.contact.phone,
      href: `tel:${siteData.contact.phone}`,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "이메일",
      value: siteData.contact.email,
      href: `mailto:${siteData.contact.email}`,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "주소",
      value: siteData.contact.address,
      href: "#",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "운영 시간",
      value: siteData.contact.hours,
      href: "#",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
              Contact
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2 mb-4">
              문의하기
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              서비스, 지역, 희망 일정을 선택하시면 문자 또는 전화로 간편하게 문의하실 수 있습니다.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">간편 문의</h2>
                <p className="text-gray-600 mb-8">
                  아래 정보를 선택 후 문자 또는 전화로 문의해주세요.
                </p>

                <div className="space-y-6">
                  {/* Service Select */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      원하시는 서비스 *
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    >
                      <option value="">서비스를 선택해주세요</option>
                      {servicesData.services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Region Select */}
                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                      지역 *
                    </label>
                    <select
                      id="region"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    >
                      <option value="">지역을 선택해주세요</option>
                      {regionsData.regions.map((region) => (
                        <optgroup key={region.area} label={region.area}>
                          {region.districts.map((district) => (
                            <option key={district} value={`${region.area} ${district}`}>
                              {district}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  {/* Date Select */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      희망 일정 *
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    />
                  </div>

                  {/* SMS Button */}
                  <button
                    type="button"
                    onClick={handleSMS}
                    className="w-full bg-teal-500 text-white py-4 rounded-lg font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    문자로 문의하기
                  </button>

                  {/* Call Button */}
                  <button
                    type="button"
                    onClick={handleCall}
                    className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    전화로 문의하기
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">연락처 정보</h2>

                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-teal-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{info.label}</div>
                      <div className="font-semibold text-gray-900">{info.value}</div>
                    </div>
                  </a>
                ))}

                {/* Service Area */}
                <div className="mt-8 p-6 bg-teal-50 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">서비스 가능 지역</h3>
                  <p className="text-teal-600 font-semibold mb-3">서울/경기 수도권 전역</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    {regionsData.regions.map((region) => (
                      <p key={region.area}>
                        <span className="font-medium text-teal-600">{region.area}:</span>{" "}
                        {region.districts.join(", ")}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
