/**
 * AI video projects.
 *
 * The featured YouTube film is supplied by Farhana and lives on the AI Video
 * page; the three clips below are the original files shipped in the project so
 * the "more projects" section is real content rather than a placeholder.
 *
 * To add another film, drop the file in `src/assets/videos/` (for a hosted
 * clip) or push a new entry onto `VIDEOS` with an `embedUrl` (for YouTube).
 */

export interface VideoProject {
  title: string
  description: string
  /** resolved URL of a locally hosted clip */
  src: string
  /** short upper-case label */
  tag: string
}

const discovered = import.meta.glob('../../assets/videos/*.mp4', {
  eager: true,
  import: 'default',
}) as Record<string, string>

/**
 * The Palace Letters films are a connected story and are presented in their own
 * dedicated section, so they are filtered out of this one-off list to avoid
 * showing the same clip twice on the page.
 */
const isStoryFilm = (path: string) => /story-\d+-/.test(path.split('/').pop() ?? '')

const DETAILS: { match: RegExp; title: string; description: string; tag: string }[] = [
  {
    match: /cat_and_mouse_kitchen/i,
    title: 'Cat and Mouse Kitchen Confrontation',
    description: 'A playful, character-driven short exploring staging, timing and comic tension.',
    tag: 'Short Film',
  },
  {
    match: /luxury_perfume/i,
    title: 'Creating a Luxury Perfume Advertisement',
    description: 'A premium product film study — light, texture and slow, deliberate camera language.',
    tag: 'Brand Film',
  },
  {
    match: /mouse_and_cat_morning/i,
    title: 'Mouse and Cat Morning Encounter',
    description: 'A quieter morning scene built around atmosphere, colour and gentle storytelling.',
    tag: 'Cinematic Study',
  },
]

export const VIDEOS: VideoProject[] = Object.entries(discovered)
  .filter(([path]) => !isStoryFilm(path))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const name = path.split('/').pop() ?? ''
    const detail = DETAILS.find((d) => d.match.test(name))
    return {
      src,
      title: detail?.title ?? name.replace(/\.mp4$/i, '').replace(/_/g, ' '),
      description: detail?.description ?? 'An AI-assisted film experiment by Farhana Farid.',
      tag: detail?.tag ?? 'AI Film',
    }
  })
