import fs from "fs";
import path from "path";
import os from "os";

const KEY_FILE = path.join(process.cwd(), "data", "gateway-config.json");
const CLAUDE_FILE = path.join(os.homedir(), ".claude", "settings.json");

export const switchGateway = (req, res) => {
    try {
        const { gateway, baseUrl, model } = req.body;

        const keys = JSON.parse(fs.readFileSync(KEY_FILE, "utf8"));

        const apiKey = keys.gateways[gateway]?.apiKey;

        if (!apiKey) {
            return res.status(400).json({
                success: false,
                message: "API key not found."
            });
        }

        const config = {
            env: {
                ANTHROPIC_API_KEY: apiKey,
                ANTHROPIC_BASE_URL: baseUrl,
                ANTHROPIC_MODEL: model,
                CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1"
            }
        };

        fs.writeFileSync(
            CLAUDE_FILE,
            JSON.stringify(config, null, 2)
        );

        res.json({
            success: true,
            message: "Gateway switched successfully."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};