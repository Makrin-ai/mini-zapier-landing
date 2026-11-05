import ReactFlow, {
    Background,
    BackgroundVariant,
    MarkerType,
    useNodesState,
    useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "./components/nodes";

const initialNodes = [
    { id: "n1", type: "trigger",   position: { x: 0,   y: 90 },  data: { label: "New Email", detail: "gmail.inbox" } },
    { id: "n2", type: "condition", position: { x: 260, y: 90 },  data: { label: "Subject contains", detail: '"urgent"' } },
    { id: "n3", type: "action",    position: { x: 520, y: 30 },  data: { label: "Slack → #alerts", detail: "post_message" } },
    { id: "n4", type: "action",    position: { x: 520, y: 170 }, data: { label: "Log to DB", detail: "insert.record" } },
];

const edgeStyle = {
    stroke: "#334155",
    strokeWidth: 2,
    strokeDasharray: "6 6",
    animation: "dash 1s linear infinite",
};

const initialEdges = [
    { id: "e1", source: "n1", target: "n2", style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: "#10B981" } },
    { id: "e2", source: "n2", target: "n3", style: { ...edgeStyle, stroke: "#F59E0B" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#F59E0B" } },
    { id: "e3", source: "n2", target: "n4", style: { ...edgeStyle, stroke: "#F59E0B" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#F59E0B" } },
];

export default function FlowDemo({ height = 420 }) {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return (
    <div
        style={{ height }}
        className="relative rounded-2xl border border-line bg-inkSoft/40 overflow-hidden"
    >
        <style>{`@keyframes dash { to { stroke-dashoffset: -12; } }`}</style>
        <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable
        nodesConnectable={false}
        panOnScroll
        zoomOnScroll={false}
        >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="#1E293B" />
        </ReactFlow>
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_40px_#0B1220]" />
    </div>
    );
}