"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import NewsletterSubscribeForm from "@/components/forms/NewsletterSubscribeForm";

/** Aligned with `docs/team/tasks/navigation-map.md` */
const footerLinks = {
    discover: [
        { href: "/campaigns", label: "Campaigns" },
        { href: "/programmes", label: "Programmes" },
        { href: "/blog", label: "Blog" },
        { href: "/events", label: "Events" },
        { href: "/faq", label: "FAQ" },
    ],
    organisation: [
        { href: "/about", label: "About us" },
        { href: "/contact", label: "Contact" },
        { href: "/volunteer", label: "Volunteer" },
        { href: "/newsletter", label: "Newsletter" },
    ],
    involved: [{ href: "/donate", label: "Donate" }],
    legal: [
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
        { href: "/faq", label: "FAQ" },
    ],
} as const;

const transparencyTiles = [
    { href: "/privacy", label: "Governance" },
    { href: "/terms", label: "Annual reports" },
    { href: "/faq", label: "Safeguarding" },
] as const;

const socialLinks = [
    { href: "https://facebook.com", label: "Facebook", icon: "facebook" },
    { href: "https://twitter.com", label: "Twitter", icon: "twitter" },
    { href: "https://instagram.com", label: "Instagram", icon: "instagram" },
    { href: "https://youtube.com", label: "YouTube", icon: "youtube" },
];

const footerColumns: { title: string; links: readonly { href: string; label: string }[] }[] = [
    { title: "Discover", links: footerLinks.discover },
    { title: "Organisation", links: footerLinks.organisation },
    { title: "Get involved", links: footerLinks.involved },
    { title: "Legal", links: footerLinks.legal },
];

export default function Footer() {
    return (
        <footer className="bg-akhirah-teal-dark text-purity-white">
            <div id="site-newsletter" className="border-b border-white/10 scroll-mt-24">
                <div className="container-custom max-w-full py-10 sm:py-12 md:py-14">
                    <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16 items-start">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-eternal-gold mb-4">
                                Transparency & trust
                            </p>
                            <div className="grid grid-cols-2 gap-3 max-w-md sm:grid-cols-3">
                                {transparencyTiles.map((tile) => (
                                    <Link
                                        key={tile.href + tile.label}
                                        href={tile.href}
                                        className="aspect-[4/3] rounded-sm bg-white/5 border border-white/15 flex items-center justify-center text-center p-2 hover:bg-white/10 hover:border-eternal-gold/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eternal-gold"
                                    >
                                        <span className="text-[0.65rem] md:text-xs font-semibold text-white/80 leading-tight">
                                            {tile.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Newsletter</h3>
                            <p className="text-white/75 text-sm mb-5 max-w-md">
                                Occasional updates on impact, events, and ways to give with intention.
                            </p>
                            <NewsletterSubscribeForm source="footer" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-10 sm:py-12 md:py-14">
                <div className="container-custom max-w-full">
                    <div className="grid grid-cols-1 gap-10 mb-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 sm:mb-12 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))] lg:items-start lg:gap-8">
                        <div className="sm:col-span-2 lg:col-span-1 lg:max-w-[16rem]">
                            <Link href="/" className="inline-block mb-4">
                                <Image
                                    src="/Logo Png White@3x.png"
                                    alt="My Akhirah Account"
                                    width={72}
                                    height={72}
                                    className="h-14 w-auto"
                                    unoptimized
                                />
                            </Link>
                            <p className="text-white/65 text-sm mb-5 leading-relaxed">
                                Charitable giving, community, and growth rooted in faith.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.icon}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-11 w-11 rounded-sm bg-white/10 flex items-center justify-center hover:bg-eternal-gold hover:text-account-black transition-colors"
                                        aria-label={`${social.label} (opens in new tab)`}
                                    >
                                        <SocialIcon icon={social.icon} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {footerColumns.map((column) => (
                            <div key={column.title}>
                                <h4 className="font-bold mb-4 text-sm uppercase tracking-wide text-eternal-gold/95">
                                    {column.title}
                                </h4>
                                <ul className="space-y-1.5">
                                    {column.links.map((link) => (
                                        <li key={`${column.title}-${link.href}-${link.label}`}>
                                            <Link
                                                href={link.href}
                                                className="flex min-h-11 items-center text-white/70 hover:text-white text-sm transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-white/15 text-center text-xs md:text-sm text-white/50">
                        <p>&copy; {new Date().getFullYear()} My Akhirah Account. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }: { icon: string }) {
    const icons: Record<string, ReactNode> = {
        facebook: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
        ),
        twitter: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        instagram: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </svg>
        ),
        youtube: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    };

    return icons[icon] || null;
}
