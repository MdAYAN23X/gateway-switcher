import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Globe,
    Archive,
    Settings,
    KeyRound
} from "lucide-react";

export default function Sidebar() {

    const menu = [
        { name: "Dashboard", path: "/", icon: LayoutDashboard },
        { name: "Gateways", path: "/gateways", icon: Globe },
        { name: "Backups", path: "/backups", icon: Archive },
        { name: "API Keys", path: "/keys", icon: KeyRound },
        { name: "Settings", path: "/settings", icon: Settings }
    ];

    return (
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">

            {/* Header */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <h1 className="text-lg font-bold tracking-wide">
                    Gateway Manager
                </h1>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2 flex-1">

                {menu.map(item => {

                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-md scale-[1.02]"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white hover:translate-x-1"
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span className="font-medium">
                                {item.name}
                            </span>
                        </NavLink>
                    );
                })}

            </nav>

            {/* Footer hint */}
            <div className="p-4 text-xs text-slate-500 border-t border-slate-800">
                v1.0 • Gateway System
            </div>

        </aside>
    );
}   