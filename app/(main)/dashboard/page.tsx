"use client"

import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Briefcase, Heart, Compass, Sparkles, ArrowRight, Calendar, Target, AlertTriangle, RefreshCw } from "lucide-react"
import type { PlanProgressData, TrackPlan } from "@/types"

export default function DashboardPage() {
  const { data: session } = useSession()

  // 从 API 获取用户计划数据
  const { data: planInfo, isLoading: planLoading, isError: planError, refetch: refetchPlan } = useQuery({
    queryKey: ["plan"],
    queryFn: async () => {
      const res = await fetch("/api/plan")
      if (!res.ok) throw new Error("加载失败")
      return res.json() as Promise<{
        planData: PlanProgressData
        targetPath: string | null
        grade: string | null
      }>
    },
    enabled: !!session,
  })

  // 从 API 获取轨道数据
  const { data: tracksData } = useQuery({
    queryKey: ["plan-tracks"],
    queryFn: async () => {
      const res = await fetch("/api/plan/tracks")
      if (!res.ok) throw new Error("加载轨道数据失败")
      return res.json() as Promise<{ tracks: TrackPlan[] }>
    },
    enabled: !!session,
    staleTime: Infinity,
  })

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">请先登录</h1>
        <p className="text-muted-foreground mb-4">登录后可以追踪你的规划进度</p>
        <Link href="/login"><Button>前往登录</Button></Link>
      </div>
    )
  }

  const sections = [
    { href: "/assessment", icon: Sparkles, title: "兴趣测评", desc: "了解你的霍兰德兴趣类型", action: "开始测评" },
    { href: "/majors", icon: BookOpen, title: "专业百科", desc: "深入了解你感兴趣的专业", action: "浏览专业" },
    { href: "/careers", icon: Briefcase, title: "职业预览", desc: "看看未来的工作一天是什么样", action: "查看职业" },
    { href: "/regrets", icon: Heart, title: "后悔清单", desc: "学长学姐的遗憾，别再重蹈覆辙", action: "查看清单" },
    { href: "/guide", icon: Compass, title: "新手引导", desc: "从高考后到大一入学的完整指引", action: "开始引导" },
  ]

  // Build plan progress stats
  const targetPath = planInfo?.targetPath
  const planData = planInfo?.planData ?? {}
  const allTracks = tracksData?.tracks ?? []
  const track = targetPath && targetPath !== "undecided"
    ? allTracks.find((t) => t.trackId === targetPath) ?? null
    : null

  let overallProgress = 0
  let completedCount = 0
  let totalCount = 0
  const nextMilestones: { id: string; title: string; semesterLabel: string }[] = []

  if (track) {
    for (const sem of track.semesters) {
      for (const m of sem.milestones) {
        totalCount++
        if (planData[m.id]) {
          completedCount++
        } else if (nextMilestones.length < 3) {
          nextMilestones.push({ id: m.id, title: m.title, semesterLabel: sem.semesterLabel })
        }
      }
    }
    overallProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">你好，{session.user?.name || "同学"}</h1>
        <p className="text-muted-foreground">欢迎回来。</p>
      </div>

      {/* Plan Progress Section */}
      <div className="mb-8">
        {planLoading ? (
          <Card><CardContent className="py-6"><Skeleton className="h-20 w-full" /></CardContent></Card>
        ) : planError ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>无法加载计划数据</span>
              <Button variant="outline" size="sm" onClick={() => refetchPlan()} className="gap-1">
                <RefreshCw className="h-3 w-3" />重试
              </Button>
            </AlertDescription>
          </Alert>
        ) : targetPath && targetPath !== "undecided" && track ? (
          <Card className="border-primary/20">
            <CardContent className="py-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-3xl">{track.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{track.trackLabel} 进度</h3>
                    <p className="text-sm text-muted-foreground">
                      已完成 {completedCount}/{totalCount} 个里程碑
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-40">
                  <Progress value={overallProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right mt-1">{overallProgress}%</p>
                </div>
                <Link href="/plan">
                  <Button variant="outline" size="sm" className="gap-1 mt-2 sm:mt-0">
                    <Calendar className="h-3 w-3" /> 查看完整规划 <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
              {nextMilestones.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs font-medium text-muted-foreground mb-2">📋 接下来的里程碑</p>
                  <div className="space-y-1.5">
                    {nextMilestones.map((m) => (
                      <div key={m.id} className="flex items-center gap-2 text-sm">
                        <span className="text-xs text-muted-foreground w-12 shrink-0">{m.semesterLabel}</span>
                        <span className="truncate">{m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-6 text-center">
              <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-3">设置你的目标路径，获取专属的 8 学期规划</p>
              <Link href="/profile">
                <Button variant="outline" size="sm">设置目标</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{s.title}</CardTitle>
                <CardDescription>{s.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="gap-1">
                  {s.action} <ArrowRight className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
