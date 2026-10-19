import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import PageMeta from '../components/PageMeta'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import Carousel, { type CarouselSlide } from '../components/Carousel'
import { PHOTOS, COLLECTIONS, TOTAL_SLOTS, COLLECTION_COUNT } from '../data/photos'
import { STORY_STILLS } from '../data/story'
import { VIDEOS } from '../data/videos'
import { PAGE_META, SITE } from '../data/site'
import heroImage from '../../assets/hero/hero-cinematic.png'

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const meta = PAGE_META['/']

  return (
    <section className="relative isolate flex min-h-[42rem] items-center overflow-hidden lg:min-h-[92vh]">
      <PageMeta title={meta.title} description={meta.description} />

      {/* ---------------- full-bleed artwork ----------------
          A blurred copy fills the frame, then the real picture is drawn
          on top with `object-fit: contain` so the whole artwork is always
          visible at every screen size — nothing is ever cropped. */}
      <div className="hero-media" aria-hidden="true">
        <img src={heroImage} alt="" className="hero-backdrop" draggable={false} />
      </div>

      <div className="hero-media">
        <SmartImage
          src={heroImage}
          alt="Cinematic artwork of a woman in black beneath a glowing golden moon — the hero piece of the Farhana Farid portfolio"
          loading="eager"
          fetchPriority="high"
          wrapperClassName="hero-artwork-wrap"
        />
      </div>

      {/* scrim so the copy reads clearly over the artwork.
          Strengthened where the text column sits (left half) so no bright
          part of the artwork can sit behind a letter. */}
      <div
        aria-hidden="true"
        className="hero-scrim"
        style={{
          background:
            'linear-gradient(100deg, rgba(26,18,21,0.93) 0%, rgba(28,20,23,0.90) 26%, rgba(30,22,25,0.80) 46%, rgba(36,26,30,0.44) 64%, rgba(48,39,43,0.10) 82%, rgba(48,39,43,0) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="hero-scrim"
        style={{
          background:
            'linear-gradient(0deg, rgba(24,17,19,0.72) 0%, rgba(26,18,21,0.40) 30%, rgba(30,22,25,0.12) 55%, rgba(48,39,43,0) 75%)',
        }}
      />
      {/* flat wash under the text zone only, on narrow screens where the
          gradient runs out of room before the text does */}
      <div
        aria-hidden="true"
        className="hero-scrim lg:hidden"
        style={{ background: 'rgba(26,18,21,0.52)' }}
      />

      {/* drifting warm haze, decorative */}
      <div
        aria-hidden="true"
        className="hero-haze pointer-events-none absolute -bottom-16 left-[8%] h-72 w-[46%] rounded-full bg-peach/25 blur-3xl"
      />

      {/* slow light sweep across the full frame, runs once */}
      <span
        aria-hidden="true"
        className="hero-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,252,250,0) 0%, rgba(255,252,250,0.16) 50%, rgba(255,252,250,0) 100%)',
        }}
      />

      {/* ---------------- copy, over the artwork ---------------- */}
      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow !text-champagne">AI Creator &amp; Website Designer</p>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-7 font-display text-[clamp(1.4rem,3vw,1.9rem)] italic leading-none text-peach">
              Hello, I&apos;m
            </p>
          </Reveal>

          <Reveal delay={140}>
            <h1 className="mt-2 font-display text-[clamp(2.9rem,8.5vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.02em] text-paper">
              Farhana
              <span className="block text-champagne">Farid</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-16 bg-champagne/80" aria-hidden="true" />
              <p className="text-[0.66rem] font-medium uppercase tracking-[0.3em] text-paper/85">
                Designer · Developer · AI Enthusiast
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-7 max-w-xl text-[1.06rem] leading-[1.75] text-paper/90">
              Turning imagination into digital experiences — through thoughtful websites, AI-powered
              imagery and cinematic storytelling. Every frame, layout and interaction is a chance to
              make something beautiful.
            </p>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/ai-photo" className="btn btn-primary">
                View My Work
                <ArrowRight className="ico-arrow-right h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              </Link>
              <Link to="/about" className="btn btn-ghost !border-paper/45 !text-paper">
                About Me
              </Link>
            </div>
          </Reveal>

          <Reveal delay={460}>
            <p className="mt-9 font-script text-3xl leading-none text-champagne">Farhana Farid</p>
          </Reveal>
        </div>

        {/* caption, bottom-right, over the darker part of the frame */}
        <figcaption className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-paper/70 lg:absolute lg:bottom-6 lg:right-8 lg:mt-0">
          <span className="flex items-center gap-2">
            <Sparkles className="icon-twinkle h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
            Cinematic study · AI-generated artwork
          </span>
        </figcaption>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Featured work                                                       */
/* ------------------------------------------------------------------ */

function FeaturedWork() {
  const [a, b, c] = PHOTOS
  const previewVideo = VIDEOS[0]

  return (
    <section className="relative bg-paper py-20 sm:py-24" aria-labelledby="featured-heading">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">Selected Work</p>
        </Reveal>

        <div className="mt-5 grid grid-cols-1 items-end gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal delay={80}>
            <h2
              id="featured-heading"
              className="font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.05] text-ink"
            >
              A gallery of <span className="italic text-rose-gold">imagined</span> worlds
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-[1rem] leading-relaxed text-muted lg:pb-2">
              AI-generated imagery gathered into considered collections, plus cinematic video
              experiments — each one built as a designed experience rather than a simple image dump.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-2">
          {/* ---------------- AI photo ---------------- */}
          <Reveal delay={120}>
            <Link
              to="/ai-photo"
              className="group card-soft relative flex h-full flex-col overflow-hidden rounded-[3px] p-4 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative grid grid-cols-3 gap-2" aria-hidden="true">
                {[a, b, c].filter(Boolean).map((photo, i) => (
                  <SmartImage
                    key={photo.slug}
                    src={photo.src}
                    alt=""
                    wrapperClassName={`aspect-[4/5] w-full ${i === 1 ? 'translate-y-3' : ''}`}
                    className="object-cover"
                  />
                ))}
                <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper via-paper/70 to-transparent" />
              </div>

              <div className="relative mt-4 flex flex-1 flex-col px-2 pb-2">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">AI Photo</p>
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.24em] text-muted">
                    {TOTAL_SLOTS} images
                  </p>
                </div>
                <h3 className="mt-3 font-display text-3xl text-ink transition-colors duration-300 group-hover:text-rose-gold">
                  {COLLECTION_COUNT} collections of AI photography
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                  Portraits, interface concepts and cinematic scenes — browsable one considered
                  carousel at a time.
                </p>
                <span className="mt-5 inline-flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-rose-deep">
                  Open the gallery
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* ---------------- AI video ---------------- */}
          <Reveal delay={220}>
            <Link
              to="/ai-video"
              className="group card-soft relative flex h-full flex-col overflow-hidden rounded-[3px] p-4 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-[2px] bg-ink">
                {previewVideo ? (
                  <video
                    className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                    src={previewVideo.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    onMouseEnter={(event) => {
                      void event.currentTarget.play().catch(() => undefined)
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.pause()
                      event.currentTarget.currentTime = 0
                    }}
                  />
                ) : null}

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(48,39,43,0.18) 0%, rgba(48,39,43,0.05) 40%, rgba(48,39,43,0.7) 100%)',
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-champagne/70 bg-ink/35 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-paper" aria-hidden="true">
                    <path d="M8 5.14v13.72L19 12 8 5.14Z" />
                  </svg>
                </span>
                <span className="absolute bottom-4 left-5 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-paper/90">
                  Hover to preview
                </span>
              </div>

              <div className="relative mt-4 flex flex-1 flex-col px-2 pb-2">
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">AI Video</p>
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.24em] text-muted">
                    Featured film
                  </p>
                </div>
                <h3 className="mt-3 font-display text-3xl text-ink transition-colors duration-300 group-hover:text-rose-gold">
                  Cinematic stories in motion
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                  Watch the featured film, then explore further experiments in pacing, light and
                  atmosphere.
                </p>
                <span className="mt-5 inline-flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-rose-deep">
                  Watch the films
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Homepage slider — every image in the folder, discovered at build time*/
/* ------------------------------------------------------------------ */

interface HomeSlide extends CarouselSlide {
  slug: string
}

const HOME_SLIDES: HomeSlide[] = PHOTOS.map((photo) => ({
  src: photo.src,
  alt: photo.alt,
  caption: photo.alt,
  eyebrow: COLLECTIONS.find((collection) =>
    collection.photos.some((item) => item.key === photo.slug),
  )?.title,
  slug: photo.slug,
})).concat(
  // the story stills belong in the slider as well — they are part of the work
  STORY_STILLS.map((still) => ({
    src: still.src,
    alt: still.alt,
    caption: still.alt,
    eyebrow: 'The Palace Letters',
    slug: still.slug,
  })),
)

function HomeSlider() {
  return (
    <section className="relative overflow-hidden bg-ivory py-20 sm:py-24" aria-labelledby="slider-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-peach/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-10 h-72 w-72 rounded-full bg-blush/35 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">In Rotation</p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="slider-heading"
                className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] text-ink"
              >
                Every image, <span className="italic text-rose-gold">one glide</span> at a time
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted sm:text-right">
              A continuous showcase of the full collection. Swipe, use the arrows, or simply let it
              play.
            </p>
          </Reveal>
        </div>

        <Reveal delay={220} className="mt-10">
          <Carousel
            slides={HOME_SLIDES}
            label="Featured AI artwork carousel"
            autoplay={5200}
            viewportClassName="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1] rounded-[3px] border border-champagne/50"
            renderSlide={({ slide, active }) => (
              <figure className="relative h-full w-full">
                <SmartImage
                  src={slide.src}
                  alt={slide.alt}
                  loading={active ? 'eager' : 'lazy'}
                  fetchPriority={active ? 'high' : 'auto'}
                  wrapperClassName="h-full w-full"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(48,39,43,0) 40%, rgba(48,39,43,0.55) 70%, rgba(48,39,43,0.86) 100%)',
                  }}
                />
                <figcaption className="absolute inset-x-0 bottom-0 z-10 px-6 pb-7 sm:px-9 sm:pb-8">
                  {slide.eyebrow ? (
                    <p className="text-[0.58rem] font-medium uppercase tracking-[0.3em] text-champagne">
                      {slide.eyebrow}
                    </p>
                  ) : null}
                  <p className="mt-2 max-w-2xl font-display text-lg leading-snug text-paper sm:text-xl">
                    {slide.eyebrow ? `${slide.eyebrow} — ` : ''}
                    <span className="italic">AI-generated artwork</span> by {SITE.name}
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

/* ------------------------------------------------------------------ */
/* Creator introduction                                                 */
/* ------------------------------------------------------------------ */

function CreatorIntro() {
  return (
    <section className="relative bg-paper py-20 sm:py-24" aria-labelledby="creator-heading">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -left-3 -top-3 h-full w-full rounded-[3px] border border-champagne/60"
              />
              <div className="relative grid grid-cols-2 gap-3 bg-ivory p-3">
                {PHOTOS.slice(16, 20).map((photo) => (
                  <SmartImage
                    key={photo.slug}
                    src={photo.src}
                    alt={photo.alt}
                    wrapperClassName="aspect-[4/3] w-full"
                    className="object-cover"
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={90}>
              <p className="eyebrow">The Creator</p>
            </Reveal>
            <Reveal delay={150}>
              <h2
                id="creator-heading"
                className="mt-5 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] text-ink"
              >
                Design that feels <span className="italic text-rose-gold">considered</span>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 text-[1.02rem] leading-[1.8] text-muted">
                I design and build websites, then push them further with AI — generating imagery,
                motion and short films that give a project its own atmosphere. My work sits at the
                meeting point of structure and imagination: clean, usable interfaces on one side,
                cinematic visual storytelling on the other.
              </p>
            </Reveal>
            <Reveal delay={290}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {['Creativity', 'Continuous Learning', 'Website Design', 'AI Exploration', 'Digital Storytelling'].map(
                  (value) => (
                    <li
                      key={value}
                      className="rounded-full border border-champagne/60 bg-ivory px-4 py-2 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-ink/75 transition-colors duration-300 hover:border-rose-gold hover:text-rose-deep"
                    >
                      {value}
                    </li>
                  ),
                )}
              </ul>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link to="/about" className="btn btn-dark">
                  Meet the Creator
                  <ArrowRight className="ico-arrow-right h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                </Link>
                <p className="font-script text-3xl leading-none text-rose-gold">Farhana Farid</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <HomeSlider />
      <CreatorIntro />
    </>
  )
}
