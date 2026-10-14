# Pendnameh

Farsça şiir ve metinler, Türkçe çevirileriyle; İngilizce çeviri isteğe bağlı (her beytin altındaki **EN** düğmesi).
Static site built with [Astro](https://astro.build). No database, no server: every poem is one Markdown file.

## Run locally

Requires Node 22.12+.

```bash
npm install
npm run dev        # http://localhost:4321  (drafts are visible here)
npm run build      # production build into dist/
```

## Add a new poem or text

1. Copy `src/content/poems/_sablon.md` to a new file, e.g. `src/content/poems/hafiz-gazel-12.md`.
   The file name becomes the URL: `/siir/hafiz-gazel-12/`. Use lowercase Latin letters and dashes.
   Files starting with `_` are ignored, which is why the template never appears on the site.
2. Fill in the frontmatter:

   | Field | Required | Notes |
   |---|---|---|
   | `title` | yes | Turkish title |
   | `faTitle` | no | Persian title |
   | `poet` | yes | file name (without `.yaml`) in `src/content/poets/` |
   | `kind` | no | `siir` (couplets, default) or `metin` (prose paragraphs) |
   | `source` | no | e.g. `Dîvân, 12. gazel` |
   | `date` | yes | `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM` — the newest piece is shown in full at the top of the home page |
   | `topics` | no | file names (without `.yaml`) in `src/content/topics/` |
   | `draft` | no | `true` hides it from the live site |
   | `stanzas` | yes | list of `fa` / `tr` / `en` blocks, one line per verse line; `en` is optional |

3. Anything below the closing `---` is shown as a "Not" box under the poem (Markdown supported).
4. Commit and push to `main`. The site rebuilds automatically.

If a field is wrong (unknown poet, missing Turkish text, bad date), the build fails with a message naming the file and field, so nothing broken goes live.

### Stanza format

Use `|` and indent each line by 6 spaces:

```yaml
stanzas:
  - fa: |
      مصرع اول
      مصرع دوم
    tr: |
      Birinci mısra
      İkinci mısra
    en: |
      First line
      Second line
```

## Add a poet or topic

- Poets: add one file `src/content/poets/<key>.yaml` (copy `_sablon-sair.yaml`). A poet page is created automatically.
- Topics: add one file `src/content/topics/<key>.yaml` containing `name: Konu Adı`.
- Contact info for the Hakkımızda page: `src/data/site.yaml`. Empty lines are hidden.

## Deploy

### Option A: GitHub Pages (workflow included)

1. Create a GitHub repo (e.g. `pendnameh`) and push this folder to `main`.
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml` and publishes the site.
   The sub-path (`/pendnameh/`) is handled automatically.
4. Custom domain: set it under Settings → Pages and add a `public/CNAME` file containing the domain.

### Option B: Netlify

Import the repo in Netlify. Build command `npm run build`, publish directory `dist`. No other settings needed.

## Structure

```
src/
  content/poems/     one .md file per poem or text
  data/poets.yaml    poets
  data/topics.yaml   topics
  content.config.ts  field rules (schema)
  pages/             routes: /, /siir/[id], /sairler, /sairler/[id], /konular, /konular/[id]
  layouts/Base.astro header, navigation, footer
  lib/site.ts        link helper, poem sorting, draft filtering
  styles/global.css  colors, fonts, layout (light + dark)
```
