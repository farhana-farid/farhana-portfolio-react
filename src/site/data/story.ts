/**
 * "The Palace Letters" — a connected AI story series.
 *
 * Ten stills and ten films share one narrative: a woman returns to an old
 * palace, finds a locked wooden door, uncovers a blue letter, and is drawn
 * towards something waiting in the dark.
 *
 * Everything is discovered from the asset folders with `import.meta.glob`, so
 * dropping in another `story-NN-*.jpg` or `story-NN-*.mp4` adds it to the site
 * automatically — the order comes from the numeric prefix, so the story always
 * reads in sequence.
 */

export interface StoryChapter {
  /** one-based position in the story */
  number: number
  /** filename without extension, e.g. "01-story" */
  slug: string
  /** resolved, hashed URL */
  src: string
  alt: string
}

export interface StoryFilm {
  number: number
  slug: string
  src: string
  title: string
  /** the beat of the story this clip covers */
  beat: string
}

/* ------------------------------------------------------------------ */
/* Stills                                                              */
/* ------------------------------------------------------------------ */

const STILL_ALTS: Record<string, string> = {
  '00-palace':
    'AI-generated portrait of a woman in an embroidered gown standing in the sunlit courtyard of an old palace',
  '01-story':
    'AI-generated scene of a woman moving through the shadowed corridors of an abandoned palace',
  '02-story':
    'AI-generated image of a woman pausing at a heavy carved doorway lit by a single shaft of light',
  '03-story':
    'AI-generated moment of a woman reaching towards the iron latch of an old wooden door',
  '04-story':
    'AI-generated scene of a woman discovering a sealed blue envelope in the palace gloom',
  '05-story':
    'AI-generated portrait of a woman reading a handwritten letter by fading light',
  '06-story':
    'AI-generated image of a woman looking up from a letter, sensing something behind her',
  '07-story':
    'AI-generated scene of a pale figure appearing at the far end of a palace corridor',
  '08-story':
    'AI-generated image of a ghostly hand reaching out towards a woman in a dark hallway',
  '09-story':
    'AI-generated scene of a woman being drawn towards a doorway that opens onto darkness',
}

const discoveredStills = import.meta.glob('../../assets/story/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export const STORY_STILLS: StoryChapter[] = Object.entries(discoveredStills)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => {
    const slug = path.split('/').pop()!.replace(/\.jpg$/i, '')
    return {
      number: index + 1,
      slug,
      src,
      alt: STILL_ALTS[slug] ?? `AI-generated still from The Palace Letters, chapter ${index + 1}`,
    }
  })

/* ------------------------------------------------------------------ */
/* Films                                                               */
/* ------------------------------------------------------------------ */

const FILM_BEATS: { match: RegExp; title: string; beat: string }[] = [
  {
    match: /turns-to-doorway/,
    title: 'She Turns Toward the Doorway',
    beat: 'The story opens — a figure senses she is not alone in the corridor.',
  },
  {
    match: /opening-door/,
    title: 'The Locked Door Gives Way',
    beat: 'A stubborn lock, a slow reveal, and whatever waits on the other side.',
  },
  {
    match: /watching-door/,
    title: 'Watching the Door Open',
    beat: 'The moment of realising the door has moved on its own.',
  },
  {
    match: /inspecting-palace/,
    title: 'Inspecting the Ancient Palace',
    beat: 'Establishing the world — faded grandeur, dust and long shadows.',
  },
  {
    match: /blue-envelope/,
    title: 'Picking Up the Blue Envelope',
    beat: 'The discovery that turns the story: a letter that should not be there.',
  },
  {
    match: /reading-letter/,
    title: 'Reading the Blue Letter',
    beat: 'The letter is opened and its meaning begins to surface.',
  },
  {
    match: /reads-letter/,
    title: 'What the Letter Said',
    beat: 'A quieter beat — concentration, and a dawning understanding.',
  },
  {
    match: /ghostly-hand/,
    title: 'A Ghostly Hand Reaches Out',
    beat: 'The turn into the supernatural, held in a single gesture.',
  },
  {
    match: /pulled-to-doorway/,
    title: 'Pulled Back to the Doorway',
    beat: 'An unseen force draws her back the way she came.',
  },
  {
    match: /into-darkness/,
    title: 'Taken Into the Darkness',
    beat: 'The closing image — the corridor, and then nothing.',
  },
]

const discoveredFilms = import.meta.glob('../../assets/videos/story-*.mp4', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export const STORY_FILMS: StoryFilm[] = Object.entries(discoveredFilms)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => {
    const slug = path.split('/').pop()!.replace(/\.mp4$/i, '')
    const detail = FILM_BEATS.find((d) => d.match.test(slug))
    return {
      number: index + 1,
      slug,
      src,
      title: detail?.title ?? slug.replace(/^\d+-/, '').replace(/-/g, ' '),
      beat: detail?.beat ?? 'A chapter in The Palace Letters.',
    }
  })

/* ------------------------------------------------------------------ */

/** The stills split into two carousels of five, in story order. */
export const STORY_GROUPS: StoryChapter[][] = [
  STORY_STILLS.slice(0, 5),
  STORY_STILLS.slice(5, 10),
]

export const STORY_STILL_COUNT = STORY_STILLS.length
export const STORY_FILM_COUNT = STORY_FILMS.length
