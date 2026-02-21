export default function OpsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">OPS - Infrastructure & Monitoring</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
            <h3 className="font-semibold text-cyan-400 mb-2">CPU Usage</h3>
            <p className="text-2xl font-bold">42.5%</p>
          </div>
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
            <h3 className="font-semibold text-emerald-400 mb-2">Memory</h3>
            <p className="text-2xl font-bold">68.2%</p>
          </div>
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
            <h3 className="font-semibold text-amber-400 mb-2">Latency</h3>
            <p className="text-2xl font-bold">124ms</p>
          </div>
        </div>
      </div>
    </div>
  );
}
