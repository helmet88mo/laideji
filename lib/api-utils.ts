import { NextResponse } from "next/server"

/** 统一的 API 错误响应 */
export function apiError(error: unknown, status = 500) {
  const message = error instanceof Error ? error.message : "Internal Server Error"
  console.error("[API Error]", message, error)
  return NextResponse.json(
    {
      error: "服务器内部错误，请稍后重试",
      ...(process.env.NODE_ENV === "development" && { detail: message }),
    },
    { status }
  )
}

/** 安全的 JSON 解析（用于 API routes 中处理数据库 TEXT 列存储的 JSON） */
export function safeJsonParse<T>(json: string | null | undefined, fallback: T): T {
  if (!json) return fallback
  try {
    return JSON.parse(json) as T
  } catch {
    console.warn("[safeJsonParse] 解析失败，使用 fallback", json.slice(0, 80))
    return fallback
  }
}

/** 安全解析请求 body 中的 JSON */
export async function parseRequestBody<T>(req: Request): Promise<T | null> {
  try {
    return await req.json() as T
  } catch {
    return null
  }
}
