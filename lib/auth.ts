import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// MVP 内置账号（生产环境应使用数据库）
const BUILTIN_USERS = [
  { id: "demo-user", email: "demo@laideji.com", password: "Demo1234", name: "小明" },
]

export const { handlers, auth, signIn, signOut } = NextAuth({
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
    async session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub
      return session
    },
  },
})
