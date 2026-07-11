/* Case study — project-colored sidebar + right panel with white content card */
import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Tag from '../components/Tag'
import { projects, type ProjectSection, type ProjectSectionImage, type ProjectSectionLightboxImage, type ProjectSectionOutcomeItem } from '../data/projects'
import ZoomableImage from '../components/ZoomableImage'
import VideoTabs from '../components/VideoTabs'

function useBreakpoint(px: number) {
  const [below, setBelow] = useState(() => window.innerWidth < px)
  useEffect(() => {
    const h = () => setBelow(window.innerWidth < px)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [px])
  return below
}

const fadeUp = {
  initial:     { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 }  as const,
  viewport:    { once: true },
  transition:  { duration: 0.5 },
}

const PARA: React.CSSProperties = { fontSize: '16px', lineHeight: '1.8', color: '#444', margin: 0 }

/** Renders a section body string — \n\n = paragraph break, lines starting with "• " = bullet list */
function SectionBody({ body }: { body: string }) {
  const blocks = body.split('\n\n')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {blocks.map((block, i) => {
        const lines       = block.split('\n')
        const bulletLines = lines.filter(l => l.startsWith('• '))
        const textLines   = lines.filter(l => !l.startsWith('• '))

        if (bulletLines.length === 0) {
          return <p key={i} style={PARA}>{block}</p>
        }

        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {textLines.length > 0 && (
              <p style={PARA}>{textLines.join(' ')}</p>
            )}
            <ul style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {bulletLines.map((item, j) => (
                <li key={j} style={PARA}>{item.slice(2)}</li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

const sectionLabel: React.CSSProperties = {
  fontSize:   '22px',
  fontWeight: '500',
  color:      '#111',
  fontFamily: 'var(--font-serif)',
  lineHeight: '1',
  flexShrink: 0,
  width:      '160px',
}

function SectionImageBlock({ block }: { block: ProjectSectionImage }) {
  const items = block.images ?? []
  const [activeIdx, setActiveIdx]       = useState(0)
  const [captionVisible, setCaptionVisible] = useState(true)

  useEffect(() => {
    if (items.length <= 1) return
    const t = setInterval(() => {
      setCaptionVisible(false)
      setTimeout(() => {
        setActiveIdx(i => (i + 1) % items.length)
        setCaptionVisible(true)
      }, 220)
    }, 3200)
    return () => clearInterval(t)
  }, [items.length])

  if (items.length === 0 && !block.src) return null

  return (
    <>
      {/* ── Desktop: single gray container, 3-col grid ── */}
      <div
        className="problem-images-desktop"
        style={{
          background:          '#D9D9D9',
          borderRadius:        '16px',
          padding:             '48px',
          display:             'grid',
          gridTemplateColumns: `repeat(${items.length || 1}, 1fr)`,
          gap:                 '40px',
        }}
      >
        {items.length > 0
          ? items.map((item, i) => (
              <img key={i} src={item.src} alt={item.caption} style={{ width: '72%', display: 'block', borderRadius: '18px', margin: '0 auto' }} />
            ))
          : <img src={block.src} alt="" style={{ width: '72%', display: 'block', borderRadius: '18px', margin: '0 auto' }} />
        }
      </div>

      {/* ── Captions row (desktop only) ── */}
      {items.length > 0 && (
        <div
          className="problem-images-desktop"
          style={{
            display:             'grid',
            gridTemplateColumns: `repeat(${items.length}, 1fr)`,
            gap:                 '40px',
            marginTop:           '12px',
            padding:             '0 48px',
          }}
        >
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
              <p style={{ width: '72%', fontSize: '12px', lineHeight: '1.5', color: '#999', margin: 0, textAlign: 'center' }}>
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Mobile: full-bleed, 3 images side by side, auto-rotating caption ── */}
      <div
        className="problem-images-mobile"
        style={{ display: 'none', flexDirection: 'column' }}
      >
        <div style={{ background: '#D9D9D9', margin: '0 -24px', padding: '20px 16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {items.map((item, i) => (
              <div key={i} style={{ flex: 1 }}>
                <img src={item.src} alt="" style={{ width: '100%', display: 'block', borderRadius: '8px' }} />
              </div>
            ))}
          </div>
        </div>
        {items.length > 0 && (
          <div style={{ marginTop: '10px', minHeight: '52px' }}>
            <p style={{ fontSize: '13px', color: '#999', lineHeight: '1.55', margin: 0, textAlign: 'center', transition: 'opacity 0.22s ease', opacity: captionVisible ? 1 : 0 }}>
              {items[activeIdx]?.caption}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '7px' }}>
              {items.map((_, i) => (
                <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: i === activeIdx ? '#888' : '#D0D0CE', transition: 'background 0.3s' }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {block.transition && (
        <div style={{ maxWidth: '680px', margin: '28px auto 0' }}>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#666', margin: 0, fontStyle: 'italic' }}>
            {block.transition}
          </p>
        </div>
      )}
    </>
  )
}

function SectionLightboxImage({ img }: { img: ProjectSectionLightboxImage }) {
  return (
    <div>
      <ZoomableImage src={img.src} alt={img.caption} borderRadius="14px" />
      <p style={{ fontSize: '12px', color: '#aaa', margin: '14px 0 0 0', textAlign: 'center', letterSpacing: '0.01em' }}>
        {img.caption}
      </p>
    </div>
  )
}

function SectionOutcomeImages({ items }: { items: ProjectSectionOutcomeItem[] }) {
  return (
    <>
      {/* Desktop 3-col */}
      <div
        className="problem-images-desktop"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
      >
        {items.map((item, i) => (
          <div key={i} style={{ background: '#F5F5F3', borderRadius: '16px', padding: '24px 20px' }}>
            <img src={item.src} alt={item.label} style={{ width: '100%', display: 'block', borderRadius: '12px' }} />
          </div>
        ))}
      </div>

      {/* Mobile: 3 side by side */}
      <div className="problem-images-mobile" style={{ display: 'none', flexDirection: 'row', gap: '8px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ flex: 1 }}>
            <img src={item.src} alt={item.label} style={{ width: '100%', display: 'block', borderRadius: '10px' }} />
          </div>
        ))}
      </div>
    </>
  )
}

function ContentSections({ sections, isMobile }: { sections: ProjectSection[]; isMobile: boolean }) {
  const hPad = isMobile ? '24px' : '48px'
  return (
    <div>
      {sections.map((section, i) => {
        const isLast = i === sections.length - 1
        return (
          <motion.div
            key={section.title}
            {...fadeUp}
            style={{
              padding: isMobile
                ? `${i === 0 ? 40 : 56}px ${hPad} ${isLast ? 56 : 0}px`
                : `${i === 0 ? 64 : 80}px ${hPad} ${isLast ? 80 : 0}px`,
            }}
          >
            {/* ── Dakota row: label stacks above on mobile, left column on desktop ── */}
            <div style={{
              display:       'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap:           isMobile ? '10px' : '48px',
              alignItems:    'flex-start',
            }}>
              <div style={{ width: isMobile ? 'auto' : '140px', flexShrink: 0, paddingTop: isMobile ? '0' : '5px' }}>
                <span style={{
                  fontSize:      '11px',
                  fontWeight:    '600',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         '#B0B0A8',
                }}>
                  {section.title}
                </span>
              </div>

              <div style={{ flex: 1, maxWidth: isMobile ? '100%' : '600px', width: isMobile ? '100%' : undefined }}>
                {section.subheading && (
                  <h2 style={{
                    fontSize:     isMobile ? '20px' : '24px',
                    fontWeight:   '500',
                    lineHeight:   '1.25',
                    color:        '#111',
                    fontFamily:   'var(--font-serif)',
                    marginBottom: '16px',
                  }}>
                    {section.subheading}
                  </h2>
                )}
                <SectionBody body={section.body} />

                {/* ── Phases flow row ── */}
                {section.phases && section.phases.length > 0 && (
                  <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                    {section.phases.map((phase, j) => (
                      <React.Fragment key={phase}>
                        <span style={{
                          fontSize:     '13px',
                          fontWeight:   '500',
                          color:        '#111',
                          background:   '#F0F0EE',
                          padding:      '5px 12px',
                          borderRadius: '6px',
                        }}>
                          {phase}
                        </span>
                        {j < section.phases!.length - 1 && (
                          <span style={{ color: '#C0C0BE', fontSize: '14px' }}>→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Full-width blocks below the text row ── */}
            {section.imageBlock && (
              <div style={{ marginTop: '48px' }}>
                <SectionImageBlock block={section.imageBlock} />
              </div>
            )}

            {section.bodyAfterImage && (
              <div style={{
                marginTop:   '40px',
                paddingLeft: isMobile ? '0' : '188px',
                maxWidth:    isMobile ? '100%' : 'calc(600px + 188px)',
              }}>
                <SectionBody body={section.bodyAfterImage} />
              </div>
            )}

            {section.lightboxImage && (
              <div style={{ marginTop: '48px' }}>
                <SectionLightboxImage img={section.lightboxImage} />
              </div>
            )}

            {section.outcomeImages && section.outcomeImages.length > 0 && (
              <div style={{ marginTop: '40px' }}>
                <SectionOutcomeImages items={section.outcomeImages} />
              </div>
            )}

            {section.videos && section.videos.length > 0 && (
              <div style={{ marginTop: '40px' }}>
                <VideoTabs items={section.videos} />
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

/** Fallback for projects that still use the 4-field layout */
function DefaultSections({ overview, challenge, approach, outcome, isMobile }: {
  overview: string; challenge: string; approach: string; outcome: string; isMobile: boolean
}) {
  const rows = [
    { title: 'Overview',  body: overview  },
    { title: 'Challenge', body: challenge },
    { title: 'Approach',  body: approach  },
  ]
  const hPad = isMobile ? '24px' : '40px'
  return (
    <>
      <div style={{ padding: `52px ${hPad}`, display: 'flex', flexDirection: 'column', gap: '0' }}>
        {rows.map((row, i) => (
          <motion.div
            key={row.title}
            {...fadeUp}
            style={{
              display:       'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap:           isMobile ? '8px' : '40px',
              paddingTop:    i === 0 ? '0' : '32px',
              paddingBottom: '40px',
              borderTop:     i === 0 ? 'none' : '1px solid #F0F0EE',
            }}
          >
            <span style={{ ...sectionLabel, width: isMobile ? 'auto' : '160px' }}>{row.title}</span>
            <p style={{ flex: 1, ...PARA }}>{row.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Outcome */}
      <div style={{ padding: `0 ${hPad} 52px`, borderTop: '1px solid #F0F0EE' }}>
        <div style={{
          display:       'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap:           isMobile ? '8px' : '40px',
          paddingTop:    '32px',
        }}>
          <span style={{ ...sectionLabel, width: isMobile ? 'auto' : '160px' }}>Outcome</span>
          <p style={{ flex: 1, ...PARA }}>{outcome}</p>
        </div>
      </div>
    </>
  )
}

export default function CaseStudy() {
  const { id }      = useParams<{ id: string }>()
  const navigate    = useNavigate()
  const [backHover, setBackHover] = useState(false)
  const isMobile    = useBreakpoint(1280)

  const project = projects.find(p => p.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    if (!project) return
    document.body.style.background = project.sidebarBg
    return () => { document.body.style.background = '' }
  }, [project])

  if (!project) {
    return (
      <div style={{ padding: '80px 48px' }}>
        <p>Project not found.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '16px', cursor: 'pointer' }}>← Back</button>
      </div>
    )
  }

  const fg          = project.sidebarTextColor
  const isLight     = fg !== '#FFFFFF' && fg !== '#ffffff'
  const tagBorder   = isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.28)'
  const mutedFg     = isLight ? 'rgba(0,0,0,0.45)'  : 'rgba(255,255,255,0.45)'
  const semiMutedFg = isLight ? 'rgba(0,0,0,0.60)'  : 'rgba(255,255,255,0.60)'

  return (
    <div style={{
      display:       'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems:    isMobile ? 'stretch' : 'flex-start',
      background:    project.sidebarBg,
    }}>

      {/* ════════ SIDEBAR / HEADER ════════ */}
      <div
        style={{
          position:      isMobile ? 'relative' : 'sticky',
          top:           isMobile ? 'auto'     : 0,
          width:         isMobile ? '100%'     : 'var(--sidebar-width)',
          height:        isMobile ? 'auto'     : '100vh',
          flexShrink:    0,
          display:       'flex',
          flexDirection: 'column',
          padding:       isMobile ? '28px 28px 36px' : '32px',
          color:         fg,
          overflow:      'hidden',
          background:    'transparent',
        }}
      >
        {project.colorAccents && (
          <>
            <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: '#0066FF', opacity: 0.18, filter: 'blur(80px)', top: '10%', left: '20%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: '140px', height: '140px', borderRadius: '50%', background: '#FF0066', opacity: 0.14, filter: 'blur(60px)', top: '50%', left: '40%', pointerEvents: 'none' }} />
          </>
        )}

        {/* Back button — circle → pill on hover */}
        <motion.button
          onClick={() => navigate('/')}
          onHoverStart={() => setBackHover(true)}
          onHoverEnd={() => setBackHover(false)}
          animate={{ width: backHover ? 108 : 36, borderRadius: backHover ? '18px' : '50%' }}
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
          <motion.span
            animate={{ marginLeft: backHover ? '12px' : '0px' }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ fontSize: '16px', lineHeight: 1, width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
          {project.iconSrc && (
            <img src={project.iconSrc} alt={`${project.title} logo`} style={{ width: '24px', height: '24px', borderRadius: '6px', objectFit: 'contain', flexShrink: 0 }} />
          )}
          <span style={{ fontSize: '13px', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase', color: mutedFg }}>
            {project.title}
          </span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: '500', lineHeight: '1.1', color: fg, marginBottom: '16px', position: 'relative', zIndex: 1, fontFamily: 'var(--font-serif)' }}>
          {project.headline}
        </h1>

        <p style={{ fontSize: '15px', lineHeight: '1.7', color: semiMutedFg, marginBottom: '22px', position: 'relative', zIndex: 1 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', position: 'relative', zIndex: 1 }}>
          {project.tags.map(tag => (
            <Tag key={tag} label={tag} textColor={fg} borderColor={tagBorder} />
          ))}
        </div>

        {/* Spacer only on desktop (where sidebar is fixed height) */}
        {!isMobile && <div style={{ flex: 1 }} />}

        <div style={{
          display:       'flex',
          flexDirection: isMobile ? 'row' : 'column',
          flexWrap:      'wrap',
          gap:           isMobile ? '16px' : '12px',
          marginTop:     isMobile ? '24px' : '0',
          position:      'relative',
          zIndex:        1,
        }}>
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

      {/* ════════ CONTENT CARD ════════ */}
      <div style={{ flex: 1, padding: isMobile ? '0 12px 40px' : '20px 20px 40px 20px', background: 'transparent' }}>
        {project.colorAccents && (
          <div style={{ position: 'fixed', width: '300px', height: '300px', borderRadius: '50%', background: '#00FF88', opacity: 0.08, filter: 'blur(100px)', top: '20%', right: '10%', pointerEvents: 'none', zIndex: 0 }} />
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ background: '#ffffff', borderRadius: '20px', overflow: 'hidden', position: 'relative', zIndex: 1 }}
        >
          {/* Hero */}
          <div style={{ padding: '16px 16px 0 16px' }}>
            <div style={{
              width:        '100%',
              height:       'clamp(280px, 42vw, 620px)',
              borderRadius: '12px',
              overflow:     'hidden',
              background:   'linear-gradient(135deg, #161616 0%, #2B2B2B 60%, #161616 100%)',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
            }}>
              {project.heroImage
                ? <img
                    src={project.heroImage}
                    alt={`${project.title} hero`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: '45% 58%', padding: '48px 48px 32px 48px', display: 'block' }}
                  />
                : <span style={{ fontSize: '12px', color: '#C0C0BE', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.title} · hero image</span>
              }
            </div>
          </div>

          {/* Written content */}
          {project.sections
            ? <ContentSections sections={project.sections} isMobile={isMobile} />
            : <DefaultSections
                overview={project.overview ?? ''}
                challenge={project.challenge ?? ''}
                approach={project.approach ?? ''}
                outcome={project.outcome ?? ''}
                isMobile={isMobile}
              />
          }

          {/* Bottom nav */}
          <div style={{ padding: `32px ${isMobile ? '24px' : '40px'} 40px`, borderTop: '1px solid #F0F0EE' }}>
            <button
              onClick={() => navigate('/')}
              style={{ background: 'none', border: '1px solid #E4E4E0', borderRadius: '12px', padding: '14px 24px', fontSize: '14px', color: '#666', cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E4E4E0'; e.currentTarget.style.color = '#666' }}
            >
              ← View all work
            </button>
          </div>

        </motion.div>
      </div>

    </div>
  )
}
