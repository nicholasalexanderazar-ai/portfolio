/* Project card used in the Work section — clickable cards with hover animation */
import { CSSProperties, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Tag from './Tag'

function useBreakpoint(px: number) {
  const [below, setBelow] = useState(() => window.innerWidth < px)
  useEffect(() => {
    const h = () => setBelow(window.innerWidth < px)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [px])
  return below
}

interface ProjectCardProps {
  title: string
  headline: string
  tags: string[]
  bgStyle: CSSProperties
  textColor: string
  iconBg: string
  imageSrc?: string
  imageAlt?: string
  imagePosition?: string
  imageFilter?: string
  groundShadow?: boolean
  iconSrc?: string
  href: string | null
  isSmall?: boolean
  colorAccents?: boolean
  badge?: string
  imageContainerStyle?: CSSProperties
  imageInset?: { top?: string; left?: string; right?: string; bottom?: string }
  imageInsetMobile?: { top?: string; left?: string; right?: string; bottom?: string }
  bgStyleMobile?: CSSProperties
}

export default function ProjectCard({
  title,
  headline,
  tags,
  bgStyle,
  textColor,
  iconBg,
  imageSrc,
  imageAlt,
  imagePosition,
  imageFilter,
  groundShadow,
  iconSrc,
  href,
  isSmall,
  colorAccents,
  badge,
  imageContainerStyle,
  imageInset,
  imageInsetMobile,
  bgStyleMobile,
}: ProjectCardProps) {
  const navigate = useNavigate()
  const isClickable = !!href
  const isNarrow = useBreakpoint(768)
  const height = isNarrow ? 'auto' : isSmall ? '360px' : '480px'

  const tagBorderColor =
    textColor === '#FFFFFF' || textColor === '#ffffff'
      ? 'rgba(255,255,255,0.3)'
      : 'rgba(0,0,0,0.2)'

  const handleClick = () => {
    if (isClickable && href) navigate(href)
  }

  return (
    <motion.div
      onClick={handleClick}
      initial="rest"
      whileHover="hover"
      variants={{ rest: { scale: 1 }, hover: { scale: 1.015 } }}
      transition={{ duration: 0.25 }}
      style={{
        width: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: isClickable ? 'pointer' : 'default',
        position: 'relative',
        display: 'flex',
        flexDirection: isNarrow ? 'column' : 'row',
        height,
        ...(isNarrow && bgStyleMobile ? bgStyleMobile : bgStyle),
      }}
    >
      {/* AYO color accent blobs */}
      {colorAccents && (
        <>
          <div style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', background: '#0066FF', opacity: 0.15, filter: 'blur(40px)', top: '20%', right: '30%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '80px', height: '80px', borderRadius: '50%', background: '#FF0066', opacity: 0.12, filter: 'blur(30px)', top: '50%', right: '15%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', background: '#00FF88', opacity: 0.1, filter: 'blur(35px)', top: '30%', right: '45%', pointerEvents: 'none' }} />
        </>
      )}

      {/* Left half — text content */}
      <div
        style={{
          flex: isNarrow ? undefined : 1,
          padding: isNarrow ? '28px' : '40px',
          display: 'flex',
          flexDirection: 'column',
          color: textColor,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Icon — logo image if provided, else colored square */}
        {iconSrc ? (
          <img
            src={iconSrc}
            alt={`${title} logo`}
            style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'contain', flexShrink: 0 }}
          />
        ) : (
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: iconBg, flexShrink: 0 }} />
        )}

        {/* Spacer pushes text to bottom */}
        <div style={{ flex: 1, minHeight: isNarrow ? '36px' : 0 }} />

        {/* Project name label */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: '500',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '8px',
            opacity: 0.7,
          }}
        >
          {title}
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: '26px',
            fontWeight: '500',
            lineHeight: '1.1',
            maxWidth: isNarrow ? '100%' : '300px',
            marginBottom: '20px',
            fontFamily: 'var(--font-serif)',
          }}
        >
          {headline}
        </div>

        {/* Tags row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tags.map(tag => (
            <Tag key={tag} label={tag} textColor={textColor} borderColor={tagBorderColor} />
          ))}
        </div>

        {/* Badge or CTA */}
        {badge ? (
          <div style={{
            alignSelf:    'flex-start',
            marginTop:    '16px',
            padding:      '4px 10px',
            borderRadius: '20px',
            background:   textColor === '#FFFFFF' || textColor === '#ffffff'
              ? 'rgba(255,255,255,0.15)'
              : 'rgba(0,0,0,0.1)',
            fontSize:     '11px',
            fontWeight:   '500',
            color:        textColor,
            whiteSpace:   'nowrap',
          }}>
            {badge}
          </div>
        ) : isClickable ? (
          <div style={{ fontSize: '13px', marginTop: '16px', opacity: 0.6 }}>
            View case study →
          </div>
        ) : null}
      </div>

      {/* Right half — image area */}
      <div style={{
        flex: isNarrow ? undefined : 1,
        height: isNarrow ? '300px' : undefined,
        position: 'relative',
        marginTop: isNarrow ? '12px' : undefined,
        marginBottom: isNarrow ? '32px' : undefined,
        ...imageContainerStyle,
      }}>
        {imageSrc ? (
          <div style={(() => {
            const inset = isNarrow && imageInsetMobile ? imageInsetMobile : imageInset
            return inset ? {
              position: 'absolute',
              top: inset.top ?? 0,
              left: inset.left ?? 0,
              right: inset.right ?? 0,
              bottom: inset.bottom ?? 0,
            } : { position: 'absolute', inset: 0 }
          })()}>
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              variants={{
                rest:  { scale: 1.3,  transition: { duration: 0.3,                     ease: [0.4, 0, 0.2, 1] } },
                hover: { scale: 1.36, transition: { duration: 3.0, delay: 0.25, ease: [0.4, 0, 0.2, 1] } },
              }}
              style={{
                position:        'absolute',
                inset:           0,
                width:           '100%',
                height:          '100%',
                objectFit:       'contain',
                objectPosition:  isNarrow ? 'center bottom' : (imagePosition ?? 'right 35%'),
                transformOrigin: isNarrow ? 'center bottom' : (imagePosition ?? 'right 35%'),
                filter:          imageFilter,
              }}
            />
          </div>
        ) : (
          /* Placeholder — swap with real app screenshot */
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.1,
            }}
          >
            <span style={{ color: textColor, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {imageAlt ?? `${title} screenshot`}
            </span>
          </div>
        )}
        {groundShadow && (
          <div style={{
            position:     'absolute',
            bottom:       '5%',
            left:         '12%',
            right:        '4%',
            height:       '18px',
            borderRadius: '50%',
            background:   'rgba(0,0,0,0.38)',
            filter:       'blur(12px)',
            pointerEvents: 'none',
            zIndex:       2,
          }} />
        )}
      </div>
    </motion.div>
  )
}
