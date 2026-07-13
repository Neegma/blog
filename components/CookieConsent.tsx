"use client";

import { CookieIcon } from "@phosphor-icons/react";

import { useCookieConsent, useHydrated } from "@/hooks/useCookieConsent";

/**
 * Non-blocking cookie consent banner. Shows until the visitor accepts or
 * declines; the choice persists in localStorage (see `lib/cookieConsent.ts`)
 * and gates the trackers (GA4 + FullStory) via `useCookieConsent`. The design
 * and consent model mirror the main site banner at tryneegma.com so both
 * properties look and behave identically.
 *
 * The `useHydrated` guard keeps SSR and the first client render identical (both
 * render nothing), so there's no hydration mismatch and no banner flash for
 * visitors who already responded.
 */
export default function CookieConsent() {
    const { hasResponded, acceptAnalytics, rejectAnalytics } = useCookieConsent();
    const hydrated = useHydrated();

    if (!hydrated || hasResponded) return null;

    return (
        <section
            aria-label="Cookie consent"
            className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
        >
            <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-white/10 bg-[#0e1526] p-5 shadow-xl sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-start gap-3">
                    <CookieIcon
                        size={24}
                        weight="fill"
                        className="mt-0.5 shrink-0 text-coral-500"
                        aria-hidden="true"
                    />
                    <p className="text-sm leading-relaxed text-white/70">
                        We use cookies to understand how the blog is used and improve your
                        experience. You can accept or decline analytics cookies. See our{" "}
                        <a
                            href="https://tryneegma.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-coral-500 underline underline-offset-2 hover:text-coral-500/80"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
                <div className="flex shrink-0 gap-3 sm:ml-auto">
                    <button
                        type="button"
                        onClick={rejectAnalytics}
                        className="flex-1 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white sm:flex-none"
                    >
                        Decline
                    </button>
                    <button
                        type="button"
                        onClick={acceptAnalytics}
                        className="flex-1 rounded-lg bg-coral-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-500/90 sm:flex-none"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </section>
    );
}
