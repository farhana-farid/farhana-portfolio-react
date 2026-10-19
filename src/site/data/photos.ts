/**
 * Master content model for the AI Photo gallery.
 *
 * All twenty photographs live in `src/assets/slider/` and are discovered with
 * `import.meta.glob`, so adding another image to that folder automatically adds
 * it to both the homepage slider and this gallery — nothing is hard-coded twice.
 *
 * The slug prefix (00 – 19) fixes a stable ordering; the groups below split the
 * twenty photographs into exactly five carousels of four unique images each.
 */

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
  photos: Photo[]
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

const byIndex = (...indices: number[]): Photo[] => indices.map((i) => PHOTOS[i])

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
]

/* safety net — guarantees the brief's "twenty photographs, five carousels of four" */
export const PHOTO_COUNT = PHOTOS.length
export const TOTAL_SLOTS = COLLECTIONS.reduce((sum, c) => sum + c.photos.length, 0)
export const UNIQUE_SLOTS = new Set(COLLECTIONS.flatMap((c) => c.photos.map((p) => p.index))).size
