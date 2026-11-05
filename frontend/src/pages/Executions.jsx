import {
  useEffect,
  useState
} from "react";

import {
  Activity,
  CheckCircle2,
  Clock3,
  RefreshCw,
  XCircle
} from "lucide-react";

export default function Executions() {

  const [items, setItems] = useState([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function load() {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        "http://localhost:8000/api/executions"
      );

      if (!response.ok) {
        throw new Error("API unavailable");
      }

      setItems(await response.json());

    } catch {

      setError(
        "Cannot reach API. Start the backend stack to load real execution history."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {
    load();
  }, []);

  return (

    <div className="animate-fade-up space-y-6">

      <div className="flex items-end justify-between">

        <div>

          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[.22em] text-emerald-300">

            <Activity size={13}/>

            Observability

          </div>

          <h1 className="text-2xl font-semibold">
            Execution logs
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Inspect workflow runs and their current status.
          </p>

        </div>

        <button
          onClick={load}
          className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800"
        >
          <RefreshCw
            size={13}
            className={`mr-1 inline ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>

      </div>

      <div className="glass rounded-2xl p-5">

        {error && (

          <div className="mb-4 rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-200">
            {error}
          </div>

        )}

        {!items.length && !error && (

          <div className="py-16 text-center text-sm text-slate-500">
            No executions yet. Run a workflow from the builder.
          </div>

        )}

        {items.length > 0 && (

          <div className="divide-y divide-slate-800">

            {items.map(item => (

              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 py-4"
              >

                <div>

                  <div className="text-sm font-medium">
                    Execution #{item.id}
                  </div>

                  <div className="mt-1 text-[10px] text-slate-500">
                    Workflow #{item.workflow_id} ·
                    {" "}
                    {new Date(item.created_at).toLocaleString()}
                  </div>

                </div>

                <div className="flex items-center gap-2 text-xs">

                  {item.status === "completed" ? (

                    <CheckCircle2
                      size={15}
                      className="text-emerald-400"
                    />

                  ) : item.status === "failed" ? (

                    <XCircle
                      size={15}
                      className="text-rose-400"
                    />

                  ) : (

                    <Clock3
                      size={15}
                      className="text-amber-300"
                    />

                  )}

                  <span className="capitalize text-slate-300">
                    {item.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}