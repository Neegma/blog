import type { Metadata } from "next";
import { fredoka, ibmPlexSans, notoSerif } from "@/styles/fonts";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "Neegma Blog",
        template: "%s | Neegma Blog",
    },
    description:
        "Updates, stories, and insights from the Neegma team. Real social games for any gathering — one link, no downloads, everyone's in.",
    icons: { icon: "/favicon.ico" },
    openGraph: {
        type: "website",
        siteName: "Neegma Blog",
        images: [{ url: "https://res.cloudinary.com/dzpntisxj/image/upload/v1777444818/Neegma/neegma_gradient_2_cdqs49.png" }],
    },
    twitter: {
        card: "summary_large_image",
        creator: "@deo_joe",
        images: ["https://res.cloudinary.com/dzpntisxj/image/upload/v1777444818/Neegma/neegma_gradient_2_cdqs49.png"],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${fredoka.variable} ${ibmPlexSans.variable} ${notoSerif.variable}`}
        >
            <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
                <div className="flex-1">{children}</div>
                <Footer />
            </body>
        </html>
    );
}
