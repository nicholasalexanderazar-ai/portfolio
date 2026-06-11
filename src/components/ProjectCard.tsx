/* Project card used in the Work section — clickable cards with hover animation */
import { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Tag from './Tag'

interface ProjectCardProps {
  title: string
  headline: string
  tags: string[]
  bgStyle: CSSProperties
  textColor: string
  iconBg: string
  imageSrc?: string
  imageAlt?: string
  href: string | null
  isSmall?: boolean
  colorAccents?: boolean
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
  href,
  isSmall,
  colorAccents,
}: ProjectCardProps) {
  const navigate = useNavigate()
  const isClickable = !!href
  const height = isSmall ? '360px' : '480px'

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
      whileHover={isClickable ? { scale: 1.015 } : {}}
      transition={{ duration: 0.25 }}
      style={{
        width: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: isClickable ? 'pointer' : 'default',
        position: 'relative',
        display: 'flex',
        height,
        ...bgStyle,
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
          flex: 1,
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          color: textColor,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Icon placeholder — top of card */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: iconBg,
            flexShrink: 0,
          }}
        />

        {/* Spacer pushes text to bottom */}
        <div style={{ flex: 1 }} />

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
            maxWidth: '300px',
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

        {/* CTA text — only on clickable cards */}
        {isClickable && (
          <div style={{ fontSize: '13px', marginTop: '16px', opacity: 0.6 }}>
            View case study →
          </div>
        )}
      </div>

      {/* Right half — image area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {imageSrc ? (
          /* TODO: Replace with real image */
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', bottom: 0 }}
          />
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
      </div>
    </motion.div>
  )
}
