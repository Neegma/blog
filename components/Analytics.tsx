"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { GA_MEASUREMENT_ID, SITE, pageview } from "@/lib/gtag";
import { useCookieConsent } from "@/hooks/useCookieConsent";

/**
 * Mounts the GA4 base script and fires a `page_view` on every client-side
 * route change. Configures the GA4 linker so that any anchor pointing at
 * tryneegma.com is automatically decorated with `_gl` for cross-domain
 * session stitching. The cookie domain is set to `.tryneegma.com` so the
 * `_ga` client id is shared with the main app subdomain.
 */
export default function Analytics() {
    const pathname = usePathname();
    const { analyticsGranted } = useCookieConsent();

    useEffect(() => {
        if (!analyticsGranted || !pathname || !GA_MEASUREMENT_ID) return;
        pageview(pathname);
    }, [pathname, analyticsGranted]);

    if (!analyticsGranted || !GA_MEASUREMENT_ID) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    window.gtag = gtag;
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                        send_page_view: false,
                        cookie_domain: '.tryneegma.com',
                        cookie_flags: 'SameSite=None;Secure',
                        linker: { domains: ['tryneegma.com', 'blog.tryneegma.com'], accept_incoming: true },
                        site: '${SITE}'
                    });
                `}
            </Script>
        </>
    );
}
