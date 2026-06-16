import { NextResponse } from "next/server"
import { getCareerById } from "@/lib/server-data"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const career = getCareerById(id)
    if (!career) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(career)
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
