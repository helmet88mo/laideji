"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import type { CityDistItem } from "@/types"

export function RegionHeatmap({ cities }: { cities: CityDistItem[] }) {
  const data = [...cities].sort((a, b) => b.ratio - a.ratio)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={(v) => `${v}%`} />
        <YAxis type="category" dataKey="city" width={60} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => [`${value}%`, "占比"]} />
        <Bar dataKey="ratio" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
