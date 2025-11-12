## Cigarettes & Dishevelment — Jekyll Theme Notes

This site is a GitHub Pages–compatible Jekyll project. Content is Markdown-driven via collections and posts; no external build steps are required.

### Collections
- `essays` (collection) → long-form pieces
- `journal` (collection) → short posts (listed under `/posts/`)
- `books` (collection) → references, notes, quotations
- `concepts` (collection) → mini reference pages
- `values`, `authors` (collections) → supporting content

### Layouts
- `_layouts/default.html` → base shell, header/footer, scripts
- `_layouts/home.html` → landing page (hero + latest sections)
- `_layouts/listing.html` → shared listing (filterable) for collection index pages
- `_layouts/essay.html`, `_layouts/post.html`, `_layouts/book.html`, `_layouts/concept.html`, `_layouts/author.html`, `_layouts/value.html`

### Styling
- Main stylesheet at `assets/css/main.scss` compiles via Jekyll/Sass.
- Palette and rhythm use CSS variables (see `:root` in `assets/css/main.scss`):
  - `--bg-main`, `--bg-surface`, `--text-main`, `--text-muted`, `--accent`, `--border-subtle`, `--danger`
  - Spacing: `--space-1`..`--space-5` (4–48px)
- Typography: Cormorant Garamond (headings), Inter (body), Roboto Mono (mono).

### Interactions (`assets/js/main.js`)
- Mobile nav toggle
- Tagline rotation on the home hero
- Search overlay (uses `/search.json`) with ESC to close
- Client-side list filtering on listing pages
- Optional “melancholic reading mode” toggle via the `M` key

### Taglines
- Set on the home page front matter: `index.md` → `taglines: [ ... ]`

### CMS Removal
- PagesCMS config has been removed (`.pages.yml`). The site is Markdown + front matter only.

