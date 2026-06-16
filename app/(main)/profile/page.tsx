"use client"

import { useSession } from "next-auth/react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"
import { GRADES, TARGET_PATHS, PROVINCES } from "@/lib/constants"
import { toast } from "sonner"

export default function ProfilePage() {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { data: profile, isLoading } = useQuery({
    queryKey: ["plan"],
    queryFn: async () => {
      const res = await fetch("/api/plan")
      if (!res.ok) throw new Error("加载失败")
      return res.json() as Promise<{ targetPath: string | null; grade: string | null; province: string | null }>
    },
    enabled: !!session,
  })

  const [grade, setGrade] = useState("")
  const [province, setProvince] = useState("")
  const [targetPath, setTargetPath] = useState("")

  useEffect(() => {
    if (profile) {
      setGrade(profile.grade || "")
      setProvince(profile.province || "")
      setTargetPath(profile.targetPath || "")
    }
  }, [profile])

  const saveMutation = useMutation({
    mutationFn: async (data: { grade: string; province: string; targetPath: string }) => {
      const res = await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error("保存失败")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plan"] })
      toast.success("档案已更新")
    },
    onError: () => toast.error("保存失败，请稍后重试"),
  })

  const handleSave = () => {
    saveMutation.mutate({ grade, province, targetPath })
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">请先登录</h1>
        <Link href="/login"><Button>前往登录</Button></Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">我的档案</h1>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">
                {(session.user?.name || "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{session.user?.name || "同学"}</CardTitle>
              <CardDescription>{session.user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {isLoading ? (
        <Card><CardContent className="py-8"><Skeleton className="h-32 w-full" /></CardContent></Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>完善你的信息可以获得更精准的推荐</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>年级</Label>
              <Select value={grade} onValueChange={(v) => setGrade(v ?? "")}>
                <SelectTrigger><SelectValue placeholder="选择你的年级" /></SelectTrigger>
                <SelectContent>
                  {GRADES.map((g) => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>省份</Label>
              <Select value={province} onValueChange={(v) => setProvince(v ?? "")}>
                <SelectTrigger><SelectValue placeholder="选择你的省份" /></SelectTrigger>
                <SelectContent className="max-h-60">
                  {PROVINCES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>目标路径（决定学期规划内容）</Label>
              <Select value={targetPath} onValueChange={(v) => setTargetPath(v ?? "")}>
                <SelectTrigger><SelectValue placeholder="选择你的目标" /></SelectTrigger>
                <SelectContent>
                  {TARGET_PATHS.map((p) => <SelectItem key={p.value} value={p.value}>{p.icon} {p.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "保存中..." : "保存"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
