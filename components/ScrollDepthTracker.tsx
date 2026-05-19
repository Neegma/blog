"use client";

import { useEffect, useRef } from "react";

import { trackScrollDepth } from "@/lib/events";

interface Props {
    /** Slug of the post being read, included with each scroll milestone. */
    postSlug?: string;
}

const MILESTONES = [25, 50, 75, 100] as const;
type Milestone = (typeof MILESTONES)[number];

/**
 * Fires `scroll_depth` once per page load when the user crosses the 25/50/75/100
 * thresholds. Resets when the route changes (component remounts on the new page).
 */
export default function ScrollDepthTracker({ postSlug }: Props) {
    const firedRef = useRef<Set<Milestone>>(new Set());

    useEffect(() => {
        firedRef.current = new Set();

        const handler = () => {
            const doc = document.documentElement;
            const scrolled = window.scrollY + window.innerHeight;
            const total = doc.scrollHeight;
            if (total <= window.innerHeight) {
                if (!firedRef.current.has(100)) {
                    firedRef.current.add(100);
                    trackScrollDepth({
                        depth_percentage: 100,
                        page_path: window.location.pathname,
                        post_slug: postSlug,
                    });
                }
                return;
            }
            const pct = Math.min(100, Math.round((scrolled / total) * 100));
            for (const m of MILESTONES) {
                if (pct >= m && !firedRef.current.has(m)) {
                    firedRef.current.add(m);
                    trackScrollDepth({
                        depth_percentage: m,
                        page_path: window.location.pathname,
                        post_slug: postSlug,
                    });
                }
            }
        };

        window.addEventListener("scroll", handler, { passive: true });
        handler();
        return () => window.removeEventListener("scroll", handler);
    }, [postSlug]);

    return null;
}
