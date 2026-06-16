import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { apiError, safeJsonParse } from "@/lib/api-utils"
import type { TimelineItem } from "@/types"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const career = await db.careerDay.findUnique({
      where: { id },
      include: { major: { select: { name: true, category: true } } },
    })

    if (!career) return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json({
      ...career,
      timeline: safeJsonParse<TimelineItem[]>(career.timeline, []),
    })
  } catch (error) {
    return apiError(error)
  }
}
