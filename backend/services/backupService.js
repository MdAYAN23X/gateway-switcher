import fs from "fs";
import path from "path";
import { getConfigPath, configExists } from "../utils/configManager.js";
import fs from "fs";
import path from "path";
import fs from "fs";
import path from "path";
import os from "os";
import { readConfig } from "../utils/configManager.js";

const BACKUP_DIR = path.join(process.cwd(), "backups");

export function createBackupNow() {

    const config = readConfig();

    const filename = `backup-${Date.now()}.json`;

    const filePath = path.join(BACKUP_DIR, filename);

    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));

    return filename;
}

const BACKUP_DIR = path.join(process.cwd(), "backups");

export function deleteBackup(filename) {
    const filePath = path.join(BACKUP_DIR, filename);

    if (!fs.existsSync(filePath)) {
        throw new Error("Backup not found.");
    }

    fs.unlinkSync(filePath);
}

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

    const filename = `settings-${timestamp}.json`;

    fs.copyFileSync(
        getConfigPath(),
        path.join(BACKUP_DIR, filename)
    );

    return filename;

}

export function listBackups() {

    return fs.readdirSync(BACKUP_DIR)
        .filter(file => file.endsWith(".json"))
        .sort()
        .reverse();

}

export function restoreBackup(filename) {

    const backupPath = path.join(BACKUP_DIR, filename);

    if (!fs.existsSync(backupPath)) {
        throw new Error("Backup not found.");
    }

    fs.copyFileSync(
        backupPath,
        getConfigPath()
    );

    return true;

}