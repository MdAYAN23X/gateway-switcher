export default function StatusCard({
    title,
    value,
    color = "text-white"
}) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
                {title}
            </p>

            <h2 className={`mt-2 text-2xl font-bold ${color}`}>
                {value}
            </h2>
        </div>
    );
}