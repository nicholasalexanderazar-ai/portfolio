/* Home page — Work, About, Process, AI, and CTA sections */
import { useState } from 'react'
import { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import ProjectCard from '../components/ProjectCard'
import CopyEmailButton from '../components/CopyEmailButton'

/* ─── Shared section fade-in animation ─────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { duration: 0.5 },
}

/* ─── Small eyebrow label ───────────────────────────────── */
const eyebrow: CSSProperties = {
  fontSize: '13px',
  letterSpacing: '0.10em',
  color: '#aaa',
  textTransform: 'uppercase',
  fontWeight: '500',
  marginBottom: '12px',
  display: 'block',
}

/* ─── Section heading ───────────────────────────────────── */
const heading: CSSProperties = {
  fontSize: '32px',
  fontWeight: '500',
  color: '#111',
  lineHeight: '1.2',
  marginBottom: '32px',
  fontFamily: 'var(--font-serif)',
}

/* ─── About content ─────────────────────────────────────── */
const ABOUT_IMAGES = [
  { emoji: '🧑‍💻', src: '/about-1.jpg', label: 'Working' },
  { emoji: '🚗',   src: '/about-2.jpg', label: 'Cars'    },
  { emoji: '🌍',   src: '/about-3.jpg', label: 'Travel'  },
  { emoji: '✍️',  src: '/about-4.jpg', label: 'Creative'},
] as const

const aboutFacts = [
  {
    title: 'Designer and builder based in Nashville',
    body:  'I design and build digital products end to end — from strategy and UX through visual design and shipped code. I work across startups, personal projects, and client work, and I\'m usually most useful somewhere between "we have an idea" and "this is live."',
  },
  {
    title: 'Notre Dame, Industrial Design and Marketing',
    body:  'Studying Industrial Design taught me to think about constraints, user needs, and production reality at the same time. Adding Marketing gave me a commercial lens that most designers lack. Together they shaped how I approach both the experience and the business logic behind a product.',
  },
  {
    title: 'Built across software, startups, and international work',
    body:  'My work spans early-stage iOS and web apps, AI-integrated products, and four years helping build an international venture in Uzbekistan. I\'m comfortable with ambiguity, early-stage chaos, and the kind of work where the job description is still being written.',
  },
  {
    title: 'Always studying what feels right',
    body:  'I pay close attention to the products I use — what interactions feel considered, what animations earn their keep, what decisions most people never notice. That practice shows up in everything I touch.',
  },
]

/* ─── Process steps ─────────────────────────────────────── */
const processSteps = [
  {
    num:   '01',
    title: "Study what's best",
    desc:  'Before touching Figma I spend time with the best products in the space. I break down patterns and understand why decisions were made.',
    bg:    '#161616',
  },
  {
    num:   '02',
    title: 'Design with intent',
    desc:  "Every decision has a reason. I work fast but I don't guess. Figma for structure, real devices for feel, AI tools for speed.",
    bg:    '#0D1F2D',
  },
  {
    num:   '03',
    title: 'Build and ship',
    desc:  'I write front-end code and use AI-assisted development to take designs further than a handoff ever could. If I designed it I want to see it live.',
    bg:    '#1A0A1E',
  },
]

/* ─── AI steps ──────────────────────────────────────────── */
const aiSteps = [
  {
    title: 'Claude as a thinking partner',
    desc:  'I use it to pressure-test decisions, poke holes in flows, and think through edge cases before they become problems in production.',
  },
  {
    title: 'v0 and Lovable for prototyping',
    desc:  'I go from design to working prototype faster than a traditional handoff. Useful for testing and showing stakeholders something real.',
  },
  {
    title: 'AI-assisted research',
    desc:  'Competitive analysis, pattern libraries, behavioral science — I synthesize faster and spend more time on the decisions that matter.',
  },
]

/* ─── Card wrapper shared style ─────────────────────────── */
const card: CSSProperties = {
  background:    '#F7F7F5',
  borderRadius:  '20px',
  padding:       '40px',
}

export default function Home() {
  const [activeImg,   setActiveImg]   = useState(0)
  const [imgError,    setImgError]    = useState<Record<number, boolean>>({})
  const [activeStep,  setActiveStep]  = useState(0)
  const [stepDir,     setStepDir]     = useState(1)  // 1 = forward, -1 = backward

  const goToStep = (i: number) => {
    setStepDir(i > activeStep ? 1 : -1)
    setActiveStep(i)
  }

  return (
    /* Flex row so sticky sidebar participates in overscroll rubber-band */
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <Sidebar />

      {/* Right content — sits naturally next to the sticky sidebar */}
      <main
        style={{
          flex:       1,
          minHeight:  '100vh',
          background: '#ffffff',
          /* negative x-offset casts shadow leftward onto the sidebar */
          boxShadow:  '-6px 4px 16px rgba(0,0,0,0.12)',
          position:   'relative',
          zIndex:     1,
        }}
      >

        {/* ══════════════════════════════════════
            SECTION 1 — WORK
        ══════════════════════════════════════ */}
        <motion.section
          id="work"
          {...fadeUp}
          style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <ProjectCard
            title="Spark"
            headline="Capture ideas before they disappear."
            tags={['iOS', '0→1', 'AI', 'Swift']}
            bgStyle={{ background: '#161616' }}
            textColor="#FFFFFF"
            iconBg="#FFD900"
            href="/spark"
            imageAlt="Spark app screenshot"
          />

          <ProjectCard
            title="Navora"
            headline="Turn your lifetime vision into today's action."
            tags={['Web App', '0→1', 'AI']}
            bgStyle={{ background: 'radial-gradient(ellipse at 20% 50%, #E8DCC8 0%, #F5EDD8 40%, #EDE0C4 70%, #D4C4A0 100%)' }}
            textColor="#2C2416"
            iconBg="rgba(0,0,0,0.1)"
            href="/navora"
            imageAlt="Navora web app screenshot"
          />

          <ProjectCard
            title="MyStory"
            headline="Preserve the stories that matter most."
            tags={['Web App', 'iOS', 'AI', 'End to End']}
            bgStyle={{ background: 'linear-gradient(135deg, #917A52 0%, #A48754 25%, #957949 50%, #AB8C57 75%, #917A52 100%)' }}
            textColor="#FFFFFF"
            iconBg="rgba(255,255,255,0.2)"
            href="/mystory"
            imageAlt="MyStory platform screenshot"
          />

          <ProjectCard
            title="AYO"
            headline="A new way to go deep on the music you love."
            tags={['Web App', 'UX', 'Social', '0→1']}
            bgStyle={{ background: '#0A0A0A' }}
            textColor="#FFFFFF"
            iconBg="#1A1A1A"
            href="/ayo"
            imageAlt="AYO platform screenshot"
            colorAccents
          />

        </motion.section>

        {/* ══════════════════════════════════════
            SECTION 2 — ABOUT
        ══════════════════════════════════════ */}
        <motion.section id="about" {...fadeUp} style={{ padding: '24px' }}>
          <div style={card}>
            <span style={eyebrow}>About</span>
            <h2 style={heading}>Designing and building since 2019.</h2>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '32px', alignItems: 'flex-start' }}>
              {/* Left — portrait + emoji switcher */}
              <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div
                  style={{
                    width: '100%',
                    height: '380px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#E8E8E8',
                  }}
                >
                  {!imgError[activeImg] ? (
                    /* TODO: Replace /about-1.jpg – /about-4.jpg with real photos */
                    <img
                      src={ABOUT_IMAGES[activeImg].src}
                      alt={ABOUT_IMAGES[activeImg].label}
                      onError={() => setImgError(prev => ({ ...prev, [activeImg]: true }))}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                      {ABOUT_IMAGES[activeImg].emoji}
                    </div>
                  )}
                </div>

                {/* Emoji selector */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {ABOUT_IMAGES.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => { setActiveImg(i); setImgError(prev => ({ ...prev, [i]: false })) }}
                      title={item.label}
                      style={{
                        flex: 1, padding: '8px 0', borderRadius: '10px', border: 'none',
                        background: activeImg === i ? '#E0E0DE' : 'transparent',
                        cursor: 'pointer', fontSize: '16px', transition: 'background 0.15s',
                      }}
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right — stacked fact items */}
              <div style={{ flex: 1 }}>
                {aboutFacts.map((fact, i) => (
                  <div
                    key={i}
                    style={{
                      paddingTop:    i === 0 ? '0' : '14px',
                      paddingBottom: '14px',
                      borderBottom:  i < aboutFacts.length - 1 ? '1px solid #E4E4E0' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#111', marginBottom: '6px' }}>
                      {fact.title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                      {fact.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            SECTION 3 — HOW I WORK (interactive)
        ══════════════════════════════════════ */}
        <motion.section id="process" {...fadeUp} style={{ padding: '24px' }}>
          <div style={card}>
            <span style={eyebrow}>Process</span>
            <h2 style={heading}>How I work.</h2>

            {/* Step selector tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {processSteps.map((step, i) => (
                <button
                  key={step.num}
                  onClick={() => goToStep(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    border: 'none',
                    background: activeStep === i ? '#111' : '#EBEBEB',
                    color:      activeStep === i ? '#fff' : '#666',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  <span style={{ opacity: activeStep === i ? 0.4 : 0.5, fontSize: '12px' }}>
                    {step.num}
                  </span>
                  {step.title}
                </button>
              ))}
            </div>

            {/* Carousel — absolute-positioned cards slide simultaneously with tiny gap */}
            <div style={{ overflow: 'hidden', borderRadius: '16px', position: 'relative', height: '230px' }}>
              <AnimatePresence mode="sync" custom={stepDir}>
                <motion.div
                  key={activeStep}
                  custom={stepDir}
                  variants={{
                    /* 103% creates ~3% visible gap between slides during transition */
                    enter:  (d: number) => ({ x: d > 0 ? '103%' : '-103%' }),
                    center: { x: 0 },
                    exit:   (d: number) => ({ x: d > 0 ? '-103%' : '103%' }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    position:     'absolute',
                    inset:        0,
                    background:   processSteps[activeStep].bg,
                    borderRadius: '16px',
                    padding:      '40px',
                    color:        '#fff',
                  }}
                >
                  <div style={{ fontSize: '72px', fontWeight: '700', color: 'rgba(255,255,255,0.07)', lineHeight: 1, marginBottom: '20px' }}>
                    {processSteps[activeStep].num}
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: '500', marginBottom: '14px' }}>
                    {processSteps[activeStep].title}
                  </div>
                  <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.75', maxWidth: '560px' }}>
                    {processSteps[activeStep].desc}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            SECTION 4 — HOW I USE AI
        ══════════════════════════════════════ */}
        <motion.section {...fadeUp} style={{ padding: '24px' }}>
          <div style={card}>
            <span style={eyebrow}>Tools</span>
            <h2 style={heading}>How I use AI.</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {aiSteps.map(({ title, desc }) => (
                <div
                  key={title}
                  style={{
                    background:   '#fff',
                    borderRadius: '14px',
                    padding:      '24px',
                    border:       '1px solid #EBEBEB',
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: '500', color: '#111', marginBottom: '8px' }}>{title}</div>
                  <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.7' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            SECTION 5 — CTA
        ══════════════════════════════════════ */}
        <motion.section {...fadeUp} style={{ padding: '24px', paddingBottom: '48px' }}>
          <div
            style={{
              background:     '#111',
              borderRadius:   '20px',
              padding:        '48px',
              display:        'flex',
              flexDirection:  'row',
              justifyContent: 'space-between',
              alignItems:     'center',
              gap:            '32px',
            }}
          >
            <div>
              <h2 style={{ color: '#fff', fontSize: '32px', fontWeight: '500', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>
                Want to work together?
              </h2>
              <div style={{ color: '#666', fontSize: '14px' }}>
                Currently open to full-time product design roles.
              </div>
            </div>
            <CopyEmailButton dark />
          </div>
        </motion.section>

      </main>
    </div>
  )
}
