"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, MapPin, GraduationCap } from "lucide-react"
import { UNIVERSITY_LEVELS, UNIVERSITY_TYPES, PROVINCES } from "@/lib/constants"
import type { UniversitySummary } from "@/types"

export default function UniversitiesPage() {
  const [search, setSearch] = useState("")
  const [level, setLevel] = useState("")
  const [type, setType] = useState("")
  const [province, setProvince] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["universities", level, type, province],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (level && level !== "all") params.set("level", level)
      if (type && type !== "all") params.set("type", type)
      if (province && province !== "all") params.set("province", province)
      if (search) params.set("search", search)
      const res = await fetch(`/api/universities?${params}`)
      return res.json() as Promise<{ data: UniversitySummary[]; total: number }>
    },
  })

  const getLevelBadge = (level: string) => {
    const found = UNIVERSITY_LEVELS.find((l) => l.value === level)
    if (!found) return <Badge variant="outline">{level}</Badge>
    return <Badge className={found.color}>{found.label}</Badge>
  }

  const filtered = data?.data.filter((u) => {
    if (!search) return true
    return u.name.includes(search) || u.city.includes(search)
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">院校查询</h1>
        <p className="text-muted-foreground">按层次、地区、类型筛选院校</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索院校名称或城市..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={level} onValueChange={(v) => setLevel(v || "")}>
          <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="层次" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部层次</SelectItem>
            {UNIVERSITY_LEVELS.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={province} onValueChange={(v) => setProvince(v || "")}>
          <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="省份" /></SelectTrigger>
          <SelectContent className="max-h-60">
            <SelectItem value="all">全部省份</SelectItem>
            {PROVINCES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}><CardHeader><Skeleton className="h-6 w-32" /><Skeleton className="h-4 w-48" /></CardHeader></Card>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered?.map((uni) => (
            <Link key={uni.id} href={`/universities/${uni.id}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    {uni.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    {getLevelBadge(uni.level)}
                    <Badge variant="outline">{uni.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{uni.province} {uni.city}</span>
                    {uni.baoYanRate && <span>保研率 {uni.baoYanRate}%</span>}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
