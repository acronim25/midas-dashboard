export default function ContentPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Content - Pipeline</h1>
        <div className="space-y-4">
          {[
            { title: "BTC Analysis Thread", status: "Published", platform: "Twitter" },
            { title: "Trading Psychology Post", status: "Approved", platform: "LinkedIn" },
            { title: "Weekly Market Recap", status: "Draft", platform: "Blog" },
          ].map((item) => (
            <div key={item.title} className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.platform}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                item.status === "Published" ? "bg-emerald-500/20 text-emerald-400" :
                item.status === "Approved" ? "bg-cyan-500/20 text-cyan-400" :
                "bg-gray-500/20 text-gray-400"
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
