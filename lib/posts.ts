import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export interface PostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    excerpt: string;
    coverImage: string;
    coverImageAlt: string;
    keywords: string[];
    tags: string[];
    author: string | null;
    /** Slug into GAME_PREVIEWS (lib/gamePreviews.ts); renders the real game hero widget instead of the cover image. */
    gamePreview: string | null;
}

export interface PostWithContent extends PostMeta {
    content: string;
}

const POSTS_DIR = path.join(process.cwd(), "posts");
const FALLBACK_COVER = "/blog-placeholder.svg";

function toArray(value: unknown): string[] {
    if (!value) return [];
    if (Array.isArray(value)) return value.map(String);
    if (typeof value === "string")
        return value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    return [];
}

function normalise(data: Record<string, unknown>, fallbackSlug: string): PostMeta {
    const slug = String(data.slug ?? fallbackSlug);
    const title = String(data.title ?? slug);
    const description = String(data.description ?? "");
    const date = String(data.date ?? "");
    const excerpt = String(data.excerpt ?? description);
    const coverImage = data.coverImage ? String(data.coverImage) : FALLBACK_COVER;
    const coverImageAlt = String(data.coverImageAlt ?? title);
    const keywords = toArray(data.keywords);
    const tags = toArray(data.tags);
    const author = data.author ? String(data.author) : null;
    const gamePreview = data.gamePreview ? String(data.gamePreview) : null;

    return {
        slug,
        title,
        description,
        date,
        excerpt,
        coverImage,
        coverImageAlt,
        keywords,
        tags,
        author,
        gamePreview,
    };
}

function readMatter(filename: string) {
    const fullPath = path.join(POSTS_DIR, filename);
    const file = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(file);
    const slug = filename.replace(/\.md$/, "");
    return { data, content, slug };
}

export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(POSTS_DIR)) return [];
    return fs
        .readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
    if (!fs.existsSync(POSTS_DIR)) return [];

    return fs
        .readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith(".md"))
        .map((filename) => {
            const { data, slug } = readMatter(filename);
            return normalise(data, slug);
        })
        .sort((a, b) => {
            if (!a.date) return 1;
            if (!b.date) return -1;
            return a.date < b.date ? 1 : -1;
        });
}

export function getPostBySlug(slug: string): PostWithContent | null {
    const filename = `${slug}.md`;
    const fullPath = path.join(POSTS_DIR, filename);
    if (!fs.existsSync(fullPath)) return null;

    const { data, content } = readMatter(filename);
    const meta = normalise(data, slug);
    return { ...meta, content };
}

export function getAdjacentPosts(slug: string): {
    previous: PostMeta | null;
    next: PostMeta | null;
} {
    const all = getAllPosts();
    const index = all.findIndex((p) => p.slug === slug);
    if (index === -1) return { previous: null, next: null };
    const previous = index < all.length - 1 ? all[index + 1] : null;
    const next = index > 0 ? all[index - 1] : null;
    return { previous, next };
}

export function formatPostDate(date: string): string {
    if (!date) return "";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
