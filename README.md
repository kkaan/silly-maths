# Silly Unicorn Maths

A fun educational web game where kids learn metric conversions, area units, rates, money, and fractions by helping Fluffy the unicorn climb a rainbow to reach ice cream.

**Play it:** Open `index.html` in a browser, or visit the hosted version on GitHub Pages.

## How It Works

Players enter their name and answer conversion questions. Correct answers move Fluffy up the rainbow. The game gets progressively harder as levels increase, introducing new types of maths.

### Level Curriculum

| Levels | Topics |
|--------|--------|
| 1-2 | Simple metric: km, m, cm, mm, kg, g, mg, L, mL |
| 3-5 | Multi-step: km to cm, km to mm, m to mm, kg to mg |
| 6-9 | Area: m², cm², mm², km² |
| 10-14 | Rates (km/h, m/s) and money ($ and cents) |
| 15-19 | Mixed review of all metric types |
| 20-30 | Fractions, decimals, and percentages |

### Reward System

**Skittles** — Earned every 30 points (correct answers = 5 pts, brave tries = 3 pts). A rainbow badge pops on the question card with a particle burst. The meter bar shows progress toward the next skittle.

**Ice Cream** — Every 20 correct answers triggers a level-up. Fluffy reaches the top of the rainbow, celebrates with sparkles, and a full-screen overlay announces the new level.

**Major Milestones:**

| Level | Reward | Title |
|-------|--------|-------|
| 10 | Fairy Wand | Fairy Apprentice |
| 20 | Silver Tiara | Fairy Princess |
| 30 | Royal Scepter | Sovereign Princess of all the Lands |

Milestone rewards get increasingly grand fanfare with themed overlays. Teaser reminders at levels 5, 8, 11, and 21 build anticipation for the next milestone. Earned items appear as glowing emoji badges above the question card.

### Fluffy the Unicorn

Fluffy is drawn entirely with Canvas 2D API — no images. She has emotional expressions (happy, sad, neutral), animated legs, a rainbow mane, and a golden horn. She hops up the rainbow on correct answers and celebrates with sparkles at each level-up.

## Cross-Device Score Saving

Scores sync across devices via Firebase Realtime Database. Players enter a username on launch — the same name on any device loads the same progress. The username is remembered per-device via localStorage.

## Tech Stack

- Vanilla JavaScript, HTML, CSS — zero dependencies
- Canvas 2D API for Fluffy and the rainbow
- Firebase Realtime Database for score persistence
- Google Fonts: Fredoka One + Nunito
- Hosted on GitHub Pages

## Running Locally

Open `index.html` directly in a browser. No build step, no dev server, no compilation.

## Project Structure

```
index.html          Entry point
css/styles.css      Single stylesheet (CSS custom properties, flexbox)
js/quiz.js          Quiz engine: questions, levels, rewards, answer validation
js/unicorn.js       Canvas-based unicorn animation
js/firebase-sync.js Firebase integration for score persistence
js/parallax.js      Parallax scroll effect for hero section
js/app.js           Orchestrator — wires all modules together
assets/             Parallax background images
```
