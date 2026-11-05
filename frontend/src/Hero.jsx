import FlowDemo from "./FlowDemo";

export default function Hero() {
    return (
    <section className="relative min-h-screen flex flex-col">
        <nav className="flex items-center justify-between px-8 py-6 text-sm">
        <div className="font-mono text-lg tracking-widest font-semibold">MNTN·FLOW</div>
        <div className="hidden md:flex gap-8 text-muted">
            <a href="#docs" className="hover:text-white">Docs</a>
            <a href="#api" className="hover:text-white">API</a>
            <a href="#blog" className="hover:text-white">Blog</a>
        </div>
        <a href="#account" className="text-muted hover:text-white">◎ Account</a>
        </nav>

    <div className="flex-1 grid place-items-center px-6 pb-16">
        <div className="max-w-6xl w-full">
            <div className="text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-accent">
            — Visual DAG Builder —
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
            Build Workflows.<br />
            <span className="text-muted">Automate Everything.</span>
            </h1>
            <p className="mt-6 text-muted max-w-xl mx-auto">
            Trigger → Condition → Action. Drag nodes onto the canvas,
            and let the backend execute your DAG with idempotency,
            retries and real-time logs.
            </p>
        </div>

        <div className="mt-14">
            <FlowDemo height={440} />
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono text-muted">
            <span>React Flow</span>
            <span className="text-line">|</span>
            <span>FastAPI</span>
            <span className="text-line">|</span>
            <span>Celery + Redis</span>
            <span className="text-line">|</span>
            <span>Postgres</span>
        </div>
        </div>
    </div>

    <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-[10px] uppercase tracking-widest text-muted rotate-180 [writing-mode:vertical-rl]">
        <span>Scroll to explore</span>
        <span className="h-10 w-px bg-line" />
    </div>
    </section>
    );
}