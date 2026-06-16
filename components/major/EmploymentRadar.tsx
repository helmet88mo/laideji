"use client"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts"
import type { AbilityModel } from "@/types"

export function EmploymentRadar({ abilities }: { abilities: AbilityModel[] }) {
  const data = abilities.map((a) => ({ ability: a.name, value: a.value }))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid strokeDasharray="3 3" />
        <PolarAngleAxis dataKey="ability" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
        <Radar name="能力值" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}
