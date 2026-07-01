import { api } from "./client";

export const getBackups = async () => {
    const res = await api.get("/backups");
    return res.data;
};

export const restoreBackup = async (filename) => {
    const res = await api.post("/backups/restore", {
        filename
    });

    return res.data;
};

export const deleteBackup = async (filename) => {
    const res = await api.delete("/backups", {
        data: { filename }
    });

    return res.data;
};

export const createBackup = async () => {
    const res = await api.post("/backups");
    return res.data;
};