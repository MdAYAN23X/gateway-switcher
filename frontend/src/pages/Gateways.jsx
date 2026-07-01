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

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const gatewayRes = await getGateways();
        const keyRes = await getKeys();

        setGateways(gatewayRes.gateways);
        setSavedKeys(keyRes.data.gateways);

        if (gatewayRes.gateways.length > 0) {
            const g = gatewayRes.gateways[0];

            setSelected(g.id);
            setModels(g.models);
            setModel(g.models[0] || "");
        }
    }

    function changeGateway(id) {
        setSelected(id);

        const g = gateways.find((x) => x.id === id);

        if (!g) return;

        setModels(g.models);
        setModel(g.models[0] || "");
    }

    async function apply() {
        const g = gateways.find((x) => x.id === selected);

        if (!g) return;

        if (!savedKeys[selected]?.apiKey) {
            toast.error("Please save an API key first.");
            return;
        }

        try {
            await applyConfig({
                env: {
                    ANTHROPIC_API_KEY: savedKeys[selected].apiKey,
                    ANTHROPIC_BASE_URL: g.baseUrl,
                    ANTHROPIC_MODEL: model,
                    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1"
                }
            });

            toast.success("Configuration applied successfully.");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to apply configuration.");
        }
    }

    const current = gateways.find((g) => g.id === selected);

    return (
        <div className="max-w-2xl space-y-6">

            <h1 className="text-3xl font-bold">
                Gateway Manager
            </h1>

            <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 space-y-2">

                <h2 className="text-lg font-semibold text-white">
                    Current Configuration
                </h2>

                <div className="flex justify-between">
                    <span className="text-slate-400">Gateway</span>
                    <span className="text-white">
                        {selected || "-"}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">Model</span>
                    <span className="text-white">
                        {model || "-"}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">Status</span>

                    <span className={savedKeys[selected]?.apiKey ? "text-green-400" : "text-red-400"}>
                        {savedKeys[selected]?.apiKey
                            ? "🟢 Ready"
                            : "🔴 API Key Missing"}
                    </span>
                </div>

            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">
                    Gateway
                </label>

                <select
                    value={selected}
                    onChange={(e) => changeGateway(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 text-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {gateways.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">
                    Model
                </label>

                <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 text-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {models.map((m) => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">
                    Base URL
                </label>

                <input
                    readOnly
                    value={current?.baseUrl || ""}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 text-slate-200 p-3"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-slate-300">
                    API Key
                </label>

                <div className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-slate-200">
                    {savedKeys[selected]?.apiKey
                        ? "✅ API Key Saved"
                        : "❌ API Key Not Saved"}
                </div>
            </div>

            <button
                onClick={apply}
                disabled={!savedKeys[selected]?.apiKey}
                className={`w-full rounded-lg py-3 font-medium transition ${savedKeys[selected]?.apiKey
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-slate-700 text-slate-400 cursor-not-allowed"
                    }`}
            >
                {savedKeys[selected]?.apiKey
                    ? "Apply Configuration"
                    : "Save API Key First"}
            </button>

        </div>


    );
}