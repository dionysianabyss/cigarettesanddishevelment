# Cigarettes & Dishevelment

A brooding, melancholic digital library — an archive of essays, notes, book reflections, and conceptual fragments. Static HTML/CSS now, Jekyll-ready for later.

## Structure

- `index.html` — atmospheric landing page
- `essays.html` — long-form essays list (elegant cards)
- `books.html` — reading reflections (index-card style)
- `concepts.html` — brief ideas/aphorisms (minimal grid)
- `immaturity.html` — rough drafts (deliberately distressed)
- `about.html` — moody bio + contact link
- `assets/css/styles.css` — dark, gothic minimal theme, paper textures, smoke, micro-animations
- `_config.yml` — Jekyll collections config
- `_layouts/*` — Jekyll layouts for future builds
- `_{essays,books,concepts,immaturity,about}/*` — placeholder markdown items

## Aesthetic

- Theme: dark, smoky blacks, charcoal grays, warm faded whites
- Typography: Cormorant Garamond (serif) + Inter (UI sans)
- Texture: faint noise/paper grain, soft blur haze
- Motion: slow fades, drifting “smoke”, subtle hover shifts

## Use As Static HTML

Open `index.html` directly in a browser. All pages are hand-authored HTML with no JS frameworks.

## Optional: Build With Jekyll Later

1. Install Jekyll, then run: `bundle exec jekyll serve`
2. Collections: `_essays`, `_books`, `_concepts`, `_immaturity`, `_about` (output enabled)
3. Layouts in `_layouts/` render collection items using front matter.

## Content Notes

- Replace placeholder Markdown files in collections with your real content.
- Update navigation labels/links in each HTML page if you restructure paths.

