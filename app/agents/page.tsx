export default function AgentsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Agents - Orchestration</h1>
        <div className="space-y-4">
          {[
            { name: "Research Agent Alpha", status: "Active", type: "research", success: "94%" },
            { name: "Content Generator", status: "Active", type: "content", success: "89%" },
            { name: "Discord Monitor", status: "Paused", type: "monitoring", success: "98%" },
          ].map((agent) => (
            <div key={agent.name} className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{agent.name}</h3>
                <p className="text-sm text-gray-400">{agent.type} • Success rate: {agent.success}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                agent.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
              }`}>
                {agent.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
