import { NextRequest, NextResponse } from "next/server"
import { GRADES, PROVINCES, TARGET_PATHS } from "@/lib/constants"

// MVP 内存存储
const profiles = new Map<string, Record<string, string>>()

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: "Empty body" }, { status: 400 })

    const VALID_GRADES = new Set(GRADES.map((g: {value:string}) => g.value))
    const VALID_PROVINCES = new Set(PROVINCES)
    const VALID_PATHS = new Set(TARGET_PATHS.map((p: {value:string}) => p.value))

    const data: Record<string, string> = {}
    if (body.grade !== undefined) {
      if (!VALID_GRADES.has(body.grade)) return NextResponse.json({ error: "Invalid grade" }, { status: 400 })
      data.grade = body.grade
    }
    if (body.province !== undefined) {
      if (!VALID_PROVINCES.has(body.province)) return NextResponse.json({ error: "Invalid province" }, { status: 400 })
      data.province = body.province
    }
    if (body.targetPath !== undefined) {
      if (!VALID_PATHS.has(body.targetPath)) return NextResponse.json({ error: "Invalid targetPath" }, { status: 400 })
      data.targetPath = body.targetPath
    }

    const key = "demo-user"
    const existing = profiles.get(key) || {}
    profiles.set(key, { ...existing, ...data })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
