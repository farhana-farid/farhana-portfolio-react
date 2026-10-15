import { useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../theme'
import { NAV_ITEMS } from '../data'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = useCallback((id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="h-1.5 origin-left bg-sky"
      />
      <div
        className={`mx-auto w-full max-w-6xl px-4 transition-all duration-300 sm:px-6 ${
          scrolled ? 'pt-2' : 'pt-3 sm:pt-5'
        }`}
      >
        <nav
          aria-label="Primary"
          className={`relative flex items-center justify-between gap-3 px-3 transition-all duration-300 ${
            scrolled
              ? 'border-2 border-ink bg-card py-2.5 shadow-brutal sm:px-4'
              : 'border-2 border-transparent bg-transparent py-2.5 sm:px-4'
          }`}
        >
          <button
            type="button"
            onClick={() => go('home')}
            className="flex items-center gap-2.5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-navy font-black text-on-navy shadow-brutal-sm">
              T
            </span>
            <span className="font-display text-sm uppercase leading-none tracking-tight text-ink">
              Farhana Farid
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => go(n.id)}
                className="px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-navy hover:text-on-navy"
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-8 w-8 place-items-center border-2 border-ink bg-paper text-ink shadow-brutal-sm transition-colors hover:bg-navy hover:text-on-navy"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              className="grid h-8 w-8 place-items-center border-2 border-ink bg-paper text-ink shadow-brutal-sm transition-colors hover:bg-navy hover:text-on-navy lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 bg-paper/80 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-72 border-l-2 border-ink bg-card p-6 shadow-brutal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => go(n.id)}
                  className="border-2 border-ink bg-paper px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider text-ink hover:bg-navy hover:text-on-navy"
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
