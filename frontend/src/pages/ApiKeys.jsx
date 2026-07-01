import { useEffect, useState } from "react";
import { getKeys, saveKeys } from "../api/keyApi";
import toast from "react-hot-toast";

export default function ApiKeys() {

    const [config, setConfig] = useState(null);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const res = await getKeys();
        setConfig(res.data);
    }

    function changeKey(name, value) {
        setConfig(prev => ({
            ...prev,
            gateways: {
                ...prev.gateways,
                [name]: {
                    apiKey: value
                }
            }
        }));
    }

    async function save() {
        await saveKeys(config);
        toast.success("API keys saved successfully.");  
    }

    if (!config) return <h2>Loading...</h2>;

    return (
        <div className="space-y-6 max-w-3xl">

            <h1 className="text-3xl font-bold">
                API Keys
            </h1>

            {Object.keys(config.gateways).map(name => (

                <div key={name}>

                    <label className="capitalize">
                        {name}
                    </label>

                    <input
                        type="password"
                        value={config.gateways[name].apiKey}
                        onChange={(e) =>
                            changeKey(name, e.target.value)
                        }
                        className="w-full rounded border border-slate-700 bg-slate-900 p-3 mt-2"
                    />

                </div>

            ))}

            <button
                onClick={save}
                className="bg-blue-600 px-5 py-3 rounded"
            >
                Save Keys
            </button>

        </div>
    );

}