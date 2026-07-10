import { useState, useRef, useEffect } from 'react'

export interface VideoTabItem {
  tab: string
  src: string
  hasAudio?: boolean
  caption?: string
}

const IconSpeakerOn = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
)

const IconSpeakerOff = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
)

const AudioTabIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
)

const CAPTION_STYLE = { fontSize: '13px', lineHeight: '1.65', color: '#777', margin: 0 } as const

function CaptionBody({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {text.split('\n\n').map((block, i) => {
        const lines   = block.split('\n')
        const bullets = lines.filter(l => l.startsWith('• '))
        const prose   = lines.filter(l => !l.startsWith('• '))
        if (bullets.length === 0) return <p key={i} style={CAPTION_STYLE}>{block}</p>
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {prose.length > 0 && <p style={CAPTION_STYLE}>{prose.join(' ')}</p>}
            <ul style={{ paddingLeft: '14px', margin: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {bullets.map((l, j) => <li key={j} style={CAPTION_STYLE}>{l.slice(2)}</li>)}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

interface IPhoneFrameProps {
  src: string
  videoRef: (el: HTMLVideoElement | null) => void
  hasAudio?: boolean
  audioMuted: boolean
  onMuteToggle: () => void
  isActive: boolean
}

function IPhoneFrame({ src, videoRef, hasAudio, audioMuted, onMuteToggle, isActive }: IPhoneFrameProps) {
  return (
    <div style={{ display: isActive ? 'flex' : 'none', justifyContent: 'center' }}>
      {/* Device shell */}
      <div style={{
        position:     'relative',
        width:        'min(260px, 72%)',
        flexShrink:   0,
        background:   '#1C1C1E',
        borderRadius: '40px',
        padding:      '10px',
        boxShadow:    [
          '0 0 0 1.5px #0A0A0A',
          '0 0 0 1px rgba(255,255,255,0.07) inset',
          '0 24px 64px rgba(0,0,0,0.42)',
          '0 6px 18px rgba(0,0,0,0.28)',
        ].join(', '),
      }}>
        {/* Silent switch */}
        <div style={{ position: 'absolute', left: '-3px', top: '10%', width: '3px', height: '22px', background: '#2A2A2C', borderRadius: '2px 0 0 2px' }} />
        {/* Volume up */}
        <div style={{ position: 'absolute', left: '-3px', top: '19%', width: '3px', height: '40px', background: '#2A2A2C', borderRadius: '2px 0 0 2px' }} />
        {/* Volume down */}
        <div style={{ position: 'absolute', left: '-3px', top: '28%', width: '3px', height: '40px', background: '#2A2A2C', borderRadius: '2px 0 0 2px' }} />
        {/* Power button */}
        <div style={{ position: 'absolute', right: '-3px', top: '22%', width: '3px', height: '64px', background: '#2A2A2C', borderRadius: '0 2px 2px 0' }} />

        {/* Screen — aspect ratio locks height to iPhone proportions */}
        <div style={{
          borderRadius: '32px',
          overflow:     'hidden',
          position:     'relative',
          aspectRatio:  '9 / 19.5',
          background:   '#000',
        }}>
          <video
            ref={videoRef}
            src={src}
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {hasAudio && (
            <button
              onClick={onMuteToggle}
              title={audioMuted ? 'Unmute' : 'Mute'}
              style={{
                position:       'absolute',
                bottom:         '14px',
                right:          '14px',
                width:          '32px',
                height:         '32px',
                borderRadius:   '8px',
                background:     'rgba(0,0,0,0.48)',
                backdropFilter: 'blur(8px)',
                border:         '1px solid rgba(255,255,255,0.1)',
                color:          'rgba(255,255,255,0.9)',
                cursor:         'pointer',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                zIndex:         2,
              }}
            >
              {audioMuted ? <IconSpeakerOff /> : <IconSpeakerOn />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VideoTabs({ items }: { items: VideoTabItem[] }) {
  const [active, setActive]         = useState(0)
  const [audioMuted, setAudioMuted] = useState(true)
  const refs = useRef<(HTMLVideoElement | null)[]>([])

  // Tab switch: restart from 0, apply muted state, play
  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return
      if (i === active) {
        v.currentTime = 0
        v.muted = items[i].hasAudio ? audioMuted : true
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  // audioMuted intentionally excluded — handled by the effect below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  // Sync mute toggle without restarting
  useEffect(() => {
    const v = refs.current[active]
    if (v && items[active]?.hasAudio) v.muted = audioMuted
  }, [audioMuted, active, items])

  const activeItem = items[active]

  return (
    <div>
      {/* iPhone frames — only the active one is visible */}
      <div style={{ background: '#F0F0EE', borderRadius: '16px', padding: '36px 20px 48px' }}>
        {items.map((item, i) => (
          <IPhoneFrame
            key={item.src}
            src={item.src}
            videoRef={(el) => { refs.current[i] = el; if (el) el.muted = true }}
            hasAudio={item.hasAudio}
            audioMuted={audioMuted}
            onMuteToggle={() => setAudioMuted(m => !m)}
            isActive={i === active}
          />
        ))}
      </div>

      {/* Tabs — centered below */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px', justifyContent: 'center' }}>
        {items.map((item, i) => (
          <button
            key={item.tab}
            onClick={() => setActive(i)}
            style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          '5px',
              padding:      '7px 14px',
              borderRadius: '8px',
              border:       'none',
              cursor:       'pointer',
              fontSize:     '13px',
              fontWeight:   '500',
              fontFamily:   'var(--font-sans)',
              background:   i === active ? '#111111' : '#F0F0EE',
              color:        i === active ? '#ffffff' : '#666666',
              transition:   'background 0.15s, color 0.15s',
            }}
          >
            {item.tab}
            {item.hasAudio && <AudioTabIcon />}
          </button>
        ))}
      </div>

      {/* Per-tab caption */}
      {activeItem.caption && (
        <div style={{ marginTop: '16px' }}>
          <CaptionBody text={activeItem.caption} />
        </div>
      )}
    </div>
  )
}
