# CLAUDE.md — "Vil du være min valentine?" 💘

## Project Overview

A creative, funny, and heartfelt single-page interactive website to ask **Vilde** to be Sebastian's valentine. The site should feel personal, playful, and impossible to say "No" to.

**Deploy target:** Vercel (connected to GitHub repo)
**Domain:** Buy a cute .no or .link domain, or use a Vercel subdomain like `vilde-valentine.vercel.app`

---

## Tech Stack

| Tool | Version | Why |
|------|---------|-----|
| **Vite + React** | Latest | This is a single interactive page with no routing, no SSR, no API — Next.js is overkill. Vite gives instant HMR and a tiny bundle. |
| **TypeScript** | 5+ | Type safety |
| **Tailwind CSS** | 4+ | CSS-first config, utility classes |
| **Framer Motion** | Latest | Smooth, spring-based animations for hearts, buttons, transitions |
| **canvas-confetti** | Latest | Celebration confetti/fireworks on "Yes" |
| **pnpm** | Latest | Package manager |

> **Why not Next.js?** There is zero need for server-side rendering, file-based routing, API routes, or middleware. This is a pure client-side interactive experience. Vite produces a smaller, faster bundle and has simpler config. The site is a single `index.html` deployed as static files.

---

## Creative Concept: Multi-Stage Valentine Flow

The website takes Vilde through a series of playful, escalating stages — each more charming and harder to refuse than the last. The whole experience should take ~60 seconds and feel like unwrapping a gift.

### Stage 1: "The Warm-Up" — Splash Screen
- Soft animated background with floating hearts (CSS + Framer Motion)
- Text fades in: **"Hei Vilde 💕"**
- Subtitle types out letter by letter: *"Jeg har noe viktig å spørre deg om..."*
- Single button: **"Hva da? 👀"** — transitions to Stage 2
- Mood: Warm, intriguing, cute

### Stage 2: "The Trick Question" — Do You Like Me?
- Cute question: **"Liker du meg?"**
- Two buttons: **"Ja"** and **"Nei"**
- **"Ja" behavior:** Text changes to *"Bra svar 😏"*, auto-transitions after 1.5s
- **"Nei" behavior:** Text changes to *"Feil svar! Jeg liker ikke deg heller... Jeg ELSKER deg! ❤️"* — then auto-transitions
- Both answers lead to Stage 3 — she can't lose

### Stage 3: "The Love Meter" — How Much Do You Love Me?
- Question: **"Hvor mye elsker du meg?"**
- An interactive slider or counter that starts at 0% and the user drags/clicks to increase
- The counter should be **rigged** — it accelerates past 100% and keeps climbing: 200%, 500%, 1000%+
- Fun messages appear at milestones:
  - 100%: *"Bare 100%? Vi kan gjøre det bedre!"*
  - 500%: *"Nå snakker vi! 🔥"*
  - 1000%: *"Til månen og tilbake! 🚀"*
  - 5000%+: *"WOOOW du elsker meg SÅ mye?? 🥰"*
- Button appears: **"Neste ❤️"** — transitions to Stage 4

### Stage 4: "The Big Question" — Will You Be My Valentine?
- The main event. Beautiful presentation.
- Large text with entrance animation: **"Vil du være min valentine? 💝"**
- Two buttons: **"Ja! 💕"** (large, inviting) and **"Nei"** (small, grey)

#### The "Nei" Button Behavior (THE FUNNY PART):
Every time Vilde tries to click/tap "Nei", the button **runs away** to a random position on screen. Each escape attempt also:

1. Makes the **"Ja"** button grow slightly bigger
2. Changes the "Nei" button text through increasingly desperate/funny messages:

```
"Nei"          → (first escape)
"Er du sikker?" → (second)
"Veldig sikker?" → (third)
"Tenk deg om!" → (fourth)
"Nei er ikke et alternativ 😤" → (fifth)
"Siste sjanse..." → (sixth)
"Ok, prøv igjen da 😏" → (seventh)
"Den knappen funker ikke 🫣" → (eighth)
"Gi opp, du kan ikke si nei 💪" → (ninth)
"..." → (tenth, button shrinks to almost invisible)
```

After 10 attempts, the "Nei" button simply disappears with a poof animation, leaving only "Ja".

#### Mobile consideration:
On touch devices, the button should jump to a random position on tap (not on hover). Make sure positions stay within the viewport.

### Stage 5: "The Celebration" — She Said Yes!
- **Confetti explosion** (canvas-confetti library) — hearts and sparkles
- **Floating hearts** rain down from the top of the screen
- Large animated text: **"YAAAY! 🎉"**
- Subtitle: *"Jeg visste du ville si ja 😘"*
- Optional: A sweet personal message from Sebastian to Vilde appears below
- The celebration runs on a loop — confetti keeps firing every few seconds
- The whole page becomes a party 🎊

---

## Design Guidelines

### Color Palette
Use a warm, romantic but NOT generic pink scheme. Aim for elegance:

```
--bg-start: #fdf2f8      (very light pink, almost white)
--bg-end: #fce7f3         (soft pink)
--accent: #ec4899         (pink-500, for buttons and highlights)
--accent-hover: #db2777   (pink-600)
--text-primary: #831843   (pink-900, for headings)
--text-secondary: #9d174d (pink-800, for body)
--button-yes: #ec4899     (pink, warm and inviting)
--button-no: #d1d5db      (grey-300, deliberately unexciting)
--celebration-bg: #fdf2f8  (keep it light for confetti contrast)
```

### Typography
- Use a clean, modern sans-serif from Google Fonts: **Inter** or **Outfit**
- Headings: Bold, large (2xl-4xl)
- Body text: Regular weight, readable
- The typing effect text: Use a slight monospace feel or just regular with a blinking cursor

### Animation Principles
- All transitions between stages should be smooth fades/slides (Framer Motion `AnimatePresence`)
- Floating hearts: Slow, gentle, random drift — NOT frantic
- Button dodge: Quick, snappy spring animation (Framer Motion spring physics)
- Confetti: Generous but not overwhelming — fire in bursts
- Everything should feel **playful, not chaotic**

### Anti-Slop Rules 🚫
- **NO** generic gradient backgrounds that scream "AI made this"
- **NO** excessive drop shadows or glassmorphism
- **NO** emoji overload in the UI (use sparingly and intentionally)
- **NO** stock-looking hearts — use subtle CSS shapes or simple SVG
- Keep it **clean, minimal, and personal**
- The humor and charm comes from the INTERACTION, not from visual noise

---

## File Structure

```
valentine/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts       # Tailwind 4+ CSS-first, but keep config for custom values
├── postcss.config.js
├── public/
│   └── favicon.svg          # A small heart
├── src/
│   ├── main.tsx
│   ├── App.tsx               # Main app, manages current stage
│   ├── index.css             # Tailwind imports + custom animations
│   ├── components/
│   │   ├── SplashStage.tsx       # Stage 1: "Hei Vilde"
│   │   ├── LikeMeStage.tsx      # Stage 2: Do you like me?
│   │   ├── LoveMeterStage.tsx    # Stage 3: Love meter
│   │   ├── BigQuestionStage.tsx  # Stage 4: The proposal + dodging button
│   │   ├── CelebrationStage.tsx  # Stage 5: YAAAY confetti party
│   │   ├── FloatingHearts.tsx    # Background floating hearts
│   │   └── TypingText.tsx        # Typewriter text effect
│   └── hooks/
│       └── useConfetti.ts        # Confetti firing logic
```

---

## Implementation Notes

### State Management
Simple `useState` in `App.tsx` — no need for any state library:
```tsx
const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1)
```

### The Dodging Button Logic
```tsx
// Track attempts and position
const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
const [attempts, setAttempts] = useState(0)

const handleNoHover = () => {
  // Generate random position within viewport bounds
  const x = Math.random() * (window.innerWidth - 120)
  const y = Math.random() * (window.innerHeight - 50)
  setNoPosition({ x, y })
  setAttempts(prev => prev + 1)
}
```

On mobile: trigger on `onTouchStart` or `onClick` instead of hover. The button should use `position: fixed` when dodging.

### Love Meter
Use a simple counter with `setInterval` that accelerates. The slider/button increases the number, but it has momentum — it keeps climbing faster and faster, making it feel out of control (in a fun way).

### Confetti
```bash
pnpm add canvas-confetti
```
Fire heart-shaped confetti on the celebration screen. Use `confetti({ shapes: ['heart'], colors: ['#ec4899', '#f472b6', '#fda4af'] })`.

### Floating Hearts Background
Render 15-20 small heart shapes that float upward with randomized:
- Starting x position
- Animation duration (15-25s)
- Size (8-20px)
- Opacity (0.1-0.3)

Use CSS keyframes or Framer Motion. Keep them subtle — background decoration only.

---

## Language

The entire site is in **Norwegian (Bokmål)**. All UI text, messages, and button labels should be in Norwegian as specified in the stage descriptions above.

---

## Deployment

1. Push to GitHub
2. Connect repo to Vercel
3. Vercel auto-detects Vite and deploys as static
4. Share the link with Vilde 💌

---

## Summary

The magic of this site is the **interaction design** — each stage builds anticipation, the trick question is wholesome, the love meter is absurdly fun, and the dodging "Nei" button is the viral comedy moment. The celebration at the end rewards Vilde for "choosing" yes (as if she had a choice 😄). Keep the design clean and the code simple — let the creativity speak through the experience, not through visual complexity.