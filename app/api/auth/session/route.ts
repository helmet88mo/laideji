import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "laideji-2026-fallback-key-32chars!")

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth-token")?.value
    if (!token) return NextResponse.json({ user: null })
    const { payload } = await jwtVerify(token, SECRET)
    return NextResponse.json({ user: { id: payload.sub, name: payload.name, email: payload.email } })
  } catch {
    return NextResponse.json({ user: null })
  }
}
