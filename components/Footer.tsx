"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { InstagramLogo, LinkedinLogo, TiktokLogo } from "@phosphor-icons/react";

import logo from "../public/logo-white.png";

const socialLinks = [
    { icon: InstagramLogo, label: "Instagram", href: "https://www.instagram.com/tryneegma/" },
    { icon: LinkedinLogo, label: "LinkedIn", href: "https://www.linkedin.com/company/neegma/" },
    { icon: TiktokLogo, label: "Tiktok", href: "https://www.tiktok.com/@tryneegma" },
];

const footerLinks = {
    product: [
        { label: "Features", href: "https://tryneegma.com/features" },
        { label: "Pricing", href: "https://tryneegma.com/pricing" },
    ],
    support: [
        { label: "Contact", href: "https://tryneegma.com/contact" },
        { label: "FAQ", href: "https://tryneegma.com/pricing#faq" },
    ],
};

function Footer() {
    return (
        <footer className="relative z-10 border-t border-navy-900/10">
            <div className="container mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-4 w-fit mx-auto md:mx-0"
                        >
                            <Link href="https://tryneegma.com" className="flex items-center gap-3 group">
                                <div className="w-12 h-12 bg-[linear-gradient(180deg,#F9564F_0%,#E8453E_100%)] rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
                                    <Image
                                        src={logo}
                                        alt="Neegma logo"
                                        width={30}
                                        height={30}
                                    />
                                </div>
                                <span className="text-navy-900 text-2xl font-fredoka font-semibold">
                                    Neegma
                                </span>
                            </Link>
                        </motion.div>

                        <p className="text-navy-900/60 mb-6 max-w-sm mx-auto md:mx-0 text-center md:text-left">
                            Real social games for any gathering: parties, work events, date nights,
                            family reunions. One link, no downloads, everyone&apos;s in.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3 justify-center md:justify-start">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="w-10 h-10 rounded-full bg-navy-900/8 hover:bg-[linear-gradient(180deg,#F9564F_0%,#E8453E_100%)] flex items-center justify-center transition-all border border-navy-900/10 hover:border-coral-500/50 group"
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon className="w-5 h-5 text-navy-900 group-hover:text-white transition-colors" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links], sectionIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: sectionIndex * 0.1 }}
                            className="text-center md:text-left"
                        >
                            <h3 className="text-navy-900 mb-4 capitalize font-fredoka font-semibold">
                                {category}
                            </h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.label} className="list-none">
                                        <Link
                                            href={link.href}
                                            className="text-navy-900/60 hover:text-coral-500 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="pt-8 border-t border-navy-900/10 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                    <p className="text-navy-900/50 text-sm">
                        © {new Date().getFullYear()} Neegma. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-navy-900/50 text-sm">
                        <Link
                            href="https://tryneegma.com/terms"
                            className="hover:text-navy-900 transition-colors"
                        >
                            Terms & Conditions
                        </Link>
                        <span className="hidden md:inline-block">•</span>
                        <Link
                            href="https://tryneegma.com/privacy"
                            className="hover:text-navy-900 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <span className="hidden md:inline-block">•</span>
                        <Link
                            href="/sitemap.xml"
                            className="hover:text-navy-900 transition-colors"
                        >
                            Sitemap
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

export default Footer;
