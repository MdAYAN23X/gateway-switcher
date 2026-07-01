import { useEffect, useState } from "react";

import StatusCard from "../components/dashboard/StatusCard";

import {
    getHealth,
    getConfig,
    getGateways
} from "../api/gatewayApi";

export default function Dashboard() {

    const [loading, setLoading] = useState(true);

    const [health, setHealth] = useState(null);

    const [config, setConfig] = useState(null);

    const [gateways, setGateways] = useState([]);

    async function loadData() {

        try {

            const [
                healthData,
                configData,
                gatewayData
            ] = await Promise.all([
                getHealth(),
                getConfig(),
                getGateways()
            ]);

            setHealth(healthData);
            setConfig(configData.config);
            setGateways(gatewayData.gateways);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadData();

    }, []);

    if (loading) {

        return (
            <h2 className="text-xl">
                Loading...
            </h2>
        );

    }

    const env = config?.env || {};

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <button
                    onClick={loadData}
                    className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
                >
                    Refresh
                </button>

            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                <StatusCard
                    title="Backend"
                    value={health?.success ? "Connected" : "Offline"}
                    color="text-green-400"
                />

                <StatusCard
                    title="Gateway"
                    value={
                        env.ANTHROPIC_BASE_URL ||
                        "Not Configured"
                    }
                />

                <StatusCard
                    title="Model"
                    value={
                        env.ANTHROPIC_MODEL ||
                        "Default"
                    }
                />

                <StatusCard
                    title="Available Gateways"
                    value={gateways.length}
                />

            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                <h2 className="mb-4 text-xl font-semibold">
                    Current Configuration
                </h2>

                <pre className="overflow-auto text-sm text-slate-300">

{JSON.stringify(config, null, 2)}

                </pre>

            </div>

        </div>

    );

}
