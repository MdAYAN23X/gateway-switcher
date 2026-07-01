import fs from "fs";
import os from "os";
import path from "path";

const CLAUDE_DIR = path.join(os.homedir(), ".claude");
const CONFIG_PATH = path.join(CLAUDE_DIR, "settings.json");

export function getConfigPath() {
    return CONFIG_PATH;
}

export function configExists() {
    return fs.existsSync(CONFIG_PATH);
}

export function ensureClaudeDirectory() {
    if (!fs.existsSync(CLAUDE_DIR)) {
        fs.mkdirSync(CLAUDE_DIR, { recursive: true });
    }
}

export function readConfig() {
    ensureClaudeDirectory();

    if (!configExists()) {
        return {};
    }

    try {
        const data = fs.readFileSync(CONFIG_PATH, "utf8");

        if (!data.trim()) {
            return {};
        }

        return JSON.parse(data);

    } catch (err) {
        throw new Error(`Unable to read Claude config: ${err.message}`);
    }
}

export function writeConfig(config) {
    ensureClaudeDirectory();

    try {
        fs.writeFileSync(
            CONFIG_PATH,
            JSON.stringify(config, null, 2),
            "utf8"
        );

        return true;

    } catch (err) {
        throw new Error(`Unable to write Claude config: ${err.message}`);
    }
}
