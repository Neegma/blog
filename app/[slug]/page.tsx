import { notFound } from "next/navigation";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import Breadcrumb from "@/components/Breadcrumb";
import Header from "@/components/Header";
import PostContent from "@/components/PostContent";
import PostNav from "@/components/PostNav";
import PostViewTracker from "@/components/PostViewTracker";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import TrackedLink from "@/components/TrackedLink";
import {
    formatPostDate,
    getAdjacentPosts,
    getAllPostSlugs,
    getPostBySlug,
} from "@/lib/posts";

import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.description,
        keywords: post.keywords.length ? post.keywords.join(", ") : undefined,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date || undefined,
            images: post.coverImage ? [{ url: post.coverImage, alt: post.coverImageAlt }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: post.coverImage ? [post.coverImage] : undefined,
        },
    };
}

const ACCENT = "#B33F62";

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const { previous, next } = getAdjacentPosts(slug);

    const wordCount = post.content ? post.content.split(/\s+/).filter(Boolean).length : undefined;

    return (
        <>
            <PostViewTracker
                post_title={post.title}
                post_slug={post.slug}
                author={post.author || undefined}
                category={post.tags[0]}
                tags={post.tags.join(",") || undefined}
                word_count={wordCount}
            />
            <ScrollDepthTracker postSlug={post.slug} />
            <Header />
            <main className="bg-white text-navy-900">
                <div className="bg-[#FFF7F6] border-b border-navy-900/5">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-4">
                        <Breadcrumb items={[{ label: post.title }]} accentColor={ACCENT} />
                    </div>
                </div>

                <header className="bg-[#FFF7F6]">
                    <div className="max-w-3xl mx-auto px-4 md:px-6 pt-8 pb-8 md:pt-12 md:pb-10">
                        {post.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mb-5">
                                {post.tags.map((tag, index) => {
                                    const styles = [
                                        "bg-purple-700 text-white",
                                        "bg-coral-400 text-white",
                                        "bg-navy-900 text-white",
                                    ];
                                    const cls = styles[index % styles.length];
                                    return (
                                        <span
                                            key={tag}
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-fredoka ${cls}`}
                                        >
                                            {tag}
                                        </span>
                                    );
                                })}
                            </div>
                        ) : null}
                        <h1 className="font-fredoka text-3xl md:text-5xl font-bold text-navy-900 leading-tight tracking-tight">
                            {post.title}
                        </h1>
                        {post.description ? (
                            <p className="mt-4 text-lg md:text-xl text-navy-900/70 leading-relaxed">
                                {post.description}
                            </p>
                        ) : null}
                        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-navy-900/55 font-fredoka">
                            {post.date ? (
                                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                            ) : null}
                            {post.date && post.author ? <span aria-hidden="true">•</span> : null}
                            {post.author ? <span>By {post.author}</span> : null}
                        </div>
                    </div>
                </header>

                <figure className="bg-white">
                    <div className="max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-12">
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-navy-900/10 bg-neegma-gradient">
                            <Image
                                src={post.coverImage}
                                alt={post.coverImageAlt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                priority
                            />
                        </div>
                    </div>
                </figure>

                <section className="py-14 md:py-20">
                    <div className="max-w-3xl mx-auto px-4 md:px-6">
                        <PostContent content={post.content} />
                    </div>
                </section>

                <section className="py-10 md:py-14 bg-[#FFF7F6] border-t border-navy-900/5">
                    <div className="max-w-5xl mx-auto px-4 md:px-6">
                        <div className="mb-8 md:mb-10">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold font-fredoka mb-3 bg-purple-700 text-white">
                                Keep reading
                            </span>
                            <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-navy-900">
                                Another story from the rooms.
                            </h2>
                        </div>
                        <PostNav previous={previous} next={next} />
                        <div className="mt-10 text-center">
                            <TrackedLink
                                href="/"
                                ctaText="Back to all posts"
                                sourcePage={`/${post.slug}`}
                                sourcePost={post.slug}
                                className="inline-flex items-center gap-2 text-sm font-bold font-fredoka text-coral-400 hover:text-purple-700 transition-colors"
                            >
                                Back to all posts
                                <ArrowRightIcon size={12} weight="bold" />
                            </TrackedLink>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
