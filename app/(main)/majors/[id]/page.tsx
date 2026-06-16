"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { EmploymentRadar } from "@/components/major/EmploymentRadar"
import { SalaryCurve } from "@/components/major/SalaryCurve"
import { CareerPathTimeline } from "@/components/major/CareerPathTimeline"
import { RegionHeatmap } from "@/components/major/RegionHeatmap"
import { BookOpen, AlertTriangle, TrendingUp, Target, MapPin, Briefcase, GraduationCap, ArrowRight } from "lucide-react"
import type { MajorDetail } from "@/types"
import { ABILITY_DIMENSIONS } from "@/lib/constants"

export default function MajorDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: major, isLoading } = useQuery({
    queryKey: ["major", id],
    queryFn: async () => {
      const res = await fetch(`/api/majors/${id}`)
      if (!res.ok) throw new Error("Not found")
      return res.json() as Promise<MajorDetail>
    },
  })

  if (isLoading) return <MajorSkeleton />
  if (!major) return <div className="container py-12 text-center">专业未找到</div>

  const getAiRiskLabel = (level: number) => {
    const labels: Record<number, { text: string; className: string }> = {
      1: { text: "AI替代风险极低", className: "bg-green-100 text-green-800" },
      2: { text: "AI替代风险低", className: "bg-emerald-100 text-emerald-800" },
      3: { text: "AI替代风险中等", className: "bg-yellow-100 text-yellow-800" },
      4: { text: "AI替代风险较高", className: "bg-orange-100 text-orange-800" },
      5: { text: "AI替代风险高", className: "bg-red-100 text-red-800" },
    }
    return labels[level] || { text: "未知", className: "" }
  }

  const riskLabel = getAiRiskLabel(major.aiRiskLevel)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/majors" className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block">
          ← 返回专业列表
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{major.name}</h1>
            <p className="text-muted-foreground mt-1">
              专业代码 {major.code} · {major.degree} · {major.category}
            </p>
          </div>
          <div className="flex gap-2">
            {major.employmentRate && (
              <Badge variant="outline" className="gap-1 text-sm px-3 py-1">
                <TrendingUp className="h-4 w-4" />
                就业率 {major.employmentRate}%
              </Badge>
            )}
            <Badge className={`text-sm px-3 py-1 ${riskLabel.className}`}>
              <AlertTriangle className="h-4 w-4 mr-1" />
              {riskLabel.text}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">专业概览</TabsTrigger>
          <TabsTrigger value="courses">课程地图</TabsTrigger>
          <TabsTrigger value="employment">就业画像</TabsTrigger>
          <TabsTrigger value="careers">职业预览</TabsTrigger>
        </TabsList>

        {/* ===== 概览 ===== */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>专业简介</CardTitle></CardHeader>
            <CardContent><p className="leading-relaxed text-muted-foreground">{major.description}</p></CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 能力模型 */}
            <Card>
              <CardHeader><CardTitle>能力模型</CardTitle><CardDescription>该专业所需的核心能力维度</CardDescription></CardHeader>
              <CardContent className="h-80">
                <EmploymentRadar abilities={major.abilities} />
              </CardContent>
            </Card>

            {/* AI风险评估 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  AI 替代风险评估
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${riskLabel.className}`}>
                  {riskLabel.text}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{major.aiRisk}</p>
              </CardContent>
            </Card>
          </div>

          {/* 核心难点 */}
          <Card>
            <CardHeader><CardTitle>核心难点</CardTitle><CardDescription>该专业公认最具挑战的内容</CardDescription></CardHeader>
            <CardContent><p className="leading-relaxed">{major.hardPoints}</p></CardContent>
          </Card>

          {/* 相近专业辨析 */}
          <Card>
            <CardHeader><CardTitle>相近专业辨析</CardTitle><CardDescription>别再搞混这些专业了</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {major.relatedMajors.map((rm, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium">{rm.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{rm.difference}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== 课程地图 ===== */}
        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>课程地图</CardTitle><CardDescription>大学四年的学习路径</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {major.courses.map((cat, i) => (
                <div key={i}>
                  <h4 className="font-semibold mb-2">{cat.name}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.courses.map((c, j) => (
                      <Badge key={j} variant="secondary">{c}</Badge>
                    ))}
                  </div>
                  {i < major.courses.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== 就业画像 ===== */}
        <TabsContent value="employment" className="space-y-6">
          {/* 收入曲线 */}
          <Card>
            <CardHeader><CardTitle>收入曲线</CardTitle><CardDescription>不同城市等级的收入预期（年薪/万元）</CardDescription></CardHeader>
            <CardContent className="h-80">
              <SalaryCurve salaries={major.salaries} />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 行业分布 */}
            <Card>
              <CardHeader><CardTitle>行业去向分布</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {major.employmentStats.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-sm w-32 truncate">{s.industry}</span>
                      <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${s.ratio}%` }} />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{s.ratio}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 就业地区热力 */}
            {major.employmentStats[0]?.cityDistribution && (
              <Card>
                <CardHeader><CardTitle>就业地区分布</CardTitle></CardHeader>
                <CardContent className="h-72">
                  <RegionHeatmap cities={major.employmentStats[0].cityDistribution} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* 职业路径 */}
          <Card>
            <CardHeader><CardTitle>职业发展路径</CardTitle><CardDescription>从入门到专家的成长阶梯</CardDescription></CardHeader>
            <CardContent>
              <CareerPathTimeline paths={major.careerPaths} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== 职业预览 ===== */}
        <TabsContent value="careers" className="space-y-6">
          {major.careerDays && major.careerDays.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {major.careerDays.map((cd) => (
                <Link key={cd.id} href={`/careers/${cd.id}`}>
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">{cd.title}</CardTitle>
                      <CardDescription>{cd.industry} · {cd.city} · {cd.experience}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm">
                        <span>满意度</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className={`h-1.5 w-3 rounded ${i < cd.satisfaction ? "bg-primary" : "bg-muted"}`} />
                          ))}
                        </div>
                        <span className="font-medium">{cd.satisfaction}/10</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                该专业暂无职业预览数据
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MajorSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-5 w-96" />
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
    </div>
  )
}
