const status = document.getElementById("status");
const gateway = document.getElementById("gateway");
const model = document.getElementById("model");
const output = document.getElementById("output");

const gatewaySelect = document.getElementById("gatewaySelect");
const apiKey = document.getElementById("apiKey");
const baseUrl = document.getElementById("baseUrl");
const modelInput = document.getElementById("modelInput");

async function loadDashboard() {

    // Load current configuration
    const configRes = await fetch("/api/config");
    const configData = await configRes.json();

    if (configData.success) {

        const env = configData.config.env;

        status.textContent = "🟢 Connected";
        gateway.textContent = env.ANTHROPIC_BASE_URL || "-";
        model.textContent = env.ANTHROPIC_MODEL || "Default";

        output.textContent = JSON.stringify(configData.config, null, 2);

    } else {

        status.textContent = "❌ Not Configured";
        gateway.textContent = "-";
        model.textContent = "-";
        output.textContent = configData.message;

    }
}

async function loadGateways() {

    const res = await fetch("/api/gateways");
    const data = await res.json();

    gatewaySelect.innerHTML = "";

    data.gateways.forEach(g => {

        const option = document.createElement("option");

        option.value = g.id;
        option.textContent = g.name;
        option.dataset.url = g.baseUrl;
        option.dataset.model = g.defaultModel;

        gatewaySelect.appendChild(option);

    });

    updateGatewayFields();

}

function updateGatewayFields() {

    const option = gatewaySelect.selectedOptions[0];

    if (!option) return;

    baseUrl.value = option.dataset.url || "";
    modelInput.value = option.dataset.model || "";

}

async function refresh() {

    await loadDashboard();
    await loadGateways();

}

gatewaySelect.addEventListener("change", updateGatewayFields);

document
    .getElementById("refreshBtn")
    .addEventListener("click", refresh);

refresh();

async function applyConfiguration() {

    const config = {

        env: {

            ANTHROPIC_API_KEY: apiKey.value.trim(),

            ANTHROPIC_BASE_URL: baseUrl.value.trim(),

            ANTHROPIC_MODEL: modelInput.value.trim(),

            CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1"

        },

        permissions: {

            allow: [],

            deny: []

        }

    };

    const response = await fetch("/api/config", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(config)

    });

    const result = await response.json();

    if (!result.success) {

        alert(result.errors?.join("\n") || result.message);

        return;

    }

    alert("Configuration applied successfully.");

    refresh();

}

document
    .getElementById("applyBtn")
    .addEventListener("click", applyConfiguration);