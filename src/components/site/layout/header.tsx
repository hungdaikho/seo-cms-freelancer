"use client"
import React, { useState } from 'react'
import Link from 'next/link'
const NAV_ITEMS = [
  { label: 'Product', href: '#' },
  { label: 'Solutions', href: '#' },
  { label: 'Resources', href: '#' },
  { label: 'Company', href: '#' },
  { label: 'Enterprise', href: '#' },
  { label: 'Pricing', href: '#' },
]

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full bg-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="https://cdn3.f-cdn.com/ppic/279584025/logo/64322384/6DnhN/CROPPED_profile_logo_BVIBF_cdb6bf6b5394111532ce98423ccabf7b.jpg?image-optimizer=force&format=webply&width=336" alt="SurferSEO Logo" width={40} height={40}  />
          <span className="font-bold text-xl text-white hidden sm:inline">SEO CMS</span>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-800 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Actions */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-4">
          <Link href="#" className="text-white font-medium px-3 py-2 rounded-md hover:bg-gray-800 transition">Login</Link>
          <Link href="#" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-5 py-2 rounded-full shadow hover:from-yellow-500 hover:to-orange-600 transition">Get Started</Link>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-black shadow-md absolute top-20 left-0 w-full z-40 animate-fade-in">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800 transition"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="#" className="text-white font-medium px-3 py-2 rounded-md hover:bg-gray-800 transition" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link href="#" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-5 py-2 rounded-full shadow hover:from-yellow-500 hover:to-orange-600 transition mt-2 text-center" onClick={() => setMenuOpen(false)}>Get Started</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default SiteHeader