import { validateConfig } from "../utils/validator.js";
import { saveConfiguration } from "../services/configService.js";
import {
    readConfig,
    writeConfig,
    configExists
} from "../utils/configManager.js";

import { createBackup } from "../services/backupService.js";

import { log } from "../utils/logger.js";

export function getConfig(req, res) {

    try {

        if (!configExists()) {

            return res.status(404).json({
                success: false,
                message: "Claude configuration not found."
            });

        }

        const config = readConfig();

        res.json({
            success: true,
            config
        });

    }

    catch (err) {

        log(err.message);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}
export function saveConfig(req, res) {

    try {

        const result = saveConfiguration(req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.json(result);

    }

    catch (err) {

        log(err.message);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}