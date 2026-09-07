// Deterministic photo scatter + connecting thread.
// Same seed + same photo count => same layout every build.

export interface Placement {
	x: number; // 0..1, horizontal centre
	y: number; // 0..1, vertical centre
	rot: number; // degrees, small tilt
	w: number; // desktop width in px
}

function hash(str: string): number {
	let h = 2166136261 >>> 0;
	for (let i = 0; i < str.length; i++) {
		h ^= str.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}

function mulberry32(a: number): () => number {
	return function () {
		a |= 0;
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

// Photos meander top-to-bottom so the thread reads like a walked path.
export function placements(seed: string, count: number): Placement[] {
	const rand = mulberry32(hash(seed));
	const out: Placement[] = [];
	// Photos live to the right of the text column and spread across the page.
	const minX = 0.38;
	const maxX = 0.96;
	const top = 0.09;
	const bottom = 0.93;
	let x = minX + rand() * (maxX - minX);

	for (let i = 0; i < count; i++) {
		const t = count === 1 ? 0.5 : i / (count - 1);
		const y = top + t * (bottom - top) + (rand() - 0.5) * 0.05;

		x += (rand() - 0.5) * 0.7; // random walk...
		if (x < minX) x = minX + (minX - x); // ...bouncing off the edges
		if (x > maxX) x = maxX - (x - maxX);
		x = Math.min(maxX, Math.max(minX, x));

		out.push({
			x,
			y: Math.min(0.97, Math.max(0.03, y)),
			rot: (rand() - 0.5) * 7,
			w: Math.round(112 + rand() * 78),
		});
	}
	return out;
}

// Smooth curve (Catmull-Rom -> cubic bezier) through the photo centres.
export function threadPath(pts: { x: number; y: number }[]): string {
	if (pts.length < 2) return '';
	if (pts.length === 2) {
		return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`;
	}
	const d = [`M ${pts[0].x} ${pts[0].y}`];
	for (let i = 0; i < pts.length - 1; i++) {
		const p0 = pts[i - 1] ?? pts[i];
		const p1 = pts[i];
		const p2 = pts[i + 1];
		const p3 = pts[i + 2] ?? p2;
		const c1x = p1.x + (p2.x - p0.x) / 6;
		const c1y = p1.y + (p2.y - p0.y) / 6;
		const c2x = p2.x - (p3.x - p1.x) / 6;
		const c2y = p2.y - (p3.y - p1.y) / 6;
		d.push(`C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`);
	}
	return d.join(' ');
}
