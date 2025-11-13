"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t, language } = useLanguage();

  const footerSections = {
    [t("footer.customers")]: [
      { name: t("footer.findServices"), href: "/find-services" },
      {
        name: language === "ne" ? "श्रेणीहरू" : "Categories",
        href: "/categories",
      },
      { name: t("footer.howItWorks"), href: "/how-it-works" },
      { name: t("footer.safety"), href: "/safety" },
      { name: t("footer.customerSupport"), href: "/support" },
    ],
    [t("footer.providers")]: [
      { name: t("footer.becomeProvider"), href: "/become-provider" },
      {
        name: t("footer.browseRequests"),
        href: "/browse-requests",
      },
      { name: t("footer.providerResources"), href: "/provider/resources" },
      { name: t("footer.earnings"), href: "/provider/earnings" },
      { name: t("footer.providerSupport"), href: "/provider/support" },
    ],
    [t("footer.company")]: [
      { name: t("footer.about"), href: "/about" },
      { name: t("footer.careers"), href: "/careers" },
      { name: t("footer.press"), href: "/press" },
      { name: t("footer.blog"), href: "/blog" },
    ],
    [t("footer.support")]: [
      { name: t("footer.helpCenter"), href: "/help" },
      { name: t("footer.contact"), href: "/contact" },
      { name: t("footer.terms"), href: "/terms" },
      { name: t("footer.privacy"), href: "/privacy" },
    ],
  };

  const brandName = language === "ne" ? "सेवा खोज" : "ServiceConnect";

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4 hover:opacity-80 transition-opacity">
              <span className="text-3xl mr-2">🇳🇵</span>
              <h3 className="text-xl font-bold text-white">{brandName}</h3>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              {t("footer.description")}
            </p>

            {/* Quick Actions */}
            <div className="space-y-2 mb-4">
              <Link
                href="/find-services"
                className="block text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                🔍 {language === "ne" ? "सेवा खोज्नुहोस्" : "Find Services"}
              </Link>
              <Link
                href="/post-request"
                className="block text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                📝{" "}
                {language === "ne" ? "अनुरोध पोस्ट गर्नुहोस्" : "Post Request"}
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.648 0 12.017 0zM8.449 16.893c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bold text-white mb-4 text-lg">{section}</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-white hover:translate-x-1 transition-all duration-200 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-medium">{t("footer.copyright")}</p>

            {/* Quick Links */}
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm font-medium transition-all duration-200 hover:translate-x-1"
              >
                {language === "ne" ? "सेवाका सर्तहरू" : "Terms"}
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm font-medium transition-all duration-200 hover:translate-x-1"
              >
                {language === "ne" ? "गोपनीयता" : "Privacy"}
              </Link>
              <Link
                href="/support"
                className="text-gray-400 hover:text-white text-sm font-medium transition-all duration-200 hover:translate-x-1"
              >
                {language === "ne" ? "सहयोग" : "Support"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
