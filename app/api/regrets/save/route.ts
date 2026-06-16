import { NextRequest, NextResponse } from "next/server"

// MVP 阶段使用 sessionStorage + 内存存储
const saves = new Map<string, Set<string>>()

export async function POST(req: NextRequest) {
  try {
    const { regretId } = await req.json().catch(() => ({}))
    if (!regretId) return NextResponse.json({ error: "Missing regretId" }, { status: 400 })
    const key = "demo-user"
    if (!saves.has(key)) saves.set(key, new Set())
    saves.get(key)!.add(regretId)
    return NextResponse.json({ saved: true })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { regretId } = await req.json().catch(() => ({}))
    if (!regretId) return NextResponse.json({ error: "Missing regretId" }, { status: 400 })
    saves.get("demo-user")?.delete(regretId)
    return NextResponse.json({ saved: false })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
