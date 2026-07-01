import { useEffect, useState } from "react";
import {
    getBackups,
    restoreBackup,
    deleteBackup,
    createBackup
} from "../api/backupApi";
import toast from "react-hot-toast";

export default function Backups() {

    const [backups, setBackups] = useState([]);

    useEffect(() => {
        loadBackups();
    }, []);

    async function loadBackups() {
        try {
            const res = await getBackups();
            setBackups(res.backups || []);
        } catch {
            toast.error("Failed to load backups.");
        }
    }

    async function restore(file) {

        if (!window.confirm(`Restore "${file}"?`)) return;

        try {
            await restoreBackup(file);
            toast.success("Backup restored successfully.");
        } catch (err) {
            toast.error(err.response?.data?.message || "Restore failed.");
        }
    }

    async function remove(file) {

        if (!window.confirm(`Delete "${file}"?`)) return;

        try {
            await deleteBackup(file);
            toast.success("Backup deleted successfully.");
            loadBackups();
        } catch (err) {
            toast.error(err.response?.data?.message || "Delete failed.");
        }
    }

    async function createNewBackup() {

        try {
            const res = await createBackup();

            toast.success("Backup created successfully");

            loadBackups();

        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create backup");
        }
    }

    return (
        <div className="max-w-5xl space-y-6">

            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Backup Manager
                </h1>

                <button
                    onClick={createNewBackup}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                    + Create Backup
                </button>

            </div>

            <div className="rounded-lg border border-slate-700 overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-900">

                        <tr>
                            <th className="text-left p-3">Backup File</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-center p-3">Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {backups.length === 0 ? (

                            <tr>
                                <td colSpan="3" className="p-4 text-center text-slate-400">
                                    No backups found.
                                </td>
                            </tr>

                        ) : (

                            backups.map((file) => (

                                <tr
                                    key={file}
                                    className="border-t border-slate-700 hover:bg-slate-800 transition"
                                >

                                    <td className="p-3 font-mono">
                                        {file}
                                    </td>

                                    <td className="p-3 text-green-400">
                                        Available
                                    </td>

                                    <td className="p-3">
                                        <div className="flex gap-2 justify-center">

                                            <button
                                                onClick={() => restore(file)}
                                                className="rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-1 text-white transition"
                                            >
                                                Restore
                                            </button>

                                            <button
                                                onClick={() => remove(file)}
                                                className="rounded-lg bg-red-600 hover:bg-red-700 px-3 py-1 text-white transition"
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}