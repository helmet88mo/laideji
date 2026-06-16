import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { apiError, safeJsonParse } from "@/lib/api-utils"
import type { AbilityModel, CourseCategory, RelatedMajor, CityDistItem } from "@/types"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const major = await db.major.findUnique({
      where: { id },
      include: {
        employmentStats: true,
        careerPaths: { orderBy: [{ level: "asc" }] },
        salaries: { orderBy: [{ cityTier: "asc" }] },
        careerDays: { take: 5, orderBy: { satisfaction: "desc" } },
      },
    })

    if (!major) return NextResponse.json({ error: "Not found" }, { status: 404 })

    // Safe JSON parse for TEXT-stored JSON fields
    return NextResponse.json({
      ...major,
      courses: safeJsonParse<CourseCategory[]>(major.courses, []),
      abilities: safeJsonParse<AbilityModel[]>(major.abilities, []),
      relatedMajors: safeJsonParse<RelatedMajor[]>(major.relatedMajors, []),
      employmentStats: major.employmentStats.map((s) => ({
        ...s,
        cityDistribution: safeJsonParse<CityDistItem[] | null>(s.cityDistribution, null),
      })),
      careerPaths: major.careerPaths.map((p) => ({
        ...p,
        skills: safeJsonParse<string[]>(p.skills, []),
      })),
      careerDays: major.careerDays,
    })
  } catch (error) {
    return apiError(error)
  }
}
