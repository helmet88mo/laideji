import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { apiError } from "@/lib/api-utils"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "20")

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const [data, total] = await Promise.all([
      db.major.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { code: "asc" },
        include: {
          _count: { select: { careerDays: true } },
        },
      }),
      db.major.count({ where }),
    ])

    return NextResponse.json({ data, total, page, pageSize })
  } catch (error) {
    return apiError(error)
  }
}
