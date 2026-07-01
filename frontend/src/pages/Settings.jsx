import { useEffect, useState } from "react";
import { getConfig, applyConfig } from "../api/gatewayApi";
import toast from "react-hot-toast";

export default function Settings() {

    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    const [disableTraffic, setDisableTraffic] = useState(false);

    async function load() {

        setLoading(true);

        try {

            const res = await getConfig();

            const env = res.config?.env || {};

            setConfig(res.config);

            setDisableTraffic(
                env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC === "1"
            );

        } catch {
            toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function save() {

        try {

            const updated = {
                ...config,
                env: {
                    ...config.env,
                    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: disableTraffic ? "1" : "0"
                }
            };

            await applyConfig(updated);

            toast.success("Settings updated");

        } catch {
            toast.error("Failed to save settings");
        }
    }

    if (loading) {
        return (
            <div className="text-slate-300">
                Loading settings...
            </div>
        );
    }

    return (
        <div className="max-w-2xl space-y-6">

            <h1 className="text-3xl font-bold">
                Settings
            </h1>

            <div className="p-4 rounded-lg border border-slate-700 bg-slate-900 space-y-4">

                <div className="flex items-center justify-between">

                    <div>
                        <h2 className="font-semibold">
                            Disable Non-Essential Traffic
                        </h2>
                        <p className="text-sm text-slate-400">
                            Reduces background API usage
                        </p>
                    </div>

                    <input
                        type="checkbox"
                        checked={disableTraffic}
                        onChange={(e) => setDisableTraffic(e.target.checked)}
                        className="w-5 h-5"
                    />

                </div>

            </div>

            <button
                onClick={save}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
                Save Settings
            </button>

        </div>
    );
}