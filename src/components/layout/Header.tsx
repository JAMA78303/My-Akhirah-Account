"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/** Aligned with `docs/team/tasks/navigation-map.md` and Khalid shared route set */
const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/campaigns", label: "Campaigns" },
    { href: "/programmes", label: "Programmes" },
    { href: "/blog", label: "Blog" },
    { href: "/events", label: "Events" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/volunteer", label: "Volunteer" },
    { href: "/newsletter", label: "Newsletter" },
];

export interface HeaderProps {
    /** Semi-transparent nav over hero until user scrolls (homepage) */
    transparentAtTop?: boolean;
}

export default function Header({ transparentAtTop = false }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(() => !transparentAtTop);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const firstFocusableRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (!transparentAtTop) return;

        const onScroll = () => {
            setScrolled(window.scrollY > 16);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [transparentAtTop]);

    const overlayNav = transparentAtTop && !scrolled && !isMenuOpen;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isMenuOpen) {
                setIsMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        if (isMenuOpen) {
            document.addEventListener("keydown", handleEscape);
            firstFocusableRef.current?.focus();
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isMenuOpen]);

    const handleTabKey = useCallback((event: React.KeyboardEvent) => {
        if (!menuRef.current || event.key !== "Tab") return;

        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }, []);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const mainNavClass = overlayNav
        ? "bg-akhirah-teal/72 backdrop-blur-md border-b border-white/15 shadow-none"
        : "bg-akhirah-teal border-b border-white/10 shadow-md";

    const mobileMenuClass = overlayNav
        ? "bg-akhirah-teal/95 backdrop-blur-md border-white/15"
        : "bg-akhirah-teal border-white/15";

    return (
        <header
            className={`z-50 ${transparentAtTop ? "fixed top-0 left-0 right-0" : "sticky top-0"}`}
        >
            <div className={`text-purity-white transition-[background,box-shadow] duration-200 ${mainNavClass}`}>
                <div className="container-custom max-w-full">
                    <div className="flex min-w-0 items-stretch justify-between gap-2 min-h-[3.75rem] sm:min-h-[4rem] md:min-h-[4.25rem]">
                        <Link
                            href="/"
                            className="flex shrink-0 self-stretch items-center justify-center py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eternal-gold"
                            aria-label="My Akhirah Account home"
                        >
                            <Image
                                src="/Logo Png White@3x.png"
                                alt=""
                                width={40}
                                height={40}
                                className="h-8 w-auto shrink-0 sm:h-9 md:h-10"
                                priority
                            />
                        </Link>

                        <nav
                            className="hidden min-w-0 lg:flex lg:flex-wrap lg:justify-end items-center gap-x-2.5 gap-y-2 xl:gap-x-4 2xl:gap-x-5 px-1 xl:px-2 max-w-[52rem] 2xl:max-w-none"
                            aria-label="Main navigation"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="whitespace-nowrap text-[0.7rem] font-semibold text-white/95 sm:text-[0.75rem] xl:text-[0.8125rem] hover:text-eternal-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eternal-gold"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex shrink-0 items-center gap-1.5 pr-0 sm:pr-1">
                            <button
                                ref={menuButtonRef}
                                type="button"
                                className="lg:hidden min-h-11 min-w-11 p-2 rounded-sm text-white hover:bg-white/10"
                                onClick={handleMenuToggle}
                                aria-expanded={isMenuOpen}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                aria-controls="mobile-menu"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    {isMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div
                            ref={menuRef}
                            id="mobile-menu"
                            className={`lg:hidden py-4 border-t ${mobileMenuClass}`}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation"
                            onKeyDown={handleTabKey}
                        >
                            <nav className="flex flex-col gap-1">
                                {navLinks.map((link, index) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        ref={index === 0 ? firstFocusableRef : undefined}
                                        className="px-3 py-3 text-base font-semibold text-white/95 hover:bg-white/10 rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eternal-gold"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="pt-3 mt-2 border-t border-white/15">
                                    <Link
                                        href="/donate"
                                        className="btn btn-primary w-full text-center font-bold inline-flex items-center justify-center gap-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Donate
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2.5}
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
