# 🌍 Language Awareness Lab
**A narrative, interactive and formative web app about learning how to learn languages.**

---

## 🧠 Concept

**Language Awareness Lab** is an immersive questionnaire designed to help learners reflect on *how* they learn languages — their motivations, habits, strategies, and mindset.

The project was initially a simple HTML/CSS/jQuery exercise.  
It evolved into a **full micro-application**, mixing:
- ✅ pedagogical design (diagnostic & metacognitive awareness)  
- ✅ modern front-end stack (Bootstrap 5, jQuery, AJAX)  
- ✅ optional back-end (PHP/MySQL or Node/SQL Server)  
- ✅ anonymous persistence (RGPD-compliant)

---

## 🎯 Pedagogical goal

- Encourage **self-awareness** in language learning.
- Make reflection **engaging, progressive, and visual**.
- Combine *assessment* and *narration*.
- Show mastery of **interactive web development** while keeping educational meaning.

---

## 🧩 Structure of the questionnaire

| Phase | Role | Example question | Bootstrap component |
|-------|------|------------------|---------------------|
| **Intro** | Enter the Lab | “Why do you want to learn a language?” | Carousel |
| **Observation** | Notice your habits | “What do you usually do when you study?” | Cards |
| **Planning** | Organize learning | “How do you plan your study sessions?” | Tooltip |
| **Concentration** | Focus awareness | “What distracts you most?” | Progress bar |
| **Error-handling** | Facing mistakes | “How do you react when you make a mistake?” | Alert |
| **Memory** | Remembering | “You learn a new word. What do you do?” | Collapse |
| **Transfer** | Reusing knowledge | “Write one example of reuse.” | Toast |
| **Collaboration** | Asking for help | “When you don’t understand…” | Accordion |
| **Reading strategy** | Guessing vs. translating | “You read a difficult sentence…” | Carousel |
| **Time management** | Study rhythm | “How long are your sessions?” | Spinner |
| **Mindset** | Facing failure | “You get a bad grade…” | Alert |
| **Self-evaluation** | Measuring progress | “How do you check your progress?” | Progress bar |
| **Metacognition** | Reflecting on methods | “Describe how you learn best.” | Modal |
| **Summary** | Awareness level | “Which statements describe you now?” | Badges |
| **Closing** | End of the journey | “Congratulations, explorer!” | Carousel |

---

## 🎨 Design and UX

- **Bootstrap components:** Carousel, Cards, Collapse, Toasts, Accordion, Progress bar, Modal, Alerts, Badges, Tooltips.  
- **jQuery effects:** `fadeIn`, `slideDown`, `delay`, `load` (for dynamic narrative injection).  
- **Visual theme:**  
  - Palette: `#4A90E2` (blue), `#7ED321` (green), `#F5A623` (orange)  
  - Font: [Lexend](https://fonts.google.com/specimen/Lexend)  
  - Rounded cards, soft shadows, radial gradient backgrounds.  
- **Tone:** friendly, reflective, motivating — never punitive.  

---

## 🧱 Architecture

```text
language-awareness-lab/
│
├── index.html
├── questionnaire.html
├── about.html
│
├── /css/
│   ├── bootstrap.min.css
│   ├── style.css
│   └── themes.css
│
├── /js/
│   ├── jquery.min.js
│   ├── bootstrap.bundle.min.js
│   ├── questions.json
│   ├── feedbacks.json
│   ├── visuals.json
│   ├── app.js
│   ├── ui.js
│   ├── api.js
│   └── utils.js
│
├── /phases/
│   ├── intro.html
│   ├── observation.html
│   ├── action.html
│   ├── reflection.html
│   └── summary.html
│
├── /img/
│   ├── ui/
│   ├── questions/
│   ├── background/
│   └── avatars/
│
├── /audio/
│
├── /server/
│   ├── config.php
│   ├── saveResult.php
│   ├── getQuotes.php
│   ├── registerUser.php
│   └── stats.php
│
└── /sql/
    ├── schema.sql
    └── seed.sql


⚙️ Data and logic (MVC-like)
Layer	Role	Files
Model	Questions, feedbacks, visuals, SQL tables	JSON + SQL
View	Bootstrap interface, phases, toasts, progress	HTML + CSS
Controller	Questionnaire engine, scoring, Ajax	app.js + ui.js + api.js
🔄 AJAX integrations
Purpose	Method	Example file	Benefit
Load questions dynamically	GET	questions.json	Asynchronous content loading
Random feedback quote	GET	feedbacks.json	Variety and motivation
Save score	POST	saveResult.php	Persistence & data logging
Load visual / illustration	GET	visuals.json	Dynamic visuals
Load narrative phases	.load()	/phases/*.html	Seamless single-page transitions
🗄️ Database (MySQL or SQL Server)
Table users
Field	Type	Description
id	INT (PK)	auto-increment
pseudo	VARCHAR(50)	anonymized name
session_token	VARCHAR(128)	unique session key
created_at	DATETIME	registration date
Table results
Field	Type	Description
id	INT	PK
user_id	INT	FK
score	INT	total
percentage	FLOAT	ratio
duration	INT	seconds
created_at	DATETIME	date
Table logs
Field	Type	Description
id	INT	
user_id	INT	
question_id	INT	
response	TEXT	
correct	BOOLEAN	
timestamp	DATETIME	
🔐 RGPD and privacy

No personal data required.

Automatic pseudo generation (“Learner #0478”).

Session token stored in sessionStorage.

Expiration: 24 h.

Data stored separately from IP logs.

🧰 Optional extras

🌗 Light/Dark theme toggle (localStorage)

🎵 Sound feedback (success/error)

💾 Resume later (IndexedDB)

📈 Global stats (Chart.js with AJAX)

🌐 Multi-language JSON files (lang_en.json, lang_fr.json)

📘 File about.html (documentation page)

This page will explain:

the structure of the code (which event triggers which action)

the types of data treatments (case insensitivity, accent removal, empty input management)

the technical limits (free text evaluation, partial credit logic, etc.)

🚀 Tech stack
Category	Technology
Front-end	HTML5, CSS3, Bootstrap 5, jQuery
Back-end (optional)	PHP 8 / Node.js
Database	MySQL / SQL Server
Data format	JSON
Version control	Git / GitHub
Compatibility	Desktop + mobile (responsive)
💬 Narration theme

“Welcome, explorer! You’re entering the Language Awareness Lab —
each step reveals how your mind learns.”

Learners progress through 15 interactive steps, with colours (red/orange/green) representing awareness levels rather than grades.
At the end, a summary card displays the score, percentage, and a final quote fetched via AJAX.

🧑‍💻 Author

David Subileau — Master DILIPEM, Université Grenoble Alpes
Project developed with a focus on educational technology, web development, and language learning research.

🧾 License

MIT License © 2025 David Subileau
Free to use and adapt for educational or research purposes.

🌟 Keywords

Bootstrap jQuery AJAX JSON Metacognition Language Awareness Pedagogical Design RGPD PHP MySQL Hybrid Learning