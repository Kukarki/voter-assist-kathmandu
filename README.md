# Voter Assist Kathmandu 2026 🗳️🇳🇵

A high-performance, bilingual civic engagement portal built with the **MERN stack** and **Google Gemini AI**. Designed to centralize election data and provide real-time guidance for the 2026 Kathmandu General Elections.

## 🚀 Live Demo
[Insert Link to Hosted Site here, e.g., on Render or Vercel]

## 🛠️ Technical Highlights

* **Advanced Localization:** Implemented a scalable bilingual engine using `react-i18next`, moving away from hard-coded strings to support seamless English/Nepali transitions.
* **AI-Powered Guidance:** Integrated **Gemini 1.5 Flash** with custom system prompting to provide localized, real-time voter assistance.
* **Data Integrity:** Developed a RESTful API using **Node.js/Express** with atomic MongoDB increments (`$inc`) to manage high-concurrency candidate support registration.
* **Optimized Performance:** Utilized **Vite** for optimized frontend builds and implemented MongoDB indexing for sub-second voter ID search results.

## 🏗️ System Architecture



[Image of MERN stack architecture diagram]


The application follows a decoupled full-stack architecture:
1.  **Frontend:** React (Vite) for a fast, responsive User Interface.
2.  **Backend:** Node.js & Express handling business logic and AI integration.
3.  **Database:** MongoDB Atlas for cloud-native document storage.
4.  **Security:** Protected API keys via environment variables and CORS protocols.

## 📂 Project Structure
```text
/voter-assist-kathmandu
├── /backend
│   ├── /models       # Mongoose Data Schemas
│   ├── server.js     # Express API & AI Logic
│   └── .env.example  # Template for environment variables
├── /frontend
│   ├── /src
│   │   ├── /components # Reusable UI Components
│   │   ├── i18n.js     # Localization Config
│   │   └── App.jsx     # Main Routing
│   └── vite.config.js
└── README.md