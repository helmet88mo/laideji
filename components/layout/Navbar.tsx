"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, GraduationCap, BookOpen, Briefcase, Heart, Compass, User, Calendar } from "lucide-react"
import { useState } from "react"

const NAV_LINKS = [
  { href: "/plan", label: "学期规划", icon: Calendar },
  { href: "/majors", label: "专业百科", icon: BookOpen },
  { href: "/universities", label: "院校查询", icon: GraduationCap },
  { href: "/careers", label: "职业预览", icon: Briefcase },
  { href: "/regrets", label: "后悔清单", icon: Heart },
  { href: "/guide", label: "新手引导", icon: Compass },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-primary">来得及</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">— 学业生涯规划</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link key={link.href} href={link.href}>
                <Button variant={isActive ? "secondary" : "ghost"} size="sm" className="gap-1.5">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-sm">
                    {(session.user.name || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm font-medium">{session.user.name || session.user.email}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  个人仪表盘
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  我的档案
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>退出登录</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" className="gap-1.5">
                <User className="h-4 w-4" />
                登录
              </Button>
            </Link>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 pt-12">
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname.startsWith(link.href)
                  return (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                      <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start gap-3">
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Button>
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
