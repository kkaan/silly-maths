# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Silly Unicorn Maths is a standalone educational web game for learning metric conversions (km↔m, m↔cm, cm↔mm, kg↔g, g↔mg, L↔mL). It's a zero-dependency vanilla JavaScript/HTML/CSS application with no build tools, package manager, or test framework.

## Running the App

Open `index.html` directly in a browser. There is no build step, dev server, or compilation required.

## Architecture

**Entry point:** `index.html` loads scripts in this order (order matters):
1. `js/quiz.js` — Core quiz engine: question generation, answer validation, category toggling, level progression, and all game state (`quizState` object)
2. `js/unicorn.js` — Canvas-based 2D unicorn character that climbs a rainbow. Procedurally drawn (no image sprites). Reacts to correct/wrong answers with animations and emotional expressions
3. `js/parallax.js` — Three-layer parallax scroll effect for the hero section. Respects `prefers-reduced-motion`
4. `app.js` — Orchestrator (19 lines). Initializes all modules on `DOMContentLoaded` and wires quiz callbacks to unicorn responses

**Styling:** `css/styles.css` — Single stylesheet using CSS custom properties for the pastel color palette. Responsive layout with flexbox.

**Assets:** `assets/` contains parallax background images (parallax-bg.png, clouds.png).

## Key Patterns

- **No frameworks or dependencies.** All drawing uses Canvas 2D API, all animations use `requestAnimationFrame`.
- **Quiz state** is centralized in the `quizState` object in `quiz.js` — tracks current question, phase (asking/feedback), stats, active categories, and answer history.
- **Unicorn movement** follows a quadratic Bézier curve (the rainbow path) with 10 discrete steps. The canvas uses `ResizeObserver` for responsive scaling.
- **Module communication:** `app.js` connects `quiz.js` and `unicorn.js` via callbacks — the quiz engine doesn't import the unicorn module directly.

## Fonts

Google Fonts: Fredoka One (display/hero) and Nunito (body text), loaded via `<link>` in `index.html`.
