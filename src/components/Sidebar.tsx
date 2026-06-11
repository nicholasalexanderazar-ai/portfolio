import { useState, useEffect, useRef } from 'react'
import CopyEmailButton from './CopyEmailButton'

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const ExternalArrow = () => (
  <svg
    width="11" height="11" viewBox="0 0 11 11"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'inline-block', marginLeft: '5px', verticalAlign: 'middle', position: 'relative', top: '-1px' }}
  >
    <path d="M2 9L9 2" />
    <path d="M4.5 2H9V6.5" />
  </svg>
)

const NAV_ITEMS = [
  { label: 'Work',    id: 'work'    },
  { label: 'About',   id: 'about'   },
  { label: 'Process', id: 'process' },
] as const

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState<string>('')
  const tickerRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-35% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const slowerTicker = () => tickerRef.current?.getAnimations()[0]?.updatePlaybackRate(0.25)
  const normalTicker = () => tickerRef.current?.getAnimations()[0]?.updatePlaybackRate(1)

  const logoBlocks = Array.from({ length: 8 }, (_, i) => (
    <div key={i} style={{ width: '40px', height: '40px', background: '#E8E8E8', borderRadius: '10px', flexShrink: 0 }} />
  ))

  return (
    <div
      style={{
        position:      'sticky',
        top:           0,
        width:         'var(--sidebar-width)',
        height:        '100vh',
        flexShrink:    0,
        background:    '#F5F5F3',
        display:       'flex',
        flexDirection: 'column',
        padding:       '32px',
      }}
    >
      {/* ── Top ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <img
          src="/nicholas.png"
          alt="Nicholas Azar"
          style={{
            width: '68px', height: '68px', borderRadius: '50%',
            objectFit: 'cover', objectPosition: '50% 15%',
          }}
        />

        <div style={{
          fontSize: '30px', fontWeight: '500', lineHeight: '1.3',
          color: '#111111', fontFamily: 'var(--font-serif)',
        }}>
          Hey! I&apos;m Nicholas. Product Designer and Builder based in Nashville.
        </div>

        <div style={{ color: '#999', fontSize: '14px', lineHeight: '1.6' }}>
          5+ years designing and building digital products across startups, software, and personal ventures.
        </div>

        <CopyEmailButton />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
            <div className="pulse-ring" />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e' }} />
          </div>
          <span style={{ color: '#22c55e', fontSize: '14px' }}>Available for work</span>
        </div>
      </div>

      <div style={{ flexGrow: 1 }} />

      {/* ── Bottom ── */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none', padding: '0',
                fontSize: '17px', cursor: 'pointer', textAlign: 'left',
                transition: 'color 0.2s',
                color: activeSection === id ? '#111' : '#999',
                display: 'flex', alignItems: 'center', gap: '7px',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#111')}
              onMouseLeave={e => (e.currentTarget.style.color = activeSection === id ? '#111' : '#999')}
            >
              {label}
              {activeSection === id && (
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
              )}
            </button>
          ))}
          <a
            href="/resume.pdf" target="_blank" rel="noreferrer"
            style={{ fontSize: '17px', color: '#999', textDecoration: 'none', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#111')}
            onMouseLeave={e => (e.currentTarget.style.color = '#999')}
          >
            Resume<ExternalArrow />
          </a>
        </div>

        {/* Ticker — pushed lower, bleeds edge-to-edge */}
        <div
          style={{ overflow: 'hidden', marginLeft: '-32px', marginRight: '-32px', marginTop: '40px', marginBottom: '0' }}
          onMouseEnter={slowerTicker}
          onMouseLeave={normalTicker}
        >
          <div ref={tickerRef} className="logo-strip-inner">
            {logoBlocks}
            {logoBlocks}
          </div>
        </div>

        <div
          style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-between', color: '#999', fontSize: '11px', marginTop: '28px',
          }}
        >
          <span>© 1996</span>
          <a href="https://linkedin.com/in/nicholasazar" target="_blank" rel="noreferrer"
            style={{ color: '#999', display: 'flex', alignItems: 'center' }}>
            <LinkedinIcon />
          </a>
          <span>nicholasalexanderazar@gmail.com</span>
        </div>
      </div>
    </div>
  )
}
