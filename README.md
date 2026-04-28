# Neegma Blog

The official blog for [Neegma](https://neegma.com) — real social games for any gathering: parties, work events, date nights, family reunions.

Built with [Next.js](https://nextjs.org/) 16, [Tailwind CSS](https://tailwindcss.com/) v4, and TypeScript.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the blog.

## Project Structure

```text
app/
  layout.tsx        # Root layout — fonts, metadata, global styles
  page.tsx          # Blog home (post list)
  [slug]/
    page.tsx        # Individual post page
  globals.css       # Tailwind v4 theme tokens + global styles
styles/
  fonts.ts          # Google Fonts setup (Fredoka, IBM Plex Sans, Noto Serif)
public/             # Static assets
```

## Adding Posts

Hook up `app/page.tsx` and `app/[slug]/page.tsx` to your content source — MDX files, a headless CMS, or the Neegma admin API. The routes are ready; just replace the placeholder `getPost` stub with real data fetching.

## Scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | Start dev server at localhost:3000 |
| `pnpm build`        | Production build                   |
| `pnpm lint`         | Run ESLint                         |
| `pnpm format`       | Format all files with Prettier     |
| `pnpm format:check` | Check formatting without writing   |
