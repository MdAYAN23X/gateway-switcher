import { useLocation } from "react-router-dom";

export default function Header() {

    const location = useLocation();

    const getTitle = () => {

        switch (location.pathname) {

            case "/":
                return "Dashboard";

            case "/gateways":
                return "Gateways";

            case "/backups":
                return "Backups";

            case "/keys":
                return "API Keys";

            case "/settings":
                return "Settings";

            default:
                return "Gateway Manager";
        }
    };

    return (
        <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">

            <h2 className="text-lg font-semibold">
                {getTitle()}
            </h2>

            <div className="text-green-400 text-sm">
                ● Connected
            </div>

        </header>
    );
}