import Link from "next/link";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    /** Defaults to the AA-safe deeper coral (#B33F62). */
    accentColor?: string;
}

export default function Breadcrumb({
    items,
    accentColor = "#B33F62",
}: BreadcrumbProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-navy-900/65 font-fredoka"
        >
            <Link href="/" className="hover:text-navy-900 transition-colors">
                Blog
            </Link>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <span key={`${item.label}-${index}`} className="flex items-center gap-2">
                        <CaretRightIcon className="w-3 h-3 text-navy-900/30" weight="bold" />
                        {item.href && !isLast ? (
                            <Link href={item.href} className="hover:text-navy-900 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className="font-semibold line-clamp-1"
                                style={{ color: accentColor }}
                                aria-current={isLast ? "page" : undefined}
                            >
                                {item.label}
                            </span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}
