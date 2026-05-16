import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import type { PostMeta } from "@/lib/posts";

const ACCENT = "#7B1E7A";

interface PostNavProps {
    previous: PostMeta | null;
    next: PostMeta | null;
}

export default function PostNav({ previous, next }: PostNavProps) {
    if (!previous && !next) return null;

    return (
        <nav
            aria-label="Post navigation"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
            {previous ? (
                <Link
                    href={`/${previous.slug}`}
                    className="group block rounded-2xl border border-navy-900/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-navy-900/25"
                >
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-navy-900/55 font-fredoka mb-3">
                        <ArrowLeftIcon size={12} weight="bold" />
                        Previous post
                    </div>
                    <h3 className="font-fredoka text-xl font-bold text-navy-900 line-clamp-2">
                        <span
                            className="group-hover:underline"
                            style={{ textDecorationColor: ACCENT }}
                        >
                            {previous.title}
                        </span>
                    </h3>
                    <p className="text-sm text-navy-900/65 mt-2 line-clamp-2">{previous.excerpt}</p>
                </Link>
            ) : (
                <div className="hidden md:block" aria-hidden="true" />
            )}

            {next ? (
                <Link
                    href={`/${next.slug}`}
                    className="group block rounded-2xl border border-navy-900/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-navy-900/25 md:text-right"
                >
                    <div className="flex md:justify-end items-center gap-2 text-xs uppercase tracking-wider font-semibold text-navy-900/55 font-fredoka mb-3">
                        Next post
                        <ArrowRightIcon size={12} weight="bold" />
                    </div>
                    <h3 className="font-fredoka text-xl font-bold text-navy-900 line-clamp-2">
                        <span
                            className="group-hover:underline"
                            style={{ textDecorationColor: ACCENT }}
                        >
                            {next.title}
                        </span>
                    </h3>
                    <p className="text-sm text-navy-900/65 mt-2 line-clamp-2">{next.excerpt}</p>
                </Link>
            ) : (
                <div className="hidden md:block" aria-hidden="true" />
            )}
        </nav>
    );
}
