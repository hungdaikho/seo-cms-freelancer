import React from "react";
import { useTranslation } from "react-i18next";

const FooterSite = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="relative pt-16 pb-6 px-4 text-base overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #13124D 0%, #004AAC 100%)",
        color: "#fff",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #FF914D 0%, transparent 70%)",
          filter: "blur(100px)",
          transform: "translate(50%, -50%)",
        }}
      />

      <div className="max-w-[90rem] mx-auto relative z-10">
        {/* Top: Contact, Address, CTA */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-12 gap-6">
          <button className="border-2 border-white/20 bg-white/5 backdrop-blur-sm rounded-lg px-6 py-3 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:bg-orange-400/10 hover:shadow-lg">
            <span>📧</span> {t("contact_us")}
          </button>

          <div className="flex flex-col items-center gap-3">
            <button className="font-bold px-8 py-3 rounded-lg bg-gradient-to-r from-orange-400 to-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-400/50 text-white">
              {t("get_start")}
            </button>
            <a
              href="#"
              className="text-sm text-white/70 hover:text-orange-400 transition-colors duration-300 hover:underline"
            >
              {t("see_plans")}
            </a>
          </div>
        </div>

        {/* Middle: Menu columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 pb-8 mb-8 border-b border-white/10">
          {/* Semrush */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4 uppercase bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {t("semrush")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  {t("pricing")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  {t("success_stories")}
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4 uppercase bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {t("community")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  {t("blog")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  {t("webinars")}
                </a>
              </li>
            </ul>
          </div>

          {/* Free Tools */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4 uppercase bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              {t("free_tools")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  {t("top_websites")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  SEO Analyzer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  Keyword Research
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4 uppercase bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              {t("company")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  {t("about_us")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  {t("privacy_policy")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  {t("cookie_settings")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  {t("security_info")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block hover:underline"
                >
                  {t("contact_us")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom: Logo & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
          <div className="flex items-center gap-3">
            <div className="font-bold text-2xl bg-gradient-to-r from-orange-400 to-blue-600 bg-clip-text text-transparent">
              ✨ SEO BOOST
            </div>
          </div>
          <div className="text-sm text-white/50">
            © 2008 - 2025 SEO Boost. {t("all_rights_reserved")}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSite;
