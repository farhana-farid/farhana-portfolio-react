import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import PageMeta from '../components/PageMeta'
import Reveal from '../components/Reveal'
import { NAV_ITEMS } from '../data/site'

export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <section className="relative overflow-hidden">
      <PageMeta
        title="Page Not Found — Farhana Farid"
        description="The page you were looking for could not be found."
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]"
        style={{
          background:
            'linear-gradient(180deg, #FFF8F3 0%, rgba(248,216,206,0.4) 55%, rgba(255,252,250,0) 100%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-2xl px-5 pb-28 pt-40 text-center sm:px-8 sm:pt-44">
        <Reveal>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-champagne/70 bg-paper">
            <Compass className="h-7 w-7 text-rose-gold" strokeWidth={1.4} aria-hidden="true" />
          </span>
        </Reveal>

        <Reveal delay={90}>
          <p className="eyebrow mt-8">404</p>
        </Reveal>

        <Reveal delay={150}>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,3.6rem)] leading-[1.05] text-ink">
            This page has drifted
            <span className="block italic text-rose-gold">out of frame</span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 text-[1rem] leading-relaxed text-muted">
            Nothing lives at{' '}
            <code className="rounded bg-ivory px-2 py-1 text-[0.9em] text-ink">{pathname}</code>.
            Try one of the pages below instead.
          </p>
        </Reveal>

        <Reveal delay={290}>
          <nav aria-label="Recovery" className="mt-9 flex flex-wrap justify-center gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="btn btn-ghost !px-5 !py-3 !text-[0.68rem]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Reveal>

        <Reveal delay={360}>
          <Link to="/" className="btn btn-primary mt-7">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            Back to home
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
