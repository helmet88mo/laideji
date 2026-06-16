"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { Sparkles } from "lucide-react"
import { HOLLAND_QUESTIONS, HOLLAND_LABELS } from "@/lib/constants"
import type { HollandResult } from "@/types"

export default function AssessmentPage() {
  const [started, setStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [finished, setFinished] = useState(false)

  const questions = HOLLAND_QUESTIONS
  const totalQuestions = questions.length

  const handleAnswer = (dimension: string, value: number) => {
    const key = dimension
    setScores((prev) => {
      const current = prev[key] || 0
      return { ...prev, [key]: current + value }
    })
    if (currentQ + 1 < totalQuestions) {
      setCurrentQ(currentQ + 1)
    } else {
      setFinished(true)
    }
  }

  // Calculate results (max score per dimension = 5 questions × 5 options = 25, normalize to 100)
  const getResult = (): HollandResult => {
    const dims = ["R", "I", "A", "S", "E", "C"]
    const result: Record<string, number> = {}
    for (const d of dims) {
      result[d] = Math.round(((scores[d] || 0) / 25) * 100)
    }
    return result as unknown as HollandResult
  }

  const result = finished ? getResult() : null
  const radarData = result
    ? Object.entries(result).map(([key, value]) => ({
        dimension: HOLLAND_LABELS[key]?.label || key,
        value,
      }))
    : []

  const topTypes = result
    ? Object.entries(result)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([key]) => key)
    : []

  if (!started) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">霍兰德职业兴趣测评</CardTitle>
            <CardDescription className="text-base">
              通过 30 道题了解你的职业兴趣倾向，帮你找到最适合的专业方向
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="grid grid-cols-3 gap-2 text-sm">
              {Object.entries(HOLLAND_LABELS).map(([key, val]) => (
                <div key={key} className="p-2 rounded-lg bg-muted/50">
                  <div className="font-medium">{val.label}</div>
                  <div className="text-xs text-muted-foreground">{val.description}</div>
                </div>
              ))}
            </div>
            <Button size="lg" onClick={() => setStarted(true)} className="mt-4">
              开始测评（约 3 分钟）
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (finished && result) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">你的霍兰德测评结果</CardTitle>
            <CardDescription>分数越高代表该类型越符合你</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 13 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="你的得分" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">详细得分</h3>
              <div className="space-y-2">
                {Object.entries(result).sort(([, a], [, b]) => b - a).map(([key, value]) => {
                  const label = HOLLAND_LABELS[key]
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span className="w-20 text-sm font-medium" style={{ color: label?.color }}>{label?.label}</span>
                      <Progress value={value} className="flex-1" />
                      <span className="w-10 text-sm font-medium text-right">{value}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">适合你的方向</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                你的核心类型是{" "}
                <strong>{topTypes.map((t) => HOLLAND_LABELS[t]?.label).join(" + ")}</strong>
                。建议在「专业百科」中结合此结果进一步探索匹配的专业方向。
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => { setStarted(false); setCurrentQ(0); setScores({}); setFinished(false) }}>
                重新测评
              </Button>
              <Button onClick={() => window.location.href = "/majors"}>
                浏览匹配专业
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const q = questions[currentQ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">第 {currentQ + 1}/{totalQuestions} 题</Badge>
            <span className="text-xs text-muted-foreground">
              {HOLLAND_LABELS[q.dimension]?.label}
            </span>
          </div>
          <Progress value={((currentQ) / totalQuestions) * 100} className="mb-2" />
          <CardTitle className="text-xl">{q.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {[
              { label: "完全不符合", value: 1 },
              { label: "不太符合", value: 2 },
              { label: "一般", value: 3 },
              { label: "比较符合", value: 4 },
              { label: "完全符合", value: 5 },
            ].map((opt) => (
              <Button
                key={opt.value}
                variant="outline"
                className="h-auto py-3 flex flex-col items-center gap-1"
                onClick={() => handleAnswer(q.dimension, opt.value)}
              >
                <span className="text-lg">{opt.value}</span>
                <span className="text-xs text-muted-foreground">{opt.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
