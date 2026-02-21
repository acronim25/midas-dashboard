"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Mic, Phone, Video, MoreVertical, Hash } from "lucide-react"
import { Card } from "@/components/ui"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  channel?: string
}

interface Session {
  id: string
  name: string
  lastMessage: string
  timestamp: Date
  unread: number
}

const mockSessions: Session[] = [
  { id: "1", name: "Alex (Main)", lastMessage: "Continuam cu dashboard-ul", timestamp: new Date(), unread: 0 },
  { id: "2", name: "Diana", lastMessage: "Salut Midas!", timestamp: new Date(Date.now() - 3600000), unread: 0 },
  { id: "3", name: "Trading Group", lastMessage: "BTC looking bullish", timestamp: new Date(Date.now() - 7200000), unread: 3 },
]

const mockMessages: Message[] = [
  { id: "1", role: "user", content: "Continuam cu dashboard-ul", timestamp: new Date(Date.now() - 600000) },
  { id: "2", role: "assistant", content: "OK, continuăm. Să finisăm structura și adăugăm funcționalitate.", timestamp: new Date(Date.now() - 580000) },
  { id: "3", role: "user", content: "1", timestamp: new Date(Date.now() - 120000) },
  { id: "4", role: "assistant", content: "Perfect. Spawning build agent now...", timestamp: new Date(Date.now() - 100000) },
]

export function ChatCenter() {
  const [activeSession, setActiveSession] = useState("1")
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    
    setMessages([...messages, newMessage])
    setInput("")
    
    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Received. Processing...",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, response])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-[calc(100vh-140px)] gap-4">
      {/* Session List */}
      <Card className="w-64 flex-shrink-0">
        <div className="p-3 border-b border-white/[0.06]">
          <h3 className="text-sm font-medium">Sessions</h3>
        </div>
        <div className="overflow-auto">
          {mockSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveSession(session.id)}
              className={cn(
                "w-full text-left p-3 border-b border-white/[0.06] transition-colors",
                activeSession === session.id 
                  ? "bg-primary/[0.06]" 
                  : "hover:bg-white/[0.03]"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate">{session.name}</span>
                {session.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-[10px] flex items-center justify-center">
                    {session.unread}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate mt-1">{session.lastMessage}</p>
              <span className="text-[10px] text-muted-foreground">
                {session.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium">A</span>
              </div>
              <div>
                <div className="text-sm font-medium">Alex (Main)</div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/[0.03]">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/[0.03]">
                <Video className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-white/[0.03]">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => {
                const isUser = message.role === "user"
                const showDate = index === 0 || 
                  messages[index - 1].timestamp.getDate() !== message.timestamp.getDate()
                
                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="flex justify-center my-4">
                        <span className="text-xs text-muted-foreground bg-white/[0.03] px-3 py-1 rounded-full">
                          {message.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex",
                        isUser ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[70%] rounded-2xl px-4 py-2.5",
                          isUser 
                            ? "bg-primary text-primary-foreground rounded-br-md" 
                            : "bg-white/[0.06] rounded-bl-md"
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className={cn(
                          "text-[10px] mt-1 block",
                          isUser ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={cn(
                  "p-2.5 rounded-xl transition-colors",
                  isRecording ? "bg-destructive text-destructive-foreground" : "hover:bg-white/[0.03]"
                )}
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
              />
              
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
