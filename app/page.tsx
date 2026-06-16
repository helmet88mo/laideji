import Link from "next/link"
import { ArrowRight, BookOpen, Briefcase, Compass, GraduationCap, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const FEATURES = [
  {
    href: "/majors",
    icon: BookOpen,
    title: "专业认知百科",
    description: "深入了解每个专业学什么、难在哪、将来能做什么——不再凭名字选专业",
    badge: "核心",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950",
  },
  {
    href: "/careers",
    icon: Briefcase,
    title: "职业一天预览",
    description: "看到每个岗位真实的一天——从起床到入睡，从工资到房租，从开心到烦恼",
    badge: "独家",
    color: "text-amber-600 bg-amber-50 dark:bg-amber-950",
  },
  {
    href: "/regrets",
    icon: Heart,
    title: "大学后悔清单",
    description: "学长学姐最真实的遗憾——每一个都标注了'你现在还来得及'",
    badge: "热门",
    color: "text-rose-600 bg-rose-50 dark:bg-rose-950",
  },
  {
    href: "/guide",
    icon: Compass,
    title: "新手引导",
    description: "从高考后暑假到大一入学——每一步都有指引，不做迷失的新生",
    badge: "入门",
    color: "text-green-600 bg-green-50 dark:bg-green-950",
  },
  {
    href: "/universities",
    icon: GraduationCap,
    title: "院校查询",
    description: "按层次、地区、类型筛选院校——找到最适合你的那一所",
    color: "text-purple-600 bg-purple-50 dark:bg-purple-950",
  },
  {
    href: "/assessment",
    icon: Sparkles,
    title: "自我认知测评",
    description: "霍兰德职业兴趣测评——先了解自己，再做选择",
    color: "text-teal-600 bg-teal-50 dark:bg-teal-950",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 text-sm">
            从高考志愿到职场入口，跨越 6 年的陪伴
          </Badge>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            让每一个选择
            <span className="text-primary block md:inline"> 都被充分了解</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            我们不做决定，我们让 18 岁的你，提前看到 22 岁、26 岁、30 岁可能面对的生活。
            减少迷茫，减少后悔——<strong>因为信息差和时间差，不该成为你人生的代价。</strong>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/majors">
              <Button size="lg" className="gap-2 text-base">
                开始探索 <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/guide">
              <Button size="lg" variant="outline" className="gap-2 text-base">
                我是新生 <Compass className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: "100+", label: "专业深度解析" },
            { value: "50+", label: "职业一天预览" },
            { value: "200+", label: "真实后悔故事" },
            { value: "12", label: "新手引导步骤" },
          ].map((stat) => (
            <Card key={stat.label} className="py-4">
              <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">六大核心板块</h2>
        <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          从"我能去哪"到"我该如何走"，全周期覆盖你的学业生涯
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <Link key={f.href} href={f.href} className="group">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${f.color}`}>
                      <f.icon className="h-5 w-5" />
                    </div>
                    {f.badge && <Badge variant="secondary" className="text-xs">{f.badge}</Badge>}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {f.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {f.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12 mb-8">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="py-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              四年后的你，会感谢今天的选择
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
              从现在开始，每一步都算数。让"如果我当时……就好了"变成"幸好我当时……"
            </p>
            <Link href="/guide">
              <Button variant="secondary" size="lg" className="gap-2">
                开始我的大学规划 <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
