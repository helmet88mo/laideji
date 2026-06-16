import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { apiError, safeJsonParse, parseRequestBody } from "@/lib/api-utils"
import { TRACK_PLANS } from "@/lib/plan-constants"
import type { PlanProgressData } from "@/types"

// 构建有效 milestone ID 集合（初始化一次）
function getAllValidMilestoneIds(): Set<string> {
  const ids = new Set<string>()
  for (const track of Object.values(TRACK_PLANS)) {
    for (const sem of track.semesters) {
      for (const m of sem.milestones) {
        ids.add(m.id)
      }
    }
  }
  return ids
}

const VALID_MILESTONE_IDS = getAllValidMilestoneIds()

export async function GET(_req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const [plan, user] = await Promise.all([
      db.semesterPlan.findUnique({ where: { userId: session.user.id } }),
      db.user.findUnique({
        where: { id: session.user.id },
        select: { targetPath: true, grade: true, province: true },
      }),
    ])

    return NextResponse.json({
      planData: safeJsonParse<PlanProgressData>(plan?.planData ?? null, {}),
      targetPath: user?.targetPath ?? null,
      grade: user?.grade ?? null,
      province: user?.province ?? null,
    })
  } catch (error) {
    return apiError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await parseRequestBody<{ milestoneId: string; completed: boolean }>(req)
    if (!body?.milestoneId || typeof body.completed !== "boolean") {
      return NextResponse.json({ error: "缺少 milestoneId 或 completed 字段" }, { status: 400 })
    }

    // 验证 milestoneId 是否合法
    if (!VALID_MILESTONE_IDS.has(body.milestoneId)) {
      return NextResponse.json({ error: "无效的里程碑 ID" }, { status: 400 })
    }

    // 使用事务消除读-改-写竞态条件
    const updated = await db.$transaction(async (tx) => {
      const current = await tx.semesterPlan.findUnique({ where: { userId: session.user!.id } })
      const currentData = safeJsonParse<PlanProgressData>(current?.planData ?? null, {})

      if (body.completed) {
        currentData[body.milestoneId] = true
      } else {
        delete currentData[body.milestoneId]
      }

      return tx.semesterPlan.upsert({
        where: { userId: session.user!.id },
        create: { userId: session.user!.id, planData: JSON.stringify(currentData) },
        update: { planData: JSON.stringify(currentData) },
      })
    })

    return NextResponse.json({
      planData: safeJsonParse<PlanProgressData>(updated.planData, {}),
    })
  } catch (error) {
    return apiError(error)
  }
}
