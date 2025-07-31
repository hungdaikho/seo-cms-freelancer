import React from "react";
import { useTranslation } from "react-i18next";

const FooterSite = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="relative pt-16 pb-6 px-4 text-base overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        color: "#fff",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #667eea 0%, transparent 70%)",
          filter: "blur(100px)",
          transform: "translate(50%, -50%)",
        }}
      />

      <div className="max-w-[90rem] mx-auto relative z-10">
        {/* Top: Contact, Address, CTA */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-12 gap-4">
          <button
            className="border-2 rounded-lg px-6 py-3 flex items-center gap-2 transition-all duration-300 hover:transform hover:-translate-y-1"
            style={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#f093fb";
              e.currentTarget.style.background = "rgba(240, 147, 251, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            }}
          >
            <span>📧</span> {t("contact_us")}
          </button>

          <div className="flex flex-col items-center gap-3">
            <button
              className="font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                boxShadow: "0 4px 15px rgba(250, 112, 154, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(250, 112, 154, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(250, 112, 154, 0.4)";
              }}
            >
              {t("get_start")}
            </button>
            <a
              href="#"
              className="text-sm transition-colors duration-300"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f093fb")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")
              }
            >
              {t("see_plans")}
            </a>
          </div>
        </div>

        {/* Middle: Menu columns */}
        <div
          className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-8 mb-8"
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          {/* Semrush */}
          <div>
            <div
              className="font-bold text-lg mb-4 uppercase"
              style={{
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("semrush")}
            </div>
            <ul className="space-y-2 text-sm">
              {/* <li>
                <a href="#">{t("features")}</a>
              </li> */}
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("pricing")}
                </a>
              </li>
              {/* <li>
                <a href="#">{t("free_trial")}</a>
              </li> */}
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("success_stories")}
                </a>
              </li>
              {/* <li>
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
              </li> */}
            </ul>
          </div>

          {/* Community & Free Tools */}
          <div>
            <div
              className="font-bold text-lg mb-4 uppercase"
              style={{
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("community")}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("blog")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("webinars")}
                </a>
              </li>
            </ul>
            <div
              className="font-bold text-lg mt-6 mb-4 uppercase"
              style={{
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("free_tools")}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("top_websites")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("seo_tools")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("seoquake")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("sensor")}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div
              className="font-bold text-lg mb-4 uppercase"
              style={{
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("company")}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("about_us")}
                </a>
              </li>
              {/* <li>
                <a href="#">{t("newsroom")}</a>
              </li> */}
              {/* <li>
                <a href="#">{t("careers")}</a>
              </li>
              <li>
                <a href="#">{t("partners")}</a>
              </li>
              <li>
                <a href="#">{t("legal_info")}</a>
              </li> */}
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("privacy_policy")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("cookie_settings")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("security_info")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("contact_us")}
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <div
              className="font-bold text-lg mb-4 uppercase"
              style={{
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("help")}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("knowledge_base")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("academy")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-300 hover:translate-x-1 inline-block"
                  style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#f093fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")
                  }
                >
                  {t("semrush_api")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Logo & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div
              className="font-bold text-2xl"
              style={{
                background: "linear-gradient(90deg, #f093fb, #f5576c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ✨ SEO BOOST
            </div>
          </div>
          <div
            className="text-sm"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            © 2008 - 2025 SEO Boost. {t("all_rights_reserved")}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSite;
