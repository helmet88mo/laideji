import { NextRequest, NextResponse } from "next/server"
import { TRACK_PLANS } from "@/lib/plan-constants"
import type { PlanProgressData } from "@/types"

// 内存存储 (MVP)
const planStore = new Map<string, PlanProgressData>()

function getValidIds() {
  const ids = new Set<string>()
  for (const t of Object.values(TRACK_PLANS)) {
    for (const s of t.semesters) {
      for (const m of s.milestones) ids.add(m.id)
    }
  }
  return ids
}
const VALID_IDS = getValidIds()

export async function GET(_req: NextRequest) {
  try {
    const key = "demo-user"
    const planData = planStore.get(key) || {}
    return NextResponse.json({ planData, targetPath: "undecided", grade: "大一", province: "广东" })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { milestoneId, completed } = body
    if (!milestoneId || typeof completed !== "boolean") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }
    if (!VALID_IDS.has(milestoneId)) {
      return NextResponse.json({ error: "Invalid milestone" }, { status: 400 })
    }

    const key = "demo-user"
    const current = planStore.get(key) || {}
    if (completed) {
      current[milestoneId] = true
    } else {
      delete current[milestoneId]
    }
    planStore.set(key, current)
    return NextResponse.json({ planData: current })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
