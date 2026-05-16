import type { Metadata } from "next";
import { fredoka, ibmPlexSans, notoSerif } from "@/styles/fonts";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://blog.tryneegma.com"),
    title: {
        default: "Neegma Blog",
        template: "%s | Neegma Blog",
    },
    description:
        "Event recaps, host playbooks, and behind-the-scenes notes from the Neegma team. Real social games for any gathering, one link, no downloads, everyone is in.",
    keywords: [
        "Neegma blog",
        "social games",
        "party games",
        "interactive games",
        "team building games",
        "event games",
        "live game show",
        "game night ideas",
        "audience engagement",
        "host playbook",
        "event recap",
        "QR code games",
        "no download games",
        "Kahoot alternative",
        "Jackbox alternative",
        "trivia games",
        "Charades online",
        "Taboo online",
        "Find the Mole game",
    ],
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
