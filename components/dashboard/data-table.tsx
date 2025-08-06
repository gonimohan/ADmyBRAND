"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Download, Filter, ArrowUpDown } from 'lucide-react'

// Mock data for the table
const tableData = [
  {
    id: 1,
    date: "2024-01-15",
    campaign: "Summer Sale 2024",
    channel: "Google Ads",
    impressions: 12500,
    clicks: 850,
    conversions: 42,
    revenue: 2100.50,
    status: "Active"
  },
  {
    id: 2,
    date: "2024-01-14",
    campaign: "Brand Awareness",
    channel: "Facebook Ads",
    impressions: 8900,
    clicks: 320,
    conversions: 18,
    revenue: 900.25,
    status: "Active"
  },
  {
    id: 3,
    date: "2024-01-13",
    campaign: "Product Launch",
    channel: "Instagram Ads",
    impressions: 15600,
    clicks: 1200,
    conversions: 65,
    revenue: 3250.75,
    status: "Completed"
  },
  {
    id: 4,
    date: "2024-01-12",
    campaign: "Retargeting Campaign",
    channel: "Google Ads",
    impressions: 5400,
    clicks: 480,
    conversions: 28,
    revenue: 1400.00,
    status: "Active"
  },
  {
    id: 5,
    date: "2024-01-11",
    campaign: "Email Newsletter",
    channel: "Email",
    impressions: 25000,
    clicks: 2100,
    conversions: 95,
    revenue: 4750.25,
    status: "Completed"
  },
]

type SortField = 'date' | 'campaign' | 'channel' | 'impressions' | 'clicks' | 'conversions' | 'revenue'
type SortDirection = 'asc' | 'desc'

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [channelFilter, setChannelFilter] = useState("all")
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter data based on search and filters
  const filteredData = tableData.filter(item => {
    const matchesSearch = item.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.channel.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesChannel = channelFilter === "all" || item.channel.toLowerCase() === channelFilter.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesChannel
  })

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = (bValue as string).toLowerCase()
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleExport = () => {
    // In a real app, this would generate and download a CSV file
    console.log('Exporting data...', sortedData)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
        <CardDescription>
          Detailed view of all your marketing campaigns and their performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search campaigns or channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="google ads">Google Ads</SelectItem>
              <SelectItem value="facebook ads">Facebook Ads</SelectItem>
              <SelectItem value="instagram ads">Instagram Ads</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('date')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('campaign')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Campaign
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('channel')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Channel
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('impressions')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Impressions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('clicks')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Clicks
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('conversions')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Conversions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('revenue')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Revenue
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{row.campaign}</TableCell>
                  <TableCell>{row.channel}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.impressions)}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.clicks)}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.conversions)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(row.revenue)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={row.status === 'Active' ? 'default' : 'secondary'}
                      className={row.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
