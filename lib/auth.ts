import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// MVP 内置账号
const BUILTIN_USERS = [
  { id: "1", email: "demo@laideji.com", password: "Demo1234", name: "小明" },
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || "laideji-fallback-dev-only-key-2026",
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const email = (credentials.email as string).toLowerCase().trim()
        const password = credentials.password as string

        const user = BUILTIN_USERS.find((u) => u.email === email && u.password === password)
        if (user) return { id: user.id, email: user.email, name: user.name }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.sub = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.sub || ""
      return session
    },
  },
})
