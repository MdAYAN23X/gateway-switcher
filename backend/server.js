import express from "express";
import cors from "cors";
import path from "path";
import os from "os";
import fs from "fs";
import { fileURLToPath } from "url";

import configRoutes from "./routes/configRoutes.js";
import backupRoutes from "./routes/backupRoutes.js";
import gatewayRoutes from "./routes/gatewayRoutes.js";
import keyRoutes from "./routes/keyRoutes.js";

const app = express();
const PORT = 3847;

// Middleware
app.use(cors());
app.use(express.json());

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend (legacy)
app.use(express.static(path.join(__dirname, "public")));

// Claude configuration paths
const CLAUDE_DIR = path.join(os.homedir(), ".claude");
const CONFIG_PATH = path.join(CLAUDE_DIR, "settings.json");
const BACKUP_DIR = path.join(__dirname, "backups");

// Create backup directory if missing
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Gateway Switcher Backend is running 🚀",
        configPath: CONFIG_PATH
    });
});

// API Routes
app.use("/api/config", configRoutes);
app.use("/api/backups", backupRoutes);
app.use("/api/gateways", gatewayRoutes);
app.use("/api/keys", keyRoutes);

// Start Server
app.listen(PORT, () => {
    console.log("===================================");
    console.log(" Claude Gateway Switcher");
    console.log("===================================");
    console.log(`Running at: http://localhost:${PORT}`);
    console.log(`Claude Config: ${CONFIG_PATH}`);
    console.log("===================================");
});