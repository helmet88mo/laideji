import { NextRequest, NextResponse } from "next/server"
import DATA from "@/lib/server-data"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const grade = searchParams.get("grade")
    const category = searchParams.get("category")

    let data = [...DATA.regrets]
    if (grade && grade !== "all") data = data.filter((r) => r.grade === grade)
    if (category && category !== "all") data = data.filter((r) => r.category === category)

    return NextResponse.json({ data, total: data.length })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
