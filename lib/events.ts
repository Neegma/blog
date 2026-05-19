/**
 * Canonical event names shared with the main Neegma app.
 *
 * Adding a new event? Add it here AND in the main app's `src/lib/events.ts`
 * AND in TRACKING.md so funnels stay consistent across sites.
 */

import { event } from "./gtag";

export const Events = {
    // Awareness
    PAGE_VIEW: "page_view",
    BLOG_VIEW: "blog_view",
    SCROLL_DEPTH: "scroll_depth",

    // Lead-gen
    CLICK_CTA: "click_cta",
    OUTBOUND_CLICK: "outbound_click",
    SHARE_POST: "share_post",
    NEWSLETTER_SIGNUP: "newsletter_signup",
} as const;

export type EventName = (typeof Events)[keyof typeof Events];

export function trackBlogView(params: {
    post_title: string;
    post_slug: string;
    author?: string;
    category?: string;
    tags?: string;
    word_count?: number;
}): void {
    event({ action: Events.BLOG_VIEW, params });
}

export function trackScrollDepth(params: {
    depth_percentage: 25 | 50 | 75 | 100;
    page_path: string;
    post_slug?: string;
}): void {
    event({ action: Events.SCROLL_DEPTH, params });
}

export function trackClickCta(params: {
    cta_text: string;
    link_url: string;
    source_page: string;
    source_post?: string;
}): void {
    event({ action: Events.CLICK_CTA, params });
}

export function trackOutboundClick(params: {
    destination_url: string;
    source_page: string;
    cta_text?: string;
    source_post?: string;
}): void {
    event({ action: Events.OUTBOUND_CLICK, params });
}

export function trackSharePost(params: {
    platform: "linkedin" | "twitter" | "facebook" | "whatsapp" | "copy_link";
    post_title: string;
    post_slug: string;
}): void {
    event({ action: Events.SHARE_POST, params });
}

export function trackNewsletterSignup(params: {
    location: "footer" | "sidebar" | "inline" | "modal";
    source_page: string;
}): void {
    event({ action: Events.NEWSLETTER_SIGNUP, params });
}
