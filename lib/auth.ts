import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { rateLimit, validatePasswordStrength } from "@/lib/rate-limit"
import { Prisma } from "@prisma/client"

const SALT_ROUNDS = 12

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const email = credentials.email as string
        const password = credentials.password as string
        const emailLower = email.trim().toLowerCase()

        // 速率限制：每个邮箱每分钟最多 5 次尝试
        const ipKey = `auth:${emailLower}`
        const { allowed } = rateLimit(ipKey, { windowSeconds: 60, maxRequests: 5 })
        if (!allowed) {
          throw new Error("登录尝试过于频繁，请稍后再试")
        }

        // 已有用户：验证密码
        const existingUser = await db.user.findUnique({
          where: { email: emailLower },
        })

        if (existingUser) {
          if (existingUser.password) {
            const isValid = await verifyPassword(password, existingUser.password)
            if (isValid) return existingUser
          }
          // 密码不匹配
          return null
        }

        // 新用户注册：验证密码强度
        const pwCheck = validatePasswordStrength(password)
        if (!pwCheck.valid) {
          throw new Error(pwCheck.message!)
        }

        // 创建用户（处理并发注册的竞态条件）
        const hashed = await hashPassword(password)
        try {
          const newUser = await db.user.create({
            data: {
              email: emailLower,
              name: emailLower.split("@")[0],
              password: hashed,
            },
          })
          return newUser
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            // 并发注册：重新查询已创建的用户并验证密码
            const raceUser = await db.user.findUnique({ where: { email: emailLower } })
            if (raceUser?.password) {
              const valid = await verifyPassword(password, raceUser.password)
              if (valid) return raceUser
            }
          }
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
})
