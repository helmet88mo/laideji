import { NextRequest, NextResponse } from "next/server"
import DATA from "@/lib/server-data"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = Math.min(parseInt(searchParams.get("pageSize") || "20"), 100)

    let data = [...DATA.majors]
    if (category && category !== "all") data = data.filter((m) => m.category === category)
    if (search) {
      const q = search.toLowerCase()
      data = data.filter((m) => String(m.name).toLowerCase().includes(q) || String(m.description).toLowerCase().includes(q))
    }

    const total = data.length
    const paged = data.slice((page - 1) * pageSize, page * pageSize)

    return NextResponse.json({ data: paged, total, page, pageSize })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
