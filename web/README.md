# NOTHING YET EVERYTHING
**Hi there, I'm Nothing.**

*Welcome to my little corner.*

This repository is a sophisticated stash of AI-powered tools, along with a curated collection of techniques and tricks I've gathered. Initially built to optimize my own workflows, it is now open to the public to explore and utilize.

Everything you witness here was constructed through "Vibe Coding" with AI assistance. Feel free to explore the modules. If you encounter bugs, do not hesitate to contact me so that I can instruct an AI to resolve them.

---

## Architecture & Technology Stack

The project relies explicitly on pure **HTML5, CSS3, and Vanilla JavaScript**, leveraging modern **ES Modules** for an efficient "Lazy Load" architecture that ensures lightning-fast initialization times. 

**UI / UX Philosophy:**
- No standard icon sets are used. Every interactive UI element is crafted entirely via precise Typography or native CSS structures.
- **Tailwind CSS** (via CDN) forms the backbone of the utility-first structural design.
- Custom pure-CSS algorithms are applied to handle Glassmorphism and the Global Dark Mode synchronization.

**Third-Party Libraries:**
- `marked.min.js`: Parses Markdown directly into HTML for dynamic content delivery.
- `html2pdf.js`: Compiles data into crisp PDF exports.
- `lunar-javascript`: Performs high-precision Lunar calendar computation.

---

## Expansion Guide

### 1. Publishing a new Post (Markdown)
To document a new tutorial or trick:
1. Create a `.md` file, such as `new-tutorial.md`, and place it in the `posts/` directory.
2. Register the post inside `js/tools/01-home.js` by appending to the `manifest` array:
   ```javascript
   const manifest = [
       // ...
       { title: "Your Modern Tutorial", date: "Guide", path: "posts/new-tutorial.md" }
   ];
   ```

### 2. Integrating a new Tool Module
To implement a standalone tool with its own logic:
1. Create a modular JS script in `js/tools/`, e.g., `11-converter.js`.
2. Encapsulate all View (HTML) and Controller logic in the `export function setupTool() { ... }`.
3. Open `js/core.js` and edit the two routing variables:
   
   **Append Navigation Item:**
   ```javascript
   const menuConfig = [
       // ...
       { id: 'tab-converter', name: 'Trình chuyển đổi' }
   ];
   ```
   **Map Router Path:**
   ```javascript
   const toolMap = {
       // ...
       'tab-converter': './tools/11-converter.js'
   };
   ```

---

## Get In Touch

Should you need assistance, wish to report functional anomalies, or propose collaborations, reach out through the following channels:

* **Telegram**: `https://t.me/nothing3272`
* **Facebook**: `https://www.facebook.com/share/1Ayyxg5kjH/?mibextid=wwXIfr`