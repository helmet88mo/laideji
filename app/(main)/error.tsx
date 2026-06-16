"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[MainError]", error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-20 max-w-md text-center">
      <Card>
        <CardHeader>
          <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
          <CardTitle>内容加载失败</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            数据暂时无法加载，请检查网络后重试。
          </p>
          <Button onClick={reset} variant="outline">
            重新加载
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
