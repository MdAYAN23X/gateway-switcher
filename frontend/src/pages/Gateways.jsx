import { useEffect, useState } from "react";
import { getGateways, applyConfig } from "../api/gatewayApi";
import { getKeys } from "../api/keyApi";
import toast from "react-hot-toast";

export default function Gateways() {

    const [gateways, setGateways] = useState([]);
    const [savedKeys, setSavedKeys] = useState({});

    const [selected, setSelected] = useState("");
    const [models, setModels] = useState([]);
    const [model, setModel] = useState("");

    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        load();
    }, []);

    async function load() {

        setLoading(true);

        try {

            const [gatewayRes, keyRes] = await Promise.all([
                getGateways(),
                getKeys()
            ]);

            setGateways(gatewayRes.gateways);
            setSavedKeys(keyRes.data.gateways || {});

            if (gatewayRes.gateways.length > 0) {

                const g = gatewayRes.gateways[0];

                setSelected(g.id);
                setModels(g.models);
                setModel(g.models[0] || "");
            }

        } catch {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    }

    function changeGateway(id) {

        setSelected(id);

        const g = gateways.find(x => x.id === id);

        if (!g) return;

        setModels(g.models || []);
        setModel(g.models?.[0] || "");
    }

    async function apply() {

        const g = gateways.find(x => x.id === selected);

        if (!g) return;

        const apiKey = savedKeys[selected]?.apiKey;

        if (!apiKey) {
            toast.error("API Key missing");
            return;
        }

        setApplying(true);

        try {

            await applyConfig({
                env: {
                    ANTHROPIC_API_KEY: apiKey,
                    ANTHROPIC_BASE_URL: g.baseUrl,
                    ANTHROPIC_MODEL: model,
                    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1"
                }
            });

            toast.success("Configuration Applied");

        } catch {
            toast.error("Apply failed");
        } finally {
            setApplying(false);
        }
    }

    const current = gateways.find(g => g.id === selected);

    if (loading) {
        return (
            <div className="text-slate-300 text-lg">
                Loading gateways...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Gateway Manager
                </h1>

                <button
                    onClick={apply}
                    disabled={applying || !savedKeys[selected]?.apiKey}
                    className={`px-5 py-2 rounded-lg text-white transition ${
                        applying || !savedKeys[selected]?.apiKey
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {applying ? "Applying..." : "Apply Configuration"}
                </button>

            </div>

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT CARD */}
                <div className="p-6 rounded-xl border border-slate-700 bg-slate-900 space-y-4">

                    <div>
                        <label className="text-slate-400 text-sm">
                            Gateway
                        </label>

                        <select
                            value={selected}
                            onChange={(e) => changeGateway(e.target.value)}
                            className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                        >
                            {gateways.map(g => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-slate-400 text-sm">
                            Model
                        </label>

                        <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                        >
                            {models.map(m => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* RIGHT CARD */}
                <div className="p-6 rounded-xl border border-slate-700 bg-slate-900 space-y-4">

                    <div>
                        <p className="text-slate-400 text-sm">Base URL</p>
                        <p className="text-white break-all mt-1">
                            {current?.baseUrl || "Not selected"}
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-400 text-sm">API Key Status</p>
                        <p className={`mt-1 ${
                            savedKeys[selected]?.apiKey
                                ? "text-green-400"
                                : "text-red-400"
                        }`}>
                            {savedKeys[selected]?.apiKey ? "Saved" : "Missing"}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}