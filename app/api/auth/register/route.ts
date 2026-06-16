import { NextRequest, NextResponse } from "next/server"

// 内置账号 + 运行时注册（内存存储）
const users = new Map<string, { id: string; email: string; password: string; name: string }>()

// 初始化内置账号
users.set("demo@laideji.com", { id: "1", email: "demo@laideji.com", password: "Demo1234", name: "小明" })

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()
    if (!email || !password) return NextResponse.json({ error: "邮箱和密码不能为空" }, { status: 400 })
    if (password.length < 6) return NextResponse.json({ error: "密码长度至少 6 位" }, { status: 400 })

    const key = email.toLowerCase().trim()
    if (users.has(key)) return NextResponse.json({ error: "该邮箱已注册" }, { status: 409 })

    const id = String(users.size + 1)
    users.set(key, { id, email: key, password, name: name || key.split("@")[0] })

    return NextResponse.json({ success: true, message: "注册成功，请登录" })
  } catch {
    return NextResponse.json({ error: "注册失败" }, { status: 500 })
  }
}

// 导出给 login 端点使用
export function findUser(email: string, password: string) {
  const u = users.get(email.toLowerCase().trim())
  if (u && u.password === password) return { id: u.id, email: u.email, name: u.name }
  return null
}
