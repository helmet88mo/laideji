import { NextRequest, NextResponse } from "next/server"
import { SignJWT } from "jose"
import { findUser } from "../register/route"

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "laideji-2026-fallback-key-32chars!")

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: "请输入邮箱和密码" }, { status: 400 })

    const user = findUser(email, password)
    if (!user) return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 })

    const token = await new SignJWT({ sub: user.id, name: user.name, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt().setExpirationTime("7d")
      .sign(SECRET)

    const res = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } })
    res.cookies.set("auth-token", token, {
      httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 7 * 24 * 60 * 60,
    })
    return res
  } catch {
    return NextResponse.json({ error: "登录失败" }, { status: 500 })
  }
}
