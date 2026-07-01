# Gateway Switcher

A full-stack dashboard to manage multiple AI gateways, switch models, configure API keys, and control a unified AI configuration system with backup and restore support.

---

## 🚀 Overview

Gateway Switcher provides a centralized interface to manage multiple AI providers such as Aerolink, FreeModel AI, Agent Router, OpenRouter, Anthropic, and custom endpoints.

It allows switching between gateways without manually editing configuration files.

---

## ✨ Features

- 🔀 Switch between multiple AI gateways
- 🔑 Store and manage API keys per gateway
- 🤖 Select models dynamically per provider
- ⚙️ Apply configuration to local AI environment
- 💾 Create, restore, and delete backups
- 🧠 Centralized configuration management
- ⚡ Fast REST API backend
- 🎨 Clean React + Tailwind UI

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Lucide Icons

### Backend
- Node.js
- Express.js
- File-based storage system

---

## 📁 Project Structure

```text
gateway-switcher/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── backups/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md

```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone [https://github.com/MdAYAN23X/gateway-switcher.git](https://github.com/MdAYAN23X/gateway-switcher.git)
cd gateway-switcher

```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev

```

Backend runs at: `http://localhost:3847`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev

```

Frontend runs at: `http://localhost:5173`

---

## 🔌 API Endpoints

### Gateways

* `GET /api/gateways`

### Configuration

* `GET /api/config`
* `POST /api/config`

### API Keys

* `GET /api/keys`
* `POST /api/keys`

### Backups

* `GET /api/backups`
* `POST /api/backups`
* `POST /api/backups/restore`
* `DELETE /api/backups`

---

## 💾 Backup System

Backups are stored locally at: `backend/backups/`

### Features:

* Create backups manually
* Restore previous configurations
* Delete old backups

---

## 🧠 Use Case

Useful for developers working with multiple AI providers who need quick switching between APIs without manually editing environment or config files.

---

## 📌 Future Improvements

* Authentication system
* Cloud backup storage
* Team collaboration support
* Usage analytics dashboard

---

## 👨‍💻 Author

**MdAYAN23X**

---

## 📄 License

This project is not licensed for public reuse or redistribution.  
All rights reserved by the author.

```

Take a look at the **Preview** tab now—it will format beautifully with no extra explanation text or hanging code blocks.

```
