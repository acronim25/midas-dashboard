import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { homedir } from "os"

const WORKSPACE_PATH = process.env.OPENCLAW_WORKSPACE || path.join(homedir(), ".openclaw", "workspace")

export async function GET() {
  try {
    // Read revenue state
    const revenuePath = path.join(WORKSPACE_PATH, "state", "revenue.json")
    let revenue = { current: 0, monthlyBurn: 0, history: [] }
    
    try {
      const revenueData = await fs.readFile(revenuePath, "utf-8")
      revenue = JSON.parse(revenueData)
    } catch {
      // Return default
    }

    return NextResponse.json(revenue)
  } catch (error) {
    console.error("Revenue error:", error)
    return NextResponse.json(
      { error: "Failed to read revenue" },
      { status: 500 }
    )
  }
}
