import siteData from "@/data/site.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bottom Bar */}
        <div>
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
