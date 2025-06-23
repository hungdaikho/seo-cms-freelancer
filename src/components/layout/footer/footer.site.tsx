import React from 'react'

const FooterSite = () => {
  return (
    <footer className="bg-[#1a1a1a] text-neutral-100 pt-10 pb-4 px-4 text-base">
      <div className="max-w-[90rem] mx-auto">
        {/* Top: Contact, Address, CTA */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
          <button className="border border-neutral-700 rounded px-4 py-2 flex items-center gap-2 hover:bg-neutral-800">
            <span>📧</span> Contact us
          </button>
          <span className="text-neutral-400 text-sm text-center">USA, 800 Boylston Street, Suite 2475, Boston, MA 02199</span>
          <div className="flex flex-col items-center gap-2">
            <button className="bg-[#00b087] text-white font-bold px-6 py-2 rounded hover:bg-[#009e76] transition">Get started with Semrush!</button>
            <a href="#" className="text-neutral-400 text-sm underline hover:text-white">or see our plans & pricing</a>
          </div>
        </div>
        {/* Middle: Menu columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 border-b border-neutral-800 pb-8">
          {/* SEMRUSH */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">Semrush</div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Free Trial</a></li>
              <li><a href="#" className="hover:text-white transition">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition">Stats and Facts</a></li>
              <li><a href="#" className="hover:text-white transition">Insights</a></li>
              <li><a href="#" className="hover:text-white transition">News</a></li>
              <li><a href="#" className="hover:text-white transition">Affiliate Program</a></li>
            </ul>
          </div>
          {/* COMMUNITY & FREE TOOLS */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">Community</div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition">Semrush Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Webinars</a></li>
            </ul>
            <div className="font-bold text-lg mt-4 mb-2 uppercase">Free Tools</div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition">Top Websites</a></li>
              <li><a href="#" className="hover:text-white transition">SEO Tools</a></li>
              <li><a href="#" className="hover:text-white transition">SEOquake</a></li>
              <li><a href="#" className="hover:text-white transition">Sensor</a></li>
            </ul>
          </div>
          {/* MORE TOOLS */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">More Tools</div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition">Enterprise SEO</a></li>
              <li><a href="#" className="hover:text-white transition">Enterprise Crawler</a></li>
              <li><a href="#" className="hover:text-white transition">Insights24</a></li>
              <li><a href="#" className="hover:text-white transition">Mfour</a></li>
              <li><a href="#" className="hover:text-white transition">Prowly</a></li>
              <li><a href="#" className="hover:text-white transition">App Center</a></li>
              <li><a href="#" className="hover:text-white transition">Agency Partners</a></li>
              <li><a href="#" className="hover:text-white transition">SplitSignal</a></li>
            </ul>
          </div>
          {/* COMPANY */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">Company</div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Newsroom</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Partners</a></li>
              <li><a href="#" className="hover:text-white transition">Legal Info</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Settings</a></li>
              <li><a href="#" className="hover:text-white transition">Do not sell my personal info</a></li>
              <li><a href="#" className="hover:text-white transition">Security Info</a></li>
              <li><a href="#" className="hover:text-white transition">For Investors</a></li>
              <li><a href="#" className="hover:text-white transition">Semrush Select</a></li>
              <li><a href="#" className="hover:text-white transition">Global Issues Index</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
          {/* FOLLOW US & LANGUAGE */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">Follow Us</div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition">X (Twitter)</a></li>
              <li><a href="#" className="hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition">YouTube</a></li>
              <li><a href="#" className="hover:text-white transition">Pinterest</a></li>
            </ul>
            <div className="font-bold text-lg mt-4 mb-2 uppercase">Language</div>
            <div className="text-sm text-neutral-400">English ▼</div>
          </div>
          {/* HELP */}
          <div>
            <div className="font-bold text-lg mb-2 uppercase">Help</div>
            <ul className="space-y-1 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition">Knowledge Base</a></li>
              <li><a href="#" className="hover:text-white transition">Academy</a></li>
              <li><a href="#" className="hover:text-white transition">Semrush API</a></li>
            </ul>
          </div>
        </div>
        {/* Bottom: Logo & copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="SEMRUSH Logo" className="h-6" />
            <span className="font-bold text-lg">SEMRUSH</span>
          </div>
          <div className="text-sm text-neutral-500">© 2008 - 2025 Semrush. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSite