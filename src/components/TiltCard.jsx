import { useEffect, useRef } from 'react'

/**
 * TiltCard
 *
 * Wraps content in a 3D card that leans toward the cursor, the same way the
 * mascot itself reacts. The pointer is tracked across the whole window (not
 * just over the card) and normalised against the viewport, so the full tilt
 * range is reachable from the screen edges.
 *
 * A single requestAnimationFrame loop lerps toward the target so the card
 * glides instead of snapping between raw pointer positions.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 14,
  glare = false,
}) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const glareRef = useRef(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const LERP = 0.12
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let active = false
    let rafId = null

    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

    const setTarget = (clientX, clientY) => {
      const rect = outer.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const spanX = window.innerWidth / 2 || 1
      const spanY = window.innerHeight / 2 || 1

      target.x = clamp((clientX - centerX) / spanX, -1, 1)
      target.y = clamp((clientY - centerY) / spanY, -1, 1)
      active = true
    }

    const render = () => {
      const goalX = active ? target.x : 0
      const goalY = active ? target.y : 0

      current.x += (goalX - current.x) * LERP
      current.y += (goalY - current.y) * LERP

      const rotateX = -current.y * maxTilt
      const rotateY = current.x * maxTilt
      inner.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`

      if (glareRef.current) {
        if (active) {
          const gx = (current.x * 0.5 + 0.5) * 100
          const gy = (current.y * 0.5 + 0.5) * 100
          glareRef.current.style.opacity = '1'
          glareRef.current.style.background = `radial-gradient(circle at ${gx.toFixed(1)}% ${gy.toFixed(1)}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`
        } else {
          glareRef.current.style.opacity = '0'
        }
      }

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    const onPointerMove = (e) => setTarget(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      if (e.touches.length > 0) setTarget(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onLeave = () => {
      active = false
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('blur', onLeave)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [maxTilt])

  return (
    <div ref={outerRef} className={className} style={{ perspective: '1200px' }}>
      <div
        ref={innerRef}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform', position: 'relative' }}
      >
        {glare && <div ref={glareRef} className="mascot-layer-glare" />}
        {children}
      </div>
    </div>
  )
}