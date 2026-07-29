# The Great Convergence — How American Cars Lost Their Color

A data essay on how six colors came to cover **96% of new cars** sold in North America in 2025 — and why even the two "colorful" exceptions, blue and red, have become the darkest, most restrained versions of themselves.

**[▶ View the live site](#)** · _(add your deployed URL here — e.g. GitHub Pages / Netlify / Vercel)_

---

## Screenshot

![Screenshot of the Great Convergence data essay](screenshots/car-analysis-screenshot.png)

---

## Key findings

- **79%** of 2025 new cars in North America were grayscale — white, gray, black, or silver.
- Adding just **blue and red** brings the total to **96%**: six colors cover nearly the entire market.
- The remaining **4%** is left for the entire rest of the spectrum (green, gold, brown, yellow).
- Even the exceptions hide: the popular blue is **navy**, and the popular red is a **deep, muted** tone — the whole market has converged on restraint.
- This wasn't always true. Grayscale was roughly a **sixth** of the market in the mid-1970s and only crossed the 50% line in the **1990s**.

---

## How this was made

The research, data analysis, and initial build for this project were carried out with **Claude (Anthropic)**. Claude gathered the figures from industry color-popularity reports, structured the historical trend, built the interactive visualizations, and logged every assumption. The full methodology and assumptions are documented in the site's "Methodology & assumptions" section.

The original hypothesis — that modern cars have collapsed to a handful of colors, and that even the "color" cars skew dark — was the starting point that drove the investigation.

> **On the AI's role:** Claude was the instrument for the data work and the build. The analysis, framing, and interpretation below are mine.

---

## My analysis

<!-- ============================================================
     This section is yours. Write your own take here.
     Some prompts to get started:
       - What surprised you most in the data?
       - Why do you think the market converged on restraint?
       - What does the "even the color cars are dark" finding suggest
         about how people actually make color choices?
       - Where would you take this next?
     ============================================================ -->

_Your writeup goes here._

---

## Data sources

| Source | Used for |
| --- | --- |
| Axalta — 2025 Global Automotive Color Popularity Report (73rd ed.) | Exact 2025 North America breakdown |
| PPG — History of Automotive Colors | Historical trend, green's 1990s peak |
| Kelley Blue Book — A History of Automotive Paint Colors | Decade-by-decade context |
| iSeeCars — 22-million-vehicle color study | Modern grayscale dominance |
| Curbside Classic — "Fade to Gray" | Registration-based long-run analysis |

**A note on precision:** the 2025 figures are exact. The pre-2000 decade numbers are directional estimates stitched from secondary sources — see assumption **A3** on the site. The "muted red" observation is interpretation, not a measured figure (assumption **A4**).

---

## Running it locally

The site is plain HTML, CSS, and JavaScript with no build step. Because `index.html` links `styles.css` and `script.js` as separate files, open it through a local server rather than double-clicking the file:

```bash
# from inside the project folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

Any static host (GitHub Pages, Netlify, Vercel) will serve the folder as-is with zero configuration.

## Project structure

```
car-color-convergence/
├── index.html    # structure and content
├── styles.css    # all styling; palette variables at the top
├── script.js     # interactions; source data in constants at the top
└── README.md
```

To update next year's numbers, edit `WALL_DATA` at the top of `script.js` — the data is deliberately separated from the rendering logic.

---

## Possible next steps

The muted-red claim is the analysis's weakest-sourced point. To make it quantitative, the move is to pull **shade-level** data from used-car listings or registration datasets (some tag specific paint names) and count "navy/midnight" vs "electric/bright" blue directly — turning the observation into a measured finding.

---

_Built with Claude (Anthropic). Reuse freely with attribution._