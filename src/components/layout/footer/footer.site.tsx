import React from "react";
import { useTranslation } from "react-i18next";

const FooterSite = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#1a1a1a] text-neutral-100 pt-10 pb-4 px-4 text-base">
      <div className="max-w-[90rem] mx-auto">
        {/* Top: Contact, Address, CTA */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
          <button className="border border-neutral-700 rounded px-4 py-2 flex items-center gap-2 hover:bg-neutral-800">
            <span>📧</span> {t("contact_us")}
          </button>
          <span className="text-neutral-400 text-sm text-center">
            {t("address")}
          </span>
          <div className="flex flex-col items-center gap-2">
            <button className="bg-[#00b087] text-white font-bold px-6 py-2 rounded hover:bg-[#009e76] transition">
              {t("get_start")}
            </button>
            <a
              href="#"
              className="text-neutral-400 text-sm underline hover:text-white"
            >
              {t("see_plans")}
            </a>
          </div>
        </div>

        {/* Middle: Menu columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 border-b border-neutral-800 pb-8">
          {/* Semrush */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">
              {t("semrush")}
            </div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li>
                <a href="#">{t("features")}</a>
              </li>
              <li>
                <a href="#">{t("pricing")}</a>
              </li>
              <li>
                <a href="#">{t("free_trial")}</a>
              </li>
              <li>
                <a href="#">{t("success_stories")}</a>
              </li>
              <li>
                <a href="#">{t("stats_and_facts")}</a>
              </li>
              <li>
                <a href="#">{t("insights")}</a>
              </li>
              <li>
                <a href="#">{t("news")}</a>
              </li>
              <li>
                <a href="#">{t("affiliate_program")}</a>
              </li>
            </ul>
          </div>

          {/* Community & Free Tools */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">
              {t("community")}
            </div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li>
                <a href="#">{t("blog")}</a>
              </li>
              <li>
                <a href="#">{t("webinars")}</a>
              </li>
            </ul>
            <div className="font-bold text-lg mt-4 mb-2 uppercase">
              {t("free_tools")}
            </div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li>
                <a href="#">{t("top_websites")}</a>
              </li>
              <li>
                <a href="#">{t("seo_tools")}</a>
              </li>
              <li>
                <a href="#">{t("seoquake")}</a>
              </li>
              <li>
                <a href="#">{t("sensor")}</a>
              </li>
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">
              {t("more_tools")}
            </div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li>
                <a href="#">{t("enterprise_seo")}</a>
              </li>
              <li>
                <a href="#">{t("enterprise_crawler")}</a>
              </li>
              <li>
                <a href="#">{t("insights24")}</a>
              </li>
              <li>
                <a href="#">{t("mfour")}</a>
              </li>
              <li>
                <a href="#">{t("prowly")}</a>
              </li>
              <li>
                <a href="#">{t("app_center")}</a>
              </li>
              <li>
                <a href="#">{t("agency_partners")}</a>
              </li>
              <li>
                <a href="#">{t("splitsignal")}</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">
              {t("company")}
            </div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li>
                <a href="#">{t("about_us")}</a>
              </li>
              <li>
                <a href="#">{t("newsroom")}</a>
              </li>
              <li>
                <a href="#">{t("careers")}</a>
              </li>
              <li>
                <a href="#">{t("partners")}</a>
              </li>
              <li>
                <a href="#">{t("legal_info")}</a>
              </li>
              <li>
                <a href="#">{t("privacy_policy")}</a>
              </li>
              <li>
                <a href="#">{t("cookie_settings")}</a>
              </li>
              <li>
                <a href="#">{t("do_not_sell")}</a>
              </li>
              <li>
                <a href="#">{t("security_info")}</a>
              </li>
              <li>
                <a href="#">{t("investors")}</a>
              </li>
              <li>
                <a href="#">{t("semrush_select")}</a>
              </li>
              <li>
                <a href="#">{t("global_issues")}</a>
              </li>
              <li>
                <a href="#">{t("contact_us")}</a>
              </li>
            </ul>
          </div>

          {/* Follow Us & Language */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">
              {t("follow_us")}
            </div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li>
                <a href="#">X (Twitter)</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">YouTube</a>
              </li>
              <li>
                <a href="#">Pinterest</a>
              </li>
            </ul>
            <div className="font-bold text-lg mt-4 mb-2 uppercase">
              {t("language")}
            </div>
            <div className="text-sm text-neutral-400">English ▼</div>
          </div>

          {/* Help */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">{t("help")}</div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li>
                <a href="#">{t("knowledge_base")}</a>
              </li>
              <li>
                <a href="#">{t("academy")}</a>
              </li>
              <li>
                <a href="#">{t("semrush_api")}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Logo & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="SEMRUSH Logo" className="h-6" />
            <span className="font-bold text-lg">SEMRUSH</span>
          </div>
          <div className="text-sm text-neutral-500">
            © 2008 - 2025 Semrush. {t("all_rights_reserved")}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSite;
