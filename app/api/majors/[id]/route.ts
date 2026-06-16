import { NextResponse } from "next/server"
import { getMajorById } from "@/lib/server-data"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const major = getMajorById(id)
    if (!major) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(major)
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
