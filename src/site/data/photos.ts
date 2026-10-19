/**
 * Master content model for the AI Photo gallery.
 *
 * Two sources feed the gallery:
 *
 *   1. `src/assets/slider/` — the original twenty interface and product
 *      studies, split into five carousels of four (Collections 01 – 05).
 *   2. `src/assets/story/`  — "The Palace Letters", ten stills from a single
 *      connected narrative, shown as Collections 06 – 07.
 *
 * Both are discovered with `import.meta.glob`, so adding a file to either
 * folder extends the gallery without touching this list a second time. The
 * slug prefixes fix a stable ordering.
 */

import { STORY_GROUPS } from './story'

export interface Photo {
  /** zero-based position across the whole set */
  index: number
  /** filename without extension, e.g. "04-voice-01" */
  slug: string
  /** resolved, hashed URL to the original photograph */
  src: string
  alt: string
}

export interface Collection {
  number: string
  title: string
  note: string
  /** every carousel entry needs only a src and alt to render */
  photos: { src: string; alt: string; key: string }[]
}

/* ------------------------------------------------------------------ */

const ALTS: Record<string, string> = {
  '00-attendance': 'AI-generated concept image of an automated task and attendance tracking interface',
  '01-attendance': 'AI-generated view of an automated attendance dashboard showing task progress',
  '02-attendance': 'AI-generated illustration of an automated task attendance tracking screen',
  '03-attendance': 'AI-generated interface concept for monitoring attendance and completed tasks',

  '04-voice': 'AI-generated concept image of an AI voice assistant interface',
  '05-voice': 'AI-generated illustration of a conversational AI voice assistant on screen',
  '06-voice': 'AI-generated image of a voice assistant and audio control interface',

  '07-recipe': 'AI-generated mobile recipe app interface mockup with meal discovery cards',
  '08-recipe': 'AI-generated mobile recipe app interface showing a curated recipe feed',
  '09-recipe': 'AI-generated mobile recipe app interface mockup with a step-by-step cooking view',
  '10-recipe': 'AI-generated mobile recipe app UI mockup with colourful recipe cards',
  '11-recipe': 'AI-generated recipe app user interface mockup on a mobile screen',

  '12-coding': 'AI-generated concept image of a student coding a web application',
  '13-coding': 'AI-generated illustration of a student building a web application on a laptop',
  '14-coding': 'AI-generated image of a student writing code for a web application',
  '15-coding': 'AI-generated scene of a student developing and testing a web application',

  '16-portfolio': 'AI-generated concept image of a student portfolio and career management screen',
  '17-portfolio': 'AI-generated interface for student portfolio career management',
  '18-portfolio': 'AI-generated concept of a student portfolio management system dashboard',
  '19-portfolio': 'AI-generated student portfolio management system with a career progress view',
}

/** Ordered map of every photograph found in `src/assets/slider/*.jpg`. */
const discovered = import.meta.glob('../../assets/slider/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const orderedEntries = Object.entries(discovered).sort(([a], [b]) => a.localeCompare(b))

export const PHOTOS: Photo[] = orderedEntries.map(([path, src], index) => {
  const slug = path.split('/').pop()!.replace(/\.jpg$/i, '')
  const family = slug.replace(/^\d+-/, '') // e.g. "attendance-01"
  const key = `${slug.slice(0, 2)}-${family.split('-')[0]}`
  return { index, slug, src, alt: ALTS[key] ?? `AI-generated artwork ${index + 1} by Farhana Farid` }
})

const byIndex = (...indices: number[]) =>
  indices.map((i) => ({ src: PHOTOS[i].src, alt: PHOTOS[i].alt, key: PHOTOS[i].slug }))

/** story stills expose `number`/`slug`; map them onto the shared shape */
const storyGroup = (chapters: { src: string; alt: string; slug: string }[]) =>
  chapters.map((c) => ({ src: c.src, alt: c.alt, key: c.slug }))

/**
 * Exactly five carousels, four unique photographs each, never repeated:
 * 01 → 0,1,2,3 | 02 → 4,5,6,11 | 03 → 7,8,9,10 | 04 → 12,13,14,15 | 05 → 16,17,18,19
 */
export const COLLECTIONS: Collection[] = [
  {
    number: '01',
    title: 'Automated Task Attendance Tracking',
    note: 'Four interface studies exploring how attendance and task progress can be visualised at a glance.',
    photos: byIndex(0, 1, 2, 3),
  },
  {
    number: '02',
    title: 'Voice Assistants & Interface Concepts',
    note: 'Conversational voice experiences paired with a wider exploration of app interface design.',
    photos: byIndex(4, 5, 6, 11),
  },
  {
    number: '03',
    title: 'Mobile Recipe App Interfaces',
    note: 'A warm, food-first mobile product rendered in four distinct interface directions.',
    photos: byIndex(7, 8, 9, 10),
  },
  {
    number: '04',
    title: 'Student Coding & Web Development',
    note: 'Scenes of building for the web — from first line of code to a running application.',
    photos: byIndex(12, 13, 14, 15),
  },
  {
    number: '05',
    title: 'Student Portfolio Management',
    note: 'Concepts for presenting a student body of work, skills and career progress.',
    photos: byIndex(16, 17, 18, 19),
  },
  /* ---- Collections 06 – 07: The Palace Letters, a connected story ---- */
  {
    number: '06',
    title: 'The Palace Letters — Arrival',
    note: 'A woman returns to an abandoned palace, finds a locked door, and uncovers a blue letter that should not exist.',
    photos: storyGroup(STORY_GROUPS[0] ?? []),
  },
  {
    number: '07',
    title: 'The Palace Letters — The Turn',
    note: 'The story darkens — a letter half-read, a figure at the end of the corridor, and a hand reaching out of the gloom.',
    photos: storyGroup(STORY_GROUPS[1] ?? []),
  },
]

/* safety net — verifies the gallery is still complete and duplicates-free */
export const PHOTO_COUNT = PHOTOS.length
export const STORY_COUNT = STORY_GROUPS.flat().length
export const COLLECTION_COUNT = COLLECTIONS.length
export const TOTAL_SLOTS = COLLECTIONS.reduce((sum, c) => sum + c.photos.length, 0)
/** every carousel entry across the whole gallery is unique — no repeats */
export const UNIQUE_SLOTS = new Set(COLLECTIONS.flatMap((c) => c.photos.map((p) => p.key))).size
/** true when no image is shown in two different carousels */
export const NO_REPEATS = UNIQUE_SLOTS === TOTAL_SLOTS

/* the Palace Letters also exists as a film series; expose the counts so the
   AI Photo page can cross-link to it without importing the story module */
export const STORY_SERIES_TITLE = 'The Palace Letters'
