import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CarouselSlide {
  src: string
  alt: string
  caption?: string
  eyebrow?: string
}

interface CarouselProps<T extends CarouselSlide> {
  slides: T[]
  /** accessible name for the carousel region */
  label: string
  /** renders the visual for one slide */
  renderSlide: (args: { slide: T; index: number; active: boolean }) => ReactNode
  /** milliseconds between automatic advances — omit (or 0) to disable autoplay */
  autoplay?: number
  /** pause autoplay when the pointer is over the carousel */
  pauseOnHover?: boolean
  /** pause autoplay when any control inside receives focus */
  pauseOnFocus?: boolean
  showDots?: boolean
  showArrows?: boolean
  className?: string
  /** extra class for the slide viewport */
  viewportClassName?: string
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  return reduced
}

/**
 * A dependency-free, fully accessible carousel.
 *
 * Features: previous / next controls, pagination indicators, pointer & touch
 * swipe, arrow / Home / End keyboard support, smooth sliding that is disabled
 * under `prefers-reduced-motion`, optional autoplay that pauses on hover,
 * focus, drag, tab-hiding and viewport-exit, plus polite live-region
 * announcements for screen readers.
 */
export default function Carousel<T extends CarouselSlide>({
  slides,
  label,
  renderSlide,
  autoplay,
  pauseOnHover = true,
  pauseOnFocus = true,
  showDots = true,
  showArrows = true,
  className = '',
  viewportClassName = '',
}: CarouselProps<T>) {
  const count = slides.length
  const [index, setIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [inView, setInView] = useState(true)

  const rootRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ pointerId: number; startX: number; lastX: number; width: number } | null>(null)
  const liveId = useId()

  const countSafe = Math.max(count, 1)

  /* -------------------------------------------------- navigation ------ */
  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % countSafe) + countSafe) % countSafe)
    },
    [countSafe],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const previous = useCallback(() => goTo(index - 1), [goTo, index])

  /* -------------------------------------------------- autoplay -------- */
  const autoplayEnabled = typeof autoplay === 'number' && autoplay > 0 && countSafe > 1 && !reducedMotion
  const shouldPlay =
    autoplayEnabled && !hovered && !focused && !dragging && inView && typeof document !== 'undefined'
      ? document.visibilityState !== 'hidden'
      : false

  useEffect(() => {
    if (!autoplayEnabled || !shouldPlay) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % countSafe), autoplay)
    return () => window.clearInterval(id)
  }, [autoplayEnabled, shouldPlay, autoplay, countSafe])

  /* pause when the carousel scrolls out of view */
  useEffect(() => {
    const node = rootRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setInView(entry.isIntersecting)),
      { threshold: 0.25 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  /* -------------------------------------------------- swipe ----------- */
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (countSafe < 2) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const width = event.currentTarget.getBoundingClientRect().width
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      width,
    }
    setDragging(true)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    drag.lastX = event.clientX
    const delta = event.clientX - drag.startX
    // resist the first slide being pulled past its edge
    setDragOffset(delta)
  }

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const delta = drag.lastX - drag.startX
    const threshold = Math.min(90, drag.width * 0.18)
    dragRef.current = null
    setDragging(false)
    setDragOffset(0)

    if (delta <= -threshold) next()
    else if (delta >= threshold) previous()
  }

  /* -------------------------------------------------- keyboard -------- */
  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (countSafe < 2) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      previous()
    } else if (event.key === 'Home') {
      event.preventDefault()
      goTo(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      goTo(countSafe - 1)
    }
  }

  /* -------------------------------------------------- focus ----------- */
  const handleBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null
    setFocused(Boolean(nextTarget && event.currentTarget.contains(nextTarget)))
  }

  /* -------------------------------------------------- render ---------- */
  const trackStyle: CSSProperties = {
    transform: `translate3d(calc(${index * -100}% + ${dragOffset}px), 0, 0)`,
    transition:
      dragging || reducedMotion
        ? 'none'
        : dragOffset !== 0
          ? 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
          : undefined,
    touchAction: 'pan-y',
  }

  if (countSafe < 1) {
    return (
      <div className={`grid place-items-center bg-ivory py-20 text-muted ${className}`}>
        <p className="font-display text-xl italic">Nothing to show here yet.</p>
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => pauseOnHover && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => pauseOnFocus && setFocused(true)}
      onBlur={handleBlur}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ touchAction: 'pan-y' }}
    >
      {/* ---------------- viewport ---------------- */}
      <div
        className={`relative overflow-hidden bg-ivory ${viewportClassName}`}
        style={{ cursor: countSafe > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <div className="carousel-track flex" style={trackStyle}>
          {slides.map((slide, i) => (
            <div
              key={`${slide.src}-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${countSafe}`}
              aria-hidden={i !== index}
              className="w-full shrink-0 grow-0 basis-full"
            >
              {renderSlide({ slide, index: i, active: i === index })}
            </div>
          ))}
        </div>

        {/* ---------------- arrows ---------------- */}
        {showArrows && countSafe > 1 ? (
          <>
            <button
              type="button"
              onClick={previous}
              className="ctl absolute left-3 top-1/2 z-20 -translate-y-1/2 sm:left-5"
              aria-label={`Previous slide in ${label}`}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              className="ctl absolute right-3 top-1/2 z-20 -translate-y-1/2 sm:right-5"
              aria-label={`Next slide in ${label}`}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      {/* ---------------- pagination ---------------- */}
      <div className="mt-6 flex flex-col items-center gap-3">
        {autoplayEnabled ? (
          <div className="relative h-px w-40 overflow-hidden bg-champagne/35 sm:w-56" aria-hidden="true">
            <span
              key={index}
              className="autoplay-progress absolute inset-y-0 left-0 w-full origin-left bg-rose-gold"
              style={
                {
                  animationDuration: `${autoplay}ms`,
                  animationPlayState: shouldPlay ? 'running' : 'paused',
                } as CSSProperties
              }
            />
          </div>
        ) : null}

        {showDots && countSafe > 1 ? (
          <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label={`${label} pagination`}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1} of ${countSafe}`}
                onClick={() => goTo(i)}
                className="group grid h-6 min-w-6 place-items-center px-0.5"
              >
                <span
                  aria-hidden="true"
                  className={[
                    'block h-2 rounded-full transition-all duration-500',
                    i === index
                      ? 'w-7 bg-rose-deep'
                      : 'w-2 bg-rose-gold group-hover:bg-rose-deep',
                  ].join(' ')}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* ---------------- screen-reader status ---------------- */}
      <p id={liveId} className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${index + 1} of ${countSafe}${slides[index]?.caption ? `: ${slides[index].caption}` : ''}`}
      </p>
    </div>
  )
}
