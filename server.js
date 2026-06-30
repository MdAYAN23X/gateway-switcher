import express from "express";
import cors from "cors";
import path from "path";
import os from "os";
import fs from "fs";
import { fileURLToPath } from "url";
import configRoutes from "./routes/configRoutes.js";
import backupRoutes from "./routes/backupRoutes.js";
import gatewayRoutes from "./routes/gatewayRoutes.js";

const app = express();
const PORT = 3847;

app.use("/api/backups", backupRoutes);

app.use("/api/gateways", gatewayRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Claude configuration paths
const CLAUDE_DIR = path.join(os.homedir(), ".claude");
const CONFIG_PATH = path.join(CLAUDE_DIR, "settings.json");
const BACKUP_DIR = path.join(__dirname, "backups");

// Create backup directory if missing
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Gateway Switcher Backend is running 🚀",
        configPath: CONFIG_PATH
    });
});

app.use("/api/config", configRoutes);

// Start server
app.listen(PORT, () => {
    console.log("===================================");
    console.log(" Claude Gateway Switcher");
    console.log("===================================");
    console.log(`Running at: http://localhost:${PORT}`);
    console.log(`Claude Config: ${CONFIG_PATH}`);
    console.log("===================================");
});
