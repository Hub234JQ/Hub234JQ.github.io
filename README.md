# Kok Jun Qi — Portfolio website

Live site: **https://hub234jq.github.io** (GitHub Pages, repo `Hub234JQ/Hub234JQ.github.io`, branch `main`).

> **For AI assistants / new contributors:** read this whole file before editing.
> The site is plain HTML/CSS/JS with **no build step and no framework**. Content lives in
> two data files (`projects.js`, `volunteer.js`); pages are rendered from them by `script.js`.
> **Every change must be published** with `python publish.py "message"` — the owner expects
> the live site to always match this folder.

---

## 1. Folder map

| Path | What it is | Published? |
|---|---|---|
| `index.html` | Home page: hero, About, Work cards, Experience, "Beyond the code" (volunteering), Contact | ✅ |
| `project.html` | Project detail page — `project.html?id=<project id>` | ✅ |
| `volunteer.html` | Volunteering detail page + photo gallery/lightbox — `volunteer.html?id=<id>` | ✅ |
| `404.html` | Not-found page; also redirects deep links inside `/demos/*` back into the demo app | ✅ |
| `styles.css` | All styling (dark theme, CSS variables at the top) | ✅ |
| `script.js` | All behaviour: renders cards & detail pages from the data files, nav, filters, lightbox, contact form | ✅ |
| `projects.js` | **Project content** (array `PROJECTS`) | ✅ |
| `volunteer.js` | **Volunteering content** (array `VOLUNTEER`) | ✅ |
| `images/` | `profile.jpg`, `projects/<id>.jpg` covers, `volunteer/<id>.jpg` covers + `volunteer/<id>/01.jpg…` galleries | ✅ |
| `assets/Kok_Jun_Qi_Resume.pdf` | Public resume (**phone number intentionally removed** — keep it that way) | ✅ |
| `demos/mustergo/`, `demos/sgen/` | Built, front-end-only demos of two team projects (see §6) | ✅ |
| `README.md` | This file (also published, so the GitHub repo explains itself) | ✅ |
| `publish.py` | One-step publish script (see §3) | ❌ |
| `publish/` | Git clone of the live repo; `publish.py` fills it. **Don't edit by hand.** | (is the repo) |
| `demo-src/` | Source for rebuilding the demos (mock API layers, recorded data, tools) | ❌ |
| `COPY.md` | Rewritten text for the old Wix site | ❌ |
| `me.jpeg` | Original uncropped photo — private, never publish | ❌ |

Only the files listed in `SITE_FILES` / `SITE_DIRS` inside `publish.py` are ever published.
If you add a new top-level page or folder, add it there too.

## 2. Editing content

### Projects → `projects.js`
Each object in `PROJECTS` drives both the home "Work" card and `project.html?id=<id>`.

```js
{
  id: "mustergo",                  // unique, used in URLs and image paths
  title: "MusterGo",
  feature: true,                   // optional: wide card at the top of Work
  badge: "In progress",            // optional small label
  category: "web",                 // web | data | mobile | design  (drives the filter chips)
  year: "2026", place: "…", role: "…", team: "Team of 6",
  colors: ["#4f46e5", "#06b6d4"],  // gradient used when the cover image is missing
  summary: "One or two sentences (card + detail hero).",
  cardDetail: "Extra paragraph shown only on feature cards (HTML allowed: <strong>).",
  stack: ["React", "Node.js"],     // tags
  links: [{ label: "Try the interactive demo", url: "demos/mustergo/" }],  // buttons
  github: "https://github.com/…",  // optional GitHub button
  stats: [{ value: "25", label: "Permission keys" }],  // optional
  problem: "…", solution: "…",
  contributions: ["<strong>…</strong> …"],  // "What I did" bullets (HTML allowed)
  learned: "…", note: "…",
  gallery: []                      // optional: ["images/projects/<id>/1.jpg", …]
}
```
Cover image: `images/projects/<id>.jpg` (16:10, ~1280×800). If missing, a coloured placeholder shows.
Keep text **truthful** — only claims backed by the owner's code, resume or old portfolios.

### Volunteering → `volunteer.js`
Each object in `VOLUNTEER` drives a "Beyond the code" card and `volunteer.html?id=<id>`.
Photos are numbered files: `images/volunteer/<id>/01.jpg`, `02.jpg`, … and `photos: <count>`.
`captions` is an array in the same order (use `""` for none). Card cover: `images/volunteer/<id>.jpg`.
**Don't put street addresses in captions** (some photos are at care homes).

### Other text
Hero, About, Experience timeline, toolkit, certifications, awards and contact are plain HTML in `index.html`.

### Images
Resize before adding (long edge ≤ 1600 px, JPEG quality ~80) to keep the site fast.

## 3. Publishing (always do this after a change)

```bash
python publish.py "Short description of the change"
```
- Requires `git` and push access to `Hub234JQ/Hub234JQ.github.io` (Git Credential Manager is set up on the owner's laptop).
- It adds `?v=<timestamp>` to CSS/JS links so browsers load the new version immediately.
- Live about 1 minute later. Verify by opening https://hub234jq.github.io (Ctrl+F5 if needed).

**Preview locally** before publishing: `python -m http.server 5600` in this folder, then open http://localhost:5600.
(Don't open `index.html` as a file — some browsers block the data scripts.)

## 4. Privacy & safety rules
- Public resume must **not** contain the phone number. The original (with phone) is kept outside this folder for job applications.
- Never publish `me.jpeg`, `.env` files, tokens, or anything from `demo-src/`.
- Demos must stay **fully mocked** — no real backend URLs, database strings or API keys. Scan before publishing:
  `grep -rE "sk-ant|AKIA|postgres(ql)?://|neon\.tech|eyJ[A-Za-z0-9_-]{10,}\." demos/` should print nothing.
- Team projects (MusterGo, SGEN, ShopSphere) credit the team; only claim the owner's own part.

## 5. Design notes
- Dark theme; tokens in `:root` at the top of `styles.css` (`--accent` purple, `--accent-2` cyan).
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels) via Google Fonts.
- Elements with class `reveal` fade in on scroll (IntersectionObserver in `script.js`).
- Responsive breakpoints at 960 px and 720 px.

## 6. The interactive demos (`demos/`)
`demos/mustergo/` and `demos/sgen/` are production builds of the real team front ends, with a
"demo mode" layer that answers every API call from **recorded responses** (a local run of the real
backend with fictional seed data). No server, database or keys. Writes "succeed" but aren't saved.

To rebuild one (only needed if the app's front end changes):
1. Clone the app repo (MusterGo: `Croptics/VJMDynamics-NYP-x-SCCCI-`, SGEN: `Generic-Inc/SGEN`).
2. Copy `demo-src/<app>/mockApi.js` (+ `recorded.json`, and for SGEN `fakeSocket.js` + `vite.demo.config.js`) into the front end's `src/demo/`.
   Import `./demo/mockApi.js` first in `main.jsx` and give `<BrowserRouter>` `basename={import.meta.env.BASE_URL.replace(/\/$/, "")}`
   (`demo-src/sgen/patch_sgen.py` shows the exact patches, incl. fixing hard-coded `window.location.href = "/…"`).
3. Build with the base path, e.g. `npx vite build --base /demos/mustergo/ --outDir dist-demo`
   (on Git Bash prefix with `MSYS_NO_PATHCONV=1`, otherwise the base becomes a Windows path).
4. Replace `demos/<app>/` with `dist-demo/`, and re-add the redirect script at the top of its `index.html` `<head>`:
   `<script>(function(){var q=new URLSearchParams(location.search),r=q.get("redirect");if(r){history.replaceState(null,"",location.pathname.replace(/\/$/,"")+r);}})();</script>`
5. To refresh the recorded data: `demo-src/tools/recorder.mjs` (recording proxy), `crawl.mjs`, `mustergo-seed.mjs`.
   Run the backend against a **local, throwaway database only** — never the real Neon database.

## 7. Related
- Old sites (being retired): Wix `kokjunqi.wixsite.com/kokjunqi`, WordPress `portfoliokokjunqi.wordpress.com`.
- GitHub: https://github.com/Hub234JQ · LinkedIn: https://www.linkedin.com/in/jun-qi-kok-928b70263/
