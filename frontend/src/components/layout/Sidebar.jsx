import { NavLink } from "react-router-dom";
import { KeyRound } from "lucide-react";
import {
    LayoutDashboard,
    Globe,
    Archive,
    Settings
} from "lucide-react";

export default function Sidebar() {

    const menu = [
        {
            name: "Dashboard",
            path: "/",
            icon: LayoutDashboard
        },
        {
            name: "Gateway Manager",
            path: "/gateways",
            icon: Globe
        },
        {
            name: "Backup Manager",
            path: "/backups",
            icon: Archive
        },

        {
           name: "API Keys",
           path: "/keys",
           icon: KeyRound
        },

        {
            name: "Settings",
            path: "/settings",
            icon: Settings
        }
    ];

    return (
        <aside className="w-64 bg-slate-950 border-r border-slate-800">

            <div className="h-16 flex items-center px-6 border-b border-slate-800">

                <h1 className="text-lg font-bold">
                    Gateway Manager
                </h1>

            </div>

            <nav className="p-4 space-y-2">

                {menu.map(item => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "hover:bg-slate-800 text-slate-300"
                                }`
                            }
                        >
                            <Icon size={20} />
                            {item.name}
                        </NavLink>

                    );

                })}

            </nav>

        </aside>
    );
}