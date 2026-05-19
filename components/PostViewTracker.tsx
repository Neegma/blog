"use client";

import { useEffect } from "react";

import { trackBlogView } from "@/lib/events";

interface Props {
    post_title: string;
    post_slug: string;
    author?: string;
    category?: string;
    tags?: string;
    word_count?: number;
}

/**
 * Fires `blog_view` once on mount with full post metadata, then renders nothing.
 * Mounted from the post page (server component) so the event includes the
 * resolved post details rather than relying on URL parsing in the tag.
 */
export default function PostViewTracker(props: Props) {
    useEffect(() => {
        trackBlogView(props);
    }, [props]);

    return null;
}
