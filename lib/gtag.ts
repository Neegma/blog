/**
 * GA4 (gtag.js) wrapper for the blog.
 *
 * Mirrors the main app's helper so event names + parameters stay identical
 * across blog.tryneegma.com and tryneegma.com. Cross-domain attribution
 * works because both subdomains share the same GA Measurement ID and the
 * `_ga` cookie is set on the apex domain.
 *
 * See TRACKING.md for the full event schema.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? "";

export const SITE = "blog" as const;

export type GTagEventParams = Record<string, string | number | boolean | undefined>;

export interface GTagEvent {
    action: string;
    params?: GTagEventParams;
}

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gtag?: (...args: any[]) => void;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer?: any[];
    }
}

function hasGtag(): boolean {
    return typeof window !== "undefined" && typeof window.gtag === "function";
}

export function pageview(url: string): void {
    if (!hasGtag() || !GA_MEASUREMENT_ID) return;
    window.gtag!("config", GA_MEASUREMENT_ID, {
        page_path: url,
        site: SITE,
    });
}

export function event({ action, params }: GTagEvent): void {
    if (!hasGtag()) return;
    window.gtag!("event", action, {
        site: SITE,
        ...params,
    });
}

export function identify(userId: string | null | undefined): void {
    if (!hasGtag() || !GA_MEASUREMENT_ID) return;
    window.gtag!("config", GA_MEASUREMENT_ID, {
        user_id: userId || undefined,
        site: SITE,
    });
}
