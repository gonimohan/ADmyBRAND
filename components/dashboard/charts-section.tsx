"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 4000, users: 2400 },
  { month: "Feb", revenue: 3000, users: 1398 },
  { month: "Mar", revenue: 2000, users: 9800 },
  { month: "Apr", revenue: 2780, users: 3908 },
  { month: "May", revenue: 1890, users: 4800 },
  { month: "Jun", revenue: 2390, users: 3800 },
  { month: "Jul", revenue: 3490, users: 4300 },
]

const conversionData = [
  { channel: "Organic", conversions: 4000, fill: "#3b82f6" },
  { channel: "Paid Social", conversions: 3000, fill: "#10b981" },
  { channel: "Email", conversions: 2000, fill: "#f59e0b" },
  { channel: "Direct", conversions: 2780, fill: "#ef4444" },
  { channel: "Referral", conversions: 1890, fill: "#8b5cf6" },
]

const pieData = [
  { name: "Desktop", value: 400, fill: "#3b82f6" },
  { name: "Mobile", value: 300, fill: "#10b981" },
  { name: "Tablet", value: 200, fill: "#f59e0b" },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3b82f6",
  },
  users: {
    label: "Users",
    color: "#10b981",
  },
  conversions: {
    label: "Conversions",
    color: "#f59e0b",
  },
}

export function ChartsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>
            Monthly revenue and user growth over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke={chartConfig.revenue.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.revenue.color }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke={chartConfig.users.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.users.color }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>
            Distribution of traffic by device type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="col-span-7">
        <CardHeader>
          <CardTitle>Conversions by Channel</CardTitle>
          <CardDescription>
            Compare conversion performance across different marketing channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="conversions" 
                fill={chartConfig.conversions.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
