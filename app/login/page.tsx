"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/client-auth"

export default function LoginPage() {
  const router = useRouter()
  const { login, user } = useAuth()
  const [tab, setTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (user) {
    router.push("/dashboard")
    return null
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.ok) {
      router.push("/dashboard")
    } else {
      setError(result.error || "登录失败")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (password.length < 6) { setError("密码长度至少 6 位"); return }
    setLoading(true)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setSuccess("注册成功！切换到登录标签登录吧")
      setEmail("")
      setPassword("")
      setName("")
    } else {
      setError(data.error || "注册失败")
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">欢迎使用 来得及</CardTitle>
          <CardDescription>登录或注册，开始你的学业生涯规划</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={(v) => { setTab(v); setError(""); setSuccess("") }} className="space-y-4">
            <TabsList className="w-full">
              <TabsTrigger value="login" className="flex-1">登录</TabsTrigger>
              <TabsTrigger value="register" className="flex-1">注册</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              {error && <Alert variant="destructive" className="mb-3"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
              <form onSubmit={handleLogin} className="space-y-3">
                <div className="space-y-1">
                  <Label>邮箱</Label>
                  <Input type="email" placeholder="demo@laideji.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label>密码</Label>
                  <Input type="password" placeholder="Demo1234" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "登录中..." : "登录"}</Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              {error && <Alert variant="destructive" className="mb-3"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
              {success && <Alert className="mb-3 border-green-400 bg-green-50"><CheckCircle className="h-4 w-4 text-green-600" /><AlertDescription className="text-green-700">{success}</AlertDescription></Alert>}
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="space-y-1">
                  <Label>昵称（选填）</Label>
                  <Input placeholder="你的昵称" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label>邮箱</Label>
                  <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label>密码</Label>
                  <Input type="password" placeholder="至少6位" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "注册中..." : "注册"}</Button>
              </form>
            </TabsContent>
          </Tabs>
          <p className="text-center text-xs text-muted-foreground mt-4">
            演示账号 demo@laideji.com / Demo1234
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
