import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

interface ProgressiveBlurProps {
  blurIntensity?: number
  direction?: 'top' | 'bottom' | 'left' | 'right'
  style?: CSSProperties
  className?: string
}

const DIR_MAP: Record<string, string> = {
  top: 'to bottom',
  bottom: 'to top',
  left: 'to right',
  right: 'to left',
}

const LAYERS = 8

export function ProgressiveBlur({ blurIntensity = 8, direction = 'bottom', style, className }: ProgressiveBlurProps) {
  const gradDir = DIR_MAP[direction]

  // Tent function centers at 0%, 14.3%, 28.6%, ..., 100%
  // Adjacent tents overlap so coverage sums to 1 everywhere (partition of unity).
  // This eliminates seam lines: at any position the blur is a smooth weighted
  // interpolation between the two surrounding layers' values.
  const halfWidth = 100 / (LAYERS - 1)
  const positions = Array.from({ length: LAYERS }, (_, i) => (i / (LAYERS - 1)) * 100)

  return (
    <div style={{ position: 'absolute', pointerEvents: 'none', ...style }} className={className}>
      {positions.map((pos, i) => {
        // Layer 0 (bottom) = max blur, Layer LAYERS-1 (top) ≈ 0
        // Quadratic falloff: bottom is very blurry, drops off quickly toward the top
        const t = (LAYERS - i) / LAYERS
        const blur = blurIntensity * t * t
        const blurVal = `blur(${blur.toFixed(2)}px)`

        const prevPos = Math.max(0, pos - halfWidth)
        const nextPos = Math.min(100, pos + halfWidth)
        // Tent: transparent at edges, black (fully visible) at center position
        const mask = `linear-gradient(${gradDir}, transparent ${prevPos}%, black ${pos}%, transparent ${nextPos}%)`

        return (
          <motion.div
            key={i}
            variants={{
              rest:  { backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' },
              hover: { backdropFilter: blurVal,     WebkitBackdropFilter: blurVal     },
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        )
      })}
    </div>
  )
}
