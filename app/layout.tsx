import type { Metadata } from "next";
import { fredoka, ibmPlexSans, notoSerif } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "Neegma Blog",
        template: "%s | Neegma Blog",
    },
    description:
        "Updates, stories, and insights from the team building Neegma — real social games for any gathering.",
    icons: { icon: "/favicon.ico" },
    openGraph: {
        type: "website",
        siteName: "Neegma Blog",
    },
    twitter: {
        card: "summary_large_image",
        creator: "@deo_joe",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${fredoka.variable} ${ibmPlexSans.variable} ${notoSerif.variable}`}
        >
            <body className="min-h-screen bg-background text-foreground antialiased">
                {children}
            </body>
        </html>
    );
}
