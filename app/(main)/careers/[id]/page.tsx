"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { CareerTimeline } from "@/components/career/CareerTimeline"
import { Clock, DollarSign, Home, Smile, Frown, Lightbulb, Star, Briefcase, MapPin } from "lucide-react"
import type { CareerDayDetail } from "@/types"

export default function CareerDayDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: career, isLoading } = useQuery({
    queryKey: ["career", id],
    queryFn: async () => {
      const res = await fetch(`/api/careers/${id}`)
      if (!res.ok) throw new Error("Not found")
      return res.json() as Promise<CareerDayDetail>
    },
  })

  if (isLoading) return <CareerSkeleton />
  if (!career) return <div className="container py-12 text-center">职业预览未找到</div>

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block">← 返回职业列表</Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{career.title}</h1>
        <div className="flex flex-wrap gap-2 text-muted-foreground">
          <Badge variant="outline" className="gap-1"><Briefcase className="h-3 w-3" />{career.industry}</Badge>
          <Badge variant="outline" className="gap-1"><MapPin className="h-3 w-3" />{career.city}</Badge>
          <Badge variant="outline">{career.experience}</Badge>
          <Badge variant="outline">{career.education}</Badge>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm">职业满意度</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < career.satisfaction ? "fill-primary text-primary" : "text-muted"}`} />
            ))}
          </div>
          <span className="font-bold text-lg">{career.satisfaction}/10</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left - Timeline */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />24 小时时间线</CardTitle>
              <CardDescription>一个普通工作日的时间记录</CardDescription>
            </CardHeader>
            <CardContent>
              <CareerTimeline timeline={career.timeline} />
            </CardContent>
          </Card>
        </div>

        {/* Right - Info */}
        <div className="space-y-4">
          {/* Salary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><DollarSign className="h-4 w-4" />收入</CardTitle>
            </CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">{career.salary}</p></CardContent>
          </Card>

          {/* Expense */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Home className="h-4 w-4" />支出</CardTitle>
            </CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">{career.expense}</p></CardContent>
          </Card>

          {/* Joy */}
          <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-green-700 dark:text-green-400">
                <Smile className="h-4 w-4" />这个月最开心的事
              </CardTitle>
            </CardHeader>
            <CardContent><p className="text-sm">{career.monthlyJoy}</p></CardContent>
          </Card>

          {/* Worry */}
          <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-red-700 dark:text-red-400">
                <Frown className="h-4 w-4" />这个月最烦的事
              </CardTitle>
            </CardHeader>
            <CardContent><p className="text-sm">{career.monthlyWorry}</p></CardContent>
          </Card>
        </div>
      </div>

      {/* Advice */}
      <Card className="mt-6 border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />给大学时的自己一句忠告
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium italic leading-relaxed">"{career.adviceToSelf}"</p>
        </CardContent>
      </Card>
    </div>
  )
}

function CareerSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      <Skeleton className="h-10 w-64" />
      <div className="grid md:grid-cols-3 gap-6">
        <Skeleton className="h-96 md:col-span-2" />
        <div className="space-y-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    </div>
  )
}
