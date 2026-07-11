"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import TrackedLink from "./TrackedLink";
import logoWhite from "../public/logo-white.png";

const navLinks = [
    { label: "Features", href: "https://tryneegma.com/features" },
    { label: "Games", href: "https://tryneegma.com/games" },
    { label: "Use Cases", href: "https://tryneegma.com/use-cases" },
    { label: "Pricing", href: "https://tryneegma.com/pricing" },
    { label: "Contact Us", href: "https://tryneegma.com/contact" },
];

export default function Header() {
    const pathname = usePathname() || "/";
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-navy-900/10"
        >
            <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 group transition-opacity hover:opacity-90"
                >
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 bg-neegma-logo-gradient">
                        <Image src={logoWhite} alt="Neegma logo" width={26} height={26} />
                    </div>
                    <span className="font-fredoka font-semibold text-xl md:text-2xl text-navy-900">
                        Neegma
                        <span className="text-navy-900/40 font-normal ml-1.5 text-base md:text-lg">
                            / Blog
                        </span>
                    </span>
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden lg:flex items-center gap-7">
                    {navLinks.map((link) => (
                        <TrackedLink
                            key={link.label}
                            href={link.href}
                            ctaText={`Nav ${link.label} (header)`}
                            sourcePage={pathname}
                            className="font-fredoka font-medium text-sm text-navy-900/70 hover:text-coral-500 transition-colors"
                        >
                            {link.label}
                        </TrackedLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <TrackedLink
                        href="https://tryneegma.com"
                        ctaText="Visit Neegma (header)"
                        sourcePage={pathname}
                        className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 font-fredoka font-semibold text-white text-xs md:text-sm rounded-full transition-all hover:opacity-90 hover:scale-[1.03] bg-neegma-gradient shadow-sm"
                    >
                        Visit Neegma
                        <ArrowRightIcon size={12} weight="bold" />
                    </TrackedLink>

                    {/* Mobile menu toggle */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-navy-900/10 text-navy-900 transition-colors hover:bg-navy-900/5"
                    >
                        {menuOpen ? (
                            <XIcon size={20} weight="bold" />
                        ) : (
                            <ListIcon size={20} weight="bold" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile navigation */}
            {menuOpen && (
                <nav className="lg:hidden border-t border-navy-900/10 bg-white/95 backdrop-blur-md">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <TrackedLink
                                key={link.label}
                                href={link.href}
                                ctaText={`Nav ${link.label} (mobile header)`}
                                sourcePage={pathname}
                                onClick={() => setMenuOpen(false)}
                                className="font-fredoka font-medium text-base text-navy-900/80 hover:text-coral-500 transition-colors py-2.5"
                            >
                                {link.label}
                            </TrackedLink>
                        ))}
                    </div>
                </nav>
            )}
        </motion.header>
    );
}
