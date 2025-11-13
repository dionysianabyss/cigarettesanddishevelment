## Author Guide — Cigarettes & Dishevelment

This repository is both the public site (Jekyll + GitHub Pages) and an Obsidian‑friendly writing vault.

### 1) Open as an Obsidian Vault
- In Obsidian, “Open folder as vault” and select the repo root.
- Templates live in `_obsidian_templates/` (Obsidian ignores underscores in names for vault browsing). Enable the core “Templates” plugin and point it at this folder.

### 2) Create Content via Templates
Use the matching template for each content type:
- Essays → `_obsidian_templates/essay-template.md`
- Posts (journal) → `_obsidian_templates/post-template.md`
- Books → `_obsidian_templates/book-template.md`
- Concepts → `_obsidian_templates/concept-template.md`
- Archetypes → `_obsidian_templates/archetype-template.md`

Each template includes realistic front matter and scaffolding. Replace placeholders like `{{title}}` and dates via Obsidian’s Templates/Templater.

### 3) Collections and Front Matter
- Collections are defined in `_config.yml` and live under `content/`:
  - `content/_essays`, `content/_journal`, `content/_books`, `content/_concepts`, `content/_values`, `content/_authors`, `content/_archetypes`.
- Recommended fields:
  - `title` (or `name` for essays)
  - `date: YYYY-MM-DD`
  - `tags: []`
  - `archetype: absurd-lover` (or another key)
  - `published: false` while drafting → set to `true` to publish

### 4) Archetypes
- Archetype pages live in `content/_archetypes/` (e.g., `absurd-lover.md`).
- Any essay/post/book/concept can set `archetype: <key>` to appear on the archetype page and on the `/archetypes/` index.

### 5) Drafts and Publishing
- Keep drafts in the correct collection with `published: false`.
- Listings and the home page only show items where `published != false`.
- When ready, flip to `published: true` and commit.

### 6) Local Preview
```
bundle install
bundle exec jekyll serve
```
Open `http://localhost:4000`. GitHub Pages builds without extra plugins (only `jekyll-seo-tag`, `jekyll-feed`, `jekyll-sitemap`).

### 7) Deploy
- Commit and push to `main`. GitHub Pages will publish automatically.

### 8) Conventions and Ergonomics
- Concepts: use structured headings with IDs for the micro‑TOC, e.g.
  - `## Definition {#definition}`
  - `## Genealogy {#genealogy}`
  - `## Key Thinkers {#key-thinkers}`
  - `## Psychology {#psychology}`
  - `## Philosophy {#philosophy}`
  - `## Related Concepts {#related-concepts}`
- Long‑form: keep excerpts/summary short and add `description:` for nicer SEO snippets.
- Search: press `/` to open overlay; `Esc` closes it.

