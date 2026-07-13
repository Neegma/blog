/**
 * Cookie consent store.
 *
 * A tiny external store (localStorage-backed) consumed via `useSyncExternalStore`
 * in `useCookieConsent`. Kept framework-agnostic and SSR-safe so it can gate
 * client-only trackers (GA4 + FullStory) without a React provider.
 *
 * Mirrors the main site's store at tryneegma.com (same format, key, and
 * version) so both properties behave identically. Only non-essential/analytics
 * tracking is gated here. Bump `COOKIE_CONSENT_VERSION` when the categories or
 * policy change to re-prompt everyone who previously responded.
 */

export type ConsentDecision = "granted" | "denied";

export interface CookieConsent {
    /** Governs analytics/session trackers (GA4 + FullStory today; extendable later). */
    analytics: ConsentDecision;
    version: number;
    updatedAt: string;
}

export const COOKIE_CONSENT_STORAGE_KEY = "neegma_cookie_consent";

/** Bump to invalidate stored decisions and re-prompt users. */
export const COOKIE_CONSENT_VERSION = 1;

const listeners = new Set<() => void>();

function readRaw(): string | null {
    if (typeof window === "undefined") return null;
    try {
        return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    } catch {
        return null;
    }
}

// Cached so `getConsentSnapshot` is referentially stable between renders
// (required by useSyncExternalStore to avoid infinite re-render loops).
let snapshot: string | null = readRaw();

function handleStorage(event: StorageEvent): void {
    // Fires in *other* tabs when consent changes; keep every tab in sync.
    if (event.key !== null && event.key !== COOKIE_CONSENT_STORAGE_KEY) return;
    emit();
}

function emit(): void {
    snapshot = readRaw();
    listeners.forEach((listener) => listener());
}

export function subscribeToConsent(listener: () => void): () => void {
    listeners.add(listener);
    if (typeof window !== "undefined") {
        window.addEventListener("storage", handleStorage);
    }
    return () => {
        listeners.delete(listener);
        if (typeof window !== "undefined" && listeners.size === 0) {
            window.removeEventListener("storage", handleStorage);
        }
    };
}

export function getConsentSnapshot(): string | null {
    return snapshot;
}

export function getConsentServerSnapshot(): string | null {
    return null;
}

export function parseConsent(raw: string | null): CookieConsent | null {
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw) as CookieConsent;
        if (parsed?.version !== COOKIE_CONSENT_VERSION) return null;
        if (parsed.analytics !== "granted" && parsed.analytics !== "denied") return null;
        return parsed;
    } catch {
        return null;
    }
}

export function setConsent(analytics: ConsentDecision): void {
    if (typeof window === "undefined") return;
    const value: CookieConsent = {
        analytics,
        version: COOKIE_CONSENT_VERSION,
        updatedAt: new Date().toISOString(),
    };
    try {
        window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(value));
    } catch {
        // Ignore write failures (private mode, quota). The decision simply
        // won't persist across reloads; the trackers stay gated for the session.
    }
    emit();
}

/** Clears the stored decision so the banner re-appears (e.g. a "Manage cookies" link). */
export function clearConsent(): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
    } catch {
        // ignore
    }
    emit();
}
