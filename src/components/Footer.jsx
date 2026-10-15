import { ArrowUp, Mail } from 'lucide-react'
import { SOCIALS } from '../data'

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <footer className="border-t-2 border-ink bg-ink py-10 text-paper">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl uppercase tracking-tight">Farhana Farid</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/70">
              AI Enthusiast &amp; Web Developer. Building AI-integrated full-stack applications with clean UI/UX.
            </p>
            <a
              href="mailto:farhanafarid41@gmail.com"
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-paper hover:text-navy-soft"
            >
              <Mail className="h-4 w-4" /> farhanafarid41@gmail.com
            </a>
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper/60">Navigate</p>
            <ul className="mt-3 space-y-2">
              {['home', 'about', 'skills', 'projects', 'education', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-mono text-xs font-bold uppercase tracking-wider text-paper/80 hover:text-paper"
                  >
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper/60">Elsewhere</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-paper bg-transparent px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-paper hover:bg-paper hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={toTop}
              className="mt-6 inline-flex items-center gap-2 border-2 border-paper bg-paper px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="mt-8 border-t border-paper/20 pt-6 text-center font-mono text-[11px] font-bold uppercase tracking-wider text-paper/60">
          © {new Date().getFullYear()} Tiya Hossain. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
