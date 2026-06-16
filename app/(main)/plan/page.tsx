"use client"

import { useAuth } from "@/lib/client-auth"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { Calendar, Target, AlertTriangle, CheckCircle2, ArrowRight, ClipboardList, RefreshCw } from "lucide-react"
import { findConflicts } from "@/lib/plan-constants"
import type { PlanProgressData, TrackPlan, PlanConflict } from "@/types"

interface PlanApiData {
  planData: PlanProgressData
  targetPath: string | null
}

export default function PlanPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  // 从 API 获取用户计划数据
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["plan"],
    queryFn: async () => {
      const res = await fetch("/api/plan")
      if (!res.ok) throw new Error("加载失败")
      return res.json() as Promise<PlanApiData>
    },
    enabled: !!user,
  })

  // 从 API 获取轨道数据（不再从 bundle 导入）
  const { data: tracksData } = useQuery({
    queryKey: ["plan-tracks"],
    queryFn: async () => {
      const res = await fetch("/api/plan/tracks")
      if (!res.ok) throw new Error("加载轨道数据失败")
      return res.json() as Promise<{ tracks: TrackPlan[] }>
    },
    enabled: !!user,
    staleTime: Infinity, // 轨道数据是静态的
  })

  const toggleMutation = useMutation({
    mutationFn: async (payload: { milestoneId: string; completed: boolean }) => {
      const res = await fetch("/api/plan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "保存失败" }))
        throw new Error(err.error || "保存失败")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plan"] })
    },
    onError: (err: Error) => toast.error(err.message || "保存失败，请重试"),
  })

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">请先登录</h1>
        <p className="text-muted-foreground mb-4">登录后查看和管理你的学期规划</p>
        <Link href="/login"><Button>前往登录</Button></Link>
      </div>
    )
  }

  if (isLoading) return <PlanSkeleton />

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md text-center">
        <Card>
          <CardHeader>
            <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-7 w-7 text-destructive" />
            </div>
            <CardTitle>数据加载失败</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              无法获取你的计划数据，请检查网络后重试。
            </p>
            <Button onClick={() => refetch()} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />重新加载
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const planData = data?.planData ?? {}
  const targetPath = data?.targetPath ?? null
  const completedIds = Object.keys(planData).filter((k) => planData[k])
  const conflicts = findConflicts(completedIds)
  const allTracks = tracksData?.tracks ?? []
  const activeTrack = targetPath && targetPath !== "undecided"
    ? allTracks.find((t) => t.trackId === targetPath) ?? null
    : null

  // 如果 targetPath 有效但 tracks 数据中找不到（数据不一致）
  const isValidTarget = !targetPath || targetPath === "undecided" || !!activeTrack

  // Calculate overall stats for active track
  const totalMilestones = activeTrack
    ? activeTrack.semesters.reduce((sum, s) => sum + s.milestones.length, 0)
    : 0
  const completedInTrack = activeTrack
    ? activeTrack.semesters.reduce((sum, s) => sum + s.milestones.filter((m) => planData[m.id]).length, 0)
    : 0
  const overallProgress = totalMilestones > 0 ? Math.round((completedInTrack / totalMilestones) * 100) : 0

  const handleToggle = (id: string, checked: boolean) => {
    toggleMutation.mutate({ milestoneId: id, completed: checked })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Calendar className="h-7 w-7 text-primary" />
          学期规划
        </h1>
        <p className="text-muted-foreground">
          按你的目标路径，一步步完成每个学期的关键里程碑
        </p>
      </div>

      {/* Invalid targetPath warning */}
      {!isValidTarget && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            你保存的目标路径「{targetPath}」无法识别。请前往
            <Link href="/profile" className="underline font-medium mx-1">档案页面</Link>
            重新选择有效路径。
          </AlertDescription>
        </Alert>
      )}

      {/* No target path / undecided */}
      {(!targetPath || targetPath === "undecided" || !activeTrack) ? (
        <UnsetPlanView
          allTracks={allTracks}
          planData={planData}
          conflicts={conflicts}
          targetPath={targetPath}
          onToggle={handleToggle}
        />
      ) : (
        <ActiveTrackView
          track={activeTrack}
          planData={planData}
          conflicts={conflicts}
          overallProgress={overallProgress}
          completedInTrack={completedInTrack}
          totalMilestones={totalMilestones}
          onToggle={handleToggle}
        />
      )}
    </div>
  )
}

// ============ Active Track View ============
function ActiveTrackView({
  track, planData, conflicts, overallProgress, completedInTrack, totalMilestones,
  onToggle,
}: {
  track: TrackPlan
  planData: PlanProgressData
  conflicts: PlanConflict[]
  overallProgress: number
  completedInTrack: number
  totalMilestones: number
  onToggle: (id: string, checked: boolean) => void
}) {
  return (
    <>
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-3xl">{track.icon}</span>
              <div>
                <h2 className="text-xl font-bold">{track.trackLabel} — 8学期路线图</h2>
                <p className="text-sm text-muted-foreground">
                  已完成 {completedInTrack}/{totalMilestones} 个里程碑
                </p>
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Progress value={overallProgress} className="h-2" />
              <p className="text-xs text-muted-foreground text-right mt-1">{overallProgress}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {conflicts.length > 0 && (
        <Alert variant="default" className="mb-6 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/30">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            {conflicts.map((c, i) => (
              <div key={i} className="mb-1 last:mb-0">
                ⚠️ 在「{c.semesterLabel}」学期，你同时标记了两个冲突的里程碑：{c.reason}
              </div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {track.semesters.map((semester) => {
          const done = semester.milestones.filter((m) => planData[m.id]).length
          const total = semester.milestones.length
          const pct = total > 0 ? Math.round((done / total) * 100) : 0
          return (
            <Card key={semester.semesterId} className={pct === 100 ? "border-green-300 bg-green-50/30 dark:bg-green-950/10" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {pct === 100 && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {semester.semesterLabel}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{done}/{total}</span>
                    <Progress value={pct} className="w-20 h-1.5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {semester.milestones.map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-start gap-3 p-2 rounded-lg transition-colors cursor-pointer hover:bg-muted/50 ${
                        planData[m.id] ? "bg-muted/30" : ""
                      }`}
                    >
                      <Checkbox
                        checked={!!planData[m.id]}
                        onCheckedChange={(checked) => onToggle(m.id, !!checked)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-medium ${planData[m.id] ? "line-through text-muted-foreground" : ""}`}>
                            {m.title}
                          </span>
                          {m.category && <Badge variant="outline" className="text-xs">{m.category}</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}

// ============ Unset / Undecided View ============
function UnsetPlanView({
  allTracks, planData, conflicts, targetPath, onToggle,
}: {
  allTracks: TrackPlan[]
  planData: PlanProgressData
  conflicts: PlanConflict[]
  targetPath: string | null
  onToggle: (id: string, checked: boolean) => void
}) {
  if (allTracks.length === 0) {
    return (
      <Card className="mb-6">
        <CardContent className="py-12 text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-3" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="mb-6 border-primary/30 bg-primary/5">
        <CardContent className="py-6 text-center">
          <Target className="h-10 w-10 text-primary mx-auto mb-3" />
          <h2 className="text-lg font-semibold mb-2">
            {targetPath === "undecided" ? "你选择了「还没想好」" : "你还没有设定目标路径"}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            先去设置你的目标方向，获取专属的 8 学期定制化规划。或者先浏览下方 4 条路径，看看哪条更适合你。
          </p>
          <Link href="/profile">
            <Button className="gap-2">
              前往设置 <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {conflicts.length > 0 && (
        <Alert variant="default" className="mb-6 border-yellow-400 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            检测到 {conflicts.length} 个跨轨道冲突——同时推进多条路径可能顾此失彼。
          </AlertDescription>
        </Alert>
      )}

      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <ClipboardList className="h-5 w-5" />4 条路径对比
      </h3>

      <Tabs defaultValue="employment" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          {allTracks.map((t) => (
            <TabsTrigger key={t.trackId} value={t.trackId} className="gap-1">
              {t.icon} {t.trackLabel}
            </TabsTrigger>
          ))}
        </TabsList>
        {allTracks.map((track) => {
          // 使用 track.semesters 直接统计（而非字符串前缀匹配）
          const completedInTrack = track.semesters.reduce(
            (sum, sem) => sum + sem.milestones.filter((m) => planData[m.id]).length, 0
          )
          return (
            <TabsContent key={track.trackId} value={track.trackId}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  已完成 {completedInTrack} / {track.semesters.reduce((s, sem) => s + sem.milestones.length, 0)} 个里程碑
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {track.semesters.map((sem) => {
                  const d = sem.milestones.filter((m) => planData[m.id]).length
                  return (
                    <Card key={sem.semesterId} className="text-sm">
                      <CardHeader className="pb-1 pt-3 px-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{sem.semesterLabel}</span>
                          <span className="text-xs text-muted-foreground">{d}/{sem.milestones.length}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="px-3 pb-3">
                        {sem.milestones.map((m) => (
                          <label key={m.id} className="flex items-start gap-2 py-0.5 cursor-pointer hover:bg-muted/30 rounded px-1">
                            <Checkbox
                              checked={!!planData[m.id]}
                              onCheckedChange={(checked) => onToggle(m.id, !!checked)}
                              className="mt-0.5 scale-75"
                            />
                            <span className={`text-xs leading-tight ${planData[m.id] ? "line-through text-muted-foreground" : ""}`}>
                              {m.title}
                            </span>
                          </label>
                        ))}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </>
  )
}

function PlanSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-5 w-96" />
      <Skeleton className="h-24 w-full" />
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}><CardHeader><Skeleton className="h-6 w-32" /></CardHeader><CardContent><Skeleton className="h-20 w-full" /></CardContent></Card>
      ))}
    </div>
  )
}
