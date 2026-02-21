"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Activity, CheckSquare, Calendar } from "lucide-react"
import { TaskManager } from "@/components/task-manager"
import { CalendarView } from "@/components/calendar-view"
import { Card } from "@/components/ui"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "operations", label: "Operations", icon: Activity },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "calendar", label: "Calendar", icon: Calendar },
]

function OperationsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="System Status">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">OpenClaw Gateway</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">Healthy</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Discord Bot</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">File System</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">Accessible</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Active Processes">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Heartbeat</span>
              <span className="text-xs text-muted-foreground">Every 30m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">File Watcher</span>
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API Server</span>
              <span className="text-xs text-muted-foreground">Port 3000</span>
            </div>
          </div>
        </Card>

        <Card title="Observations">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Dashboard foundation built. Core structure functional.
            </p>
            <p className="text-xs text-muted-foreground">
              API routes responding. System stable.
            </p>
          </div>
        </Card>
      </div>

      <Card title="System Priorities">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">1</div>
            <span className="text-sm">Complete dashboard MVP</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">2</div>
            <span className="text-sm">Set up Convex backend</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">3</div>
            <span className="text-sm">Trading strategy review</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function OpsPage() {
  const [activeTab, setActiveTab] = useState("operations")

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Operations Center</h1>
      
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 p-1 bg-white/[0.03] rounded-xl w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors relative",
                activeTab === tab.id 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/[0.06] rounded-lg"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "operations" && <OperationsView />}
        {activeTab === "tasks" && <TaskManager />}
        {activeTab === "calendar" && <CalendarView />}
      </motion.div>
    </div>
  )
}
