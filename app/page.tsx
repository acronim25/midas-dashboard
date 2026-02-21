import Link from "next/link";
import { 
  Server, Bot, MessageSquare, FileText, Mail, Brain, Code2, Activity
} from "lucide-react";

const modules = [
  { name: "OPS", description: "Infrastructure & Monitoring", href: "/ops", icon: Server, color: "text-cyan-400" },
  { name: "Agents", description: "Agent Orchestration", href: "/agents", icon: Bot, color: "text-emerald-400" },
  { name: "Chat", description: "Conversational Interface", href: "/chat", icon: MessageSquare, color: "text-blue-400" },
  { name: "Content", description: "Content Pipeline", href: "/content", icon: FileText, color: "text-purple-400" },
  { name: "Comms", description: "Communications Hub", href: "/comms", icon: Mail, color: "text-pink-400" },
  { name: "Knowledge", description: "Knowledge Base", href: "/knowledge", icon: Brain, color: "text-amber-400" },
  { name: "Code", description: "Development Environment", href: "/code", icon: Code2, color: "text-teal-400" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30">
            <Activity className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Midas Mission Control</h1>
            <p className="text-gray-400">Welcome back! Dashboard overview.</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
            <p className="text-sm text-gray-400">System Status</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xl font-bold text-emerald-400">Operational</span>
            </div>
          </div>
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
            <p className="text-sm text-gray-400">Active Agents</p>
            <p className="text-xl font-bold">4</p>
          </div>
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
            <p className="text-sm text-gray-400">Messages</p>
            <p className="text-xl font-bold text-cyan-400">5</p>
          </div>
          <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
            <p className="text-sm text-gray-400">Pending</p>
            <p className="text-xl font-bold text-amber-400">2</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Modules</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => (
            <Link key={module.name} href={module.href}>
              <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg bg-gray-800 ${module.color}`}>
                      <module.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{module.name}</h3>
                      <p className="text-sm text-gray-500">{module.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
