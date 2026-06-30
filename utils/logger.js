import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_DIR = path.join(__dirname, "..", "logs");

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

const LOG_FILE = path.join(LOG_DIR, "gateway-switcher.log");

export function log(message) {
    const time = new Date().toISOString();

    fs.appendFileSync(
        LOG_FILE,
        `[${time}] ${message}\n`
    );

    console.log(message);
}
