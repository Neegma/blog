"use client";

import Link from "next/link";
import { forwardRef } from "react";

import { trackClickCta, trackOutboundClick } from "@/lib/events";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

type AnchorProps = ComponentPropsWithoutRef<"a">;

interface TrackedLinkProps extends Omit<AnchorProps, "href"> {
    href: string;
    children: ReactNode;
    /** Short label describing what was clicked, e.g. "Visit Neegma header" */
    ctaText: string;
    /** Pathname of the page the click originated from, e.g. "/" or "/post-slug" */
    sourcePage: string;
    /** If the click is from a post page, the slug, useful for content attribution */
    sourcePost?: string;
    /** Force this link to be treated as outbound, even if href doesn't start with http. */
    forceOutbound?: boolean;
}

function isOutbound(href: string): boolean {
    if (href.startsWith("http://") || href.startsWith("https://")) {
        // Treat anything not on blog.tryneegma.com as outbound for funnel purposes.
        try {
            const u = new URL(href);
            return !u.hostname.endsWith("blog.tryneegma.com");
        } catch {
            return false;
        }
    }
    return false;
}

/**
 * Drop-in replacement for next/link or <a> that fires `click_cta` for every click
 * and an additional `outbound_click` event when the destination leaves the blog.
 * Use this for any link the marketing team cares about, especially every link
 * pointing at tryneegma.com so we can attribute app conversions back to a post.
 */
const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(function TrackedLink(
    { href, children, ctaText, sourcePage, sourcePost, forceOutbound, onClick, ...rest },
    ref
) {
    const outbound = forceOutbound || isOutbound(href);

    const handleClick: AnchorProps["onClick"] = (e) => {
        trackClickCta({
            cta_text: ctaText,
            link_url: href,
            source_page: sourcePage,
            source_post: sourcePost,
        });
        if (outbound) {
            trackOutboundClick({
                destination_url: href,
                source_page: sourcePage,
                cta_text: ctaText,
                source_post: sourcePost,
            });
        }
        onClick?.(e);
    };

    if (outbound) {
        return (
            <a
                ref={ref}
                href={href}
                onClick={handleClick}
                rel={rest.rel ?? "noopener"}
                {...rest}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={href} onClick={handleClick} ref={ref} {...rest}>
            {children}
        </Link>
    );
});

export default TrackedLink;
