import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3 text-sm">探索方向</h3>
            <ul className="space-y-1.5">
              <li><Link href="/majors" className="text-sm text-muted-foreground hover:text-foreground">专业百科</Link></li>
              <li><Link href="/universities" className="text-sm text-muted-foreground hover:text-foreground">院校查询</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">职业预览</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">认识自己</h3>
            <ul className="space-y-1.5">
              <li><Link href="/assessment" className="text-sm text-muted-foreground hover:text-foreground">兴趣测评</Link></li>
              <li><Link href="/regrets" className="text-sm text-muted-foreground hover:text-foreground">后悔清单</Link></li>
              <li><Link href="/guide" className="text-sm text-muted-foreground hover:text-foreground">新手引导</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">规划落地</h3>
            <ul className="space-y-1.5">
              <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">个人仪表盘</Link></li>
              <li><Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground">我的档案</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-sm">关于</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              让每一个选择都被充分了解，让大学四年不再后悔。
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              © 2026 来得及 — 学业生涯规划
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
