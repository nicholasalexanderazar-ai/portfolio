/* Case study — project-colored sidebar + right panel with white content card */
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Tag from '../components/Tag'
import { projects } from '../data/projects'

const fadeUp = {
  initial:     { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 }  as const,
  viewport:    { once: true },
  transition:  { duration: 0.5 },
}

const label = (color: string): React.CSSProperties => ({
  fontSize:      '12px',
  letterSpacing: '0.12em',
  color,
  textTransform: 'uppercase',
  fontWeight:    '500',
  marginBottom:  '16px',
  display:       'block',
})

export default function CaseStudy() {
  const { id }      = useParams<{ id: string }>()
  const navigate    = useNavigate()
  const [backHover, setBackHover] = useState(false)

  const project = projects.find(p => p.id === id)

  /* Body background = project solid color so overscroll shows project color */
  useEffect(() => {
    if (!project) return
    document.body.style.background = project.sidebarBg
    return () => { document.body.style.background = '' }
  }, [project])

  if (!project) {
    return (
      <div style={{ padding: '80px 48px' }}>
        <p>Project not found.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '16px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>
    )
  }

  const fg          = project.sidebarTextColor
  const isLight     = fg !== '#FFFFFF' && fg !== '#ffffff'
  const tagBorder   = isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.28)'
  const mutedFg     = isLight ? 'rgba(0,0,0,0.45)'  : 'rgba(255,255,255,0.45)'
  const semiMutedFg = isLight ? 'rgba(0,0,0,0.60)'  : 'rgba(255,255,255,0.60)'

  return (
    /*
      One unified background color (sidebarBg) on the outer wrapper — no
      separate fills for left/right. Both children are transparent.
      Sticky sidebar means both columns participate in overscroll rubber-band.
    */
    <div style={{ display: 'flex', alignItems: 'flex-start', background: project.sidebarBg }}>

      {/* ════════════════════════════════════════
          LEFT — sticky sidebar, transparent bg
      ════════════════════════════════════════ */}
      <div
        style={{
          position:       'sticky',
          top:            0,
          width:          'var(--sidebar-width)',
          height:         '100vh',
          flexShrink:     0,
          display:        'flex',
          flexDirection:  'column',
          padding:        '32px',
          color:          fg,
          overflow:       'hidden',
          background:     'transparent',
        }}
      >
        {/* AYO color accents */}
        {project.colorAccents && (
          <>
            <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: '#0066FF', opacity: 0.18, filter: 'blur(80px)', top: '10%', left: '20%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: '140px', height: '140px', borderRadius: '50%', background: '#FF0066', opacity: 0.14, filter: 'blur(60px)', top: '50%', left: '40%', pointerEvents: 'none' }} />
          </>
        )}

        {/* Back — circle that expands to pill showing "← HOME" on hover */}
        <motion.button
          onClick={() => navigate('/')}
          onHoverStart={() => setBackHover(true)}
          onHoverEnd={() => setBackHover(false)}
          animate={{
            width:        backHover ? 108 : 36,
            borderRadius: backHover ? '18px' : '50%',
          }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          style={{
            height:       '36px',
            background:   isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.12)',
            border:       'none',
            cursor:       'pointer',
            overflow:     'hidden',
            display:      'flex',
            alignItems:   'center',
            color:        fg,
            marginBottom: '32px',
            position:     'relative',
            zIndex:       1,
            flexShrink:   0,
          }}
        >
          {/* Arrow — always centered when collapsed, left-anchored when expanded */}
          <motion.span
            animate={{ marginLeft: backHover ? '12px' : '0px', marginRight: backHover ? '0px' : '0px' }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{
              fontSize:   '16px',
              lineHeight: 1,
              width:      '36px',
              display:    'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ←
          </motion.span>
          <motion.span
            animate={{ opacity: backHover ? 1 : 0, x: backHover ? 0 : -6 }}
            transition={{ duration: 0.2, delay: backHover ? 0.08 : 0 }}
            style={{ fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}
          >
            HOME
          </motion.span>
        </motion.button>

        {/* Project name */}
        <div style={{ fontSize: '13px', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase', color: mutedFg, marginBottom: '12px', position: 'relative', zIndex: 1 }}>
          {project.title}
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: '32px', fontWeight: '500', lineHeight: '1.25', color: fg, marginBottom: '16px', position: 'relative', zIndex: 1, fontFamily: 'var(--font-serif)' }}>
          {project.headline}
        </h1>

        {/* Description */}
        <p style={{ fontSize: '15px', lineHeight: '1.7', color: semiMutedFg, marginBottom: '22px', position: 'relative', zIndex: 1 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', position: 'relative', zIndex: 1 }}>
          {project.tags.map(tag => (
            <Tag key={tag} label={tag} textColor={fg} borderColor={tagBorder} />
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Metadata */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
          {[
            { label: 'Role', value: project.role },
            { label: 'Year', value: project.year },
            { label: 'Type', value: project.type },
          ].map(({ label: lbl, value }) => (
            <div key={lbl} style={{ display: 'flex', gap: '10px', fontSize: '14px' }}>
              <span style={{ color: mutedFg, minWidth: '36px' }}>{lbl}</span>
              <span style={{ color: fg, fontWeight: '500' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          RIGHT — transparent, white card floats
      ════════════════════════════════════════ */}
      <div
        style={{
          flex:       1,
          minHeight:  '100vh',
          padding:    '20px 20px 40px 20px',
          background: 'transparent',
        }}
      >
        {/* AYO green blob */}
        {project.colorAccents && (
          <div style={{ position: 'fixed', width: '300px', height: '300px', borderRadius: '50%', background: '#00FF88', opacity: 0.08, filter: 'blur(100px)', top: '20%', right: '10%', pointerEvents: 'none', zIndex: 0 }} />
        )}

        {/* White rounded card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            background:   '#ffffff',
            borderRadius: '20px',
            overflow:     'hidden',
            position:     'relative',
            zIndex:       1,
          }}
        >

          {/* ── Hero — close to top and sides ── */}
          <div style={{ padding: '16px 16px 0 16px' }}>
            <div
              style={{
                width:               '100%',
                height:              '620px',
                borderRadius:        '12px',
                overflow:            'hidden',
                background:          '#EBEBEA',
                backgroundImage:     'linear-gradient(145deg, #F0F0EE 0%, #E4E4E2 100%)',
                display:             'flex',
                alignItems:          'center',
                justifyContent:      'center',
              }}
            >
              {/* TODO: Replace with real hero screenshot */}
              <span style={{ fontSize: '12px', color: '#C0C0BE', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {project.title} · hero image
              </span>
            </div>
          </div>

          {/* ── Written content — two-column editorial layout ── */}
          <div style={{ padding: '52px 40px', display: 'flex', flexDirection: 'column', gap: '0' }}>

            {/* Overview */}
            <motion.div {...fadeUp} style={{ display: 'flex', gap: '40px', paddingBottom: '40px' }}>
              <div style={{ width: '160px', flexShrink: 0 }}>
                <span style={{ fontSize: '22px', fontWeight: '500', color: '#111', fontFamily: 'var(--font-serif)', lineHeight: '1' }}>Overview</span>
              </div>
              <p style={{ flex: 1, fontSize: '16px', lineHeight: '1.7', color: '#444' }}>
                {project.overview}
              </p>
            </motion.div>

            {/* Challenge */}
            <motion.div {...fadeUp} style={{ display: 'flex', gap: '40px', paddingTop: '32px', paddingBottom: '40px', borderTop: '1px solid #F0F0EE' }}>
              <div style={{ width: '160px', flexShrink: 0 }}>
                <span style={{ fontSize: '22px', fontWeight: '500', color: '#111', fontFamily: 'var(--font-serif)', lineHeight: '1' }}>Challenge</span>
              </div>
              <p style={{ flex: 1, fontSize: '16px', lineHeight: '1.7', color: '#444' }}>
                {project.challenge}
              </p>
            </motion.div>

            {/* Approach */}
            <motion.div {...fadeUp} style={{ display: 'flex', gap: '40px', paddingTop: '32px', paddingBottom: '0', borderTop: '1px solid #F0F0EE' }}>
              <div style={{ width: '160px', flexShrink: 0 }}>
                <span style={{ fontSize: '22px', fontWeight: '500', color: '#111', fontFamily: 'var(--font-serif)', lineHeight: '1' }}>Approach</span>
              </div>
              <p style={{ flex: 1, fontSize: '16px', lineHeight: '1.7', color: '#444' }}>
                {project.approach}
              </p>
            </motion.div>

          </div>

          {/* ── Screens — full width matching hero, no label ── */}
          <div style={{ padding: '0 16px 20px 16px', borderTop: '1px solid #F0F0EE' }}>
            <div style={{ paddingTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[1, 2, 3, 4].map(n => (
                <div
                  key={n}
                  style={{
                    aspectRatio:    '16/10',
                    borderRadius:   '12px',
                    background:     '#F0F0EE',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* TODO: Replace with real screenshots */}
                  <span style={{ fontSize: '12px', color: '#C0C0BE', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Screen {n}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Outcome ── */}
          <div style={{ padding: '0 40px 52px 40px', borderTop: '1px solid #F0F0EE' }}>
            <div style={{ display: 'flex', gap: '40px', paddingTop: '32px' }}>
              <div style={{ width: '160px', flexShrink: 0 }}>
                <span style={{ fontSize: '22px', fontWeight: '500', color: '#111', fontFamily: 'var(--font-serif)', lineHeight: '1' }}>Outcome</span>
              </div>
              <p style={{ flex: 1, fontSize: '16px', lineHeight: '1.7', color: '#444' }}>
                {project.outcome}
              </p>
            </div>
          </div>

          {/* ── Bottom nav ── */}
          <div style={{ padding: '32px 40px 40px 40px', borderTop: '1px solid #F0F0EE' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                background:   'none',
                border:       '1px solid #E4E4E0',
                borderRadius: '12px',
                padding:      '14px 24px',
                fontSize:     '14px',
                color:        '#666',
                cursor:       'pointer',
                transition:   'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#111'
                e.currentTarget.style.color = '#111'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E4E4E0'
                e.currentTarget.style.color = '#666'
              }}
            >
              ← View all work
            </button>
          </div>

        </motion.div>
      </div>

    </div>
  )
}
