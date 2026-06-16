import { NextResponse } from "next/server"
import { TRACK_PLANS, getAllTrackPlans } from "@/lib/plan-constants"

export async function GET() {
  try {
    return NextResponse.json({ tracks: getAllTrackPlans() })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
