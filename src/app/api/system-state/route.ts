import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { homedir } from "os"

const WORKSPACE_PATH = process.env.OPENCLAW_WORKSPACE || path.join(homedir(), ".openclaw", "workspace")

export async function GET() {
  try {
    // Read agents registry
    const agentsPath = path.join(WORKSPACE_PATH, "agents", "registry.json")
    let agents = { total: 1, healthy: 1, unhealthy: 0 }
    
    try {
      const agentsData = await fs.readFile(agentsPath, "utf-8")
      agents = JSON.parse(agentsData)
    } catch {
      // Default if file doesn't exist
    }

    // Read crons state
    const cronsPath = path.join(WORKSPACE_PATH, "state", "crons.json")
    let crons = { total: 3, healthy: 3 }
    
    try {
      const cronsData = await fs.readFile(cronsPath, "utf-8")
      crons = JSON.parse(cronsData)
    } catch {
      // Default values
    }

    // Read revenue
    const revenuePath = path.join(WORKSPACE_PATH, "state", "revenue.json")
    let revenue = { current: 0, monthlyBurn: 0 }
    
    try {
      const revenueData = await fs.readFile(revenuePath, "utf-8")
      revenue = JSON.parse(revenueData)
    } catch {
      // Default values
    }

    // Read content pipeline
    const contentPath = path.join(WORKSPACE_PATH, "content", "queue.md")
    let content = { draft: 0, review: 0, approved: 0, published: 0 }
    
    try {
      const contentData = await fs.readFile(contentPath, "utf-8")
      // Simple parsing of markdown status markers
      content.draft = (contentData.match(/\[draft\]/gi) || []).length
      content.review = (contentData.match(/\[review\]/gi) || []).length
      content.approved = (contentData.match(/\[approved\]/gi) || []).length
      content.published = (contentData.match(/\[published\]/gi) || []).length
    } catch {
      // Default values
    }

    return NextResponse.json({
      agents,
      crons,
      revenue,
      content,
      uptime: "1d 4h",
      lastRefresh: new Date(),
    })
  } catch (error) {
    console.error("System state error:", error)
    return NextResponse.json(
      { error: "Failed to read system state" },
      { status: 500 }
    )
  }
}
