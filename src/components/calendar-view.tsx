"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Card } from "@/components/ui"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: "work" | "personal" | "meeting" | "focus"
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Daily Standup",
    start: new Date(2026, 1, 21, 10, 0),
    end: new Date(2026, 1, 21, 10, 30),
    type: "meeting",
  },
  {
    id: "2",
    title: "Focus Block: Dashboard",
    start: new Date(2026, 1, 21, 14, 0),
    end: new Date(2026, 1, 21, 17, 0),
    type: "focus",
  },
  {
    id: "3",
    title: "Trading Review",
    start: new Date(2026, 1, 21, 18, 0),
    end: new Date(2026, 1, 21, 19, 0),
    type: "work",
  },
]

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const hours = Array.from({ length: 24 }, (_, i) => i)

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"week" | "day">("week")

  const typeColors = {
    work: "bg-blue-500/20 border-blue-500/30",
    personal: "bg-purple-500/20 border-purple-500/30",
    meeting: "bg-orange-500/20 border-orange-500/30",
    focus: "bg-green-500/20 border-green-500/30",
  }

  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    return day
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const newDate = new Date(currentDate)
                newDate.setDate(newDate.getDate() - 7)
                setCurrentDate(newDate)
              }}
              className="p-1.5 rounded-lg hover:bg-white/[0.03]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1.5 text-xs rounded-lg bg-white/[0.03] hover:bg-white/[0.06]"
            >
              Today
            </button>
            <button
              onClick={() => {
                const newDate = new Date(currentDate)
                newDate.setDate(newDate.getDate() + 7)
                setCurrentDate(newDate)
              }}
              className="p-1.5 rounded-lg hover:bg-white/[0.03]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("week")}
            className={cn(
              "px-3 py-1.5 text-xs rounded-lg transition-colors",
              view === "week" ? "bg-primary text-primary-foreground" : "bg-white/[0.03]"
            )}
          >
            Week
          </button>
          <button
            onClick={() => setView("day")}
            className={cn(
              "px-3 py-1.5 text-xs rounded-lg transition-colors",
              view === "day" ? "bg-primary text-primary-foreground" : "bg-white/[0.03]"
            )}
          >
            Day
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-8 border-b border-white/[0.06]">
          <div className="p-3 border-r border-white/[0.06]" />
          {weekDays.map((day, i) => (
            <div
              key={i}
              className={cn(
                "p-3 text-center border-r border-white/[0.06] last:border-r-0",
                day.toDateString() === new Date().toDateString() && "bg-primary/[0.06]"
              )}
            >
              <div className="text-xs text-muted-foreground">{days[i]}</div>
              <div className={cn(
                "text-lg font-medium mt-1",
                day.toDateString() === new Date().toDateString() && "text-primary"
              )}>
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8">
          {hours.map((hour) => (
            <div key={hour} className="contents">
              <div className="p-2 text-xs text-muted-foreground border-r border-white/[0.06] border-b border-white/[0.06]">
                {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
              </div>
              {weekDays.map((_, dayIndex) => (
                <div
                  key={`${hour}-${dayIndex}`}
                  className="min-h-[60px] border-r border-white/[0.06] border-b border-white/[0.06] last:border-r-0 relative"
                >
                  {mockEvents
                    .filter((e) => {
                      const eventDay = e.start.getDay()
                      const eventHour = e.start.getHours()
                      return eventDay === dayIndex && eventHour === hour
                    })
                    .map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn(
                          "absolute inset-1 rounded-lg p-2 text-xs border cursor-pointer hover:opacity-90",
                          typeColors[event.type]
                        )}
                        style={{
                          height: `${((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)) * 60}px`,
                        }}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="flex items-center gap-1 text-[10px] opacity-70 mt-1">
                          <Clock className="w-3 h-3" />
                          {event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </motion.div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/30" />
          <span className="text-muted-foreground">Work</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-purple-500/20 border border-purple-500/30" />
          <span className="text-muted-foreground">Personal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-orange-500/20 border border-orange-500/30" />
          <span className="text-muted-foreground">Meeting</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/30" />
          <span className="text-muted-foreground">Focus</span>
        </div>
      </div>
    </div>
  )
}
