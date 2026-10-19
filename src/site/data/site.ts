/** Site-wide constants: brand, navigation, route metadata. */

export const SITE = {
  name: 'Farhana Farid',
  tagline: 'Turning Imagination Into Digital Experiences.',
  roles: ['Website Designer', 'Website Developer', 'AI Enthusiast', 'AI Content Creator'],
  signatureAffiliation: 'AI Batch 2 Rajbari',
  videoId: 'ooUdfORNd2s',
  /** the exact URL supplied by Farhana — used for the "Watch on YouTube" button */
  videoUrl: 'https://youtu.be/ooUdfORNd2s?si=D_nE3i40-GYG3N5H',
  videoEmbedUrl: 'https://www.youtube.com/embed/ooUdfORNd2s',
  videoTitle: '✨The Forbidden Flower: I am the Magic🌷',
} as const

export interface NavItem {
  label: string
  to: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'AI Video', to: '/ai-video' },
  { label: 'AI Photo', to: '/ai-photo' },
  { label: 'About Creator', to: '/about' },
]

export interface PageMeta {
  title: string
  description: string
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Farhana Farid — Website Designer, Developer & AI Creator',
    description:
      'Welcome to the creative world of Farhana Farid, where thoughtful website design meets AI-powered imagery, cinematic storytelling and limitless imagination.',
  },
  '/ai-video': {
    title: 'AI Video Creations — Farhana Farid',
    description:
      'Cinematic stories and creative experiments brought to life through AI and visual storytelling by Farhana Farid, including the ten-chapter series The Palace Letters.',
  },
  '/ai-photo': {
    title: 'AI Photo Gallery — Farhana Farid',
    description:
      'A curated collection of AI-generated portraits, cinematic visuals and imaginative digital art by Farhana Farid, including the two-part stills series The Palace Letters.',
  },
  '/about': {
    title: 'About the Creator — Farhana Farid',
    description:
      'Meet Farhana Farid — a website designer, developer and AI enthusiast passionate about building beautiful digital experiences.',
  },
}
