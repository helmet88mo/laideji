"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { GraduationCap, MapPin, TrendingUp, BookOpen } from "lucide-react"
import { UNIVERSITY_LEVELS } from "@/lib/constants"

export default function UniversityDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: uni, isLoading } = useQuery({
    queryKey: ["university", id],
    queryFn: async () => {
      const res = await fetch(`/api/universities/${id}`)
      if (!res.ok) throw new Error("Not found")
      return res.json()
    },
  })

  if (isLoading) return <div className="container py-8"><Skeleton className="h-10 w-64 mb-4" /><Skeleton className="h-40 w-full" /></div>
  if (!uni) return <div className="container py-12 text-center">院校未找到</div>

  const levelBadge = UNIVERSITY_LEVELS.find((l) => l.value === uni.level)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/universities" className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block">← 返回院校列表</Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          {uni.name}
        </h1>
        <div className="flex flex-wrap gap-2 mt-3">
          {levelBadge && <Badge className={levelBadge.color}>{levelBadge.label}</Badge>}
          <Badge variant="outline">{uni.type}</Badge>
          <Badge variant="outline" className="gap-1"><MapPin className="h-3 w-3" />{uni.province} {uni.city}</Badge>
          {uni.baoYanRate && <Badge variant="secondary" className="gap-1"><TrendingUp className="h-3 w-3" />保研率 {uni.baoYanRate}%</Badge>}
        </div>
      </div>

      {uni.description && (
        <Card className="mb-6">
          <CardHeader><CardTitle>院校简介</CardTitle></CardHeader>
          <CardContent><p className="leading-relaxed text-muted-foreground">{uni.description}</p></CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" />开设专业</CardTitle>
          <CardDescription>共 {uni.majors?.length || 0} 个专业</CardDescription>
        </CardHeader>
        <CardContent>
          {uni.majors?.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {uni.majors.map((um: { id: string; major: { id: string; name: string; category: string; degree: string }; admissionScore?: number; admissionRank?: number; year?: number }) => (
                <Link key={um.id} href={`/majors/${um.major.id}`}>
                  <Card className="transition-shadow hover:shadow-md cursor-pointer">
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">{um.major.name}</CardTitle>
                      <CardDescription>{um.major.degree} · {um.major.category}</CardDescription>
                      {um.admissionScore && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {um.year}年录取分: {um.admissionScore} (位次: {um.admissionRank})
                        </p>
                      )}
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">暂无专业数据</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
