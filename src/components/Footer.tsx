import siteData from "@/data/site.json";
import navData from "@/data/navigation.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{siteData.company.name[0]}</span>
              </div>
              <span className="text-xl font-bold text-white">{siteData.company.name}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {siteData.company.slogan}.
              <br />
              {siteData.company.name} 청소 전문업체가 함께합니다.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href={siteData.social.kakao} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500 transition-colors" aria-label="카카오톡">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3C6.477 3 2 6.477 2 11c0 2.89 1.893 5.42 4.724 6.836l-.722 2.7c-.053.198.17.356.337.24l3.046-2.12c.858.124 1.74.188 2.615.188 5.523 0 10-3.477 10-8s-4.477-8-10-8z"/>
                </svg>
              </a>
              <a href={siteData.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500 transition-colors" aria-label="인스타그램">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-2">
              {navData.footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-teal-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">회사</h4>
            <ul className="space-y-2">
              {navData.footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-teal-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">고객지원</h4>
            <ul className="space-y-2">
              {navData.footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-teal-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              <p>{siteData.company.name} 청소 전문업체 | 대표: {siteData.company.ceo} | 사업자등록번호: {siteData.company.businessNumber}</p>
              <p className="mt-1">{siteData.contact.address} | 고객센터: {siteData.contact.phone}</p>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {currentYear} {siteData.company.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
