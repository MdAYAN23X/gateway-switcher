import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getGateways } from "../api/gatewayApi";
import { getKeys, saveKeys } from "../api/keyApi";
import toast from "react-hot-toast";

export default function ApiKeys() {

    const [gateways, setGateways] = useState([]);
    const [keys, setKeys] = useState({});

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState({});
    const [visibleKeys, setVisibleKeys] = useState({});

    useEffect(() => {
        load();
    }, []);

    async function load() {

        setLoading(true);

        try {

            const [gRes, kRes] = await Promise.all([
                getGateways(),
                getKeys()
            ]);

            setGateways(gRes.gateways || []);
            setKeys(kRes?.data?.gateways || {});

        } catch {

            toast.error("Failed to load API keys.");

        } finally {

            setLoading(false);

        }

    }

    function updateKey(id, value) {

        setKeys(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                apiKey: value
            }
        }));

    }

    function toggleVisibility(id) {

        setVisibleKeys(prev => ({
            ...prev,
            [id]: !prev[id]
        }));

    }

    async function save(id) {

        const apiKey = keys[id]?.apiKey?.trim() || "";

        if (!apiKey) {
            toast.error("API key cannot be empty.");
            return;
        }

        setSaving(prev => ({
            ...prev,
            [id]: true
        }));

        try {

            await saveKeys({
                gateway: id,
                apiKey
            });

            toast.success("API key saved successfully.");

        } catch {

            toast.error("Failed to save API key.");

        } finally {

            setSaving(prev => ({
                ...prev,
                [id]: false
            }));

        }

    }

    if (loading) {

        return (
            <div className="text-lg text-slate-300">
                Loading API Keys...
            </div>
        );

    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    API Keys Manager
                </h1>

                <button
                    onClick={load}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                >
                    Refresh
                </button>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

                {gateways.map(g => (

                    <div
                        key={g.id}
                        className="rounded-xl border border-slate-700 bg-slate-900 p-6 space-y-5"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-lg font-semibold">
                                    {g.name}
                                </h2>

                                <p className="text-xs text-slate-400">
                                    {g.id}
                                </p>

                            </div>

                            <span
                                className={`text-sm font-medium ${
                                    keys[g.id]?.apiKey
                                        ? "text-green-400"
                                        : "text-red-400"
                                }`}
                            >
                                {keys[g.id]?.apiKey
                                    ? "Configured"
                                    : "Not Set"}
                            </span>

                        </div>

                        <div className="relative">

                            <input
                                type={
                                    visibleKeys[g.id]
                                        ? "text"
                                        : "password"
                                }
                                autoComplete="off"
                                placeholder="Enter API Key"
                                value={keys[g.id]?.apiKey || ""}
                                onChange={(e) =>
                                    updateKey(g.id, e.target.value)
                                }
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 pr-12 text-white font-mono focus:border-blue-500 focus:outline-none"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    toggleVisibility(g.id)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                            >
                                {visibleKeys[g.id]
                                    ? <EyeOff size={18} />
                                    : <Eye size={18} />}
                            </button>

                        </div>

                        <button
                            onClick={() => save(g.id)}
                            disabled={
                                saving[g.id] ||
                                !keys[g.id]?.apiKey?.trim()
                            }
                            className={`w-full rounded-lg py-3 font-medium transition ${
                                saving[g.id] ||
                                !keys[g.id]?.apiKey?.trim()
                                    ? "cursor-not-allowed bg-slate-700 text-slate-400"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                        >
                            {saving[g.id]
                                ? "Saving..."
                                : "Save API Key"}
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}