import { useEffect, useState } from "react";
import StatusCard from "../components/dashboard/StatusCard";
import { getHealth, getConfig, getGateways } from "../api/gatewayApi";

export default function Dashboard() {

    const [loading, setLoading] = useState(true);
    const [health, setHealth] = useState(null);
    const [config, setConfig] = useState(null);
    const [gateways, setGateways] = useState([]);

    async function loadData() {

        setLoading(true);

        try {

            const [healthData, configData, gatewayData] = await Promise.all([
                getHealth(),
                getConfig(),
                getGateways()
            ]);

            setHealth(healthData);
            setConfig(configData.config);
            setGateways(gatewayData.gateways);

        } catch (err) {

            console.error("Dashboard load failed:", err);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="text-slate-300 text-lg">
                Loading dashboard...
            </div>
        );
    }

    const env = config?.env || {};

    const activeGateway =
        gateways.find(g => g.baseUrl === env.ANTHROPIC_BASE_URL)?.name
        || "Unknown";

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <button
                    onClick={loadData}
                    className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700 transition"
                >
                    Refresh
                </button>

            </div>

            {/* Status Cards */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                <StatusCard
                    title="Backend"
                    value={health?.success ? "Online" : "Offline"}
                    color={health?.success ? "text-green-400" : "text-red-400"}
                />

                <StatusCard
                    title="Active Gateway"
                    value={activeGateway}
                />

                <StatusCard
                    title="Active Model"
                    value={env.ANTHROPIC_MODEL || "Not Set"}
                />

                <StatusCard
                    title="Total Gateways"
                    value={gateways.length}
                />

            </div>

            {/* Config Summary */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex items-center justify-between mb-4">

                    <h2 className="text-xl font-semibold">
                        Configuration Overview
                    </h2>

                    <span className="text-sm text-slate-400">
                        Live System State
                    </span>

                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">

                    <div>
                        <p className="text-slate-400">Base URL</p>
                        <p className="text-white break-all">
                            {env.ANTHROPIC_BASE_URL || "Not configured"}
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-400">Model</p>
                        <p className="text-white">
                            {env.ANTHROPIC_MODEL || "Not configured"}
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-400">API Key</p>
                        <p className="text-white">
                            {env.ANTHROPIC_API_KEY ? "Configured" : "Missing"}
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-400">Traffic Mode</p>
                        <p className="text-white">
                            {env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC === "1"
                                ? "Optimized"
                                : "Default"}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}