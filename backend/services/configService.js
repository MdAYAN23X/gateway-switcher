import { validateConfig } from "../utils/validator.js";
import { writeConfig } from "../utils/configManager.js";
import { createBackup } from "./backupService.js";
import { log } from "../utils/logger.js";

export function saveConfiguration(config) {

    const errors = validateConfig(config);

    if (errors.length > 0) {
        return {
            success: false,
            errors
        };
    }

    createBackup();

    writeConfig(config);

    log("Configuration updated.");

    return {
        success: true,
        message: "Configuration saved successfully."
    };

}