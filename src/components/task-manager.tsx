"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Users,
  Zap,
  Palette,
  FileText,
  Settings,
  DollarSign,
  BarChart3
} from "lucide-react"
import { Card, StatusBadge } from "@/components/ui"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  category: string
  reasoning: string
  nextAction: string
  priority: "high" | "medium" | "low"
  effort: "small" | "medium" | "large"
  status: "suggested" | "approved" | "rejected" | "in_progress"
}

const categories = [
  { id: "revenue", name: "Revenue", icon: DollarSign, color: "text-green-400" },
  { id: "product", name: "Product", icon: Zap, color: "text-blue-400" },
  { id: "community", name: "Community", icon: Users, color: "text-purple-400" },
  { id: "content", name: "Content", icon: FileText, color: "text-orange-400" },
  { id: "operations", name: "Operations", icon: Settings, color: "text-gray-400" },
  { id: "clients", name: "Clients", icon: BarChart3, color: "text-cyan-400" },
  { id: "trading", name: "Trading", icon: TrendingUp, color: "text-yellow-400" },
  { id: "brand", name: "Brand", icon: Palette, color: "text-pink-400" },
]

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Finalize dashboard MVP",
    category: "product",
    reasoning: "Core infrastructure ready, needs completion for daily use",
    nextAction: "Complete remaining views and API routes",
    priority: "high",
    effort: "medium",
    status: "in_progress",
  },
  {
    id: "2",
    title: "Set up Convex backend",
    category: "operations",
    reasoning: "Real-time data sync required for mission control",
    nextAction: "Configure schema and deploy",
    priority: "high",
    effort: "small",
    status: "suggested",
  },
  {
    id: "3",
    title: "Review trading strategy",
    category: "trading",
    reasoning: "Monthly review due, analyze performance",
    nextAction: "Pull data from Bybit, generate report",
    priority: "medium",
    effort: "small",
    status: "suggested",
  },
]

export function TaskManager() {
  const [tasks, setTasks] = useState(mockTasks)
  const [filter, setFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredTasks = tasks.filter((task) => {
    if (filter !== "all" && task.status !== filter) return false
    if (categoryFilter !== "all" && task.category !== categoryFilter) return false
    return true
  })

  const handleApprove = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: "approved" } : t))
  }

  const handleReject = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: "rejected" } : t))
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Status</span>
            <div className="flex gap-1">
              {["all", "suggested", "approved", "in_progress"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs capitalize transition-colors",
                    filter === f 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-white/[0.03] hover:bg-white/[0.06]"
                  )}
                >
                  {f.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Category</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs"
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Tasks by Category */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryTasks = filteredTasks.filter((t) => t.category === category.id)
          if (categoryTasks.length === 0) return null
          
          const Icon = category.icon
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <Icon className={cn("w-4 h-4", category.color)} />
                <h3 className="text-sm font-medium">{category.name}</h3>
                <span className="text-xs text-muted-foreground">({categoryTasks.length})</span>
              </div>
              
              <div className="grid gap-3">
                {categoryTasks.map((task) => (
                  <Card key={task.id} className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{task.title}</h4>
                          <span className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full uppercase",
                            task.priority === "high" && "bg-destructive/20 text-destructive",
                            task.priority === "medium" && "bg-yellow-500/20 text-yellow-500",
                            task.priority === "low" && "bg-muted text-muted-foreground"
                          )}>
                            {task.priority}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06]">
                            {task.effort} effort
                          </span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-1">{task.reasoning}</p>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Zap className="w-3 h-3" />
                            {task.nextAction}
                          </div>
                        </div>
                      </div>
                      
                      {task.status === "suggested" && (
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handleApprove(task.id)}
                            className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(task.id)}
                            className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
