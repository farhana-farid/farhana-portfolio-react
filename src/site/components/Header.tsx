import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import { NAV_ITEMS } from '../data/site'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'group relative py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300',
    isActive ? 'text-rose-deep' : 'text-ink/75 hover:text-rose-deep',
  ].join(' ')

const indicatorClass = (isActive: boolean) =>
  [
    'pointer-events-none absolute -bottom-0.5 left-0 h-px bg-rose-gold transition-all duration-500',
    isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60',
  ].join(' ')

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  /* ---- scrolled state ------------------------------------------------ */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ---- close the drawer whenever the route changes ------------------- */
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  /* ---- drawer behaviour: scroll lock, escape, focus ------------------ */
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? 'border-b border-champagne/45 bg-paper/92 backdrop-blur-md'
            : 'border-b border-transparent bg-paper/70 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20">
          {/* ---------- brand ---------- */}
          <Link
            to="/"
            aria-label="Farhana Farid — home"
            className="group flex items-center gap-3"
          >
            <Logo
              className="h-10 w-10 transition-transform duration-500 group-hover:-rotate-6 lg:h-12 lg:w-12"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.0625rem] font-medium tracking-[0.12em] text-ink sm:text-lg">
                FARHANA FARID
              </span>
              <span className="mt-1 hidden text-[0.55rem] font-medium uppercase tracking-[0.42em] text-muted sm:block">
                Designer · Developer · AI Creator
              </span>
            </span>
          </Link>

          {/* ---------- desktop nav ---------- */}
          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span className={indicatorClass(isActive)} aria-hidden="true" />
                  </>
                )}
              </NavLink>
            ))}
            <Link
              to="/ai-photo"
              className="btn btn-primary hidden !px-6 !py-3 !text-[0.68rem] xl:inline-flex"
            >
              Explore My Work
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </nav>

          {/* ---------- mobile toggle ---------- */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            className="ctl !h-11 !w-11 lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* ---------- mobile drawer ---------- */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div
          className="fixed inset-0 -z-10 bg-ink/35 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div className="mx-auto mt-0 w-full max-w-7xl border-b border-champagne/50 bg-paper px-5 pb-8 pt-4 shadow-[0_24px_48px_-28px_rgba(48,39,43,0.35)] sm:px-8">
          <div className="flex items-center justify-between">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-muted">
              Navigation
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOpen(false)
                toggleRef.current?.focus()
              }}
              className="ctl !h-10 !w-10"
              aria-label="Close navigation menu"
            >
              <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-5 flex flex-col">
            {NAV_ITEMS.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'flex items-baseline gap-4 border-t border-champagne/35 py-4 font-display text-2xl transition-colors duration-300',
                    isActive ? 'text-rose-gold' : 'text-ink hover:text-rose-gold',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="font-sans text-[0.6rem] font-medium tracking-[0.2em] text-champagne">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{item.label}</span>
                    {isActive ? (
                      <span
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-rose-gold"
                        aria-hidden="true"
                      />
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <Link to="/ai-photo" className="btn btn-primary mt-6 w-full">
            Explore My Work
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  )
}
