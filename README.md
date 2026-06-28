# FITSHIFT — Лендинг персонального тренера

Landing page for a fictional personal fitness coach. Built as a portfolio project to demonstrate responsive layout, before/after slider, FAQ accordion, pricing cards, and advanced accessibility.

## Live Demo

[fitshift on GitHub Pages](https://georgy-itech.github.io/fitness-trainer-landing/)

## Features

- Before/after image slider with drag and touch support
- FAQ accordion with smooth height animation
- Pricing cards with highlighted plan
- Scroll-reveal animations via IntersectionObserver
- Progress bar on scroll
- Mobile hamburger menu (Escape to close, click-outside to close)
- Skip link for keyboard navigation
- Dark green accent, responsive from 375px

## Tech Stack

- HTML5 (semantic, accessible)
- Pure CSS (custom properties, clamp(), BEM)
- Vanilla JavaScript (no libraries)

## Project Structure

```
fitness-trainer-landing/
  index.html
  styles.css
  script.js
  favicon.svg
  assets/
    case1-before.svg
    case1-after.svg
    case2-before.svg
    case2-after.svg
```

## What I Practiced

- `IntersectionObserver` for scroll-reveal with stagger delays
- Before/after slider with pointer events and touch support
- FAQ accordion using `max-height` + `scrollHeight` for smooth animation
- `aria-live`, `role="tablist"`, `aria-expanded` for accessibility
- Skip link pattern for keyboard users
- `prefers-reduced-motion` support
