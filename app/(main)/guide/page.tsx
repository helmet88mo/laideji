"use client"

import { useAuth } from "@/lib/client-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Circle, Clock, Compass, BookOpen, Briefcase, GraduationCap, Car, ChefHat, Target, Users } from "lucide-react"
import { GUIDE_PHASES } from "@/lib/constants"
import Link from "next/link"

const PHASE_ICONS: Record<string, React.ElementType> = {
  know_major: BookOpen, preview_careers: Briefcase, english_keep: GraduationCap,
  drivers_license: Car, life_skills: ChefHat, set_goals: Target,
  know_school: GraduationCap, know_curriculum: BookOpen, connect_seniors: Users,
  set_semester_goals: Target, gpa_awareness: CheckCircle, club_limit: Users,
}

export default function GuidePage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">新手引导</h1>
        <p className="text-muted-foreground max-w-2xl">
          从高考结束到大学入学，每一步都有指引。不做迷失的新生，从今天开始。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(GUIDE_PHASES).map(([phaseKey, phase]) => (
          <Card key={phaseKey} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Compass className="h-5 w-5 text-primary" />
                <Badge>{phaseKey === "post_gaokao" ? "高考后" : "大一上"}</Badge>
              </div>
              <CardTitle>{phase.title}</CardTitle>
              <CardDescription>{phase.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {phase.tasks.map((task, i) => {
                  const Icon = PHASE_ICONS[task.taskId] || Circle
                  return (
                    <div key={task.taskId}>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <Badge variant="outline" className="text-xs gap-1">
                              <Clock className="h-3 w-3" />{task.duration}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{task.description}</p>
                        </div>
                      </div>
                      {i < phase.tasks.length - 1 && <Separator className="mt-3" />}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!user && (
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="py-6 text-center">
            <p className="mb-3 text-muted-foreground">登录后可以追踪你的引导进度</p>
            <Link href="/login">
              <Button>立即登录</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
