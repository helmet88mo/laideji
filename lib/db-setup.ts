import { existsSync, copyFileSync } from "fs"
import path from "path"

export function setupDatabase() {
  if (process.env.NODE_ENV !== "production") return

  const targetPath = "/tmp/dev.db"
  const sourcePaths = [
    path.join(process.cwd(), ".next", "dev.db"),
    path.join(process.cwd(), "prisma", "dev.db"),
  ]

  if (existsSync(targetPath)) return

  for (const src of sourcePaths) {
    if (existsSync(src)) {
      copyFileSync(src, targetPath)
      console.log("✅ DB copied to", targetPath)
      return
    }
  }
  console.warn("⚠️ No seed database found for production")
}
