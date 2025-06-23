"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const menu = [
  { name: 'Features', href: '#' },
  { name: 'Pricing', href: '#' },
  {
    name: 'Resources',
    dropdown: [
      { title: 'Blog', desc: "Read the industry's latest thoughts on digital marketing, content strategy, SEO, PPC, social media and more." },
      { title: "What's New", desc: 'Keep track of the newest Semrush features and improvements.' },
      { title: 'Insights', desc: 'See the latest in original research and thought leadership from the Semrush team.' },
      { title: 'Academy', desc: 'Get vital SEO skills, learn how to use our toolkits and get official certificates of your proficiency in SEO and Semrush.' },
      { title: 'Content Marketing Hub', desc: 'Learn everything you need to know about effective content marketing in one place.' },
      { title: 'Help Center', desc: "Learn how to use Semrush with user manuals, how-to's, videos and more!" },
      { title: 'Webinars', desc: 'Register and take part in educational webinars conducted by the best digital marketing experts.' },
      { title: 'Hire a Trusted Agency', desc: 'Pressed for time? Need rare skills? Get help from a trusted agency.' },
      { title: 'Top Websites', desc: 'Discover the most visited websites. Analyze their traffic and search rankings.' },
      { title: 'Local Marketing Hub', desc: 'Start outperforming your nearby competition today!' },
    ],
  },
  {
    name: 'Company',
    dropdown: [
      { title: 'About Us' },
      { title: 'Newsroom' },
      { title: 'Careers' },
      { title: 'Free Trial' },
      { title: 'Success Stories' },
      { title: 'Affiliate Program' },
      { title: 'For Investors' },
      { title: 'Partner Integrations' },
      { title: 'Contacts' },
      { title: 'Stats and Facts' },
    ],
  },
  { name: 'App Center', href: '#' },
  { name: 'Enterprise', href: '#' },
];

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'bn', label: 'Bengali', short: 'BN' },
];

const HeaderSite = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [langDropdown, setLangDropdown] = useState(false);
  const { i18n, t } = useTranslation();
  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const handleChangeLang = (code: string) => {
    i18n.changeLanguage(code);
    setLangDropdown(false);
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow">
      <nav className="max-w-[90rem] w-full mx-auto flex items-center justify-between px-6 xl:px-12 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 py-2">
          <img src="https://cdn3.f-cdn.com/ppic/279584025/logo/64322384/6DnhN/CROPPED_profile_logo_BVIBF_cdb6bf6b5394111532ce98423ccabf7b.jpg?image-optimizer=force&format=webply&width=336" alt="Logo" style={{height: '60px'}}/>
        </a>
        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-8 text-base font-semibold h-full">
          {menu.map((item) => (
            <li key={item.name} className="relative h-full">
              {item.dropdown ? (
                <div
                  className="h-full flex items-center cursor-pointer px-4 py-4 hover:bg-neutral-900 rounded transition group"
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <span>{item.name}</span>
                  <svg className="ml-1 w-3 h-3 inline-block" fill="currentColor" viewBox="0 0 20 20"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"/></svg>
                  {/* Dropdown */}
                  {openDropdown === item.name && (
                    <div className="absolute left-0 top-full mt-2 w-[480px] bg-neutral-900 text-white rounded shadow-lg p-6 grid grid-cols-2 gap-4 z-50 animate-fade-in">
                      {item.dropdown.map((d, idx) => (
                        <div key={d.title + idx} className="mb-2">
                          <div className="font-bold text-base mb-1">{d.title}</div>
                          {'desc' in d && typeof d.desc === 'string' && <div className="text-xs text-neutral-300 leading-snug">{d.desc}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a href={item.href} className="px-4 py-4 hover:bg-neutral-900 rounded transition block">
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>
        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {/* Language */}
          <div className="relative">
            <button
              className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded hover:bg-neutral-900 transition text-base"
              onClick={() => setLangDropdown(v => !v)}
            >
              <Image src="/globe.svg" alt="Language" width={18} height={18} />
              <span className="text-xs">{currentLang.short}</span>
              <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"/></svg>
            </button>
            {langDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-neutral-900 rounded shadow-lg z-50">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    className={`cursor-pointer w-full text-left px-4 py-2 hover:bg-neutral-800 ${l.code === i18n.language ? 'font-bold text-green-400' : ''}`}
                    onClick={() => handleChangeLang(l.code)}
                  >
                    {l.label} ({l.short})
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Log In & Sign Up */}
          <a href="#" className="px-5 py-2 rounded border border-neutral-700 hover:bg-neutral-900 transition text-sm">{t('login')}</a>
          <a href="#" className="px-5 py-2 rounded bg-green-500 hover:bg-green-600 text-black font-semibold transition text-sm">{t('signup')}</a>
        </div>
        {/* Hamburger for mobile */}
        <button className="lg:hidden flex items-center p-2" onClick={() => setMobileMenu(!mobileMenu)}>
          <span className="sr-only">Open menu</span>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </nav>
      {/* Mobile menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-black text-white px-4 pb-4 animate-fade-in">
          <ul className="flex flex-col gap-1">
            {menu.map((item) => (
              <li key={item.name} className="relative">
                {item.dropdown ? (
                  <details className="group">
                    <summary className="flex items-center justify-between px-2 py-3 cursor-pointer hover:bg-neutral-900 rounded">
                      <span>{item.name}</span>
                      <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"/></svg>
                    </summary>
                    <div className="pl-4 py-2">
                      {item.dropdown.map((d, idx) => (
                        <div key={d.title + idx} className="mb-2">
                          <div className="font-bold text-base mb-1">{d.title}</div>
                          {'desc' in d && typeof d.desc === 'string' && <div className="text-xs text-neutral-300 leading-snug">{d.desc}</div>}
                        </div>
                      ))}
                    </div>
                  </details>
                ) : (
                  <a href={item.href} className="block px-2 py-3 hover:bg-neutral-900 rounded transition">
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 mt-4">
            <div className="relative">
              <button
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-neutral-900 transition"
                onClick={() => setLangDropdown(v => !v)}
              >
                <Image src="/globe.svg" alt="Language" width={18} height={18} />
                <span className="text-xs">{currentLang.short}</span>
                <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"/></svg>
              </button>
              {langDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-neutral-900 rounded shadow-lg z-50">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      className={`w-full text-left px-4 py-2 hover:bg-neutral-800 ${l.code === i18n.language ? 'font-bold text-green-400' : ''}`}
                      onClick={() => handleChangeLang(l.code)}
                    >
                      {l.label} ({l.short})
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="#" className="px-4 py-1 rounded border border-neutral-700 hover:bg-neutral-900 transition text-xs">{t('login')}</a>
            <a href="#" className="px-4 py-1 rounded bg-green-500 hover:bg-green-600 text-black font-semibold transition text-xs">{t('signup')}</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderSite;