import { api } from "./client";

export const getKeys = async () => {
    const res = await api.get("/keys");
    return res.data;
};

export const saveKeys = async (data) => {
    const res = await api.post("/keys", data);
    return res.data;
};