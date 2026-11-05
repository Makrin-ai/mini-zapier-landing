import {
  NavLink,
  Route,
  Routes,
  useLocation
} from "react-router-dom";

import {
  Activity,
  Blocks,
  BookOpen,
  ChevronDown,
  CircleHelp,
  Command,
  LayoutDashboard,
  Plug,
  Settings,
  Workflow
} from "lucide-react";

import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Executions from "./pages/Executions";

const nav = [
  {
    to: "/",
    label: "Overview",
    icon: LayoutDashboard,
    end: true
  },
  {
    to: "/builder",
    label: "Workflow builder",
    icon: Workflow
  },
  {
    to: "/executions",
    label: "Execution logs",
    icon: Activity
  }
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 z-20 w-64 flex-col border-r border-slate-800/80 bg-[#090F1D]/85 backdrop-blur-xl">

      <div className="flex h-20 items-center gap-3 border-b border-slate-800/80 px-6">

        <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/30">
          <Command size={19}/>
        </div>

        <div>
          <div className="font-mono text-sm font-bold tracking-widest">
            MNTN·FLOW
          </div>
          <div className="text-[10px] tracking-[.2em] text-slate-500">
            AUTOMATION CLOUD
          </div>
        </div>

      </div>

      <div className="px-4 pt-7">

        <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.22em] text-slate-600">
          Workspace
        </div>

        <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 p-3">

          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500"/>

            <div>
              <div className="text-xs font-medium">
                Personal space
              </div>

              <div className="text-[10px] text-slate-500">
                Free plan
              </div>
            </div>
          </div>

          <ChevronDown size={14} className="text-slate-500"/>

        </div>

        <nav className="space-y-1">

          {nav.map(({ to, label, icon: Icon, end }) => (

            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/15"
                    : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                }`
              }
            >
              <Icon size={17}/>
              {label}
            </NavLink>

          ))}

        </nav>

        <div className="mb-3 mt-9 px-3 text-[10px] font-semibold uppercase tracking-[.22em] text-slate-600">
          Build
        </div>

        <div className="space-y-1 text-sm text-slate-500">

          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
            <Plug size={17}/>
            Integrations
            <span className="ml-auto text-[9px]">SOON</span>
          </div>

          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
            <Blocks size={17}/>
            Templates
            <span className="ml-auto text-[9px]">SOON</span>
          </div>

        </div>

      </div>

      <div className="mt-auto space-y-1 border-t border-slate-800/80 p-4 text-sm text-slate-400">

        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <BookOpen size={16}/>
          Documentation
        </div>

        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <CircleHelp size={16}/>
          Help center
        </div>

        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <Settings size={16}/>
          Settings
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-xl bg-slate-900/80 p-3">

          <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-700 text-xs">
            M
          </div>

          <div>
            <div className="text-xs text-slate-200">
              Workspace owner
            </div>

            <div className="text-[10px] text-slate-500">
              Local demo account
            </div>
          </div>

        </div>

      </div>

    </aside>
  );
}

function Topbar() {

  const location = useLocation();

  const title =
    location.pathname === "/builder"
      ? "Workflow builder"
      : location.pathname === "/executions"
      ? "Execution logs"
      : "Overview";

  return (

    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-800/70 bg-[#080E1B]/75 px-5 backdrop-blur-xl lg:px-9">

      <div className="text-sm text-slate-400">
        <span className="hidden sm:inline">
          Workspace /
        </span>

        <span className="text-slate-100">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-3">

        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-[10px] text-emerald-300 sm:flex">

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_#10b981]"/>

          API connected (demo)

        </div>

        <button className="rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-300 hover:border-slate-600">
          M
        </button>

      </div>

    </header>
  );
}

export default function App() {

  return (

    <>

      <div className="ambient-bg">

        <div className="ambient-grid"/>

        <div className="orb orb-one"/>

        <div className="orb orb-two"/>

        <div className="orb orb-three"/>

      </div>

      <Sidebar/>

      <div className="min-h-screen lg:pl-64">

        <Topbar/>

        <main className="mx-auto max-w-[1600px] p-5 lg:p-9">

          <Routes>

            <Route
              path="/"
              element={<Dashboard/>}
            />

            <Route
              path="/builder"
              element={<Builder/>}
            />

            <Route
              path="/executions"
              element={<Executions/>}
            />

          </Routes>

        </main>

      </div>

    </>

  );
}