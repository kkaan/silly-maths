# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Silly Unicorn Maths is an educational web game where kids learn metric conversions, area, rates, money, and fractions by helping Fluffy the unicorn climb a rainbow. It features a 3-act narrative, milestone rewards, and a philosophical unicorn. Zero-dependency vanilla JavaScript/HTML/CSS with Firebase for cross-device score saving.

## Running the App

Open `index.html` directly in a browser or via GitHub Pages. No build step, dev server, or compilation required.

## Architecture

**Entry point:** `index.html` loads scripts in this order (order matters):
1. Firebase SDK (CDN, compat) — `firebase-app-compat.js` and `firebase-database-compat.js`
2. `js/firebase-sync.js` — Firebase init, username management, stats save/load
3. `js/story.js` — Story engine: narrative beats (`STORY_BEATS`), mid-level philosophy beats (`MID_LEVEL_BEATS`), and display functions
4. `js/quiz.js` — Core quiz engine: tiered question generation, answer validation, level progression, reward systems (skittles, milestones, flavour picker), and all game state (`quizState` object)
5. `js/unicorn.js` — Canvas-based 2D unicorn (Fluffy) that climbs a rainbow. Procedurally drawn. Reacts to correct answers with hop animations and celebrates at level-up
6. `js/parallax.js` — Parallax scroll effect for the hero section. Respects `prefers-reduced-motion`
7. `js/app.js` — Orchestrator. Initializes modules, handles username screen, wires callbacks

**Styling:** `css/styles.css` — Single stylesheet using CSS custom properties. Responsive layout with flexbox.

**Assets:** `assets/` contains parallax background images.

## Key Patterns

- **No frameworks or dependencies.** All drawing uses Canvas 2D API, all animations use `requestAnimationFrame`.
- **Quiz state** is centralized in the `quizState` object in `quiz.js` — tracks current question, phase (asking/feedback), stats, and answer history.
- **Tiered question generation:** `CONVERSION_TIERS` array gates content by level. `generateQuestion()` filters available conversions by level and weights newer tiers higher (~40%). Levels 20+ add fraction/decimal/percentage questions via `generateFractionQuestion()`.
- **Unicorn movement** follows a quadratic Bezier curve (the rainbow path) with 10 discrete steps (1 hop per 2 correct answers). No slide-back on wrong answers. The canvas uses `ResizeObserver` for responsive scaling.
- **Module communication:** `app.js` connects modules via `quizCallbacks` — `onCorrect`, `onWrong`, `onSkittle`, `onLevelUp`. The quiz engine doesn't import other modules directly.
- **Persistence:** Firebase Realtime Database stores stats per username. API key is public (by design — Firebase security comes from database rules, not key secrecy).

## Reward System

- **Skittles:** Every 30 points (correct=+5, brave=+3). Meter bar shows progress. Rainbow badge pops on the question card.
- **Ice cream + level-up:** Every 20 correct answers. Fluffy celebrates on canvas. Player picks an ice cream flavour (7 real + joke flavours at 40% chance).
- **Milestones:** Level 10 (Fairy Wand), Level 20 (Silver Tiara), Level 30 (Royal Scepter). Grand themed overlays. Earned items show as glowing emoji badges above the question card.

## Story Engine

**Main story (`STORY_BEATS` in story.js):** 13 narrative beats at levels 1, 3, 5, 8, 10, 11, 14, 17, 20, 21, 24, 27, 30. Three-act structure — arriving in Mathlandia, becoming Fairy Apprentice, defeating the Dark Fraction, becoming Sovereign Princess. Show after level-up overlay + flavour picker.

**Mid-level philosophy (`MID_LEVEL_BEATS` in story.js):** 17 short beats at the halfway point of each level (10 correct in). Fluffy asks real philosophical questions about maths (zero, infinity, 0.999...=1, Ship of Theseus, determinism) through a humorous lens.

## Level Curriculum

| Levels | Topics |
|--------|--------|
| 1-2 | Simple metric: km, m, cm, mm, kg, g, mg, L, mL |
| 3-5 | Multi-step: km↔cm, km↔mm, m↔mm, kg↔mg |
| 6-9 | Area: m², cm², mm², km² (small inputs only) |
| 10-14 | Rates (km/h, m/s, km/min) + money ($↔cents) |
| 15-19 | Mixed review of all metric types |
| 20-30 | Fractions, decimals, percentages |

## Deployment

- Hosted on GitHub Pages from `main` branch
- **Cache busting:** All CSS/JS `<script>`/`<link>` tags have `?v=N` query params. Bump the number when deploying changes to avoid stale caches on mobile.
- Firebase project: `unicorn-maths` (free Spark plan)

## Fonts

Google Fonts: Fredoka One (display/hero) and Nunito (body text), loaded via `<link>` in `index.html`.
