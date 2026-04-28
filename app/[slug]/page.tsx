import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

// Replace with real data fetching from your CMS or MDX files
async function getPost(_slug: string) {
    return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return {};
    return { title: (post as { title: string }).title };
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    return (
        <main className="mx-auto max-w-2xl px-6 py-20">
            <Link href="/" className="text-sm text-coral-500 hover:underline">
                ← All posts
            </Link>
            {/* Render post content here */}
        </main>
    );
}
