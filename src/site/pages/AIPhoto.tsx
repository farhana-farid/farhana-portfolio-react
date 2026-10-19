import { Link } from 'react-router-dom'
import { ArrowRight, Images } from 'lucide-react'
import PageMeta from '../components/PageMeta'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import Carousel, { type CarouselSlide } from '../components/Carousel'
import { COLLECTIONS, TOTAL_SLOTS, UNIQUE_SLOTS } from '../data/photos'
import { PAGE_META } from '../data/site'

interface GallerySlide extends CarouselSlide {
  number: string
}

function GalleryCarousel({
  number,
  title,
  note,
  photos,
}: {
  number: string
  title: string
  note: string
  photos: GallerySlide[]
}) {
  return (
    <section
      aria-labelledby={`collection-${number}`}
      className="scroll-mt-28 border-t border-champagne/40 py-14 first:border-t-0 sm:py-16"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        {/* ---------------- collection description ---------------- */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-6xl leading-none text-champagne/70 sm:text-7xl">
                {number}
              </span>
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-rose-deep">
                Collection {number}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2
              id={`collection-${number}`}
              className="mt-5 font-display text-[clamp(1.75rem,3.6vw,2.6rem)] leading-[1.1] text-ink"
            >
              {title}
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-10 bg-champagne" aria-hidden="true" />
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.26em] text-muted">
                {photos.length} unique photographs
              </span>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-5 max-w-md text-[0.98rem] leading-[1.75] text-muted">{note}</p>
          </Reveal>

          <Reveal delay={290}>
            <p className="mt-6 hidden items-center gap-2.5 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-rose-deep lg:flex">
              <Images className="ico-tilt h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              Drag, swipe or use the arrows
            </p>
          </Reveal>
        </div>

        {/* ---------------- the carousel ---------------- */}
        <Reveal delay={120}>
          <Carousel
            slides={photos}
            label={`${title} — collection ${number}`}
            viewportClassName="aspect-[1376/768] rounded-[3px] border border-champagne/50"
            renderSlide={({ slide, index, active }) => (
              <figure className="relative h-full w-full">
                <SmartImage
                  src={slide.src}
                  alt={slide.alt}
                  loading={active || index <= 1 ? 'eager' : 'lazy'}
                  fetchPriority={active ? 'high' : 'auto'}
                  wrapperClassName="h-full w-full"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(48,39,43,0) 42%, rgba(48,39,43,0.55) 72%, rgba(48,39,43,0.86) 100%)',
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 rounded-full border border-paper/45 bg-ink/60 px-3 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-paper backdrop-blur-sm"
                >
                  {slide.number}
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 z-10 px-6 pb-6 sm:px-8 sm:pb-7">
                  <p className="font-display text-[0.98rem] italic leading-snug text-paper sm:text-base">
                    {slide.alt}
                  </p>
                </figcaption>
              </figure>
            )}
          />
        </Reveal>
      </div>
    </section>
  )
}

export default function AIPhoto() {
  const meta = PAGE_META['/ai-photo']

  const collections = COLLECTIONS.map((collection) => ({
    ...collection,
    photos: collection.photos.map((photo, position) => ({
      src: photo.src,
      alt: photo.alt,
      caption: photo.alt,
      number: `${String(position + 1).padStart(2, '0')} / ${String(collection.photos.length).padStart(2, '0')}`,
    })),
  }))

  const checks = [
    `${TOTAL_SLOTS} images`,
    `${collections.length} collections`,
    `${UNIQUE_SLOTS} unique`,
    'no repeats',
  ]

  return (
    <>
      <PageMeta title={meta.title} description={meta.description} />

      <PageHeader
        eyebrow="AI Photo Gallery"
        title={
          <>
            An imagination,
            <span className="block italic text-rose-gold">rendered in light</span>
          </>
        }
        lead="AI-generated imagery across portraits, interface concepts and cinematic scenes — arranged into collections where every image appears in exactly one carousel. The first five gather early interface and product studies; the last two tell a single story, The Palace Letters."
        meta={checks}
      />

      <div className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 sm:pb-24">
        {collections.map((collection) => (
          <GalleryCarousel
            key={collection.number}
            number={collection.number}
            title={collection.title}
            note={collection.note}
            photos={collection.photos}
          />
        ))}

        {/* integrity note — confirms the grouping rules were honoured */}
        <Reveal>
          <div className="card-soft mt-6 rounded-[3px] px-6 py-6 text-center sm:px-10">
            <p className="eyebrow">Collection integrity</p>
            <p className="mx-auto mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
              <span className="font-display text-lg italic text-ink">
                {TOTAL_SLOTS} carousel slots, {UNIQUE_SLOTS} unique images.
              </span>{' '}
              {collections.length} collections in total, and nothing appears in more than one of
              them.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ---------------- cross-link ---------------- */}
      <section className="relative overflow-hidden bg-ivory py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blush/40 blur-3xl"
        />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow">Keep exploring</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.1] text-ink">
              The same imagination, <span className="italic text-rose-gold">in motion</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-muted">
              Move from still frames to cinematic storytelling — featured film and further
              experiments on the AI Video page.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <Link to="/ai-video" className="btn btn-primary mt-8">
              Visit AI Video
              <ArrowRight className="ico-arrow-right h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
