import logo from '../../assets/logo/ff-monogram.jpg'

interface LogoProps {
  /** CSS size of the mark, e.g. "h-11 w-11" */
  className?: string
  /** decorative when a text label sits next to it */
  decorative?: boolean
}

/**
 * The original FF Monogram asset, used verbatim in the header, footer and
 * as the source for the browser favicon. Proportions are preserved — the
 * image is always square and is never recoloured or redrawn.
 */
export default function Logo({ className = 'h-11 w-11', decorative = false }: LogoProps) {
  return (
    <span className={`relative block shrink-0 rounded-full ${className}`}>
      <img
        src={logo}
        alt={decorative ? '' : 'FF Monogram — Farhana Farid'}
        width={1254}
        height={1254}
        className="h-full w-full rounded-full object-cover"
        style={{ boxShadow: '0 0 0 1px rgba(216,183,122,0.65), 0 6px 16px -8px rgba(183,110,121,0.55)' }}
      />
    </span>
  )
}
