import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { apiError, safeJsonParse } from "@/lib/api-utils"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const grade = searchParams.get("grade")
    const category = searchParams.get("category")

    const where: Record<string, unknown> = {}
    if (grade) where.grade = grade
    if (category) where.category = category

    const session = await auth()
    const data = await db.regret.findMany({
      where,
      orderBy: { grade: "asc" },
    })

    // Check if user saved any
    let savedIds: string[] = []
    if (session?.user?.id) {
      const saves = await db.userRegret.findMany({
        where: { userId: session.user.id },
        select: { regretId: true },
      })
      savedIds = saves.map((s) => s.regretId)
    }

    return NextResponse.json({
      data: data.map((r) => ({
        ...r,
        tags: safeJsonParse<string[]>(r.tags, []),
        saved: savedIds.includes(r.id),
      })),
      total: data.length,
    })
  } catch (error) {
    return apiError(error)
  }
}
