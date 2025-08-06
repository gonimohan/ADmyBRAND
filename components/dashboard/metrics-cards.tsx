import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, Target, TrendingUp, ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

// Mock data - in a real app, this would come from your database
const metricsData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "from last month"
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%",
    changeType: "positive" as const,
    icon: Users,
    description: "from last month"
  },
  {
    title: "Conversions",
    value: "12,234",
    change: "+19%",
    changeType: "positive" as const,
    icon: Target,
    description: "from last month"
  },
  {
    title: "Growth Rate",
    value: "573",
    change: "+201",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "since last hour"
  }
]

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metricsData.map((metric, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge 
                variant={metric.changeType === 'positive' ? 'default' : 'destructive'}
                className={`flex items-center space-x-1 ${
                  metric.changeType === 'positive' 
                    ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                    : 'bg-red-100 text-red-700 hover:bg-red-100'
                }`}
              >
                {metric.changeType === 'positive' ? (
                  <ArrowUpIcon className="h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3" />
                )}
                <span>{metric.change}</span>
              </Badge>
              <span>{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
