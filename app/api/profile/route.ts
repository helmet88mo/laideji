import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { apiError, parseRequestBody } from "@/lib/api-utils"
import { GRADES, PROVINCES, TARGET_PATHS } from "@/lib/constants"

const VALID_GRADES = new Set(GRADES.map((g) => g.value))
const VALID_PROVINCES = new Set(PROVINCES)
const VALID_TARGET_PATHS = new Set(TARGET_PATHS.map((p) => p.value))
const MAX_STRING_LENGTH = 100

export async function PUT(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await parseRequestBody<{ grade?: string; province?: string; targetPath?: string }>(req)
    if (!body) return NextResponse.json({ error: "请求体为空" }, { status: 400 })

    const data: Record<string, string> = {}

    if (body.grade !== undefined) {
      if (typeof body.grade !== "string" || body.grade.length > MAX_STRING_LENGTH) {
        return NextResponse.json({ error: "年级值无效" }, { status: 400 })
      }
      if (!VALID_GRADES.has(body.grade)) {
        return NextResponse.json({ error: `无效的年级: ${body.grade}` }, { status: 400 })
      }
      data.grade = body.grade
    }

    if (body.province !== undefined) {
      if (typeof body.province !== "string" || body.province.length > MAX_STRING_LENGTH) {
        return NextResponse.json({ error: "省份值无效" }, { status: 400 })
      }
      if (!VALID_PROVINCES.has(body.province)) {
        return NextResponse.json({ error: `无效的省份: ${body.province}` }, { status: 400 })
      }
      data.province = body.province
    }

    if (body.targetPath !== undefined) {
      if (typeof body.targetPath !== "string" || body.targetPath.length > MAX_STRING_LENGTH) {
        return NextResponse.json({ error: "目标路径值无效" }, { status: 400 })
      }
      if (!VALID_TARGET_PATHS.has(body.targetPath)) {
        return NextResponse.json({ error: `无效的目标路径: ${body.targetPath}` }, { status: 400 })
      }
      data.targetPath = body.targetPath
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "没有提供要更新的字段" }, { status: 400 })
    }

    await db.user.update({ where: { id: session.user.id }, data })
    return NextResponse.json({ success: true })
  } catch (error) {
    return apiError(error)
  }
}
