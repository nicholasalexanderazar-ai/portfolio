/* Home page — Work, About, Process, AI, and CTA sections */
import { useState, useEffect, useCallback } from 'react'
import { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import ProjectCard from '../components/ProjectCard'
import CopyEmailButton from '../components/CopyEmailButton'
import { ProgressiveBlur } from '../components/core/progressive-blur'

/* ─── My Taste images — auto-discovered, shuffled once ─── */
const _tasteModules = import.meta.glob('../assets/taste/*', { eager: true })
const _tasteRaw: string[] = Object.values(_tasteModules).map((m: any) => m.default)
const TASTE_IMAGES: string[] = (() => {
  const a = [..._tasteRaw]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
})()

/* ─── Responsive breakpoint hook ───────────────────────── */
function useBreakpoint(px: number) {
  const [below, setBelow] = useState(() => window.innerWidth < px)
  useEffect(() => {
    const h = () => setBelow(window.innerWidth < px)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [px])
  return below
}

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
  { emoji: '🏡', src: '/family-pic.png',  label: 'Background' },
  { emoji: '🌾', src: '/uzbek-pic.png',   label: 'Uzbekistan' },
  { emoji: '🎥', src: '/mystory-pic.png', label: 'MyStory'   },
  { emoji: '🌸', src: '/beauty-pic.png',  label: 'Passions'   },
] as const

const aboutFacts = [
  {
    title: 'Memphis, family, and faith',
    body:  "I grew up in Memphis, Tennessee, blessed with an incredible mom, dad, and sister. At Notre Dame I double-majored in Industrial Design and Marketing, and was on the rowing and cheerleading teams. I'd consider myself to have a lot of empathy, and a real soft spot for parents of special needs individuals and their unseen sacrifices.",
  },
  {
    title: 'Four years in Uzbekistan',
    body:  "Instead of taking a job offer in Chicago, I moved to Uzbekistan to join a cotton agriculture and irrigation startup. I lived in a shipping container in a remote village, going from fieldwork in blistering heat to meetings with government officials, managing up to 36 projects at once across agriculture, defense, healthcare, and fashion.",
  },
  {
    title: "Preserving people's stories",
    body:  "One of my biggest passions is helping people preserve their life stories before they're lost. That became real after documenting my grandfather's life before he passed, showing me just how much we lose when no one captures someone's story. That's part of why I built MyStory, a platform for recording life stories through guided, AI-assisted conversation.",
  },
  {
    title: 'Beauty, in every form',
    body:  "I love finding beauty in simple things: from the wings of an insect to the stars in the sky to a well-designed car or app. I dive into the details of why something works, and I'll talk about it longer than most people want to listen. That habit of close attention is probably the most consistent thread across everything I do.",
  },
]

/* ─── Process rows ───────────────────────────────────────── */
const processRows = [
  {
    icon:  '/granola.png',
    title: 'Understanding the real problem',
    body:  "Before anything else, I listen. I use Granola to take notes while talking through what someone's actually trying to accomplish, then make sure the stated goal solves the real problem behind it.",
  },
  {
    icon:  '/claude.png',
    title: 'Finding the platonic ideal',
    body:  "I'll use Claude or ChatGPT to dig into the core problem and ask what a platonic ideal solution would look like. An Airbnb trick: if 5 stars is the baseline, what would an absurd 10 look like?",
  },
  {
    icon:  '/sketch.png',
    title: 'Concepting before looking anything up',
    body:  'I sketch concepts on pen and paper before researching anything else. Looking at existing patterns too early invites groupthink; good ideas can get filtered out before they ever get a chance to exist.',
  },
  {
    icon:  '/mobbin.png',
    title: "Studying what's already working",
    body:  "Once I have a few directions, I turn to tools like Mobbin, plus my own experience and a lot of Google, to see how the best products have already solved similar problems, then decide what to borrow.",
  },
  {
    icon:  '/figma.png',
    title: 'Prototyping and building',
    body:  'I move fast between Figma for iterating on ideas and Claude Code or Lovable for pushing a real, testable prototype, getting as close to the finished thing as early as possible.',
  },
]

/* ─── Favorites data ────────────────────────────────────── */
interface FavoriteItem { title: string; subtitle: string; why: string; imageSrc?: string }
interface FavCategory  { label: string; aspect: string; items: FavoriteItem[]; isTaste?: boolean }

const FAVORITES: FavCategory[] = [
  {
    label: 'Movies',
    aspect: '1 / 1',
    items: [
      {
        title: 'About Time', subtitle: '2013', imageSrc: '/about-time.png',
        why: "About Time has a little bit of everything: it's funny, it's sweet, it's sad. It touches almost every emotion. But the real reason I love it is something deeper. There's a trope I'm drawn to more than almost any other: a character given a second chance, or a newfound perspective on life, that completely changes how they see things. It shows up in It's a Wonderful Life, in Up, even in A Christmas Carol. What makes About Time different is that it's less dramatic; the main character isn't suicidal, he isn't visited by ghosts. He just realizes the beauty in everyday, ordinary life. And because it's so mundane, it actually hits harder.",
      },
      {
        title: 'Airplane!', subtitle: '1980', imageSrc: '/airplane.png',
        why: "Pure humor — witty, fast-paced, totally unexpected, silly without ever tipping into slapstick. It's one of my guilty pleasures. There's also real nostalgia here: I have memories of watching this and the Naked Gun movies with my family when I was little. It's just a genuinely funny movie, and I never get tired of it.",
      },
      {
        title: "It's a Wonderful Life", subtitle: '1946', imageSrc: '/its-a-wonderful-life.png',
        why: "Most people treat this as Christmas background noise, but it deserves to be watched on its own terms. Jimmy Stewart's performance — especially the scene where he's praying, begging God to help him — is some of the most real acting I've ever seen in a film. A lot of old movies feel like acting. This doesn't. It feels like watching an actual middle-aged man plead for a second chance.",
      },
      {
        title: 'North by Northwest', subtitle: '1959', imageSrc: '/north-by-northwest.png',
        why: "Cary Grant is my favorite actor of all time, and I love everything Hitchcock made, but this one is the most fun: fast-paced, great design, real wit, an interesting plot all the way through. It's the perfect summer night movie, and one of the most iconic classics there is.",
      },
      {
        title: 'The Princess Bride', subtitle: '1987', imageSrc: '/the-princess-bride.png',
        why: "Iconic — there's no better word for it. One of the most quotable movies ever made, corny in exactly the right way. A lot of nostalgia here too. I've probably seen it a hundred times and I'd happily watch it a hundred more.",
      },
      {
        title: 'Up', subtitle: '2009', imageSrc: '/up.png',
        why: "A seemingly simple movie that hits on that same trope I keep coming back to: an old man convinced he failed to give the love of his life the life she dreamed of — until he opens her old book and realizes he already had. It's one of the most powerful scenes I've ever seen in any movie. The score helps — that main melody alone makes it emotional.",
      },
    ],
  },
  {
    label: 'Songs',
    aspect: '1 / 1',
    items: [
      { title: 'Born to Die',          subtitle: 'Lana Del Rey',    imageSrc: '/born-to-die.png',          why: "I remember the day the music video came out. The violins that open it, the way they worked with the cinematography: it was the first Lana Del Rey song I ever heard, and I fell in love with it because of that video. Since then she's become my favorite artist, and I've seen her twice in concert, once in Abu Dhabi at the 2019 Grand Prix and once in Brandon, Mississippi. But this song carries the most nostalgia; it's where it all started." },
      { title: 'Devil in a New Dress', subtitle: 'Kanye West',      imageSrc: '/devil-in-a-new-dress.png', why: "A lot of people call My Beautiful Dark Twisted Fantasy Kanye's greatest album, which is saying a lot. This is the best song on it. The contrast of the elegant instruments against Rick Ross's voice, the bass, the angelic quality of the whole thing: it's a beautiful song in the truest sense of the word." },
      { title: "Diplomat's Son",       subtitle: 'Vampire Weekend', imageSrc: '/diplomats-son.png',        why: "It almost feels like several different songs within one, but every part is great. The piano toward the end is beautiful, the violins that come in at the beginning are stunning. Super catchy. One of those songs that pulls you in differently every time you listen." },
      { title: "Lover's Rock",         subtitle: 'TV Girl',         imageSrc: '/lovers-rock.png',          why: "Probably my favorite song of all time. The melody is just stunning, somehow sweet and sad at the same time, and it doesn't let go. TV Girl is phenomenal across the board, but this one is in a different category. Best melody, full stop." },
      { title: 'In My Heart',          subtitle: 'Moby',            imageSrc: '/in-my-heart.png',          why: "This song takes me back to sitting in cafes in Tashkent, Uzbekistan, commuting between the farm in Jizzakh and the city, with my best friend Will Patterson. We first heard it at a place called Coffee Milk, and it kind of became our song. Moby has that early-2000s quality, nostalgic in the way the Jason Bourne soundtracks are nostalgic, and this one captures it better than almost anything else he made." },
      { title: 'Ring of Past',         subtitle: 'Midnight Trust',  imageSrc: '/ring-of-past.png',         why: "The most recent addition to this list. It has a sassy but melancholy melody that's hard to describe but impossible to forget, nostalgic in a way that even the album art signals. Discovered it not long ago and it immediately earned its spot." },
    ],
  },
  {
    label: 'Cars',
    aspect: '1 / 1',
    items: [
      { title: 'Aston Martin One-77',               subtitle: '1 of 77',  imageSrc: '/one-77.png',             why: "Possibly the most beautiful car ever designed, modern or otherwise. The long nose, the aggressive front, the rear (the best rear of any Aston Martin ever made), the lines that wrap around the silhouette: there is not one bad angle on this car. I visited Aston Martin Works in the UK with my sister and was standing in the car park when I saw headlights approaching in the distance. Someone was bringing their One-77 in to be serviced. One of the coolest moments I've had as a car person. My personal favorite is number 49 of 77; I've been tracking it since it was new, watched it move from Geneva to Connecticut to California, and it's now a few miles from my house in Franklin, Tennessee." },
      { title: 'Ferrari Monza SP1',                 subtitle: '1 of 499', imageSrc: '/sp1.png',                why: "The most recent addition to this list. The SP1 takes what Ferrari did with the SP2 and removes the one thing that made it practical, the second seat, making it purer, more selfish, more itself. The surface area that continues past the driver's seat is stunning. The headlights, the taillights, the rear wheel arches reminiscent of the original Testarossa: I think Ferrari got this one exactly right." },
      { title: 'Mercedes-Benz SLR Stirling Moss',   subtitle: '1 of 75',  imageSrc: '/slr-stirling-moss.png',  why: "The peak of the SLR. I flew to the Abu Dhabi Grand Prix specifically to see the silver one being auctioned, spent most of the day looking for it, nearly gave up, and then tripped over something, turned around, and it was right there. Only 75 were ever made. Three are in black, and two of those have the 722S wheels. My favorite would be the black one with the 722S wheels; it's the one pictured here." },
      { title: 'Aston Martin Vanquish Zagato',       subtitle: '1 of 99',  imageSrc: '/vanquish-zagato.png',    why: "The Vanquish Zagato came in four forms: Coupe, Volante, Shooting Brake, and Speedster (only 28 made). I used to prefer the Speedster, but the Coupe has the cleanest lines and I've come around completely. The taillights are my favorite detail, so Italian, and the contrast with the British platform underneath is exactly what makes this car special. The Zagato bubble roof, the circular fog lights, the silhouette: it's stunning from every angle." },
      { title: 'Pagani Zonda R',                    subtitle: '1 of 13',  imageSrc: '/zonda-r.png',            why: "One of the most aggressive and menacing fronts of any car ever made. Track-only, black on black, one of the best-sounding cars ever built. The example pictured here is believed to be the one in Toronto, with delivery graphics removed and Zonda R Evo front and rear aero added. Some call this spec the \"Liquid.\" Only 13 were ever made, and every one of them is a work of art." },
      { title: 'Mercedes-Benz SLR McLaren 722',      subtitle: '1 of 150', imageSrc: '/slr-722.png',            why: "A timeless car. The darkened headlights and taillights, the lowered suspension, the carbon fiber splitter, the silhouette: everything about this car feels like it was designed to age well. 150 coupes were made. I prefer the 722S wheels (the convertible spec) on this body, though this photo shows the standard coupe wheel. Either way, one of the great cars." },
    ],
  },
  {
    label: 'My Taste',
    isTaste: true as const,
    aspect: '1 / 1',
    items: [] as Array<{ title: string; subtitle: string; imageSrc?: string; why: string }>,
  },
]

export default function Home() {
  const isMobile = useBreakpoint(1280)
  const isNarrow = useBreakpoint(768)

  const card: CSSProperties = {
    background:   '#F7F7F5',
    borderRadius: isNarrow ? '0' : '20px',
    padding:      isNarrow ? '28px 20px' : '40px',
  }

  const [activeImg,    setActiveImg]    = useState(0)
  const [autoPlay,     setAutoPlay]     = useState(true)
  const [imgError,     setImgError]     = useState<Record<number, boolean>>({})
  const [activeCat,    setActiveCat]    = useState(0)
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') setLightboxIndex(i => i !== null && i < TASTE_IMAGES.length - 1 ? i + 1 : i)
      if (e.key === 'ArrowLeft')  setLightboxIndex(i => i !== null && i > 0 ? i - 1 : i)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, closeLightbox])

  useEffect(() => {
    if (!autoPlay) return
    const t = setInterval(() => setActiveImg(p => (p + 1) % ABOUT_IMAGES.length), 3500)
    return () => clearInterval(t)
  }, [autoPlay])

  return (
    /* Flex row so sticky sidebar participates in overscroll rubber-band */
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'flex-start' }}>
      <Sidebar />

      {/* Right content — sits naturally next to the sticky sidebar */}
      <main
        style={{
          flex:       1,
          minHeight:  '100vh',
          background: '#ffffff',
          /* negative x-offset casts shadow leftward onto the sidebar */
          boxShadow:  isMobile ? 'none' : '-6px 4px 16px rgba(0,0,0,0.12)',
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
          style={{ padding: isNarrow ? '8px 12px' : '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <ProjectCard
            title="Spark"
            headline="Leading design and development of a native iOS app for AI-powered idea capture."
            tags={['iOS', '0→1', 'AI', 'Swift']}
            bgStyle={{ background: 'radial-gradient(ellipse at 85% 80%, #3A3A3A 0%, #272727 45%, #1C1C1C 100%)' }}
            bgStyleMobile={{ background: 'radial-gradient(ellipse at 50% 82%, #3A3A3A 0%, #272727 45%, #1C1C1C 100%)' }}
            textColor="#FFFFFF"
            iconBg="#FFD900"
            iconSrc="/spark-logo.png"
            href="/spark"
            imageSrc="/spark-preview.png"
            imageAlt="Spark app screenshot"
            imageInsetMobile={{ top: '22%' }}
          />

          <ProjectCard
            title="Navora"
            headline="Designing and building a life-planning app that turns long-term vision into daily action."
            tags={['iOS', '0→1', 'AI', 'UI/UX']}
            bgStyle={{ background: 'radial-gradient(ellipse at 85% 80%, #5BAED4 0%, #2585B5 50%, #0D5F9A 100%)' }}
            bgStyleMobile={{ background: 'radial-gradient(ellipse at 50% 82%, #5BAED4 0%, #2585B5 50%, #0D5F9A 100%)' }}
            textColor="#FFFFFF"
            iconBg="rgba(255,255,255,0.2)"
            iconSrc="/navora-logo.png"
            href={null}
            imageSrc="/navora-preview.png"
            imageAlt="Navora iOS app screenshot"
            imagePosition="78% 35%"
            imageInsetMobile={{ top: '10%' }}
            badge="Coming Soon"
          />

          <ProjectCard
            title="MyStory"
            headline="Co-founding the design and product direction for a platform that preserves the stories that matter most."
            tags={['Web App', 'End to End', 'AI']}
            bgStyle={{ background: 'radial-gradient(ellipse at 85% 80%, #D4AD74 0%, #907751 50%, #6A5230 100%)' }}
            bgStyleMobile={{ background: 'radial-gradient(ellipse 190% 140% at 50% 100%, #D4AD74 0%, transparent 65%), #5A3E22' }}
            textColor="#FFFFFF"
            iconBg="rgba(255,255,255,0.2)"
            iconSrc="/mystory-logo.png"
            href={null}
            imageSrc="/mystory-preview.png"
            imageAlt="MyStory platform screenshot"
            imageInsetMobile={{ top: '16%' }}
            badge="Coming Soon"
          />

          <ProjectCard
            title="AYO"
            headline="Shaping the early concept for a social platform that turns your opinions, and your engagement with others', into your identity."
            tags={['Web App', 'UX', 'Social', '0→1']}
            bgStyle={{ background: 'radial-gradient(ellipse at 80% 45%, rgba(0,47,255,0.32) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(255,0,242,0.22) 0%, transparent 45%), #080808' }}
            bgStyleMobile={{ background: 'radial-gradient(ellipse 175% 120% at 38% 100%, rgba(0,47,255,0.7) 0%, transparent 65%), radial-gradient(ellipse 155% 105% at 68% 102%, rgba(255,0,242,0.55) 0%, transparent 62%), #080808' }}
            textColor="#FFFFFF"
            iconBg="#1A1A1A"
            iconSrc="/ayo-logo.png"
            href={null}
            imageSrc="/ayo-preview.png"
            imageAlt="AYO platform screenshot"
            imageInset={{ top: '22%', bottom: '12%', left: '4%', right: '8%' }}
            imageInsetMobile={{ top: '34%', bottom: '12%', left: '4%', right: '8%' }}
            badge="Coming Soon"
          />

        </motion.section>

        {/* ══════════════════════════════════════
            SECTION 2 — ABOUT
        ══════════════════════════════════════ */}
        {isNarrow && <div style={{ height: '1px', background: '#E0E0DC', margin: '0 20px' }} />}
        <motion.section id="about" {...fadeUp} style={{ padding: isNarrow ? '0' : '24px' }}>
          <div style={card}>
            <span style={eyebrow}>About</span>
            <h2 style={heading}>A bit about me</h2>

            <div style={{ display: 'flex', flexDirection: isNarrow ? 'column' : 'row', gap: '40px', alignItems: 'flex-start' }}>
              {/* Left — portrait + emoji switcher */}
              <div style={{ width: isNarrow ? '100%' : '310px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '9/16',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#E8E8E8',
                    position: 'relative',
                  }}
                >
                  {ABOUT_IMAGES.map((img, i) => (
                    imgError[i] ? null : (
                      <img
                        key={i}
                        src={img.src}
                        alt={img.label}
                        onError={() => setImgError(prev => ({ ...prev, [i]: true }))}
                        style={{
                          position: 'absolute', inset: 0, width: '100%', height: '100%',
                          objectFit: 'cover', display: 'block',
                          opacity: i === activeImg ? 1 : 0,
                          transition: 'opacity 0.5s ease',
                        }}
                      />
                    )
                  ))}
                  {imgError[activeImg] && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                      {ABOUT_IMAGES[activeImg].emoji}
                    </div>
                  )}
                </div>

                {/* Emoji selector */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {ABOUT_IMAGES.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => { setActiveImg(i); setAutoPlay(false); setImgError(prev => ({ ...prev, [i]: false })) }}
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
                    <div style={{ fontSize: '18px', fontWeight: '500', fontFamily: 'var(--font-serif)', color: '#111', marginBottom: '6px' }}>
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
            SECTION 2B — FAVORITES
        ══════════════════════════════════════ */}
        {isNarrow && <div style={{ height: '1px', background: '#E0E0DC', margin: '0 20px' }} />}
        <motion.section {...fadeUp} style={{ padding: isNarrow ? '0' : '0 24px 24px' }}>
          <div style={card}>
            <span style={eyebrow}>Favorites</span>
            <h2 style={heading}>Things that inspire me</h2>

            {/* Category tabs — reuse Process tab style */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {FAVORITES.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => { setActiveCat(i); setSelectedItem(null) }}
                  style={{
                    padding: '10px 18px', borderRadius: '12px', border: 'none',
                    background: activeCat === i ? '#111' : '#EBEBEB',
                    color:      activeCat === i ? '#fff' : '#666',
                    fontSize: '14px', fontWeight: '500', cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* My Taste gallery OR regular grid+panel */}
            {(FAVORITES[activeCat] as any).isTaste ? (

              /* ── My Taste: full-width image grid, click to lightbox ── */
              <div style={{
                overflowY: 'auto',
                maxHeight: isNarrow ? 'calc(150vw - 190px)' : isMobile ? 'calc(75vw - 97px)' : 'calc(75vw - 397px)',
                borderRadius: '10px',
              }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${isNarrow ? 2 : 4}, 1fr)`,
                gap: '5px',
              }}>
                {TASTE_IMAGES.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    style={{ aspectRatio: '1 / 1', borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', background: '#E8E8E8' }}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
              </div>

            ) : (<>

              {/* Grid + panel */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>

                {/* Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    flexBasis: selectedItem !== null && !isMobile ? '46%' : '100%',
                    flexGrow: 0,
                    flexShrink: 0,
                    transition: 'flex-basis 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: 0,
                  }}
                >
                  {FAVORITES[activeCat].items.map((item, i) => {
                    const sel = selectedItem === i
                    return (
                      <motion.div
                        key={`${activeCat}-${i}`}
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                        onClick={() => setSelectedItem(sel ? null : i)}
                        style={{
                          cursor: 'pointer',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          position: 'relative',
                          aspectRatio: '1 / 1',
                          background: '#E8E8E8',
                          boxShadow: sel ? '0 0 0 2.5px #111' : '0 0 0 2.5px transparent',
                          transition: 'box-shadow 0.2s ease',
                        }}
                      >
                        {item.imageSrc && (
                          <img
                            src={item.imageSrc}
                            alt={item.title}
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        )}
                        <ProgressiveBlur
                          blurIntensity={18}
                          direction="bottom"
                          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '42%', zIndex: 1 }}
                        />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '9px 10px', zIndex: 2, pointerEvents: 'none' }}>
                          <motion.div
                            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                            transition={{ duration: 0.2, ease: 'easeOut', delay: 0.26 }}
                            style={{ fontSize: '12px', fontWeight: '600', color: '#fff', lineHeight: '1.3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          >
                            {item.title}
                          </motion.div>
                          <motion.div
                            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                            transition={{ duration: 0.2, ease: 'easeOut', delay: 0.26 }}
                            style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', marginTop: '1px' }}
                          >
                            {item.subtitle}
                          </motion.div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Desktop reveal panel */}
                <AnimatePresence>
                  {selectedItem !== null && !isMobile && (
                    <motion.div
                      key="panel"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      style={{ flex: 1, background: '#EFEFED', borderRadius: '14px', padding: '24px', minWidth: 0, height: '360px', overflow: 'hidden', position: 'relative' }}
                    >
                      <div style={{ height: '100%', overflowY: 'auto' }}>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`content-${activeCat}-${selectedItem}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.16 }}
                          >
                            {FAVORITES[activeCat].items[selectedItem].imageSrc && (
                              <img
                                src={FAVORITES[activeCat].items[selectedItem].imageSrc}
                                alt=""
                                style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '10px', marginBottom: '16px', display: 'block' }}
                              />
                            )}
                            <div style={{ fontSize: '17px', fontWeight: '500', color: '#111', marginBottom: '4px', paddingRight: '28px' }}>
                              {FAVORITES[activeCat].items[selectedItem].title}
                            </div>
                            <div style={{ fontSize: '12px', color: '#999', marginBottom: '14px' }}>
                              {FAVORITES[activeCat].items[selectedItem].subtitle}
                            </div>
                            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.75', margin: 0 }}>
                              {FAVORITES[activeCat].items[selectedItem].why}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile reveal panel */}
              <AnimatePresence>
                {selectedItem !== null && isMobile && (
                  <motion.div
                    key="mpanel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    style={{ marginTop: '16px', background: '#EFEFED', borderRadius: '14px', padding: '20px', position: 'relative', minHeight: '200px' }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`mcontent-${activeCat}-${selectedItem}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.14 }}
                      >
                        {FAVORITES[activeCat].items[selectedItem].imageSrc && (
                          <img
                            src={FAVORITES[activeCat].items[selectedItem].imageSrc}
                            alt=""
                            style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '10px', marginBottom: '14px', display: 'block' }}
                          />
                        )}
                        <div style={{ fontSize: '16px', fontWeight: '500', color: '#111', marginBottom: '4px', paddingRight: '24px' }}>
                          {FAVORITES[activeCat].items[selectedItem].title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999', marginBottom: '12px' }}>
                          {FAVORITES[activeCat].items[selectedItem].subtitle}
                        </div>
                        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.75', margin: 0 }}>
                          {FAVORITES[activeCat].items[selectedItem].why}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

            </>)}

          </div>
        </motion.section>

        {/* ── Lightbox ── */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={closeLightbox}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  src={TASTE_IMAGES[lightboxIndex]}
                  alt=""
                  onClick={e => e.stopPropagation()}
                  style={{ maxWidth: '88vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '6px', display: 'block' }}
                />
              </AnimatePresence>
              <button onClick={closeLightbox} style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', color: '#fff', fontSize: '32px', cursor: 'pointer', lineHeight: 1, opacity: 0.7, padding: '8px' }}>×</button>
              {lightboxIndex > 0 && (
                <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => i! - 1) }} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: '44px', cursor: 'pointer', opacity: 0.6, padding: '16px', lineHeight: 1 }}>‹</button>
              )}
              {lightboxIndex < TASTE_IMAGES.length - 1 && (
                <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => i! + 1) }} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: '44px', cursor: 'pointer', opacity: 0.6, padding: '16px', lineHeight: 1 }}>›</button>
              )}
              <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                {lightboxIndex + 1} / {TASTE_IMAGES.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════
            SECTION 3 — PROCESS (combined)
        ══════════════════════════════════════ */}
        {isNarrow && <div style={{ height: '1px', background: '#E0E0DC', margin: '0 20px' }} />}
        <motion.section id="process" {...fadeUp} style={{ padding: isNarrow ? '0' : '24px' }}>
          <div style={card}>
            <div style={{ display: 'flex', flexDirection: isNarrow ? 'column' : 'row', gap: isNarrow ? '28px' : '56px', alignItems: 'flex-start' }}>

              {/* Left column: heading + description */}
              <div style={{ width: isNarrow ? 'auto' : '230px', flexShrink: 0 }}>
                <span style={eyebrow}>Process</span>
                <h2 style={{ ...heading, marginBottom: '12px' }}>How I work</h2>
                <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', margin: 0 }}>
                  From first conversation to a clickable prototype — here's the path, and the tools I lean on along the way.
                </p>
              </div>

              {/* Right column: rows + footnote */}
              <div style={{ flex: 1 }}>
                {processRows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display:    'flex',
                      gap:        '24px',
                      alignItems: 'flex-start',
                      padding:    '20px 0',
                      borderTop:  '1px solid #E4E4E0',
                    }}
                  >
                    <img
                      src={row.icon}
                      alt=""
                      style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', flexShrink: 0, display: 'block' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '19px', fontWeight: '500', fontFamily: 'var(--font-serif)', color: '#111', marginBottom: '5px', lineHeight: '1.2' }}>
                        {row.title}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.65', maxWidth: '520px' }}>
                        {row.body}
                      </div>
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            SECTION 5 — CTA
        ══════════════════════════════════════ */}
        <motion.section {...fadeUp} style={{ padding: isNarrow ? '0 0 24px' : '24px 24px 28px' }}>
          <div
            style={{
              background:     isNarrow ? '#F7F7F5' : '#111',
              borderRadius:   isNarrow ? '0' : '20px',
              padding:        isNarrow ? '32px 20px' : '48px',
              display:        'flex',
              flexDirection:  isNarrow ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems:     isNarrow ? 'flex-start' : 'center',
              gap:            isNarrow ? '24px' : '32px',
            }}
          >
            <div>
              <h2 style={{ color: isNarrow ? '#111' : '#fff', fontSize: isNarrow ? '26px' : '32px', fontWeight: '500', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>
                Want to work together?
              </h2>
              <div style={{ color: '#888', fontSize: '14px' }}>
                Currently open to full-time product design roles.
              </div>
            </div>
            <CopyEmailButton dark={!isNarrow} />
          </div>
        </motion.section>

      </main>
    </div>
  )
}
