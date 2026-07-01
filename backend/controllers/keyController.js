import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "../data");
const CONFIG_FILE = path.join(DATA_DIR, "gateway-config.json");

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(
        CONFIG_FILE,
        JSON.stringify(
            {
                defaultGateway: "aerolink",
                gateways: {
                    aerolink: { apiKey: "" },
                    freemodel: { apiKey: "" },
                    agentrouter: { apiKey: "" },
                    openrouter: { apiKey: "" },
                    anthropic: { apiKey: "" }
                }
            },
            null,
            2
        )
    );
}

export const getKeys = (req, res) => {
    try {
        const data = JSON.parse(
            fs.readFileSync(CONFIG_FILE, "utf8")
        );

        res.json({
            success: true,
            data
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const saveKeys = (req, res) => {
    try {
        fs.writeFileSync(
            CONFIG_FILE,
            JSON.stringify(req.body, null, 2)
        );

        res.json({
            success: true,
            message: "Gateway keys saved successfully."
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};