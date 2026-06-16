import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { apiError } from "@/lib/api-utils"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const industry = searchParams.get("industry")
    const majorId = searchParams.get("majorId")

    const where: Record<string, unknown> = {}
    if (industry) where.industry = industry
    if (majorId) where.majorId = majorId

    const data = await db.careerDay.findMany({
      where,
      orderBy: { satisfaction: "desc" },
      include: { major: { select: { name: true, category: true } } },
    })

    return NextResponse.json({ data, total: data.length })
  } catch (error) {
    return apiError(error)
  }
}
