import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import gatewayRoutes from "./routes/gatewayRoutes.js";
import configRoutes from "./routes/configRoutes.js";
import backupRoutes from "./routes/backupRoutes.js";
import keyRoutes from "./routes/keyRoutes.js";

const app = express();
const PORT = 3847;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

/* API Routes */
app.use("/api/gateways", gatewayRoutes);
app.use("/api/config", configRoutes);
app.use("/api/backups", backupRoutes);
app.use("/api/keys", keyRoutes);

app.get("/api/health", (req, res) => {
    res.json({ success: true });
});

/* Serve React Build */
const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Gateway Switcher running at http://localhost:${PORT}`);
});