import {
  Handle,
  Position
} from "@xyflow/react";

const base =
  "min-w-[190px] rounded-xl border bg-[#111A2E]/95 px-4 py-3 shadow-xl backdrop-blur-xl";

function NodeHeader({ color, label }) {

  return (

    <div className="flex items-center gap-2">

      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: color,
          boxShadow: `0 0 10px ${color}`
        }}
      />

      <span
        className="text-[9px] font-bold uppercase tracking-[.2em]"
        style={{ color }}
      >
        {label}
      </span>

    </div>

  );
}

export function TriggerNode({ data }) {

  return (

    <div className={`${base} border-emerald-400/50 shadow-[0_8px_30px_rgba(16,185,129,.08)]`}>

      <NodeHeader
        color="#10B981"
        label="Trigger"
      />

      <div className="mt-2 text-sm font-semibold text-slate-100">
        {data.label}
      </div>

      <div className="mt-1 font-mono text-[10px] text-slate-500">
        {data.detail}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-[#111A2E] !bg-emerald-400"
      />

    </div>

  );
}

export function ConditionNode({ data }) {

  return (

    <div className={`${base} border-amber-400/50 shadow-[0_8px_30px_rgba(245,158,11,.07)]`}>

      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-[#111A2E] !bg-amber-400"
      />

      <NodeHeader
        color="#F59E0B"
        label="Condition"
      />

      <div className="mt-2 text-sm font-semibold text-slate-100">
        {data.label}
      </div>

      <div className="mt-1 font-mono text-[10px] text-slate-500">
        {data.detail}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-[#111A2E] !bg-amber-400"
      />

    </div>

  );

}

export function ActionNode({ data }) {

  return (

    <div className={`${base} border-blue-400/50 shadow-[0_8px_30px_rgba(59,130,246,.07)]`}>

      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-[#111A2E] !bg-blue-400"
      />

      <NodeHeader
        color="#60A5FA"
        label="Action"
      />

      <div className="mt-2 text-sm font-semibold text-slate-100">
        {data.label}
      </div>

      <div className="mt-1 font-mono text-[10px] text-slate-500">
        {data.detail}
      </div>

    </div>

  );

}

export const nodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode
};