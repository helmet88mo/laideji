"use client"
import { Badge } from "@/components/ui/badge"
import { CAREER_LEVEL_LABELS } from "@/lib/constants"
import type { CareerPathItem } from "@/types"

export function CareerPathTimeline({ paths }: { paths: CareerPathItem[] }) {
  return (
    <div className="relative">
      {paths.map((path, i) => (
        <div key={path.id} className="flex gap-4 pb-6 relative">
          {/* Timeline line */}
          {i < paths.length - 1 && (
            <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-border" />
          )}
          {/* Dot */}
          <div className="relative z-10 mt-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background shrink-0" />
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{path.title}</h4>
              <Badge variant="outline" className="text-xs">
                {CAREER_LEVEL_LABELS[path.level] || path.level}
              </Badge>
            </div>
            <p className="text-sm font-medium text-primary mb-1">{path.salary}</p>
            <div className="flex flex-wrap gap-1">
              {path.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
