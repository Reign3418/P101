# P101: Python Deliberate Practice & Study Portal

> **Interactive Study Portal, Audio Explanations & Deliberate Practice Reps Gym**  
> Curriculum structured around Tony Gaddis's *Starting Out with Python (6th Edition)*.

---

## 🌐 Live Web Portal (GitHub Pages)

Access the live interactive portal from any device (phone, tablet, laptop, or desktop):

👉 **[https://reign3418.github.io/P101/](https://reign3418.github.io/P101/)**

### What's Inside the Portal:
- **📓 Bring Your Own Notebook (BYOD) Lab**: Drag-and-drop any Jupyter Notebook (`.ipynb`) from your college portal. Parses cells client-side and runs Python code in your browser via WebAssembly (Pyodide).
- **🛡️ 100% Client-Side Privacy & Compliance**: Zero files or student data are ever uploaded to a remote server. Fully compliant with Community College intellectual property policies and academic honor codes.
- **10 Core Curriculum Modules**: Synchronized with Prof. Jade Cao's lecture progression (Variables, Lists, Dictionaries, While Loops, Functions) and Tony Gaddis's advanced chapters.
- **The "Why" Under the Hood**: Deep architectural breakdowns explaining *why* the CPU, memory, and Python interpreter behave the way they do.
- **Interactive Checkpoints & Quizzes**: Quick concept checks with a **"Take Me to Review"** spotlight feature that auto-scrolls to the underlying concept and reads it aloud with text-to-speech.
- **Common Traps & Pitfalls**: Warning callouts for classic beginner bugs (e.g. string concatenation vs addition, floating-point rounding, accumulator reset bugs).
- **In-Browser Coding Reps**: Hands-on coding exercises right on the page.

---

## 🏋️ Local Deliberate Practice Reps Gym (`python_reps.py`)

For true programming muscle memory, this repository includes a terminal-based deliberate practice workout gym:

- **Infinite Randomized Drills**: Inputs, numbers, strings, and parameters change dynamically every time you run a drill. No memorizing answers!
- **Automated Test Battery**: Runs 5 to 10 automated test cases (including zero, negative, boundary, and edge cases) against your code in real time.
- **Error Diagnostics & The Why**: When code fails, it pinpoints the line, explains what happened, and provides an **Efficiency Pro-Tip** on how to write it idiomatically.

### How to Run Locally:
```bash
# Clone the repository
git clone https://github.com/Reign3418/P101.git
cd P101

# Run the Reps Gym
python python_reps.py
```
*(On Windows, you can also simply double-click `START_REPS_GYM.bat`)*

---

## 📜 Academic Attribution & Course Citations

This educational repository and study portal is an independent learning companion structured around and aligned with:

- **Course Curriculum & Lecture Series**:  
  **Prof. Jade Cao**, Central Carolina Community College (CCCC).  
  *Python Programming Lecture Series (Modules 1.0 – 5.2: Variables, Lists, Dictionaries, While Loops, Functions)*.
- **Companion Textbook Reference**:  
  Gaddis, Tony. *Starting Out with Python* (6th ed.). Pearson, 2024.

*All explanations, interactive sandboxes, randomized coding reps, and "Why" breakdowns are original instructional synthesis created for deliberate student practice and mastery.*
