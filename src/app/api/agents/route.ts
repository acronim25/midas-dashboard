import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { homedir } from "os"

const WORKSPACE_PATH = process.env.OPENCLAW_WORKSPACE || path.join(homedir(), ".openclaw", "workspace")

export async function GET() {
  try {
    // Read agent files from workspace
    const agents: any[] = []
    
    // Get main agent
    try {
      const identityPath = path.join(WORKSPACE_PATH, "IDENTITY.md")
      const identity = await fs.readFile(identityPath, "utf-8")
      
      agents.push({
        id: "midas",
        name: "Midas",
        role: "Primary Agent",
        model: "kimi-coding/k2p5",
        level: "L4",
        status: "healthy",
        description: identity.slice(0, 200) + "...",
      })
    } catch {
      agents.push({
        id: "midas",
        name: "Midas",
        role: "Primary Agent",
        model: "kimi-coding/k2p5",
        level: "L4",
        status: "healthy",
        description: "AI assistant for Alex and Diana",
      })
    }

    return NextResponse.json({ agents })
  } catch (error) {
    console.error("Agents error:", error)
    return NextResponse.json(
      { error: "Failed to read agents" },
      { status: 500 }
    )
  }
}
