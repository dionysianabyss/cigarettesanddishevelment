## Navigation and Structure Refactor — My Studies / Archetypes / Anti-Archetypes

Summary of changes applied to present the site as a coherent system:

- Top nav now links to `Home`, `My Studies` (`/studies/`), `My Archetypes` (`/values/`), `My Anti-Archetypes` (`/anti-archetypes/`), `About`, and Search.
- `My Studies` hub (`studies/index.html`) surfaces Essays, Concepts, and Journal entries grouped by tags into: Philosophy, Psychology, Psychoanalysis, Literary Studies, and Notes & Notebooks (latest 3–5 each). Links go to `/search/?q=...` for “View all”.
- Archetypes: values index retitled to “My Archetypes” but paths unchanged (`/values/`). Existing cards retained.
- Anti‑Archetypes: new collection `anti_archetypes` with index at `/anti-archetypes/` using the shared listing layout. Added stubs for 12 anti‑archetypes, each with a one‑line `summary`.
- Search: `search.json` now also indexes `archetypes` and `anti_archetypes`; `search.js` pre-fills from `?q=`.
- Books remain at `/books/` unchanged (kept as its own section).

Files touched:
- `_includes/header.html` — new nav labels and links
- `values/index.html` — retitled to My Archetypes
- `studies/index.html` — new hub page
- `anti-archetypes/index.html` — new listing index
- `content/_anti_archetypes/*` — 12 stub entries (published: true)
- `_config.yml` — added `anti_archetypes` collection
- `search.json`, `assets/js/search.js` — indexing and query param support
- `_layouts/home.html` — heading tweak (“From My Studies”)
- `about.md` — wording aligned with new structure

No external plugins added beyond the ones already configured. Existing noir aesthetic and components were reused.

