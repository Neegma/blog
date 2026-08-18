import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Components } from "react-markdown";

const components: Components = {
    h1: ({ children }) => (
        <h1 className="font-fredoka text-3xl md:text-4xl font-bold text-navy-900 mt-12 mb-6 leading-tight">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-navy-900 mt-12 mb-5 leading-tight">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="font-fredoka text-xl md:text-2xl font-bold text-navy-900 mt-10 mb-4 leading-tight">
            {children}
        </h3>
    ),
    h4: ({ children }) => (
        <h4 className="font-fredoka text-lg md:text-xl font-semibold text-navy-900 mt-8 mb-3">
            {children}
        </h4>
    ),
    p: ({ children }) => (
        <p className="font-serif text-base md:text-lg leading-[1.75] text-navy-900/85 my-5">
            {children}
        </p>
    ),
    a: ({ children, href }) => (
        <a
            href={href}
            className="text-purple-700 font-medium underline decoration-purple-700/40 underline-offset-4 hover:decoration-purple-700 hover:text-purple-500 transition-colors"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        >
            {children}
        </a>
    ),
    ul: ({ children }) => (
        <ul className="list-disc pl-6 my-5 space-y-2 font-serif text-base md:text-lg text-navy-900/85 marker:text-coral-400">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 my-5 space-y-2 font-serif text-base md:text-lg text-navy-900/85 marker:text-coral-400 marker:font-bold">
            {children}
        </ol>
    ),
    li: ({ children }) => <li className="leading-[1.75]">{children}</li>,
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-purple-700 bg-purple-700/4 pl-5 pr-4 py-2 my-7 italic font-serif text-navy-900/85 rounded-r-lg">
            {children}
        </blockquote>
    ),
    hr: () => <hr className="border-navy-900/10 my-10" />,
    strong: ({ children }) => <strong className="font-semibold text-navy-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    img: ({ src, alt }) => (
        <figure className="my-8">
            <div className="relative w-full overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={typeof src === "string" ? src : ""}
                    alt={alt ?? ""}
                    className="w-full h-auto object-cover"
                />
            </div>
            {alt ? (
                <figcaption className="mt-3 text-sm text-navy-900/55 text-center italic font-serif">
                    {alt}
                </figcaption>
            ) : null}
        </figure>
    ),
    code: ({ children }) => (
        <code className="font-mono text-sm bg-navy-900/6 text-navy-900 px-1.5 py-0.5 rounded">
            {children}
        </code>
    ),
    table: ({ children }) => (
        <div className="my-7 overflow-x-auto rounded-xl border border-navy-900/10">
            <table className="w-full border-collapse text-left">{children}</table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-navy-900/[0.04]">{children}</thead>,
    tr: ({ children }) => (
        <tr className="border-b border-navy-900/10 last:border-b-0">{children}</tr>
    ),
    th: ({ children }) => (
        <th className="px-4 py-3 font-fredoka text-sm font-bold text-navy-900 align-top">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="px-4 py-3 font-serif text-[15px] md:text-base leading-relaxed text-navy-900/85 align-top">
            {children}
        </td>
    ),
};

interface PostContentProps {
    content: string;
}

export default function PostContent({ content }: PostContentProps) {
    const stripped = content.replace(/<!--[\s\S]*?-->/g, "");
    return (
        <article className="max-w-2xl">
            <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
                {stripped}
            </ReactMarkdown>
        </article>
    );
}
