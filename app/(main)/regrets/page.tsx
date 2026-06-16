"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Heart, Bookmark, AlertCircle, CheckCircle, Lightbulb } from "lucide-react"
import { REGRET_CATEGORIES, REGRET_GRADES } from "@/lib/constants"
import type { RegretItem } from "@/types"

export default function RegretsPage() {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const [grade, setGrade] = useState("")
  const [category, setCategory] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["regrets", grade, category],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (grade && grade !== "all") params.set("grade", grade)
      if (category && category !== "all") params.set("category", category)
      const res = await fetch(`/api/regrets?${params}`)
      return res.json() as Promise<{ data: RegretItem[]; total: number }>
    },
  })

  const saveMutation = useMutation({
    mutationFn: async ({ regretId, save }: { regretId: string; save: boolean }) => {
      await fetch("/api/regrets/save", {
        method: save ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regretId }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regrets"] })
      toast.success("已更新")
    },
  })

  const catLabel = (cat: string) => REGRET_CATEGORIES.find((c) => c.value === cat)?.label || cat

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">大学后悔清单</h1>
        <p className="text-muted-foreground max-w-2xl">
          学长学姐最真实的遗憾，每一个都标注了"你现在还来得及"。
          不是为了让你焦虑，而是为了让你更好地规划。
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <Select value={grade} onValueChange={(v) => setGrade(v || "")}>
          <SelectTrigger className="w-40"><SelectValue placeholder="全部年级" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部年级</SelectItem>
            {REGRET_GRADES.map((g) => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={(v) => setCategory(v || "")}>
          <SelectTrigger className="w-40"><SelectValue placeholder="全部分类" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            {REGRET_CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}><CardHeader><Skeleton className="h-5 w-64" /><Skeleton className="h-4 w-full" /></CardHeader></Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {data?.data.map((regret) => (
            <Card key={regret.id} className={`transition-colors ${regret.isLate ? "opacity-75" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{regret.grade}</Badge>
                      <Badge variant="outline">{catLabel(regret.category)}</Badge>
                      {regret.isLate ? (
                        <Badge variant="destructive" className="gap-1 text-xs"><AlertCircle className="h-3 w-3" />已错过窗口</Badge>
                      ) : (
                        <Badge variant="default" className="gap-1 text-xs bg-green-600"><CheckCircle className="h-3 w-3" />还来得及</Badge>
                      )}
                    </div>
                    <p className="text-base leading-relaxed">{regret.content}</p>
                    {regret.remedy && (
                      <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{regret.remedy}</span>
                        </p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {regret.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  {session && (
                    <Button
                      variant={regret.saved ? "default" : "outline"}
                      size="icon"
                      className="shrink-0"
                      onClick={() => saveMutation.mutate({ regretId: regret.id, save: !regret.saved })}
                    >
                      <Bookmark className={`h-4 w-4 ${regret.saved ? "fill-primary-foreground" : ""}`} />
                    </Button>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
