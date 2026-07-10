import { useRef, useState, useCallback, useEffect } from 'react'

interface ZoomableImageProps {
  src: string
  alt: string
  borderRadius?: string
}

const MIN_ZOOM    = 1
const MAX_ZOOM    = 8
const STEP        = 1
const DBL_ZOOM    = 4   // zoom level reached on double-click/tap from 1

export default function ZoomableImage({ src, alt, borderRadius = '14px' }: ZoomableImageProps) {
  const [zoom,     setZoom]     = useState(1)
  const [pan,      setPan]      = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const lastMouse    = useRef({ x: 0, y: 0 })
  const lastTouch    = useRef({ x: 0, y: 0 })
  const lastTapTime  = useRef(0)
  const wheelBuf     = useRef(0)
  const zoomRef      = useRef(zoom)
  zoomRef.current    = zoom

  // ── Constrain pan so image edges never leave the frame ──
  const constrain = useCallback((x: number, y: number, z: number) => {
    if (!containerRef.current) return { x, y }
    const { width, height } = containerRef.current.getBoundingClientRect()
    const mx = (width  * (z - 1)) / 2
    const my = (height * (z - 1)) / 2
    return {
      x: Math.max(-mx, Math.min(mx, x)),
      y: Math.max(-my, Math.min(my, y)),
    }
  }, [])

  // ── Central zoom applicator ─────────────────────────────
  const applyZoom = useCallback((target: number) => {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(target)))
    setZoom(clamped)
    if (clamped <= MIN_ZOOM) {
      setPan({ x: 0, y: 0 })
    } else {
      setPan(p => constrain(p.x, p.y, clamped))
    }
  }, [constrain])

  const zoomIn       = () => applyZoom(zoomRef.current + STEP)
  const zoomOut      = () => applyZoom(zoomRef.current - STEP)
  const onDoubleClick = () => applyZoom(zoomRef.current <= 1 ? DBL_ZOOM : MIN_ZOOM)

  // ── Mouse drag ──────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    if (zoomRef.current <= 1) return
    e.preventDefault()
    setDragging(true)
    lastMouse.current = { x: e.clientX, y: e.clientY }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    lastMouse.current = { x: e.clientX, y: e.clientY }
    setPan(p => constrain(p.x + dx, p.y + dy, zoomRef.current))
  }

  const onMouseUp = () => setDragging(false)

  // ── Touch pan + double-tap (passive:false requires manual listener) ──
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      const now = Date.now()
      if (now - lastTapTime.current < 300) {
        lastTapTime.current = 0
        applyZoom(zoomRef.current <= 1 ? DBL_ZOOM : MIN_ZOOM)
        return
      }
      lastTapTime.current = now
      if (zoomRef.current > 1) {
        lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (zoomRef.current <= 1 || e.touches.length !== 1) return
      e.preventDefault()
      const dx = e.touches[0].clientX - lastTouch.current.x
      const dy = e.touches[0].clientY - lastTouch.current.y
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      setPan(p => constrain(p.x + dx, p.y + dy, zoomRef.current))
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true  })
    el.addEventListener('touchmove',  onTouchMove,  { passive: false })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove',  onTouchMove)
    }
  }, [constrain, applyZoom])

  // ── Mouse wheel / trackpad zoom ─────────────────────────
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      const z = zoomRef.current
      // Release scroll back to page when zoom can't change in that direction
      if (z <= MIN_ZOOM && e.deltaY > 0) { wheelBuf.current = 0; return }
      if (z >= MAX_ZOOM && e.deltaY < 0) { wheelBuf.current = 0; return }
      e.preventDefault()
      wheelBuf.current += e.deltaY
      if (Math.abs(wheelBuf.current) >= 80) {
        applyZoom(z + (wheelBuf.current < 0 ? STEP : -STEP))
        wheelBuf.current = 0
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [applyZoom])

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onDoubleClick={onDoubleClick}
        style={{
          overflow:   'hidden',
          borderRadius,
          cursor:     zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
          userSelect: 'none',
          position:   'relative',
        }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          style={{
            width:           '100%',
            display:         'block',
            transform:       `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition:      dragging ? 'none' : 'transform 0.22s ease',
            pointerEvents:   'none',
          }}
        />

        {/* + / − controls — bottom-right */}
        <div
          style={{ position: 'absolute', bottom: '12px', right: '12px', display: 'flex', gap: '4px', zIndex: 10 }}
          onMouseDown={e => e.stopPropagation()}
          onClick={e => e.stopPropagation()}
          onDoubleClick={e => e.stopPropagation()}
        >
          {([
            { label: '+', action: zoomIn,  disabled: zoom >= MAX_ZOOM },
            { label: '−', action: zoomOut, disabled: zoom <= MIN_ZOOM },
          ] as const).map(({ label, action, disabled }) => (
            <button
              key={label}
              onClick={action}
              disabled={disabled}
              style={{
                width:          '28px',
                height:         '28px',
                borderRadius:   '7px',
                background:     'rgba(0,0,0,0.52)',
                backdropFilter: 'blur(8px)',
                border:         '1px solid rgba(255,255,255,0.08)',
                color:          disabled ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.9)',
                fontSize:       '16px',
                fontWeight:     '400',
                cursor:         disabled ? 'default' : 'pointer',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                lineHeight:     1,
                transition:     'color 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
