import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Neegma Blog",
    description:
        "Updates, stories, and insights from the team building Neegma — real social games for any gathering.",
};

// Replace with real post data fetched from your CMS or MDX files
const posts: { slug: string; title: string; date: string; excerpt: string }[] = [];

export default function BlogHome() {
    return (
        <main className="mx-auto max-w-2xl px-6 py-20">
            <header className="mb-16">
                <Link href="https://neegma.com" className="text-sm text-coral-500 hover:underline">
                    ← neegma.com
                </Link>
                <h1 className="mt-4 font-fredoka text-4xl font-semibold text-navy-900">
                    Neegma Blog
                </h1>
                <p className="mt-2 text-lg text-navy-700/70">
                    Updates, stories, and insights from the team.
                </p>
            </header>

            {posts.length === 0 ? (
                <p className="text-navy-700/50">No posts yet — check back soon.</p>
            ) : (
                <ul className="space-y-12">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link href={`/${post.slug}`} className="group block">
                                <time className="text-sm text-navy-700/50">{post.date}</time>
                                <h2 className="mt-1 font-serif text-2xl font-semibold text-navy-900 group-hover:text-coral-500 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="mt-2 text-navy-700/70">{post.excerpt}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
