"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { CITY_TIERS } from "@/lib/constants"
import type { SalaryItem } from "@/types"

export function SalaryCurve({ salaries }: { salaries: SalaryItem[] }) {
  const data = [
    { name: "应届", year0: 0, year3: 0, year5: 0, year10: 0, ...Object.fromEntries(salaries.map((s) => [`${s.cityTier}_0`, s.year0, `${s.cityTier}_3`, s.year3, `${s.cityTier}_5`, s.year5, `${s.cityTier}_10`, s.year10])) },
    { name: "3年" },
    { name: "5年" },
    { name: "10年" },
  ]

  // Build data properly
  const chartData = [
    { name: "应届", ...Object.fromEntries(salaries.map((s) => [s.cityTier, s.year0])) },
    { name: "3年", ...Object.fromEntries(salaries.map((s) => [s.cityTier, s.year3])) },
    { name: "5年", ...Object.fromEntries(salaries.map((s) => [s.cityTier, s.year5])) },
    { name: "10年", ...Object.fromEntries(salaries.map((s) => [s.cityTier, s.year10])) },
  ]

  const colors: Record<string, string> = { tier1: "hsl(var(--primary))", tier2: "#f59e0b", tier3: "#6b7280" }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(v) => `${v}万`} />
        <Tooltip formatter={(value) => [`${value}万元/年`, ""]} />
        <Legend formatter={(value: string) => CITY_TIERS[value] || value} />
        {salaries.map((s) => (
          <Line
            key={s.cityTier}
            type="monotone"
            dataKey={s.cityTier}
            stroke={colors[s.cityTier] || "#888"}
            strokeWidth={2}
            dot={{ r: 4 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
