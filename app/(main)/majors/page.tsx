"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MAJOR_CATEGORIES } from "@/lib/constants"
import { Search, BookOpen, TrendingUp, AlertTriangle } from "lucide-react"
import type { MajorSummary } from "@/types"

export default function MajorsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["majors", search, category],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      if (category && category !== "all") params.set("category", category)
      const res = await fetch(`/api/majors?${params}`)
      return res.json() as Promise<{ data: MajorSummary[]; total: number }>
    },
  })

  const getAiRiskLabel = (level: number) => {
    const labels: Record<number, { text: string; className: string }> = {
      1: { text: "极低风险", className: "bg-green-100 text-green-800" },
      2: { text: "低风险", className: "bg-emerald-100 text-emerald-800" },
      3: { text: "中等风险", className: "bg-yellow-100 text-yellow-800" },
      4: { text: "较高风险", className: "bg-orange-100 text-orange-800" },
      5: { text: "高风险", className: "bg-red-100 text-red-800" },
    }
    return labels[level] || { text: "未知", className: "bg-gray-100" }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">专业认知百科</h1>
        <p className="text-muted-foreground">深入了解每一个专业，不再凭名字做选择</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索专业名称或关键词..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={(v) => setCategory(v || "")}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="全部学科门类" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部学科门类</SelectItem>
            {MAJOR_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}><CardHeader><Skeleton className="h-6 w-32" /><Skeleton className="h-4 w-full mt-2" /></CardHeader></Card>
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">共 {data?.total || 0} 个专业</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data.map((major) => (
              <Link key={major.id} href={`/majors/${major.id}`}>
                <Card className="h-full transition-shadow hover:shadow-md cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          {major.name}
                        </CardTitle>
                        <CardDescription className="mt-1">{major.degree} · {major.category}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <Badge variant="secondary" className="text-xs">{major.category}</Badge>
                      {major.employmentRate && (
                        <Badge variant="outline" className="text-xs gap-1">
                          <TrendingUp className="h-3 w-3" />
                          就业率 {major.employmentRate}%
                        </Badge>
                      )}
                      <Badge className={`text-xs ${getAiRiskLabel(major.aiRiskLevel).className}`}>
                        <AlertTriangle className="h-3 w-3 mr-0.5" />
                        {getAiRiskLabel(major.aiRiskLevel).text}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
