import { NextRequest, NextResponse } from "next/server"
import DATA from "@/lib/server-data"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const level = searchParams.get("level")
    const type = searchParams.get("type")
    const province = searchParams.get("province")

    let data = [...DATA.universities]
    if (level && level !== "all") data = data.filter((u) => u.level === level)
    if (type && type !== "all") data = data.filter((u) => u.type === type)
    if (province && province !== "all") data = data.filter((u) => u.province === province)

    return NextResponse.json({ data, total: data.length })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
