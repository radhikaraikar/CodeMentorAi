# ⚡ CodeMentor AI — AI-Based Code Explainer for Students

![CodeMentor AI](https://img.shields.io/badge/CodeMentor-AI-6366f1?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google)

> A premium AI-powered web application that helps students understand, debug, optimize code and generate viva questions — instantly.

---

## 🖥️ Live Preview

```
http://localhost:5174
```

---

## 📸 Pages & Screenshots

| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home | `/` | Landing page with features, how-it-works, languages |
| 💡 Explain Code | `/explain` | Line-by-line AI code explanation |
| 🐛 Debug Code | `/debug` | Find and fix errors in your code |
| 🚀 Optimize Code | `/optimize` | Improve performance, readability, memory |
| 🎓 Viva Questions | `/viva` | Generate exam-ready Q&A from code |
| 📜 History | `/history` | View all past explanations |
| ⭐ Favorites | `/favorites` | Saved favorite explanations |
| 📄 Result | `/result` | Detailed result view |
| ❌ 404 | `/*` | Not found page |

---

## ✨ Features

- 🤖 **AI-Powered Explanations** — Gemini AI explains any code in seconds
- 📝 **Line-by-Line Breakdown** — Understand every line clearly
- 🐛 **Smart Debugging** — Find syntax & logical errors with fixes
- 🚀 **Code Optimization** — Performance, readability & memory improvements
- 🎓 **Viva Question Generator** — 10 exam questions with answers
- ⏱️ **Complexity Analysis** — Time & Space complexity with Big-O
- 📜 **History** — Auto-saves all explanations to localStorage
- ⭐ **Favorites** — Bookmark important explanations
- 📥 **Download** — Export explanations as .txt files
- 📋 **Copy to Clipboard** — One-click copy
- 📁 **File Upload** — Upload .js, .py, .java, .cpp, .c, .html, .css, .sql files
- ⌨️ **Ctrl+Enter Shortcut** — Quick explain keyboard shortcut
- 🌙 **Dark Theme** — Premium cinematic dark UI
- 📱 **Fully Responsive** — Mobile, tablet, desktop
- 🔑 **In-App API Key Settings** — Set API key without restarting server
- 🎭 **Demo Mode** — Works even without API key (shows sample explanations)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React.js | 19 | UI Framework |
| Vite | 8 | Build Tool |
| React Router DOM | 7 | Client-side Routing |
| Tailwind CSS | 3 | Styling |
| Framer Motion | 12 | Animations |
| Monaco Editor | 4 | Code Editor |
| Axios | 1 | HTTP Requests |
| React Hot Toast | 2 | Notifications |
| React Markdown | 10 | Markdown Rendering |
| React Icons | 5 | Icon Library |
| Context API | — | Global State |
| LocalStorage | — | Data Persistence |
| Gemini AI API | 2.0 Flash | AI Engine |

---

## 📁 Project Structure

```
codementor-ai/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── ExplanationCard.jsx
│   │   │   ├── FavoriteCard.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   └── HistoryCard.jsx
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── SectionTitle.jsx
│   │   │   └── Spinner.jsx
│   │   ├── editor/
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── CodeUpload.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   └── OutputPanel.jsx
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   └── modals/
│   │       └── ReusableModal.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── data/
│   │   ├── features.js
│   │   └── languages.js
│   ├── hooks/
│   │   ├── useCopyToClipboard.js
│   │   └── useLocalStorage.js
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── DebugCode.jsx
│   │   ├── ExplainCode.jsx
│   │   ├── Favorites.jsx
│   │   ├── History.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── OptimizeCode.jsx
│   │   ├── Result.jsx
│   │   └── VivaQuestions.jsx
│   ├── services/
│   │   └── aiService.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.js
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Step 1 — Clone or Download

```bash
git clone https://github.com/your-username/codementor-ai.git
cd codementor-ai
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Setup Environment Variables

```bash
# Copy the example env file
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```env
VITE_AI_API_KEY=your_gemini_api_key_here
VITE_AI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
```

### Step 4 — Run Development Server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🔑 Getting a Gemini API Key

1. Go to **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API key"**
4. Select **"Create API key in new project"**
5. Copy the generated key (starts with `AIzaSy...`)
6. Paste it in your `.env` file as `VITE_AI_API_KEY`

> **Free Tier Limits:** 15 requests/minute, 1500 requests/day

### Setting API Key Without Restarting Server

You can also set the API key directly in the app:
1. Click the **⚙️ gear icon** in the navbar
2. Paste your API key
3. Click **"Save API Key"**

---

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## ☁️ Deploy to Vercel

### Method 1 — Vercel CLI

```bash
npm install -g vercel
vercel
```

### Method 2 — GitHub + Vercel Dashboard

1. Push your code to GitHub (see commands below)
2. Go to **https://vercel.com**
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables:
   - `VITE_AI_API_KEY` = your Gemini API key
   - `VITE_AI_API_URL` = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
6. Click **"Deploy"**

---

## 📤 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - CodeMentor AI"
git branch -M main
git remote add origin https://github.com/your-username/codementor-ai.git
git push -u origin main
```

---

## 🌐 Supported Languages

| Language | Extension | Icon |
|----------|-----------|------|
| JavaScript | .js | 🟨 |
| Python | .py | 🐍 |
| Java | .java | ☕ |
| C | .c | 🔵 |
| C++ | .cpp | 🔷 |
| HTML | .html | 🌐 |
| CSS | .css | 🎨 |
| SQL | .sql | 🗄️ |
| TypeScript | .ts | 🔷 |
| Go | .go | 🐹 |
| Rust | .rs | 🦀 |
| PHP | .php | 🐘 |

---

## 🎯 AI Output Structure

### Explain Code
1. Simple Summary
2. Line-by-Line Explanation
3. Important Concepts Used
4. Input and Output Explanation
5. Time Complexity
6. Space Complexity
7. Possible Errors
8. Viva Questions with Answers

### Debug Code
1. Error Summary
2. Syntax Errors
3. Logical Errors
4. Why the Error Occurs
5. Corrected Code
6. Explanation of Fixes
7. Tips to Avoid This Error

### Optimize Code
1. Optimized Code
2. Explanation of Improvements
3. Before vs After Comparison
4. Time Complexity Before & After
5. Space Complexity Before & After
6. Best Practice Suggestions

### Viva Questions
1. 10 Questions with Answers
2. Important Concepts from Code
3. Possible Follow-up Questions
4. Key Points to Remember

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Explain / Debug / Optimize / Generate |

---

## 💾 LocalStorage Keys

| Key | Purpose |
|-----|---------|
| `codementor_history` | Stores last 50 explanations |
| `codementor_favorites` | Stores favorited explanations |
| `cm_runtime_key` | Stores API key set via Settings |

---

## 🎭 Demo Mode

The app includes a **Demo Mode** that works even without a valid API key or when quota is exceeded. It shows realistic sample explanations so you can demonstrate the app at any time — perfect for:
- Portfolio demos
- College viva presentations
- GitHub showcases
- Internship interviews

---

## 🧑‍💻 Use Cases

- 📚 **Students** — Understand code from textbooks and assignments
- 🎓 **Engineering Students** — Prepare for lab exams and viva
- 💼 **Job Seekers** — Practice for technical interviews
- 🐛 **Developers** — Quick debugging assistance
- 👨‍🏫 **Teachers** — Generate questions from code examples

---

## 📦 All Dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "axios": "^1.0.0",
    "framer-motion": "^12.0.0",
    "react-hot-toast": "^2.0.0",
    "react-markdown": "^10.0.0",
    "react-icons": "^5.0.0",
    "@monaco-editor/react": "^4.0.0"
  },
  "devDependencies": {
    "vite": "^8.0.0",
    "@vitejs/plugin-react": "^6.0.0",
    "tailwindcss": "^3.0.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0"
  }
}
```

---

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_AI_API_KEY` | Yes | Your Gemini API key |
| `VITE_AI_API_URL` | No | Gemini API endpoint (has default) |

---

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐ on GitHub!

```
git clone https://github.com/your-username/codementor-ai.git
```
