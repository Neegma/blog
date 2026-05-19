import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import TrackedLink from "./TrackedLink";
import { formatPostDate } from "@/lib/posts";

import type { PostMeta } from "@/lib/posts";

interface BlogGridProps {
    posts: PostMeta[];
}

export function BlogCard({ post }: { post: PostMeta }) {
    const tag = post.tags[0];
    return (
        <li className="list-none">
            <TrackedLink
                href={`/${post.slug}`}
                ctaText={`Open post: ${post.title}`}
                sourcePage="/"
                className="group block h-full overflow-hidden rounded-2xl bg-white border border-navy-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-navy-900/25"
            >
                <div className="relative h-48 w-full overflow-hidden bg-neegma-gradient">
                    <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {tag ? (
                        <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold font-fredoka text-white bg-purple-700/90 backdrop-blur-sm">
                            {tag}
                        </span>
                    ) : null}
                </div>
                <div className="p-6">
                    {post.date ? (
                        <time
                            dateTime={post.date}
                            className="text-xs font-semibold uppercase tracking-wider text-navy-900/60 font-fredoka"
                        >
                            {formatPostDate(post.date)}
                        </time>
                    ) : null}
                    <h2 className="mt-2 mb-3 font-fredoka text-2xl font-bold text-navy-900 leading-tight line-clamp-3">
                        {post.title}
                    </h2>
                    <p className="text-navy-900/75 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold font-fredoka transition-transform group-hover:translate-x-1 text-coral-400">
                        Read more
                        <ArrowRightIcon size={12} weight="bold" />
                    </span>
                </div>
            </TrackedLink>
        </li>
    );
}

export default function BlogGrid({ posts }: BlogGridProps) {
    if (posts.length === 0) {
        return <p className="text-navy-900/60">No posts yet, check back soon.</p>;
    }

    return (
        <ul className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 list-none">
            {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </ul>
    );
}
