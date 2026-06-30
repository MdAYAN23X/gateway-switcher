console.log("Loading gateways:", 6);
export const GATEWAYS = [
    {
        id: "aerolink",
        name: "Aerolink",
        baseUrl: "https://capi.aerolink.lat/",
        defaultModel: "claude-opus-4-8"
    },
    {
        id: "freemodel",
        name: "FreeModel AI",
        baseUrl: "https://cc.freemodel.dev/",
        defaultModel: "claude-opus"
    },
    {
        id: "agentrouter",
        name: "Agent Router",
        baseUrl: "https://agentrouter.org/",
        defaultModel: "claude-opus-4-8"
    },
    {
        id: "openrouter",
        name: "OpenRouter",
        baseUrl: "https://openrouter.ai/api/",
        defaultModel: "anthropic/claude-opus-4.1"
    },
    {
        id: "anthropic",
        name: "Anthropic",
        baseUrl: "https://api.anthropic.com/",
        defaultModel: "claude-opus-4-1"
    },
    {
        id: "custom",
        name: "Custom",
        baseUrl: "",
        defaultModel: ""
    }
];