# P101 — Python Mastery Portal

> Built for Prof. Jade Cao's Python course at Central Carolina Community College (CCCC).  
> Bridges her lecture notebooks (Modules 1.0–6.1) with Tony Gaddis's *Starting Out with Python* (6th Ed.).

**Live site → https://reign3418.github.io/P101/**

---

## What This Is

P101 is a bilingual (English / Spanish) Python learning portal that runs 100% in the browser with zero telemetry and zero server-side data storage. All Python code executes via **Pyodide WebAssembly** — no backend required. It is fully FERPA-compliant.

---

## Features

### 📚 Curriculum Modules 1–6
Structured learning modules aligned to Prof. Cao's lectures and the Gaddis textbook:

| Module | Topic |
|--------|-------|
| 1 | Variables, Data Types & F-Strings |
| 2.1 | Intro to Lists |
| 2.2 | For Loops & Tuples |
| 3.1 | If / Elif / Else Decision Structures |
| 3.2 | Boolean Logic & While Loops |
| 4 | Functions & Scope |
| 5 | Dictionaries & File I/O |
| 6.1 | Classes & Object-Oriented Design (Part 1) |

Each section includes:
- **💡 The Why** — pedagogical explanation with real-world analogies, RAM trace, and CPython internals
- **Key Mechanics** — live runnable code example via Pyodide
- **🏋️ Muscle Memory Rep Lab** — randomized interactive coding exercises with instant grading
- **⚠️ Common Trap** — pitfall warnings
- **❓ Checkpoint Quiz** — multi-choice quiz with automatic review flagging

### 📓 Notebook Lab (BYOD)
- **🐾 1-Click Load Module 6.1** — pre-packaged with Prof. Jade Cao's full 41-cell interactive lecture notebook (`Lecture_Module6.1_Class1.ipynb`)
- Import any `.ipynb` Jupyter notebook (drag & drop or file browser)
- Code cells are fully interactive textareas — edit, run with **Shift+Enter**, reset, or copy
- **🎯 Scaffolded Learning Detection** — automatically identifies `# TODO`, `raise NotImplementedError`, empty string/zero placeholders and badges each cell as:
  - 🟣 `Starter Template` — not yet started
  - 🟡 `In Progress` (pulsing) — user has started editing
  - 🟢 `Completed ✓` — exercise satisfied
- Collapsible **Learning Goals** accordion extracts TODO items into a numbered checklist
- Run All Cells button + Add Scratchpad Cell button
- Filename truncation with tooltip for long filenames

### 📊 Stats & Analytics Dashboard
- Live session timer with idle protection (pauses after 2 min inactivity)
- Per-module engagement: visits, time spent, reps done, quiz passes
- **Curriculum Balance Matrix** — flags never-touched and barely-touched modules
- **Muscle Memory Rep Log** — every successful Pyodide execution logged with timestamp and elapsed time
- Jump to Notebook Lab directly from the stats page

### 🏛️ Academic White Paper
- Full bilingual (EN/ES) academic white paper on the pedagogical theory behind P101
- Covers: Cognitive Load Theory (Sweller), CRA scaffolding, zero-telemetry architecture, multilingual equity (UDL)
- In-modal language switch independent of the app language
- Direct link button to the canonical [WHITE_PAPER.md](https://github.com/Reign3418/P101/blob/main/WHITE_PAPER.md)

### 🌐 Bilingual Support (EN / ES)
- Full English ↔ Spanish language parity for all UI strings
- Voice narration via Web Speech API in both languages
- Language switch in global header — always accessible regardless of active view

### 🔒 Zero Telemetry
- No analytics, no cookies, no remote data storage
- All session stats stored in `localStorage` on the user's device only
- `localStorage` keys: `p101_learning_stats`, `p101_rep_log`, `p101_lang`, `p101_user_notebooks`, `py_completed_sections`, `py_review_queue`

---

## Citations

**Cao, Jade.** Python Programming Lecture Notebooks (Modules 1.0–6.1). Central Carolina Community College (CCCC).

**Gaddis, Tony.** *Starting Out with Python.* 6th ed., Pearson, 2024.

---

## Architecture

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Python Runtime | Pyodide v0.26.2 (WebAssembly) |
| Voice | Web Speech API |
| Persistence | localStorage |
| Deployment | GitHub Pages (`gh-pages` branch) |

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full technical design.

---

## Local Development

```powershell
npm install
npm run dev
```

## Deploy to GitHub Pages

```powershell
npm run build
cd dist
git init -b gh-pages
git config user.name "Reign3418"
git remote add origin https://github.com/Reign3418/P101.git
git add .
git commit -m "deploy: ..."
git push -f origin gh-pages
cd ..
Remove-Item -Recurse -Force dist\.git
```
