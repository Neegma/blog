<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Content style rules

- **Do not use em dashes (—)** in any user-facing copy: blog posts, meta tags, headlines, captions, or alt text. Use commas, colons, periods, or restructure into separate sentences instead. This applies to both `.md` post content and TSX strings.
- **Do not use glowing backgrounds, radial-glow blobs, or blurred coloured halos** behind sections. No `bg-[radial-gradient(...rgba(...),transparent...)]` blobs, no `blur-3xl` coloured spheres, no `shadow-glow-*` utilities on whole sections. Use solid brand colours, subtle borders, and clean cards instead.

## Content model

Blog posts live as markdown files in `/posts/`. Each post is loaded via the helper in [lib/posts.ts](lib/posts.ts). Frontmatter fields:

```yaml
---
title: ...                # required
description: ...          # required, shown as subtitle + meta description
date: YYYY-MM-DD          # required
slug: kebab-case          # required, must match filename
excerpt: ...              # optional, used on the index card; falls back to description
coverImage: /path/or/url  # optional; falls back to /blog-placeholder.svg
coverImageAlt: ...        # optional
keywords: [a, b, c]       # optional, joined into meta keywords
tags: [a, b, c]           # optional, shown on the card
author: name              # optional
---
```

Image references inside the body should point to `/images/<post-slug>/...` and may be added later. Use the literal string `PLACEHOLDER` in alt text where the image is not yet uploaded so it is easy to grep for.
