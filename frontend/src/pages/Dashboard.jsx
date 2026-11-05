import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  GitBranch,
  Plus,
  Workflow,
  Zap
} from "lucide-react";

import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";

const runs = [
  ["Email → Slack alert", "Completed", "2 min ago", "emerald"],
  ["New lead enrichment", "Running", "5 min ago", "amber"],
  ["Daily report", "Completed", "1 hour ago", "emerald"],
  ["CRM sync", "Failed", "3 hours ago", "rose"]
];

export default function Dashboard() {

  return (

    <div className="animate-fade-up space-y-8">

      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

        <div>

          <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-300">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>

            Automation overview

          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Good evening<span className="text-emerald-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Here's what's happening in your workspace today.
          </p>

        </div>

        <Link
          to="/builder"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(16,185,129,.18)] transition hover:bg-emerald-300"
        >
          <Plus size={17}/>
          Create workflow
        </Link>

      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          label="Total workflows"
          value="12"
          change="+2 this week"
          icon={Workflow}
        />

        <StatCard
          label="Successful runs"
          value="1,284"
          change="+12.8%"
          icon={CheckCircle2}
          tone="blue"
        />

        <StatCard
          label="Time saved"
          value="36.5h"
          change="This month"
          icon={Clock3}
          tone="violet"
        />

        <StatCard
          label="Active executions"
          value="3"
          change="Live now"
          icon={Activity}
          tone="amber"
        />

      </section>

      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">

        <div className="glass rounded-2xl p-5 md:p-6">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold">
                Recent executions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest activity across your workflows
              </p>
            </div>

            <Link
              to="/executions"
              className="text-xs text-emerald-300 hover:text-emerald-200"
            >
              View all <ArrowUpRight className="inline" size={13}/>
            </Link>

          </div>

          <div className="mt-5 divide-y divide-slate-800/80">

            {runs.map(([name, status, time, tone]) => (

              <div
                key={name}
                className="flex items-center justify-between gap-3 py-4"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-800/80 text-slate-400">
                    <Zap size={16}/>
                  </div>

                  <div className="min-w-0">

                    <div className="truncate text-sm font-medium">
                      {name}
                    </div>

                    <div className="mt-1 text-[10px] text-slate-500">
                      {time}
                    </div>

                  </div>

                </div>

                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] ${
                  tone === "emerald"
                    ? "bg-emerald-400/10 text-emerald-300"
                    : tone === "amber"
                    ? "bg-amber-400/10 text-amber-300"
                    : "bg-rose-400/10 text-rose-300"
                }`}>
                  {status}
                </span>

              </div>

            ))}

          </div>

        </div>

        <div className="glass relative overflow-hidden rounded-2xl p-6">

          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl"/>

          <div className="relative">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
              <GitBranch size={19}/>
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              Build your first automation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Connect a trigger, add conditions, and let MNTN·FLOW handle the repetitive work.
            </p>

            <Link
              to="/builder"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-emerald-200"
            >
              Open workflow builder
              <ArrowUpRight size={15}/>
            </Link>

          </div>

        </div>

      </section>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-600">
        <span>MNTN·FLOW / WORKSPACE OVERVIEW</span>
        <span>Demo metrics · Not connected to production data</span>
      </div>

    </div>

  );

}