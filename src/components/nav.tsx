"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Home, 
  Activity, 
  Bot, 
  MessageSquare, 
  FileText, 
  Users, 
  BookOpen, 
  Code2,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/ops", label: "Ops", icon: Activity },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/content", label: "Content", icon: FileText },
  { href: "/comms", label: "Comms", icon: Users },
  { href: "/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/code", label: "Code", icon: Code2 },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 glass border-b-0 border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <span className="hidden md:inline font-semibold text-sm">Midas Control</span>
        </div>
        
        <div className="flex items-center flex-1 justify-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg transition-colors",
                  "text-[clamp(0.45rem,0.75vw,0.6875rem)]",
                  isActive 
                    ? "text-primary bg-primary/[0.06]" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )
          })}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent/10">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] text-accent font-medium">LIVE</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
