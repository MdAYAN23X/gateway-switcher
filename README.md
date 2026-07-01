# Gateway Switcher

A full-stack dashboard for managing multiple AI gateways, switching models, managing API keys, and applying configurations for Claude Code CLI with built-in backup and restore support.

---

## 🚀 Overview

Gateway Switcher provides a centralized interface for managing multiple AI providers such as:

* Aerolink
* FreeModel AI
* Agent Router
* OpenRouter
* Anthropic
* Custom Gateway

Instead of manually editing Claude configuration files, Gateway Switcher allows switching between providers, models, and API keys through an intuitive web interface.

---

# ✨ Features

* 🔀 Switch between multiple AI gateways
* 🤖 Select gateway-specific AI models
* 🔑 Securely manage API keys for each gateway
* ⚙️ Apply configuration directly to Claude Code CLI
* 💾 Create, restore, and delete configuration backups
* 📊 Dashboard showing current configuration and backend status
* ⚡ Fast Express REST API
* 🎨 Modern React + Tailwind CSS interface
* 🖥️ Single-command production setup

---

# 🧱 Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast
* Lucide React

## Backend

* Node.js
* Express.js
* File-based configuration management

---

# 📁 Project Structure

```text
gateway-switcher/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── backups/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── dist/
│   └── package.json
│
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/MdAYAN23X/gateway-switcher.git
cd gateway-switcher
```

Install dependencies:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

---

# 🚀 Running the Application

## Development Mode

Runs both frontend and backend with hot reload.

```bash
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:3847
```

---

## Production Mode (Recommended)

Build the frontend:

```bash
npm run build
```

Start the application:

```bash
npm start
```

Open:

```
http://localhost:3847
```

Only a single backend process is required. The Express server serves both the API and the React application.

---

# 📌 Daily Usage

For normal day-to-day usage:

```bash
cd ~/gateway-switcher
npm start
```

Open:

```
http://localhost:3847
```

If frontend changes are made, rebuild before starting:

```bash
npm run build
npm start
```

---

# 🔌 API Endpoints

## Gateway Management

```
GET    /api/gateways
```

## Configuration

```
GET    /api/config
POST   /api/config
```

## API Keys

```
GET    /api/keys
POST   /api/keys
```

## Backups

```
GET    /api/backups
POST   /api/backups
POST   /api/backups/restore
DELETE /api/backups
```

## Health Check

```
GET /api/health
```

---

# 💾 Backup System

Gateway Switcher automatically stores configuration backups locally.

```
backend/backups/
```

Supported operations:

* Create backups
* Restore previous configurations
* Delete outdated backups

---

# 🧠 Workflow

1. Launch Gateway Switcher.
2. Save API keys for each provider.
3. Select a gateway.
4. Choose a model.
5. Apply the configuration.
6. Use Claude Code CLI with the selected settings.

---

# 🎯 Use Case

Gateway Switcher is designed for developers who frequently switch between different AI providers and models while using Claude Code CLI. It eliminates repetitive manual configuration changes and provides a centralized management interface.

---

# 🔮 Future Improvements

* Automatic gateway detection
* Configuration profiles
* Import and export settings
* Configuration history
* Search and filter support
* Desktop application (Electron)
* Auto-update support
* Theme customization

---

# 👨‍💻 Author

**Mohammad Ayan**

GitHub: https://github.com/MdAYAN23X

---

# 📄 License

This project is intended for educational, personal, and development purposes.

