import React from 'react'
import Link from 'next/link'

const footerLinks = [
    {
        title: 'Product',
        links: [
            { label: 'Content Editor', href: '#' },
            { label: 'Topical Map', href: '#' },
            { label: 'Content Audit', href: '#' },
            { label: 'Surfer AI', href: '#' },
            { label: 'Free Tools', href: '#' },
        ],
    },
    {
        title: 'Solutions',
        links: [
            { label: 'For Agencies', href: '#' },
            { label: 'For Teams', href: '#' },
            { label: 'For Freelancers', href: '#' },
            { label: 'For Ecommerce', href: '#' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Blog', href: '#' },
            { label: 'YouTube', href: '#' },
            { label: 'Academy', href: '#' },
            { label: 'Knowledge base', href: '#' },
            { label: 'Community', href: '#' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About', href: '#' },
            { label: 'Career', href: '#' },
            { label: 'Contact', href: '#' },
            { label: 'Brand Story', href: '#' },
        ],
    },
]

const socialLinks = [
    {
        label: 'Facebook',
        href: '#',
        icon: (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-gray-400 hover:text-white transition"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
        ),
    },
    {
        label: 'Twitter',
        href: '#',
        icon: (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-gray-400 hover:text-white transition"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.633A9.936 9.936 0 0 0 24 4.557z" /></svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: '#',
        icon: (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-gray-400 hover:text-white transition"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" /></svg>
        ),
    },
    {
        label: 'YouTube',
        href: '#',
        icon: (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-gray-400 hover:text-white transition"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
        ),
    },
]

const SiteFooter = () => {
    return (
        <footer className="bg-neutral-900 text-gray-300 pt-12 pb-6 px-4 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
                {/* Logo & Description */}
                <div className="flex-1 min-w-[220px] mb-8 md:mb-0">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <img src="https://cdn3.f-cdn.com/ppic/279584025/logo/64322384/6DnhN/CROPPED_profile_logo_BVIBF_cdb6bf6b5394111532ce98423ccabf7b.jpg?image-optimizer=force&format=webply&width=336" alt="Logo" width={40} height={40} className="rounded" />
                        <span className="font-bold text-xl text-white">SEO CMS</span>
                    </Link>
                    <p className="text-sm text-gray-400 max-w-xs">Boost visibility in Google, ChatGPT, and beyond. Simple workflow. Maximum visibility in Google and AI Chats.</p>
                    <div className="flex gap-3 mt-4">
                        {socialLinks.map((item) => (
                            <Link key={item.label} href={item.href} aria-label={item.label} target="_blank" rel="noopener noreferrer">
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                </div>
                {/* Footer Links */}
                <div className="flex-[2] grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {footerLinks.map((col) => (
                        <div key={col.title}>
                            <h4 className="text-white font-semibold mb-3 text-base">{col.title}</h4>
                            <ul className="space-y-2">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="hover:text-white transition text-sm">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-10 border-t border-neutral-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                <div>© {new Date().getFullYear()} SEO CMS. All rights reserved.</div>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-white">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white">Terms of Service</Link>
                </div>
            </div>
        </footer>
    )
}

export default SiteFooter