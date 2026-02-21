import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { homedir } from "os"

const WORKSPACE_PATH = process.env.OPENCLAW_WORKSPACE || path.join(homedir(), ".openclaw", "workspace")

export async function GET() {
  try {
    // Read cron state
    const cronsPath = path.join(WORKSPACE_PATH, "state", "crons.json")
    let crons = [
      { name: "Daily Report", schedule: "0 10 * * *", status: "healthy", lastRun: "2026-02-20T10:00:00Z", errors: 0 },
      { name: "Heartbeat", schedule: "*/30 * * * *", status: "healthy", lastRun: "2026-02-20T22:30:00Z", errors: 0 },
      { name: "Weekly Review", schedule: "0 20 * * 0", status: "healthy", lastRun: "2026-02-16T20:00:00Z", errors: 0 },
    ]
    
    try {
      const cronsData = await fs.readFile(cronsPath, "utf-8")
      crons = JSON.parse(cronsData)
    } catch {
      // Return default crons
    }

    return NextResponse.json({ crons })
  } catch (error) {
    console.error("Cron health error:", error)
    return NextResponse.json(
      { error: "Failed to read cron health" },
      { status: 500 }
    )
  }
}
