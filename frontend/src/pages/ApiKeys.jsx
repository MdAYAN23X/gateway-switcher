import { useEffect, useState } from "react";
import { getGateways } from "../api/gatewayApi";
import { getKeys, saveKeys } from "../api/keyApi";
import toast from "react-hot-toast";

export default function ApiKeys() {

    const [gateways, setGateways] = useState([]);
    const [keys, setKeys] = useState({});

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState({});

    async function load() {

        setLoading(true);

        try {

            const [gRes, kRes] = await Promise.all([
                getGateways(),
                getKeys()
            ]);

            setGateways(gRes.gateways);
            setKeys(kRes.data.gateways || {});

        } catch {
            toast.error("Failed to load API keys");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    function updateKey(id, value) {

        setKeys(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                apiKey: value
            }
        }));
    }

    async function save(id) {

        setSaving(prev => ({ ...prev, [id]: true }));

        try {

            await saveKeys({
                gateway: id,
                apiKey: keys[id]?.apiKey || ""
            });

            toast.success("Saved");

        } catch {
            toast.error("Save failed");
        } finally {
            setSaving(prev => ({ ...prev, [id]: false }));
        }
    }

    if (loading) {
        return (
            <div className="text-slate-300 text-lg">
                Loading API keys...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    API Keys Manager
                </h1>

                <button
                    onClick={load}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Refresh
                </button>

            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {gateways.map(g => (

                    <div
                        key={g.id}
                        className="p-6 rounded-xl border border-slate-700 bg-slate-900 space-y-4"
                    >

                        {/* Header */}
                        <div className="flex items-center justify-between">

                            <h2 className="text-lg font-semibold">
                                {g.name}
                            </h2>

                            <span className="text-xs text-slate-400">
                                {g.id}
                            </span>

                        </div>

                        {/* Input */}
                        <input
                            type="text"
                            placeholder="Enter API Key"
                            value={keys[g.id]?.apiKey || ""}
                            onChange={(e) => updateKey(g.id, e.target.value)}
                            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                        />

                        {/* Footer */}
                        <div className="flex items-center justify-between">

                            <p className={`text-sm ${
                                keys[g.id]?.apiKey
                                    ? "text-green-400"
                                    : "text-red-400"
                            }`}>
                                {keys[g.id]?.apiKey ? "Configured" : "Not Set"}
                            </p>

                            <button
                                onClick={() => save(g.id)}
                                disabled={saving[g.id]}
                                className={`px-4 py-2 rounded-lg text-white transition ${
                                    saving[g.id]
                                        ? "bg-gray-600 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                                {saving[g.id] ? "Saving..." : "Save"}
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}