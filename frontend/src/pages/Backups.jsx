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
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    async function load() {

        setLoading(true);

        try {

            const res = await getBackups();
            setBackups(res.backups || []);

        } catch {
            toast.error("Failed to load backups");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function createNew() {

        setActionLoading(true);

        try {

            const res = await createBackup();

            toast.success("Backup created");
            load();

        } catch {
            toast.error("Failed to create backup");
        } finally {
            setActionLoading(false);
        }
    }

    async function restore(file) {

        if (!window.confirm(`Restore "${file}"?`)) return;

        try {

            await restoreBackup(file);
            toast.success("Backup restored");

        } catch {
            toast.error("Restore failed");
        }
    }

    async function remove(file) {

        if (!window.confirm(`Delete "${file}"?`)) return;

        try {

            await deleteBackup(file);
            toast.success("Backup deleted");
            load();

        } catch {
            toast.error("Delete failed");
        }
    }

    if (loading) {
        return (
            <div className="text-slate-300 text-lg">
                Loading backups...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Backup Manager
                </h1>

                <button
                    onClick={createNew}
                    disabled={actionLoading}
                    className={`px-4 py-2 rounded-lg text-white transition ${
                        actionLoading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {actionLoading ? "Creating..." : "Create Backup"}
                </button>

            </div>

            {/* Empty state */}
            {backups.length === 0 ? (
                <div className="p-6 rounded-xl border border-slate-700 bg-slate-900 text-slate-400">
                    No backups found. Create your first backup.
                </div>
            ) : (

                /* Grid Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {backups.map(file => (

                        <div
                            key={file}
                            className="p-5 rounded-xl border border-slate-700 bg-slate-900 space-y-4"
                        >

                            <div>
                                <p className="text-slate-400 text-sm">
                                    Backup File
                                </p>

                                <p className="font-mono text-white break-all">
                                    {file}
                                </p>
                            </div>

                            <div className="flex gap-2 justify-end">

                                <button
                                    onClick={() => restore(file)}
                                    className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Restore
                                </button>

                                <button
                                    onClick={() => remove(file)}
                                    className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}