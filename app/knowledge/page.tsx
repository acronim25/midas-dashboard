export default function KnowledgePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Knowledge - Knowledge Base</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
            <p className="text-sm text-gray-400">Documents</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
            <p className="text-sm text-gray-400">Total Chunks</p>
            <p className="text-2xl font-bold text-amber-400">479</p>
          </div>
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
            <p className="text-sm text-gray-400">Graph Nodes</p>
            <p className="text-2xl font-bold text-cyan-400">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
