import fs from "fs";
import path from "path";
import { getConfigPath, configExists, readConfig } from "../utils/configManager.js";

const BACKUP_DIR = path.join(process.cwd(), "backups");

// Ensure backup folder exists
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Create backup from current config
export function createBackup() {

    if (!configExists()) return null;

    const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-");

    const filename = `settings-${timestamp}.json`;

    fs.copyFileSync(
        getConfigPath(),
        path.join(BACKUP_DIR, filename)
    );

    return filename;
}

// List all backups
export function listBackups() {
    return fs.readdirSync(BACKUP_DIR)
        .filter(f => f.endsWith(".json"))
        .sort()
        .reverse();
}

// Restore backup
export function restoreBackup(filename) {

    const filePath = path.join(BACKUP_DIR, filename);

    if (!fs.existsSync(filePath)) {
        throw new Error("Backup not found.");
    }

    fs.copyFileSync(filePath, getConfigPath());

    return true;
}

// Delete backup
export function deleteBackup(filename) {

    const filePath = path.join(BACKUP_DIR, filename);

    if (!fs.existsSync(filePath)) {
        throw new Error("Backup not found.");
    }

    fs.unlinkSync(filePath);
}