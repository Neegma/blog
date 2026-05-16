import type { Metadata } from "next";

import BlogGrid from "@/components/BlogGrid";
import Header from "@/components/Header";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
    title: "Neegma Blog: Stories From The Rooms Neegma Plays In",
    description:
        "Event recaps, host playbooks, and product notes from the Neegma team. Real teams, real parties, real game nights, all powered by one link and zero downloads.",
    keywords: [
        "Neegma blog",
        "social games blog",
        "team event recaps",
        "party game ideas",
        "interactive game shows",
        "host playbook",
        "team building case studies",
        "live event games",
        "QR code games",
        "Kahoot alternative",
        "Jackbox alternative",
        "Charades online",
        "Taboo online",
        "Find the Mole",
        "Crack the Code",
        "Two Truths and a Lie",
        "Villagers and Wolves",
        "audience engagement ideas",
        "game night ideas",
        "no download multiplayer games",
        "AI question generator games",
    ],
    openGraph: {
        title: "Neegma Blog",
        description:
            "Event recaps, host playbooks, and behind-the-scenes notes from the Neegma team.",
        type: "website",
    },
};

export default function BlogHome() {
    const posts = getAllPosts();

    return (
        <>
            <Header />
            <main className="bg-white text-navy-900">
                <section className="bg-[#FFF7F6] border-b border-navy-900/5">
                    <div className="container mx-auto px-4 md:px-6 pt-12 pb-14 md:pt-16 md:pb-20">
                        <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-fredoka mb-5 text-white bg-neegma-gradient shadow-sm">
                            The Neegma Blog
                        </span>
                        <h1 className="font-fredoka text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-navy-900 max-w-3xl">
                            Stories from the rooms{" "}
                            <span className="italic text-neegma-gradient">Neegma plays in.</span>
                        </h1>
                        <p className="mt-5 text-lg text-navy-900/70 max-w-2xl leading-relaxed">
                            Event recaps, host playbooks, and behind-the-scenes notes from the
                            team. Real teams, real parties, real game nights.
                        </p>
                    </div>
                </section>

                <section className="py-14 md:py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <BlogGrid posts={posts} />
                    </div>
                </section>
            </main>
        </>
    );
}
