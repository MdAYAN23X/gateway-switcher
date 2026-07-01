export function validateConfig(config) {

    const errors = [];

    if (!config) {
        errors.push("Configuration is empty.");
        return errors;
    }

    if (!config.env) {
        errors.push("Missing 'env' object.");
        return errors;
    }

    const env = config.env;

    // Base URL
    if (!env.ANTHROPIC_BASE_URL) {
        errors.push("ANTHROPIC_BASE_URL is required.");
    }

    // API Key
    const hasApiKey =
        typeof env.ANTHROPIC_API_KEY === "string" &&
        env.ANTHROPIC_API_KEY.trim() !== "";

    // apiKeyHelper
    const hasApiKeyHelper =
        typeof config.apiKeyHelper === "string" &&
        config.apiKeyHelper.trim() !== "";

    // Cannot use both
    if (hasApiKey && hasApiKeyHelper) {
        errors.push(
            "Use either ANTHROPIC_API_KEY or apiKeyHelper, not both."
        );
    }

    // Must use one
    if (!hasApiKey && !hasApiKeyHelper) {
        errors.push(
            "Authentication method missing."
        );
    }

    return errors;
}