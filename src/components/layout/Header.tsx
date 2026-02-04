"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const firstFocusableRef = useRef<HTMLAnchorElement>(null);

    // Close menu when clicking outside
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

    // Handle Escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isMenuOpen) {
                setIsMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        if (isMenuOpen) {
            document.addEventListener("keydown", handleEscape);
            // Focus first element when menu opens
            firstFocusableRef.current?.focus();
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isMenuOpen]);

    // Trap focus within menu
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

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/Logo Png Black@3x.png"
                            alt="My Akhirah Account"
                            width={48}
                            height={48}
                            className="h-10 w-auto md:h-12"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-gray-700 hover:text-akhirah-teal transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button - Desktop */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/donate" className="btn btn-primary text-sm">
                            Donate Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        ref={menuButtonRef}
                        type="button"
                        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        id="mobile-menu"
                        className="md:hidden py-4 border-t border-gray-100"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation"
                        onKeyDown={handleTabKey}
                    >
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    ref={index === 0 ? firstFocusableRef : undefined}
                                    className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="px-4 pt-4 border-t border-gray-100 mt-2">
                                <Link
                                    href="/donate"
                                    className="btn btn-primary w-full text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Donate Now
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
