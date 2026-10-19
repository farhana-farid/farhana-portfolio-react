import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import PageMeta from '../components/PageMeta'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import { PAGE_META, SITE } from '../data/site'
import heroImage from '../../assets/hero/hero-cinematic.png'
import { PHOTOS } from '../data/photos'

/* ------------------------------------------------------------------ */
/* Interests — the five values named in the brief                      */
/* ------------------------------------------------------------------ */

const INTERESTS: { title: string; body: string }[] = [
  {
    title: 'Creativity',
    body: 'Treating every project as a chance to make something that did not exist before — and to make it feel considered rather than assembled.',
  },
  {
    title: 'Continuous Learning',
    body: 'Staying curious about new tools, techniques and ideas, then folding what works back into the way I design and build.',
  },
  {
    title: 'Website Design',
    body: 'Planning layout, typography, colour and interaction with equal care so a site reads clearly and feels effortless to use.',
  },
  {
    title: 'AI Exploration',
    body: 'Testing what generative image and video tools can genuinely do — and where human judgement, taste and editing still matter most.',
  },
  {
    title: 'Digital Storytelling',
    body: 'Using sequence, light and pacing to turn a set of individual assets into a story an audience actually wants to follow.',
  },
]

export default function About() {
  const meta = PAGE_META['/about']
  const recentArtwork = [2, 6, 13, 17].map((i) => PHOTOS[i]).filter(Boolean)

  return (
    <>
      <PageMeta title={meta.title} description={meta.description} />

      <PageHeader
        eyebrow="About the Creator"
        title={
          <>
            Meet
            <span className="block italic text-rose-gold">Farhana Farid</span>
          </>
        }
        lead="Website designer, website developer, AI enthusiast and AI content creator — building digital experiences that sit somewhere between clean structure and open imagination."
        meta={['Based online', 'Open to collaborations', 'AI Batch 2 Rajbari']}
      />

      {/* ---------------- about me ---------------- */}
      <section aria-labelledby="about-me" className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">About Me</p>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="about-me"
                className="mt-5 font-display text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.08] text-ink"
              >
                A designer who likes to <span className="italic text-rose-gold">build</span>, too
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-6 text-[1.04rem] leading-[1.8] text-muted">
                I&apos;m an AI enthusiast and website designer who loves turning ambitious ideas into
                polished digital experiences. I work across the full picture of a site — structure,
                layout, type, colour and interaction — and I care just as much about how something
                works as about how it looks.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <p className="mt-5 text-[1.04rem] leading-[1.8] text-muted">
                Alongside web design I create with AI: generating imagery, exploring interfaces and
                shaping short films. For me the two disciplines feed each other — design gives AI
                work intention and clarity, and AI gives design room to be far more ambitious than
                the usual constraints allow.
              </p>
            </Reveal>

            <Reveal delay={270}>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {SITE.roles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-champagne/60 bg-ivory px-4 py-2 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-ink/75 transition-colors duration-300 hover:border-rose-gold hover:text-rose-deep"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---------------- artwork plate ---------------- */}
          <Reveal delay={140}>
            <figure className="relative">
              <div
                aria-hidden="true"
                className="absolute -left-3 -top-3 h-full w-full rounded-[3px] border border-champagne/60"
              />
              <div className="plate relative rounded-[3px]">
                <SmartImage
                  src={heroImage}
                  alt="AI-generated cinematic artwork of a woman in black beneath a glowing golden moon"
                  loading="eager"
                  wrapperClassName="aspect-[318/184] w-full"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3 rounded-[2px] border border-champagne/40"
                />
              </div>

              <figcaption className="mt-4 rounded-[3px] border border-champagne/55 bg-ivory px-4 py-3.5">
                <p className="flex items-start gap-2.5 text-[0.8rem] leading-relaxed text-muted">
                  <Sparkles
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-gold"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-medium text-ink">AI-generated artwork</span> — a creative
                    piece from this portfolio, not a photograph of Farhana.
                  </span>
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------------- creative journey ---------------- */}
      <section
        aria-labelledby="creative-journey"
        className="relative mt-20 overflow-hidden bg-ivory py-20 sm:mt-24 sm:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-blush/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-peach/50 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">My Creative Journey</p>
          </Reveal>

          <Reveal delay={80}>
            <h2
              id="creative-journey"
              className="mt-5 font-display text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.08] text-ink"
            >
              From first layouts to <span className="italic text-rose-gold">generative imagery</span>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-7 text-[1.06rem] leading-[1.85] text-muted">
              My creative journey began the way a lot of good ones do — with curiosity and a screen.
              I started by learning how websites are put together: how a grid holds a page upright,
              how type sets the tone before a single word is read, how small decisions in colour and
              spacing accumulate into something that feels either effortless or clumsy. Building
              those first layouts taught me discipline, and it gave me a foundation I still lean on
              for every project.
            </p>
          </Reveal>

          <Reveal delay={210}>
            <p className="mt-5 text-[1.06rem] leading-[1.85] text-muted">
              From there I became drawn to AI as a creative material rather than a shortcut. I began
              generating imagery, testing interface concepts and learning how to direct these tools
              with enough precision to get results that actually matched an idea in my head. That
              led naturally into video — pacing a sequence, choosing a mood, letting light and
              atmosphere carry a story. The thread running through all of it is the same: a desire
              to keep learning, keep experimenting, and turn imagination into something people can
              see, use and remember.
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-9 grid grid-cols-2 gap-4 border-t border-champagne/50 pt-8 sm:grid-cols-4">
              {[
                ['Website Design', 'Structure & craft'],
                ['AI Imagery', 'Direction & taste'],
                ['AI Video', 'Pacing & story'],
                ['Always Learning', 'The constant'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-display text-lg leading-tight text-ink">{label}</p>
                  <p className="mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-rose-deep">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- interests ---------------- */}
      <section
        aria-labelledby="interests"
        className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="eyebrow">Personal Values</p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="interests"
                className="mt-5 font-display text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.08] text-ink"
              >
                The things that keep me <span className="italic text-rose-gold">curious</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 max-w-md text-[1rem] leading-[1.8] text-muted">
                Five interests shape the way I work and the direction I keep moving in.
              </p>
            </Reveal>
          </div>

          <ol className="divide-y divide-champagne/45 border-y border-champagne/45">
            {INTERESTS.map((interest, index) => (
              <Reveal key={interest.title} delay={index * 70} as="li">
                <div className="group grid grid-cols-[auto_1fr] items-start gap-5 py-7 transition-colors duration-300 sm:gap-7">
                  <span className="font-display text-3xl leading-none text-champagne transition-colors duration-300 group-hover:text-rose-gold sm:text-4xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-ink transition-colors duration-300 group-hover:text-rose-gold sm:text-[1.7rem]">
                      {interest.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-[0.98rem] leading-[1.75] text-muted">
                      {interest.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- small gallery strip ---------------- */}
      <section className="bg-paper pb-4" aria-label="Recent AI artwork">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow">Recent Work</p>
            </Reveal>
            <Reveal delay={80}>
              <Link
                to="/ai-photo"
                className="group inline-flex items-center gap-2 py-1 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-rose-deep"
              >
                Full gallery
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {recentArtwork.map((photo, index) => (
              <Reveal key={photo.slug} delay={index * 70}>
                <Link to="/ai-photo" className="group block">
                  <SmartImage
                    src={photo.src}
                    alt={photo.alt}
                    wrapperClassName="aspect-[4/3] w-full rounded-[3px] border border-champagne/50"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- signature ---------------- */}
      <section className="mx-auto w-full max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-28">
        <Reveal>
          <div className="mx-auto flex w-full max-w-sm items-center gap-5">
            <span className="h-px flex-1 bg-champagne" aria-hidden="true" />
            <span className="text-[0.58rem] font-medium uppercase tracking-[0.36em] text-muted">
              Signature
            </span>
            <span className="h-px flex-1 bg-champagne" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-9 font-script text-[clamp(3rem,9vw,4.75rem)] leading-none text-rose-gold">
            Farhana Farid
          </p>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-5 text-[0.68rem] font-medium uppercase tracking-[0.4em] text-muted">
            AI Batch 2 Rajbari
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/ai-photo" className="btn btn-primary">
              View My Work
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </Link>
            <Link to="/ai-video" className="btn btn-ghost">
              Watch My Videos
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
