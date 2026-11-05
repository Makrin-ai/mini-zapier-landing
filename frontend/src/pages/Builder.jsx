import {
  useCallback,
  useMemo,
  useState
} from "react";

import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  MarkerType,
  addEdge,
  useEdgesState,
  useNodesState
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import {
  Play,
  Save,
  Plus,
  MousePointer2,
  Workflow,
  AlertCircle
} from "lucide-react";

import { nodeTypes } from "../components/nodes";

const initialNodes = [

  {
    id: "trigger-1",
    type: "trigger",
    position: { x: 80, y: 150 },
    data: {
      label: "New email received",
      detail: "email.received"
    }
  },

  {
    id: "condition-1",
    type: "condition",
    position: { x: 390, y: 150 },
    data: {
      label: "Subject contains",
      detail: '"urgent"'
    }
  },

  {
    id: "action-1",
    type: "action",
    position: { x: 720, y: 75 },
    data: {
      label: "Send Slack alert",
      detail: "slack.send_message"
    }
  },

  {
    id: "action-2",
    type: "action",
    position: { x: 720, y: 260 },
    data: {
      label: "Save to database",
      detail: "db.insert_record"
    }
  }

];

const initialEdges = [

  {
    id: "e1",
    source: "trigger-1",
    target: "condition-1",
    animated: true,
    style: {
      stroke: "#10B981",
      strokeWidth: 2
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#10B981"
    }
  },

  {
    id: "e2",
    source: "condition-1",
    target: "action-1",
    animated: true,
    style: {
      stroke: "#F59E0B",
      strokeWidth: 2
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#F59E0B"
    }
  },

  {
    id: "e3",
    source: "condition-1",
    target: "action-2",
    animated: true,
    style: {
      stroke: "#F59E0B",
      strokeWidth: 2
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#F59E0B"
    }
  }

];

export default function Builder() {

  const [nodes, setNodes, onNodesChange] =
    useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initialEdges);

  const [notice, setNotice] =
    useState("Canvas ready");

  const [busy, setBusy] =
    useState(false);

  const types = useMemo(
    () => nodeTypes,
    []
  );

  const onConnect = useCallback(
    (params) => {

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: {
              stroke: "#64748B",
              strokeWidth: 2
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#94A3B8"
            }
          },
          eds
        )
      );

    },
    [setEdges]
  );

  // SAVE WORKFLOW

  async function saveWorkflow() {

    setBusy(true);

    try {

      const response = await fetch(
        "http://localhost:8000/api/workflows",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: "My automation",
            graph: {
              nodes,
              edges
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error("API returned an error");
      }

      const result = await response.json();

      setNotice(`Saved · workflow ${result.id}`);

    } catch {

      setNotice(
        "API unavailable — start backend with docker compose up"
      );

    } finally {

      setBusy(false);

    }

  }

  // RUN WORKFLOW

  async function runWorkflow() {

    setBusy(true);

    try {

      const saveResponse = await fetch(
        "http://localhost:8000/api/workflows",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: "My automation",
            graph: {
              nodes,
              edges
            }
          })
        }
      );

      if (!saveResponse.ok) {
        throw new Error("Save failed");
      }

      const workflow = await saveResponse.json();

      const runResponse = await fetch(
        `http://localhost:8000/api/workflows/${workflow.id}/run`,
        {
          method: "POST"
        }
      );

      if (!runResponse.ok) {
        throw new Error("Run failed");
      }

      const run = await runResponse.json();

      setNotice(`Execution queued · ${run.id}`);

    } catch {

      setNotice(
        "Could not start execution — check that API and Redis are running"
      );

    } finally {

      setBusy(false);

    }

  }

  // ADD NODE

  function addNode(type) {

    const id =
      `${type}-${crypto.randomUUID().slice(0, 8)}`;

    const count =
      nodes.filter(n => n.type === type).length + 1;

    const defaults = {

      trigger: {
        label: `New trigger ${count}`,
        detail: "trigger.event"
      },

      condition: {
        label: `New condition ${count}`,
        detail: "field equals value"
      },

      action: {
        label: `New action ${count}`,
        detail: "action.execute"
      }

    };

    setNodes(ns => [

      ...ns,

      {
        id,
        type,
        position: {
          x: 180 + Math.random() * 280,
          y: 100 + Math.random() * 280
        },
        data: defaults[type]
      }

    ]);

  }

  return (

    <div className="animate-fade-up space-y-5">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

        <div>

          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[.22em] text-emerald-300">

            <Workflow size={13}/>

            Visual editor

          </div>

          <h1 className="text-2xl font-semibold">
            Workflow builder
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Design your automation as a directed acyclic graph.
          </p>

        </div>

        <div className="flex flex-wrap gap-2">

          <button
            onClick={() => addNode("trigger")}
            className="rounded-lg border border-emerald-400/30 px-3 py-2 text-xs text-emerald-300 hover:bg-emerald-400/10"
          >
            <Plus size={13} className="mr-1 inline"/>
            Trigger
          </button>

          <button
            onClick={() => addNode("condition")}
            className="rounded-lg border border-amber-400/30 px-3 py-2 text-xs text-amber-300 hover:bg-amber-400/10"
          >
            <Plus size={13} className="mr-1 inline"/>
            Condition
          </button>

          <button
            onClick={() => addNode("action")}
            className="rounded-lg border border-blue-400/30 px-3 py-2 text-xs text-blue-300 hover:bg-blue-400/10"
          >
            <Plus size={13} className="mr-1 inline"/>
            Action
          </button>

        </div>

      </div>

      {/* CANVAS */}

      <div className="glass overflow-hidden rounded-2xl">

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">

          <div>

            <div className="text-sm font-medium">
              Untitled workflow
            </div>

            <div className="mt-0.5 text-[10px] text-slate-500">
              Draft · {nodes.length} nodes · {edges.length} connections
            </div>

          </div>

          <div className="flex gap-2">

            <button
              disabled={busy}
              onClick={saveWorkflow}
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-50"
            >
              <Save size={13} className="mr-1 inline"/>
              Save
            </button>

            <button
              disabled={busy}
              onClick={runWorkflow}
              className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-50"
            >
              <Play size={13} className="mr-1 inline"/>
              Run workflow
            </button>

          </div>

        </div>

        <div className="h-[560px] bg-[#080E1B]/70">

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={types}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            proOptions={{ hideAttribution: true }}
            minZoom={0.25}
            maxZoom={1.7}
          >

            <Background
              variant={BackgroundVariant.Dots}
              gap={22}
              size={1}
              color="#263449"
            />

            <Controls/>

            <MiniMap
              nodeColor={(n) =>
                n.type === "trigger"
                  ? "#10B981"
                  : n.type === "condition"
                  ? "#F59E0B"
                  : "#3B82F6"
              }
              maskColor="rgba(8,14,27,.75)"
            />

          </ReactFlow>

        </div>

        <div className="flex items-center gap-2 border-t border-slate-800 px-4 py-3 text-[10px] text-slate-500">

          <MousePointer2 size={13}/>

          <span>
            Drag nodes · Connect handles · Scroll to zoom
          </span>

          <span className="ml-auto flex items-center gap-1 text-slate-400">

            <AlertCircle size={12}/>

            {notice}

          </span>

        </div>

      </div>

    </div>

  );

}