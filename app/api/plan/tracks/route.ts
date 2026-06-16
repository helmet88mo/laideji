import { NextResponse } from "next/server"
import { apiError } from "@/lib/api-utils"
import { TRACK_PLANS, getAllTrackPlans } from "@/lib/plan-constants"
import type { TrackPlan } from "@/types"

export async function GET() {
  try {
    const tracks: TrackPlan[] = getAllTrackPlans().map((t) => ({
      trackId: t.trackId,
      trackLabel: t.trackLabel,
      icon: t.icon,
      semesters: t.semesters,
    }))
    return NextResponse.json({ tracks })
  } catch (error) {
    return apiError(error)
  }
}
