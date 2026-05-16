"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

import logoWhite from "../public/logo-white.png";

export default function Header() {
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

                <a
                    href="https://tryneegma.com"
                    className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 md:py-2.5 font-fredoka font-semibold text-white text-xs md:text-sm rounded-full transition-all hover:opacity-90 hover:scale-[1.03] bg-neegma-gradient shadow-sm"
                >
                    Visit Neegma
                    <ArrowRightIcon size={12} weight="bold" />
                </a>
            </div>
        </motion.header>
    );
}
