import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { apiError } from "@/lib/api-utils"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const university = await db.university.findUnique({
      where: { id },
      include: {
        majors: {
          include: { major: true },
        },
        _count: { select: { majors: true } },
      },
    })

    if (!university) return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json(university)
  } catch (error) {
    return apiError(error)
  }
}
