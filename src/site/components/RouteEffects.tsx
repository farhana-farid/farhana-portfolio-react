import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Keeps the document in a sane state across route changes:
 *  - returns the page to the top on navigation (unless a hash target exists)
 *  - moves focus to the main landmark so keyboard and screen-reader users
 *    start at the newly rendered page
 *
 * The very first render is left alone so the browser's own focus behaviour
 * is not interrupted on initial load.
 */
export default function RouteEffects() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    const skip = firstRender.current
    firstRender.current = false

    if (hash) {
      const target = document.querySelector<HTMLElement>(hash)
      if (target) {
        target.scrollIntoView({ block: 'start' })
        if (!skip) target.focus({ preventScroll: true })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    if (!skip) {
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [pathname, hash])

  return null
}
