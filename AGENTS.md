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

## Git Commit Attribution & Branch Naming

Commits in this repo are attributed to the human operator, not to Claude or Anthropic. Before committing or branching (this applies in any environment, including Claude Code on the web / cloud sessions):

1. **Set the git identity for the repo** (local config only, never global):
    ```bash
    git config --local user.name "<Full Name>"
    git config --local user.email "<email>"
    ```
    If the name/email is already evident from the conversation (the user stated it, or a prior commit in this session already set it), reuse it. **If you cannot infer it, ask the user first** via a clarifying question before making any commit — do not guess a name/email or fall back to a placeholder.
2. **Suppress Claude's attribution trailers** by creating (or updating) `.claude/settings.local.json`:
    ```json
    {
        "includeCoAuthoredBy": false,
        "attribution": {
            "commit": "",
            "pr": "",
            "sessionUrl": false
        }
    }
    ```
    `.claude/` is already gitignored, so this file never gets committed. It exists only to control this session's attribution behavior and can be safely discarded afterward.
3. Verify no commit in this repo's history contains a `Co-Authored-By: Claude` trailer, a `Claude-Session:` link, or any other mention of Claude/Anthropic.
4. **Ask for the branch name prefix before creating a new branch**, unless the user already gave one in this conversation (e.g. a harness-assigned branch name is not a substitute — confirm the prefix they actually want, such as `aa/`). Don't default to a `claude/`-style prefix without checking. This still applies even if a branch with a `claude/`-style name already exists locally or on the remote when the session starts — pre-existing is not pre-approved. Ask before your first commit or push on it, not only before literally running `git branch`/`git checkout -b`.
