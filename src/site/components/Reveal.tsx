import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** stagger delay in milliseconds */
  delay?: number
  /** element to render */
  as?: ElementType
  /** distance of the initial offset, in pixels */
  offset?: number
}

/**
 * Subtle scroll-in animation built on IntersectionObserver.
 * Falls back to fully visible content when the user prefers reduced motion
 * or when IntersectionObserver is unavailable.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  offset = 26,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{
        transitionDelay: visible && delay ? `${delay}ms` : undefined,
        ...(visible ? {} : { transform: `translateY(${offset}px)` }),
      }}
    >
      {children}
    </Tag>
  )
}
