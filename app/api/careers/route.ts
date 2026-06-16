import { NextRequest, NextResponse } from "next/server"
import DATA from "@/lib/server-data"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const industry = searchParams.get("industry")
    const majorId = searchParams.get("majorId")

    let data = [...DATA.careers]
    if (industry) data = data.filter((c: Record<string,unknown>) => c.industry === industry)
    if (majorId) data = data.filter((c: Record<string,unknown>) => c.majorId === majorId)

    return NextResponse.json({ data, total: data.length })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
