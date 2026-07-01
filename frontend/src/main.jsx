import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <>
            <App />

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: "#0f172a",
                        color: "#fff",
                        border: "1px solid #334155"
                    },
                    success: {
                        iconTheme: {
                            primary: "#22c55e",
                            secondary: "#fff"
                        }
                    },
                    error: {
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fff"
                        }
                    }
                }}
            />
        </>
    </React.StrictMode>
);