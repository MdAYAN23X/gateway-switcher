import { api } from "./client";

// Get all gateways
export const getGateways = async () => {
    const res = await api.get("/gateways");
    return res.data;
};

// Get current config
export const getConfig = async () => {
    const res = await api.get("/config");
    return res.data;
};

// Apply new config
export const applyConfig = async (config) => {
    const res = await api.post("/config", config);
    return res.data;
};

// Health check
export const getHealth = async () => {
    const res = await api.get("/health");
    return res.data;
};