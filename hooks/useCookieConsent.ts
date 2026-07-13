import { useMemo, useSyncExternalStore } from "react";

import {
    clearConsent,
    getConsentServerSnapshot,
    getConsentSnapshot,
    parseConsent,
    setConsent,
    subscribeToConsent,
} from "@/lib/cookieConsent";

/**
 * Reads cookie consent from the localStorage-backed store in an SSR-safe,
 * cross-tab way. During SSR and the first client render the snapshot is `null`
 * (undecided), so gate UI/scripts on `analyticsGranted`, not on its inverse.
 *
 * Mirrors the main site's hook at tryneegma.com.
 */
export function useCookieConsent() {
    const raw = useSyncExternalStore(
        subscribeToConsent,
        getConsentSnapshot,
        getConsentServerSnapshot
    );

    const consent = useMemo(() => parseConsent(raw), [raw]);

    return {
        consent,
        /** True once the user has made a valid (current-version) choice. */
        hasResponded: consent !== null,
        analyticsGranted: consent?.analytics === "granted",
        acceptAnalytics: () => setConsent("granted"),
        rejectAnalytics: () => setConsent("denied"),
        reset: clearConsent,
    };
}

const noopSubscribe = () => () => {};

/**
 * `false` during SSR and the first client render, `true` afterwards. Lets the
 * banner render nothing until hydration so visitors who already responded never
 * see a flash. Mirrors the main site banner's `mounted` guard without a
 * setState-in-effect (which the blog's ESLint config forbids).
 */
export function useHydrated(): boolean {
    return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
