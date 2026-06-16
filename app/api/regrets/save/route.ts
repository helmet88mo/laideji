import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { apiError, parseRequestBody } from "@/lib/api-utils"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await parseRequestBody<{ regretId: string }>(req)
    if (!body?.regretId) return NextResponse.json({ error: "缺少 regretId" }, { status: 400 })

    await db.userRegret.upsert({
      where: { userId_regretId: { userId: session.user.id, regretId: body.regretId } },
      create: { userId: session.user.id, regretId: body.regretId },
      update: {},
    })
    return NextResponse.json({ saved: true })
  } catch (error) {
    return apiError(error)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await parseRequestBody<{ regretId: string }>(req)
    if (!body?.regretId) return NextResponse.json({ error: "缺少 regretId" }, { status: 400 })

    await db.userRegret.deleteMany({
      where: { userId: session.user.id, regretId: body.regretId },
    })
    return NextResponse.json({ saved: false })
  } catch (error) {
    return apiError(error)
  }
}
