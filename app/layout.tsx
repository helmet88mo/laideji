import type { Metadata, Viewport } from "next"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/layout/Providers"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#6366f1",
}

export const metadata: Metadata = {
  title: "来得及 — 学业生涯规划",
  description: "从高考志愿到职场入口，跨越6年的学业-职业生涯导航系统。让18岁的你，提前看到22岁、26岁、30岁的生活。",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/icon-192.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "来得及",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <meta name="apple-mobile-web-app-title" content="来得及" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <TooltipProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster richColors position="top-center" />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}
