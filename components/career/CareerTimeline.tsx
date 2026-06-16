"use client"
import { Coffee, Sun, Moon, Briefcase, Utensils, Dumbbell, Home, Bus } from "lucide-react"
import type { TimelineItem } from "@/types"

const ICON_MAP: Record<string, React.ElementType> = {
  coffee: Coffee, sun: Sun, moon: Moon, work: Briefcase, food: Utensils,
  gym: Dumbbell, home: Home, bus: Bus, default: Clock2,
}

import { Clock as Clock2 } from "lucide-react"

export function CareerTimeline({ timeline }: { timeline: TimelineItem[] }) {
  return (
    <div className="relative">
      {timeline.map((item, i) => {
        const Icon = ICON_MAP[item.icon || "default"] || Clock2
        return (
          <div key={i} className="flex gap-4 pb-4 relative">
            {i < timeline.length - 1 && (
              <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-border" />
            )}
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <span className="text-sm font-semibold text-primary tabular-nums">{item.time}</span>
              <p className="text-sm text-muted-foreground mt-0.5">
                {item.activity}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
