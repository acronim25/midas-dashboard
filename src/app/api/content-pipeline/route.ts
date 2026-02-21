import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { homedir } from "os"

const WORKSPACE_PATH = process.env.OPENCLAW_WORKSPACE || path.join(homedir(), ".openclaw", "workspace")

export async function GET() {
  try {
    // Read content queue
    const contentPath = path.join(WORKSPACE_PATH, "content", "queue.md")
    const items: any[] = []
    
    try {
      const contentData = await fs.readFile(contentPath, "utf-8")
      // Parse markdown for content items
      const lines = contentData.split("\n")
      for (const line of lines) {
        if (line.startsWith("- [")) {
          const status = line.match(/\[([a-z]+)\]/i)?.[1] || "draft"
          const title = line.replace(/^- \[[a-z]+\]\s*/i, "").trim()
          items.push({ title, status: status.toLowerCase() })
        }
      }
    } catch {
      // Return empty
    }

    return NextResponse.json({ 
      items,
      counts: {
        draft: items.filter(i => i.status === "draft").length,
        review: items.filter(i => i.status === "review").length,
        approved: items.filter(i => i.status === "approved").length,
        published: items.filter(i => i.status === "published").length,
      }
    })
  } catch (error) {
    console.error("Content pipeline error:", error)
    return NextResponse.json(
      { error: "Failed to read content pipeline" },
      { status: 500 }
    )
  }
}
