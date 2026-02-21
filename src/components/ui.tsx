"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function Card({ children, className, title, icon, action }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "glass rounded-xl overflow-hidden",
        className
      )}
    >
      {(title || icon || action) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            {icon && <div className="text-muted-foreground">{icon}</div>}
            {title && <h3 className="text-sm font-medium">{title}</h3>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </motion.div>
  )
}

interface StatusBadgeProps {
  status: "up" | "down" | "warning" | "neutral"
  label?: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const colors = {
    up: "bg-accent",
    down: "bg-destructive",
    warning: "bg-yellow-500",
    neutral: "bg-muted",
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("w-2 h-2 rounded-full", colors[status])} />
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  )
}

interface StatValueProps {
  value: string | number
  label: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

export function StatValue({ value, label, trend, trendValue }: StatValueProps) {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        {trend && trendValue && (
          <span className={cn(
            "text-xs",
            trend === "up" && "text-accent",
            trend === "down" && "text-destructive",
            trend === "neutral" && "text-muted-foreground"
          )}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trend === "neutral" && "→"} {trendValue}
          </span>
        )}
      </div>
    </div>
  )
}
