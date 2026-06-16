import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { apiError } from "@/lib/api-utils"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const level = searchParams.get("level")
    const type = searchParams.get("type")
    const province = searchParams.get("province")
    const search = searchParams.get("search")

    const where: Record<string, unknown> = {}
    if (level) where.level = level
    if (type) where.type = type
    if (province) where.province = province
    if (search) {
      where.OR = [{ name: { contains: search } }, { city: { contains: search } }]
    }

    const data = await db.university.findMany({
      where,
      orderBy: { name: "asc" },
    })

    return NextResponse.json({ data, total: data.length })
  } catch (error) {
    return apiError(error)
  }
}
