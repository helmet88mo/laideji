"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Star } from "lucide-react"
import type { CareerDaySummary } from "@/types"

export default function CareersPage() {
  const [search, setSearch] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const res = await fetch("/api/careers")
      return res.json() as Promise<{ data: CareerDaySummary[] }>
    },
  })

  const filtered = data?.data.filter((c) => {
    if (!search) return true
    const q = search.toLowerCase()
    return c.title.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q) || c.city.includes(q)
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">职业一天预览</h1>
        <p className="text-muted-foreground">看到每个岗位真实的一天——从起床到入睡，从工资到房租，从开心到烦恼</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索岗位、行业或城市..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}><CardHeader><Skeleton className="h-6 w-32" /><Skeleton className="h-4 w-48" /></CardHeader></Card>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered?.map((career) => (
            <Link key={career.id} href={`/careers/${career.id}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{career.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {career.industry} · {career.city} · {career.experience}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(career.satisfaction / 2) ? "fill-primary text-primary" : "text-muted"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{career.satisfaction}/10</span>
                  </div>
                  {career.majorName && (
                    <Badge variant="secondary" className="text-xs mt-2">{career.majorName}</Badge>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
