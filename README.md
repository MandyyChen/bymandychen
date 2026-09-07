# bymandychen

My internet diary / digital diary. An [Astro](https://astro.build) site.
Everything lives on one horizontal "book" you flip through left / right:

```
[ home ]  →  [ hardware for people ]  [ visual thinking ]  [ memo ]  →  [ entry ]  [ entry ] …
```

- **Home** — name, link to the portfolio, the three category links.
- **Category page** — lists every entry in that category as a link; says
  "coming soon" if there are none yet.
- **Entry** — one diary post.

Navigate: `←` / `→` keys, on-screen `‹` `›`, swipe, or `Esc` for home.

## Add an entry

Create `src/content/diary/YYYY-MM-DD-some-slug.md`:

```markdown
---
date: 2026-09-06
title: a walk to the river          # optional
place: new haven                    # optional
category: hardware for people       # optional — hardware for people | visual thinking | memo
---

Write the entry in plain paragraphs.
```

Photos (optional): make a folder with the **same name as the file minus
`.md`** and drop images in it; prefix filenames to set the order.

```
src/content/diary/2026-09-06-a-walk-to-the-river.md
src/content/diary/2026-09-06-a-walk-to-the-river/
  ├── 01-front-door.jpg
  └── 02-the-river.jpg
```

The entry appears in its category page and gets a slot in the book,
newest first. `/2026-09-06-a-walk-to-the-river/` redirects to it.

## Categories

The list is `CATEGORIES` at the top of `src/pages/index.astro`. An entry
joins a category via its `category:` frontmatter (exact text match).

## Local dev

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Deploy

Vercel builds `npm run build` and serves `dist/` on every push to `main`.
Set the real URL in `astro.config.mjs` (`site:`) once the domain is known.

## Structure

```
src/
├── content/diary/      # entries (.md) + photo folders
├── content.config.ts   # frontmatter schema
├── layouts/Page.astro  # <head> + body shell
├── components/BaseHead.astro
├── pages/
│   ├── index.astro     # the whole book + its keyboard/scroll logic
│   └── [...slug].astro # /slug/ -> /#slug redirect
├── styles/global.css   # all styles (Inter, black on white)
└── consts.ts           # site title / description
```
