import { Link } from 'react-router-dom'
import { ArrowRight, Clapperboard, ExternalLink, Film, Sparkles } from 'lucide-react'
import PageMeta from '../components/PageMeta'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import VideoEmbed from '../components/VideoEmbed'
import { VIDEOS } from '../data/videos'
import { PAGE_META, SITE } from '../data/site'

/**
 * "More projects" grid.
 *
 * Every card is driven by the `VIDEOS` collection (src/site/data/videos.ts),
 * which discovers whatever files sit in `src/assets/videos/`. Dropping a new
 * clip into that folder — or appending one more entry to `VIDEOS` — extends
 * this section automatically with no change to the layout.
 */
function MoreProjects() {
  return (
    <section
      aria-labelledby="more-projects"
      className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <Reveal>
            <p className="eyebrow">More Projects</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              id="more-projects"
              className="mt-4 font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.08] text-ink"
            >
              Further experiments in <span className="italic text-rose-gold">motion</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <p className="max-w-md text-[0.95rem] leading-relaxed text-muted sm:text-right">
            Character pieces, product films and atmosphere studies — each one a different problem in
            pacing, light and story.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((video, index) => (
          <Reveal key={video.src} delay={index * 90}>
            <article className="card-soft group flex h-full flex-col overflow-hidden rounded-[3px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
              <div className="relative aspect-video w-full overflow-hidden bg-ink">
                <video
                  className="h-full w-full object-contain"
                  src={video.src}
                  controls
                  preload="metadata"
                  playsInline
                  title={video.title}
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-[0.58rem] font-medium uppercase tracking-[0.26em] text-rose-deep">
                    <Film className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
                    {video.tag}
                  </span>
                  <span className="text-[0.58rem] font-medium tracking-[0.24em] text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl leading-snug text-ink">{video.title}</h3>
                <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-muted">
                  {video.description}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* how this section grows */}
      <Reveal delay={200}>
        <div className="mt-12 flex flex-col items-start gap-5 rounded-[3px] border border-champagne/55 bg-ivory px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <div className="flex items-start gap-4">
            <Clapperboard
              className="mt-1 h-5 w-5 shrink-0 text-rose-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p className="font-display text-xl text-ink">Built to keep growing</p>
              <p className="mt-1.5 max-w-2xl text-[0.93rem] leading-relaxed text-muted">
                New films are added to this shelf as they are finished — each one slotted into the
                same card layout, so the page never needs redesigning to fit the next project.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function AIVideo() {
  const meta = PAGE_META['/ai-video']

  return (
    <>
      <PageMeta title={meta.title} description={meta.description} />

      <PageHeader
        eyebrow="AI Video Creations"
        title={
          <>
            Cinematic stories
            <span className="block italic text-rose-gold">brought to life with AI</span>
          </>
        }
        lead="Cinematic stories and creative experiments brought to life through AI and visual storytelling — from character-driven shorts to polished product films."
        meta={['Featured film', 'Character shorts', 'Product films']}
      />

      {/* ---------------- featured film ---------------- */}
      <section
        aria-labelledby="featured-film"
        className="mx-auto w-full max-w-6xl px-5 pb-6 sm:px-8"
      >
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Featured Film</p>
              <h2
                id="featured-film"
                className="mt-4 font-display text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.08] text-ink"
              >
                {SITE.videoTitle}
              </h2>
            </div>
            <p className="inline-flex items-center gap-2.5 text-[0.6rem] font-medium uppercase tracking-[0.26em] text-rose-deep sm:pb-2">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              YouTube · 16:9 player
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-8">
          <VideoEmbed title={SITE.videoTitle} />
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-champagne/45 pt-8 sm:grid-cols-3">
            {[
              ['Format', 'Responsive 16:9 embed'],
              ['Playback', 'Never starts with sound'],
              ['Source', 'Hosted on YouTube'],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[0.58rem] font-medium uppercase tracking-[0.3em] text-rose-deep">
                  {label}
                </p>
                <p className="mt-2 text-[0.95rem] text-muted">{value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------- further projects ---------------- */}
      <MoreProjects />

      {/* ---------------- closing ---------------- */}
      <section className="relative overflow-hidden bg-ivory py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-peach/50 blur-3xl"
        />
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow">Continue</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.1] text-ink">
              Still frames, <span className="italic text-rose-gold">equally considered</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-muted">
              Browse the twenty-piece AI photography gallery — five collections, four unique
              images in each.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/ai-photo" className="btn btn-primary">
                Open AI Photo Gallery
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              </Link>
              <a
                href={SITE.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Watch on YouTube
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
