export default function StatCard({
    label,
    value,
    change,
    icon: Icon,
    tone = "emerald"
}) {
    const tones = {

    emerald: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",

    blue: "bg-blue-400/10 text-blue-300 ring-blue-400/20",

    amber: "bg-amber-400/10 text-amber-300 ring-amber-400/20",

    violet: "bg-violet-400/10 text-violet-300 ring-violet-400/20"
};
return (

    <div className="glass rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-slate-600/80">
        <div className="flex items-center justify-between">

        <span className="text-xs text-slate-400">
            {label}
        </span>

        <div className={`rounded-xl p-2 ring-1 ${tones[tone]}`}>
            <Icon size={17}/>
        </div>
        
        </div>
        
        <div className="mt-4 flex items-end justify-between">

        <div className="text-3xl font-semibold tracking-tight">
            {value}
        </div>

        <div className="text-[10px] text-emerald-300">
            {change}
        </div>
        
        </div>

    </div>
    );
}