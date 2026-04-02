"use client";

import { useState } from "react";
import siteData from "@/data/site.json";
import navData from "@/data/navigation.json";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">{siteData.company.name[0]}</span>
            </div>
            <span className="text-xl font-bold text-gray-900">{siteData.company.name}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navData.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-teal-500 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`tel:${siteData.contact.phone}`}
              className="bg-teal-500 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-600 transition-colors"
            >
              전화 상담
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {navData.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 text-gray-600 hover:text-teal-500 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`tel:${siteData.contact.phone}`}
              className="block mt-4 bg-teal-500 text-white px-6 py-3 rounded-full font-medium text-center hover:bg-teal-600 transition-colors"
            >
              전화 상담
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
