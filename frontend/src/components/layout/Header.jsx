export default function Header() {
    return (
        <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">

            <h2 className="text-lg font-semibold">
                Claude Gateway Manager
            </h2>

            <div className="text-green-400 text-sm">
                ● Connected
            </div>

        </header>
    );
}