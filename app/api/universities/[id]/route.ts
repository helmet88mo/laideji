import { NextResponse } from "next/server"
import { getUniversityById } from "@/lib/server-data"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const uni = getUniversityById(id)
    if (!uni) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(uni)
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
