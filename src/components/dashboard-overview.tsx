"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Server, 
  Bot, 
  Clock, 
  TrendingUp, 
  FileText, 
  Activity,
  RefreshCw
} from "lucide-react"
import { Card, StatusBadge, StatValue } from "@/components/ui"

interface SystemStatus {
  agents: { total: number; healthy: number; unhealthy: number }
  crons: { total: number; healthy: number }
  revenue: { current: number; monthlyBurn: number }
  content: { draft: number; review: number; approved: number; published: number }
  uptime: string
  lastRefresh: Date
}

export function DashboardOverview() {
  const [status, setStatus] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/system-state")
      const data = await res.json()
      setStatus(data)
    } catch (err) {
      console.error("Failed to fetch status:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 15000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass rounded-xl h-32 animate-pulse" />
        ))}
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Mission Control</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Monitor and control your autonomous AI agents</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent">AUTO 15S</span>
          </div>
          <button
            onClick={fetchStatus}
            className="p-2 rounded-lg hover:bg-white/[0.03] transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* System Health */}
        <Card
          title="System Health"
          icon={<Server className="w-4 h-4" />}
          action={<StatusBadge status="up" />}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
              <span className="text-sm text-muted-foreground">OpenClaw Gateway</span>
              <StatusBadge status="up" label="UP" />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
              <span className="text-sm text-muted-foreground">Discord Bot</span>
              <StatusBadge status="up" label="UP" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Convex Backend</span>
              <StatusBadge status="up" label="UP" />
            </div>
          </div>
        </Card>

        {/* Agent Status */}
        <Card
          title="Agent Status"
          icon={<Bot className="w-4 h-4" />}
          action={<span className="text-xs text-muted-foreground">{status?.agents.total || 0} total</span>}
        >
          <div className="grid grid-cols-3 gap-4">
            <StatValue 
              value={status?.agents.healthy || 0} 
              label="Healthy" 
              trend="up"
              trendValue="100%"
            />
            <StatValue 
              value={status?.agents.unhealthy || 0} 
              label="Unhealthy" 
            />
            <StatValue 
              value={status?.agents.total || 0} 
              label="Total"
            />
          </div>
        </Card>

        {/* Cron Health */}
        <Card
          title="Cron Jobs"
          icon={<Clock className="w-4 h-4" />}
          action={<StatusBadge status="up" />}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Daily Report</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">10:00</span>
                <StatusBadge status="up" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Heartbeat</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">30min</span>
                <StatusBadge status="up" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Weekly Review</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Sun 20:00</span>
                <StatusBadge status="up" />
              </div>
            </div>
          </div>
        </Card>

        {/* Revenue */}
        <Card
          title="Revenue Tracker"
          icon={<TrendingUp className="w-4 h-4" />}
        >
          <div className="space-y-4">
            <StatValue 
              value={`$${status?.revenue.current.toLocaleString() || "0"}`} 
              label="Current"
              trend="up"
              trendValue="12%"
            />
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <span className="text-sm text-muted-foreground">Monthly Burn</span>
              <span className="text-sm">${status?.revenue.monthlyBurn.toLocaleString() || "0"}</span>
            </div>
          </div>
        </Card>

        {/* Content Pipeline */}
        <Card
          title="Content Pipeline"
          icon={<FileText className="w-4 h-4" />}
        >
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Draft", value: status?.content.draft || 0, color: "text-muted-foreground" },
              { label: "Review", value: status?.content.review || 0, color: "text-yellow-500" },
              { label: "Approved", value: status?.content.approved || 0, color: "text-accent" },
              { label: "Published", value: status?.content.published || 0, color: "text-primary" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className={`text-xl font-semibold ${item.color}`}>{item.value}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <Card
          title="Quick Stats"
          icon={<Activity className="w-4 h-4" />}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="text-sm font-medium">{status?.uptime || "0d 0h"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Sessions</span>
              <span className="text-sm font-medium">1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Refresh</span>
              <span className="text-xs text-muted-foreground">
                {status?.lastRefresh.toLocaleTimeString() || "--:--"}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}
