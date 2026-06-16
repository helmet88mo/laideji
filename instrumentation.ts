// Next.js 服务器启动钩子 — 在 Netlify 环境下初始化数据库
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { setupDatabase } = await import("@/lib/db-setup")
    setupDatabase()
  }
}
