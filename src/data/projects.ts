export interface Project {
  id: string
  title: string
  headline: string
  description: string
  tags: string[]
  cardBg: React.CSSProperties
  cardTextColor: string
  iconBg: string
  colorAccents?: boolean
  sidebarBg: string
  sidebarTextColor: string
  href: string
  role: string
  year: string
  type: string
  overview: string
  challenge: string
  approach: string
  outcome: string
}

export const projects: Project[] = [
  {
    id: "spark",
    title: "Spark",
    headline: "Leading design and development of a native iOS app for AI-powered idea capture.",
    description: "A native iOS app for structured idea capture and AI-assisted development. Built end to end in Swift and SwiftUI.",
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
    overview: "Spark is a native iOS app for people who have too many ideas and nowhere good to put them. Most ideas die in the Notes app — written once, never revisited. Spark changes that by not just capturing the idea but helping you develop it through a structured four-phase process: Define, Research, Position, and Brand.",
    challenge: "The problem isn't that people don't have ideas. It's that there's no system between 'raw thought' and 'something I can actually do something with.' Every existing tool is either too passive (Notes) or too general (ChatGPT). Spark needed to feel like a guided product experience, not another chat interface.",
    approach: "I designed a locked phase system where each idea moves through four stages sequentially. The UI uses a dark, focused aesthetic — black background, gold accent — to signal that this is a serious thinking environment. Haptic feedback, Face ID, and App Store polish were non-negotiable. The AI integration is embedded into each phase's workflow rather than exposed as a raw chat.",
    outcome: "Spark is currently in final build and pre-launch preparation. The vault interface, onboarding flow, and all four phases are fully designed and implemented in SwiftUI with Supabase backend and Claude API integration.",
  },
  {
    id: "navora",
    title: "Navora",
    headline: "Designing and shipping a web app that turns a 30-year vision into daily action.",
    description: "A life planning web app that connects your 30-year vision to what you should do this afternoon.",
    tags: ["Web App", "0→1", "AI"],
    cardBg: { background: "radial-gradient(ellipse at 20% 50%, #E8DCC8 0%, #F5EDD8 40%, #EDE0C4 70%, #D4C4A0 100%)" },
    cardTextColor: "#2C2416",
    iconBg: "rgba(0,0,0,0.1)",
    sidebarBg: "#D4C4A0",
    sidebarTextColor: "#2C2416",
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
    tags: ["Web App", "iOS", "AI", "End to End"],
    cardBg: { background: "linear-gradient(135deg, #917A52 0%, #A48754 25%, #957949 50%, #AB8C57 75%, #917A52 100%)" },
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
