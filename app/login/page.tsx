"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    // 客户端前置密码校验
    if (password.length < 8) {
      setError("密码长度至少 8 位")
      return
    }
    if (!/[A-Z]/.test(password)) {
      setError("密码需包含至少一个大写字母")
      return
    }
    if (!/[a-z]/.test(password)) {
      setError("密码需包含至少一个小写字母")
      return
    }
    if (!/[0-9]/.test(password)) {
      setError("密码需包含至少一个数字")
      return
    }
    setLoading(true)
    try {
      const result = await signIn("credentials", { email, password, redirect: false })
      if (result?.ok) {
        router.push("/dashboard")
      } else if (result?.error) {
        setError(result.error)
      } else {
        setError("邮箱或密码不正确，请重试")
      }
    } catch {
      setError("登录失败，请稍后重试")
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">登录</CardTitle>
          <CardDescription>登录后可以保存收藏、追踪规划进度</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="至少8位，含大小写字母+数字"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <p className="text-xs text-muted-foreground">
                首次登录将自动注册。密码需至少 8 位，包含大小写字母和数字。
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "登录中..." : "登录 / 注册"}
            </Button>
          </form>
          <Separator />
          <div className="text-center text-sm text-muted-foreground">
            还没有账号？输入邮箱和密码即可自动注册。{" "}
            <Link href="/" className="text-primary hover:underline">返回首页</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
