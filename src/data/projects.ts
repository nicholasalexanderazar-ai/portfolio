import type { CSSProperties } from 'react'

export interface ProjectSectionImageItem {
  src: string
  caption: string
}

export interface ProjectSectionImage {
  /** Single image — kept for backward compat (unused now) */
  src?: string
  /** Multiple images rendered as a 3-col grid / horizontal scroll carousel */
  images?: ProjectSectionImageItem[]
  /** @deprecated use images[].caption instead */
  captions?: string[]
  /** Sentence rendered after the image(s) and before remaining body copy */
  transition?: string
}

export interface ProjectSectionLightboxImage {
  src: string
  caption: string
}

export interface ProjectSectionVideo {
  tab: string
  src: string
  /** When true, the clip is not permanently muted and a mute toggle is shown */
  hasAudio?: boolean
  /** Description shown below the tabs when this clip is active */
  caption?: string
}

export interface ProjectSectionOutcomeItem {
  src: string
  label: string
}

export interface ProjectSection {
  title: string
  /** Right-column sub-heading shown above the body text */
  subheading?: string
  /** Paragraph blocks separated by \n\n. Lines starting with "• " are rendered as bullet lists. */
  body: string
  /** Phase labels rendered as a horizontal arrow-separated flow row */
  phases?: string[]
  /** Optional image block rendered after `body` (problem-style gray container) */
  imageBlock?: ProjectSectionImage
  /** Body copy rendered after the image block */
  bodyAfterImage?: string
  /** Full-width lightbox image rendered below the body */
  lightboxImage?: ProjectSectionLightboxImage
  /** Three outcome images rendered in a card grid below the body */
  outcomeImages?: ProjectSectionOutcomeItem[]
  /** Tabbed video clips rendered as a video module below the body */
  videos?: ProjectSectionVideo[]
}

export interface Project {
  id: string
  title: string
  headline: string
  description: string
  tags: string[]
  cardBg: CSSProperties
  cardTextColor: string
  iconBg: string
  colorAccents?: boolean
  sidebarBg: string
  sidebarTextColor: string
  href: string
  role: string
  year: string
  type: string
  /** Path to the hero image shown at the top of the case study (relative to /public) */
  heroImage?: string
  /** Optional project logo shown on the card icon and case study sidebar */
  iconSrc?: string
  /** Custom sections — when present, replaces the default 4-field layout */
  sections?: ProjectSection[]
  /** Default 4-field layout — used when sections is absent */
  overview?: string
  challenge?: string
  approach?: string
  outcome?: string
}

export const projects: Project[] = [
  {
    id: "spark",
    title: "Spark",
    headline: "Designing a native iOS system for turning raw ideas into validated concepts.",
    description: "Spark is an AI-native idea development app that guides users from capture to structure, positioning, branding, and validation.",
    tags: ["iOS", "0→1", "AI", "Swift"],
    cardBg: { background: "#161616" },
    cardTextColor: "#FFFFFF",
    iconBg: "#FFD900",
    sidebarBg: "#161616",
    sidebarTextColor: "#FFFFFF",
    href: "/spark",
    role: "UX & Product Designer",
    year: "2026",
    type: "iOS App",
    heroImage: "/spark-hero.png",
    iconSrc: "/spark-logo.png",
    sections: [
      {
        title: "Overview",
        subheading: "An AI-native idea development app",
        body: `Spark is a native iOS app that helps people turn raw ideas into structured, validated concepts. I designed and built the core experience around a phased journey: define an idea, research the market, position the concept, generate a brand direction, and validate whether it is worth pursuing.

The key design challenge was turning AI from an open-ended chat interface into a guided product system — one that gives users structure and forward momentum without removing the flexibility of natural language.`,
      },
      {
        title: "Problem",
        subheading: "Ideas are easy to capture, but hard to develop.",
        body: `People are good at capturing ideas. They are much worse at developing them. Most ideas end up scattered across Notes, voice memos, texts, or unfinished ChatGPT threads. The problem is not capture — it is what happens after capture.`,
        imageBlock: {
          images: [
            { src: '/spark-problem-notes.png',       caption: 'Notes captures the idea, but gives it no direction.' },
            { src: '/spark-problem-chatgpt.png',     caption: 'ChatGPT can help, but the user has to manage the process.' },
            { src: '/spark-problem-voice-memos.png', caption: 'Voice Memos are fast, but ideas become hard to find and act on.' },
          ],
          transition: 'I designed Spark to pull these scattered behaviors into one guided system — capture, clarify, structure, and validate.',
        },
        bodyAfterImage: `Users still have to clarify the idea, research the market, sharpen the positioning, and decide whether it is worth pursuing. Generic AI chat can help, but it puts too much burden on the user. The design challenge was figuring out how to give users the flexibility of AI without forcing them to manage the entire conversation, structure, and next step themselves.`,
      },
      {
        title: "The Vision",
        subheading: "A guided system instead of another blank chat box",
        phases: ["Define", "Research", "Position", "Brand", "Vault", "Validate"],
        body: `I chose a phased architecture because a blank chat interface puts too much responsibility on the user. The phases gave the product a clear information architecture: each step had a purpose, an output, and a next action.

Each phase builds on the last — the idea gets clearer, sharper, and more testable as it moves through the system.`,
        videos: [
          {
            tab: 'Core Flow',
            src: '/spark-video-core.mp4',
            caption: `The core idea journey — from naming and defining the concept through AI-assisted research, positioning, and brand generation. Each phase advances automatically once the AI has enough to work with.`,
          },
          {
            tab: 'Onboarding',
            src: '/spark-video-onboarding.mp4',
            caption: `I designed the onboarding to get users from zero to an active idea in under two minutes. It asks one question at a time and uses the answer to pre-populate the first phase — no empty state, no blank form.`,
          },
          {
            tab: 'Validation',
            src: '/spark-video-validation.mp4',
            caption: `I designed the validation flow to run a structured interview, synthesize responses, and return a single clear recommendation. The goal was to eliminate interpretation — the user gets a decision, not raw data.`,
          },
          {
            tab: 'Voice UX',
            src: '/spark-video-voice-UX.mp4',
            hasAudio: true,
            caption: `I designed a compact readback control inside the chat composition bar — a capsule that expands when audio is active and collapses when it's not. No separate media player. The mic and send controls stay anchored in place throughout.`,
          },
        ],
      },
      {
        title: "Validation Outcomes",
        subheading: "Turning feedback into a decision",
        body: `I designed the validation report around a simple decision framework: Proceed, Pivot, or Stop. Instead of asking users to interpret raw feedback, the interface turns responses into a clear recommendation with supporting findings.`,
        outcomeImages: [
          { src: '/spark-proceed.png', label: 'Proceed' },
          { src: '/spark-pivot.png',   label: 'Pivot'   },
          { src: '/spark-stop.png',    label: 'Stop'    },
        ],
      },
      {
        title: "Process Map",
        subheading: "Mapping the full idea journey",
        body: `This map shows how I organized the full product journey across onboarding, dashboard states, phase progression, summaries, the Vault, validation tests, and reports.`,
        lightboxImage: {
          src: '/spark-screen-inventory.png',
          caption: 'Full Spark screen inventory and product flow.',
        },
      },
      {
        title: "Result",
        subheading: "A working native iOS product from concept to build",
        body: `I designed and built Spark as a working native iOS product, including the core UX architecture, phase system, AI-assisted workflows, validation reports, and voice readback interaction.

The hardest part was turning AI output into a coherent product system. The value was not just in the model response — it was in how the app framed the task, managed state, structured the output, and helped the user decide what to do next. The project covers product strategy, UX architecture, interaction design, visual design, and implementation end to end.`,
      },
    ],
  },
  {
    id: "navora",
    title: "Navora",
    headline: "Designing and shipping a web app that turns a 30-year vision into daily action.",
    description: "A life planning web app that connects your 30-year vision to what you should do this afternoon.",
    tags: ["iOS", "0→1", "AI", "UI/UX"],
    cardBg: { background: "radial-gradient(ellipse at 25% 45%, #4498C2 0%, #2B89B8 40%, #1475AF 100%)" },
    cardTextColor: "#FFFFFF",
    iconBg: "rgba(255,255,255,0.2)",
    sidebarBg: "#1475AF",
    sidebarTextColor: "#FFFFFF",
    href: "/navora",
    role: "UX & Product Designer",
    year: "2025–2026",
    type: "Web App",
    overview: "Navora is a life planning platform built around one insight: most people fail not because they lack ambition, but because there's no system connecting their 30-year vision to their Tuesday afternoon. It's not a task manager or habit tracker. It's the only app that starts with where you want to be at the end of your life and works backwards to today.",
    challenge: "Life planning tools either go too abstract (vision boards, journaling) or too granular (task managers, habit apps). Nothing bridges the two. The design challenge was creating a taxonomy — Vision, Milestone, Project, Task, Habit — that felt intuitive rather than bureaucratic, and building a UI that could hold 9 life categories without feeling overwhelming.",
    approach: "I designed three core tabs: Today (execution layer showing tasks and habits), Progress (performance view with bars and rings), and Map (a Recharts line chart plotting your projected life score to age 85). The AI coach system has six personas and four coaching styles, with full tool-use capabilities — it can create, update, and complete tasks mid-conversation. The design system uses warm cream tones, gold accents, and Caudex serif to feel personal rather than corporate.",
    outcome: "Navora is fully built in React, TypeScript, Tailwind, and Supabase. The Life Map, AI coach, check-in system, and all nine life categories are functional. The product represents the most complete expression of a personal operating system I've seen attempted at this scale.",
  },
  {
    id: "mystory",
    title: "MyStory",
    headline: "Designing three versions of a video biography platform powered by an AI biographer.",
    description: "A video-first life story documentation platform where an AI biographer interviews users and turns conversations into organized legacy profiles.",
    tags: ["Web App", "End to End", "AI"],
    cardBg: { background: "linear-gradient(135deg, #C09860 0%, #917A52 55%, #7A6340 100%)" },
    cardTextColor: "#FFFFFF",
    iconBg: "rgba(255,255,255,0.2)",
    sidebarBg: "#917A52",
    sidebarTextColor: "#FFFFFF",
    href: "/mystory",
    role: "UX & Product Designer",
    year: "2023–2026",
    type: "Web Platform",
    overview: "MyStory is built on a simple but urgent truth: every day, irreplaceable stories disappear forever. Most families only realize too late that they never asked their parents or grandparents the questions they wished they had. MyStory makes it easy to capture those stories on video, with an AI biographer that asks the right questions and organizes everything automatically.",
    challenge: "The core design challenge was building a product that felt warm and human for an audience that skews older and less tech-comfortable, while hiding the technical complexity underneath. Early versions had too much friction — users thought they were creating their story when really they were just preparing to. Three major iterations simplified the flow until the conversation itself became the product.",
    approach: "I designed five AI biographer personas (Winston, Grace, Mateo, Ellie, Charlotte) each with distinct voice and visual identity. The session flow is continuous — no stop/start — and the system extracts stories, chapters, timeline events, and entities automatically after each recording. I also designed gifting and memorial journeys alongside the core self-documentation experience, each requiring its own onboarding and permission architecture.",
    outcome: "MyStory shipped three full product versions over two and a half years. The Story Weaver Studio video editor, full AI biographer system, and five persona flows are all designed and built. The platform served real users documenting real family stories.",
  },
  {
    id: "ayo",
    title: "AYO",
    headline: "Designing a social music platform where listeners share structured opinions on songs and albums.",
    description: "A music-first social platform built around canonical item pages — one shrine per song, album, and artist — where opinions are structured, connectable, and actually mean something.",
    tags: ["Web App", "UX", "Social", "0→1"],
    cardBg: { background: "#0A0A0A" },
    cardTextColor: "#FFFFFF",
    iconBg: "#1A1A1A",
    colorAccents: true,
    sidebarBg: "#0A0A0A",
    sidebarTextColor: "#FFFFFF",
    href: "/ayo",
    role: "UX & Product Designer",
    year: "2025–2026",
    type: "Web Platform",
    overview: "There's no great place to go deep on a specific song or album. YouTube comments are the closest thing — but they're messy, transient, and your interactions don't build anything. AYO fixes this with canonical item pages: one dedicated 'shrine' per song, album, and artist where people can listen, contribute structured opinions, and find others who hear music the same way they do.",
    challenge: "The hardest design problem in social products is making interactions feel meaningful rather than performative. Likes are dead ends. Comments disappear. AYO needed a new interaction primitive — one that turns your opinions into a visible identity and connects you to people who share your taste. The challenge was making that feel natural, not like filling out a form.",
    approach: "I designed the stance system — agree/disagree interactions with optional structured inputs — as the core interaction layer. TBP (Timestamp Best Part) lets users mark the exact moment in a song that hits hardest. Focus tags (lyrics, melody, beat, production) let you specify what you're responding to. Opinion DNA is the emergent profile that builds from all of your interactions — visible on your profile and used to form taste camps inside each item page.",
    outcome: "AYO's full UX is designed including item pages, stance system, TBP interaction, Opinion DNA profiles, discovery engine, and onboarding flow. The information architecture handles the complexity of a three-tier taxonomy (songs, albums, artists) with consistent interaction patterns across all levels.",
  },
]
