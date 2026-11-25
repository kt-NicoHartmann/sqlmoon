# SQL-Moon: Back to Earth

A browser-based learning game in which you solve SQL tasks to make your way back to Earth after crash-landing on the Moon. You play as Kai, a space nomad, working your way through `CREATE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE`, `GROUP BY`, and `JOIN` across 10 chapters.

The German version lives in `SQL_Moon_de/` and works identically.

## Features

- **No server required:** All queries run locally in the browser using [AlaSQL](https://github.com/AlaSQL/alasql). The practice database resides solely in memory.
- **Story & Chapters:** 10 chapters featuring characters (Bit, Mira, Tobo, Oda, Zeb) and small SVG scenes.
- **Result Tables:** The last `SELECT` output remains visible until dismissed.
- **Save State:** Progress is saved in `localStorage` (key `mondsql`), with additional export and import functionality as `.json`.
- **Bilingual:** German and English provided as separate folders.

## Tech Stack

- **HTML5 & CSS3:** Responsive dark layout, mobile-friendly (safe-area insets).
- **JavaScript (Vanilla):** Game logic, task validation via regex and result comparison, progress management.
- **AlaSQL:** In-browser SQL engine.

## Project Structure

```text
SQL_Moon_en/
├── SQL_Moon_en.html      # Markup, meta tags, CSS and JS imports
├── styles/
│   └── styles.css        # Complete styling
├── scripts/
│   ├── script.js         # Chapters, tasks, game logic
│   └── alasql.min.js     # AlaSQL (local, add manually, see below)

SQL_Moon_de/
└── (same structure, German texts)
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo>
```

### 2. Add AlaSQL locally

The HTML files include AlaSQL locally via `scripts/alasql.min.js`. Place the file in both folders:

```bash
npm pack alasql                # or download from https://github.com/AlaSQL/alasql
tar -xzf alasql-*.tgz package/dist/alasql.min.js
cp package/dist/alasql.min.js SQL_Moon_de/scripts/
cp package/dist/alasql.min.js SQL_Moon_en/scripts/
```

### 3. Open the project

```bash
cd SQL_Moon_en
# macOS/Linux:
open SQL_Moon_en.html
# Windows:
start SQL_Moon_en.html
```

Alternatively, an extension like Live Server in VS Code works well.

## Customization

- **Chapters and Story:** Array `CH` in `scripts/script.js`.
- **Tasks and Validation Patterns:** Array `T` in `scripts/script.js` (task description plus regex for validation).
- **Colors:** CSS variables in `:root` at the top of `styles/styles.css`.
- **Meta Tags, Favicon:** Inside the `<head>` of the HTML file. The favicon path `/favicon.png` and the `og:image` URL point to nicohartmann.dev and should be updated for self-hosting.

## Privacy

User inputs are not sent to any server. Only the number of the last reached task is stored in the browser's `localStorage`.

## Credits & Licenses

- [AlaSQL](https://github.com/AlaSQL/alasql) – MIT License