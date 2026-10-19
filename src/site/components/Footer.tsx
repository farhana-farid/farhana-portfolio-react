import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import Logo from './Logo'
import { NAV_ITEMS, SITE } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  const toTop = () => {
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden bg-ivory">
      <div className="hairline" aria-hidden="true" />

      {/* soft peach wash behind the footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-peach/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blush/35 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-16 sm:px-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.35fr_1fr_1fr]">
          {/* ---------- brand ---------- */}
          <div>
            <div className="flex items-center gap-4">
              <Logo className="h-14 w-14" />
              <div className="leading-none">
                <p className="font-display text-2xl tracking-[0.1em] text-ink">FARHANA FARID</p>
                <p className="mt-1.5 text-[0.55rem] font-medium uppercase tracking-[0.36em] text-rose-deep">
                  Designer · Developer · AI Creator
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted">
              A creative studio for thoughtful website design, AI-powered imagery and cinematic
              storytelling — where imagination becomes digital experience.
            </p>
          </div>

          {/* ---------- pages ---------- */}
          <nav aria-label="Footer">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.38em] text-muted">
              Pages
            </p>
            <ul className="mt-5 space-y-3.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-2.5 py-1 text-[0.82rem] tracking-[0.14em] text-ink/80 transition-colors duration-300 hover:text-rose-deep"
                  >
                    <span className="h-px w-4 bg-champagne transition-all duration-300 group-hover:w-7 group-hover:bg-rose-gold" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- signature ---------- */}
          <div className="flex flex-col">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.38em] text-muted">
              Signature
            </p>
            <p className="mt-4 font-script text-4xl leading-none text-rose-gold">Farhana Farid</p>
            <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-muted">
              {SITE.signatureAffiliation}
            </p>

            <button
              type="button"
              onClick={toTop}
              className="btn btn-ghost mt-8 self-start !px-5 !py-3 !text-[0.66rem]"
            >
              Back to top
              <ArrowUp className="ico-arrow-up h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-14 border-t border-champagne/45 pt-7">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-[0.68rem] tracking-[0.2em] text-muted">
              © {year} {SITE.name}. All rights reserved.
            </p>
            <p className="text-[0.68rem] tracking-[0.2em] text-muted">
              Designed &amp; built by {SITE.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
