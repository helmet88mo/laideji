"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[GlobalError]", error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-20 max-w-md text-center">
      <Card>
        <CardHeader>
          <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
          <CardTitle>页面出错了</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            抱歉，页面加载时遇到了问题。请稍后再试。
          </p>
          <Button onClick={reset} variant="outline">
            重试
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
