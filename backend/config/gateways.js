export const GATEWAYS = [
    {
        id: "aerolink",
        name: "Aerolink",
        baseUrl: "https://capi.aerolink.lat/",
        models: [
            "claude-opus-4-8",
            "claude-sonnet-4"
        ]
    },
    {
        id: "freemodel",
        name: "FreeModel AI",
        baseUrl: "https://cc.freemodel.dev/",
        models: [
            "claude-opus",
            "claude-sonnet"
        ]
    },
    {
        id: "agentrouter",
        name: "Agent Router",
        baseUrl: "https://agentrouter.org/",
        models: [
            "claude-opus-4-8",
            "claude-sonnet-4"
        ]
    },
    {
        id: "openrouter",
        name: "OpenRouter",
        baseUrl: "https://openrouter.ai/api/",
        models: [
            "anthropic/claude-opus-4.1",
            "anthropic/claude-sonnet-4"
        ]
    },
    {
        id: "anthropic",
        name: "Anthropic",
        baseUrl: "https://api.anthropic.com/",
        models: [
            "claude-opus-4-1",
            "claude-sonnet-4",
            "claude-haiku-4"
        ]
    },
    {
        id: "custom",
        name: "Custom",
        baseUrl: "",
        models: []
    }
];