import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One entry = one Markdown file in src/content/diary/<slug>.md
// Its photos (optional) go in a folder of the same name: src/content/diary/<slug>/
const diary = defineCollection({
	loader: glob({ base: './src/content/diary', pattern: '*.md' }),
	schema: z.object({
		date: z.coerce.date(), // required: "2026-09-06"
		title: z.string().optional(), // optional headline
		place: z.string().optional(), // optional location note
		category: z.string().optional(), // "hardware for people" | "visual thinking" | "memo"
	}),
});

export const collections = { diary };
