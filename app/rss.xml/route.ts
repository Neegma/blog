import { getAllPosts, type PostMeta } from "@/lib/posts";

const SITE_URL = "https://blog.tryneegma.com";
const TITLE = "Neegma Blog";
const DESCRIPTION =
    "Event recaps, host playbooks, and behind-the-scenes notes from the Neegma team.";

// Posts are read from markdown at build time, so the feed can be fully static.
export const dynamic = "force-static";

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function toRfc822(date: string): string {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return new Date().toUTCString();
    return parsed.toUTCString();
}

function renderItem(post: PostMeta): string {
    const url = `${SITE_URL}/${post.slug}`;
    const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");
    return `
        <item>
            <title>${escapeXml(post.title)}</title>
            <link>${url}</link>
            <guid isPermaLink="true">${url}</guid>
            <description>${escapeXml(post.excerpt || post.description)}</description>
            ${post.date ? `<pubDate>${toRfc822(post.date)}</pubDate>` : ""}
            ${post.author ? `<dc:creator>${escapeXml(post.author)}</dc:creator>` : ""}
            ${categories}
        </item>`;
}

export function GET(): Response {
    const posts = getAllPosts();
    const lastBuildDate = posts[0]?.date ? toRfc822(posts[0].date) : new Date().toUTCString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
    <channel>
        <title>${escapeXml(TITLE)}</title>
        <link>${SITE_URL}</link>
        <description>${escapeXml(DESCRIPTION)}</description>
        <language>en</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
        ${posts.map(renderItem).join("")}
    </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
    });
}
