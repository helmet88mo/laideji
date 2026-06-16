/**
 * 简易内存速率限制器（MVP 使用，生产环境应替换为 Redis）
 */
const store = new Map<string, { count: number; resetAt: number }>()

// 每 60 秒清理过期条目
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key)
  }
}, 60_000).unref()

interface RateLimitConfig {
  /** 时间窗口（秒） */
  windowSeconds: number
  /** 窗口内最大请求数 */
  maxRequests: number
}

export function rateLimit(key: string, config: RateLimitConfig = { windowSeconds: 60, maxRequests: 5 }): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + config.windowSeconds * 1000 })
    return { allowed: true, remaining: config.maxRequests - 1 }
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: config.maxRequests - entry.count }
}

/** 验证密码强度 */
export function validatePasswordStrength(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) return { valid: false, message: "密码长度至少 8 位" }
  if (!/[A-Z]/.test(password)) return { valid: false, message: "密码需包含至少一个大写字母" }
  if (!/[a-z]/.test(password)) return { valid: false, message: "密码需包含至少一个小写字母" }
  if (!/[0-9]/.test(password)) return { valid: false, message: "密码需包含至少一个数字" }
  return { valid: true }
}
