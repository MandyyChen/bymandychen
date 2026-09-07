# bymandychen

My internet diary / garden. A small [Astro](https://astro.build) site: each
entry is one Markdown file, photos are auto-scattered and joined by a
hand-drawn-looking thread.

## Add an entry

1. Create `src/content/diary/YYYY-MM-DD-some-slug.md`:

   ```markdown
   ---
   date: 2026-09-06
   title: a walk to the river   # optional
   place: new haven             # optional
   ---

   Write the entry here in plain paragraphs.
   ```

2. (Optional) Add photos: make a folder with the **same name as the file**
   minus `.md`, and drop images in it. Prefix filenames to set the order.

   ```
   src/content/diary/2026-09-06-a-walk-to-the-river.md
   src/content/diary/2026-09-06-a-walk-to-the-river/
     ├── 01-front-door.jpg
     ├── 02-the-underpass.jpg
     └── 03-the-river.jpg
   ```

That's it. The entry shows up on the home page (newest first) and gets its
own page at `/2026-09-06-a-walk-to-the-river/`. No photos is fine — the
text just runs full width.

The scatter layout is deterministic: the same entry always lays out the
same way. Layout maths live in `src/lib/scatter.ts` if you want to tweak
the spread, tilt, or photo size.

## Local dev

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Deploy

Hosted on Vercel — it builds `npm run build` and serves `dist/` on every
push to `main`. Set the site URL in `astro.config.mjs` (`site:`) once the
domain is known.

## Structure

```
src/
├── content/diary/      # entries (.md) + their photo folders
├── content.config.ts   # entry frontmatter schema
├── layouts/Page.astro  # header / footer shell
├── components/
│   ├── BaseHead.astro
│   └── Scatter.astro   # scattered photos + connecting thread
├── lib/scatter.ts      # deterministic placement + path maths
├── pages/
│   ├── index.astro     # the list
│   └── [...slug].astro # one entry
├── styles/global.css
└── consts.ts           # site title / description / links
```
