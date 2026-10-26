# ⚡ Sebimala Portfolio

> A brutalist, high-performance interactive developer portfolio auto-synced with the GitHub API.

![React](https://img.shields.io/badge/React-18-black?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-white?style=for-the-badge)

---

## 👁️ Overview

This repository powers the personal portfolio for [@sebimala](https://github.com/sebimala). Designed with a brutalist, high-contrast aesthetic, it dynamically queries the GitHub REST API to fetch live repository metadata, language distribution percentages, and profile specifications.

---

## 🔥 Key Features

* **Live GitHub API Integration:** Dynamically fetches public profile data, bio, stars, forks, and language breakdowns.
* **Strict Repository Filtering:** Automatically filters out all forked repositories (`fork === true`) and special configuration repos.
* **Language Byte Analytics:** Queries GitHub language endpoints to calculate exact language composition percentages per repository.
* **Brutalist Design System:** Pitch-black theme (`#000000`), stark white typography, noise/grain texturing, and fluid spring animations.
* **Detailed SPA Inspector:** Full-screen modal routing for examining individual repository specs, code breakdowns, and metadata.
* **Rate-Limit Resilience:** Includes graceful fallback data structures to handle API rate limits or network degradation without crashing.

---

## 🛠️ Tech Stack

* **Framework:** [React 18](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)

---

## 📁 Repository Structure

```text
portofolio/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── components/
    │   ├── Header.jsx
    │   ├── Loader.jsx
    │   ├── ProjectCard.jsx
    │   └── ProjectDetail.jsx
    └── services/
        └── github.js
```

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sebimala/portofolio.git
   cd portofolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## ⚙️ Configuration

To use this portfolio for a different GitHub account, update the `USERNAME` constant in `src/services/github.js`:

```javascript
const GITHUB_USER = 'your-github-username';
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
