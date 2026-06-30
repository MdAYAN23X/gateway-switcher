import fs from "fs";
import path from "path";
import { getConfigPath, configExists } from "../utils/configManager.js";

const BACKUP_DIR = path.join(process.cwd(), "backups");

if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

export function createBackup() {
    if (!configExists()) {
        return null;
    }

    const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-");

    const backupPath = path.join(
        BACKUP_DIR,
        `settings-${timestamp}.json`
    );

    fs.copyFileSync(getConfigPath(), backupPath);

    return backupPath;
}

export function listBackups() {
    return fs.readdirSync(BACKUP_DIR)
        .filter(file => file.endsWith(".json"))
        .sort()
        .reverse();
}
