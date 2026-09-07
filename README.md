# bymandychen

My internet diary. [Astro](https://astro.build), black on white, Inter.

**Home → folder → entry.** The home page lists categories; a category
("folder") lists its entries; an entry is one post. `←` `→` (or swipe)
flip between entries in a folder. No animations.

## Add an entry

`src/content/diary/<slug>.md`:

```markdown
---
date: 2026-09-06
title: week 1                  # optional
category: hardware for people  # optional — must match a name in CATEGORIES
---

Body text here.
```

Photos: a folder named exactly `<slug>/` next to the file; drop images
in, prefix `01-`, `02-` for order.

## Categories

Edit `CATEGORIES` at the top of `src/pages/index.astro`. `CLICKABLE` is
the subset that links from the home page. `FOLDER_TEXT` gives a folder a
fixed blurb instead of an entry list.

## Dev / deploy

```sh
npm install
npm run dev      # localhost:4321
npm run build    # -> dist/
```

Vercel builds and deploys on every push to `main`. Set the real URL in
`astro.config.mjs` once known.
