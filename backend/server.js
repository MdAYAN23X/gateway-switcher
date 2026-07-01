import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3847;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes first
app.use("/api", yourRoutesHere);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// React router fallback
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});