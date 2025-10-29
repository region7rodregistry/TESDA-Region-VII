"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import {
  getAnalyticsSummary,
  getPageViewsByPath,
  getCTAClicksByButton,
  getContactInteractions,
  getTimeSeriesData,
  type AnalyticsSummary,
  type PageViewData,
  type CTAClickData,
  type ContactInteractionData,
  type TimeSeriesData,
} from "@/lib/analytics"
import {
  Eye,
  MousePointerClick,
  Mail,
  TrendingUp,
  Activity,
  BarChart3,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnalyticsSection() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [pageViews, setPageViews] = useState<PageViewData[]>([])
  const [ctaClicks, setCTAClicks] = useState<CTAClickData[]>([])
  const [contactInteractions, setContactInteractions] = useState<ContactInteractionData[]>([])
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadAnalyticsData = async () => {
    try {
      const [summaryData, pageViewsData, ctaClicksData, contactData, timeSeriesData] =
        await Promise.all([
          getAnalyticsSummary(),
          getPageViewsByPath(10),
          getCTAClicksByButton(10),
          getContactInteractions(),
          getTimeSeriesData(7),
        ])

      setSummary(summaryData)
      setPageViews(pageViewsData)
      setCTAClicks(ctaClicksData)
      setContactInteractions(contactData)
      setTimeSeriesData(timeSeriesData)
    } catch (err) {
      console.error("Failed to load analytics data:", err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadAnalyticsData()
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    loadAnalyticsData()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your website performance and user engagement
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2"
          variant="outline"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Page Views"
          value={summary?.totalPageViews || 0}
          subtitle={`${summary?.viewsLast24h || 0} in last 24h`}
          icon={<Eye className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="CTA Clicks"
          value={summary?.totalCTAClicks || 0}
          subtitle={`${summary?.ctaClicksLast24h || 0} in last 24h`}
          icon={<MousePointerClick className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Contact Submissions"
          value={summary?.totalContactSubmissions || 0}
          subtitle="Total form submissions"
          icon={<Mail className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          title="Engagement Rate"
          value={
            summary?.totalPageViews
              ? `${Math.round(
                  ((summary.totalCTAClicks + summary.totalContactSubmissions) /
                    summary.totalPageViews) *
                    100
                )}%`
              : "0%"
          }
          subtitle="Clicks + Submissions / Views"
          icon={<TrendingUp className="w-6 h-6" />}
          color="orange"
        />
      </div>

      {/* Time Series Chart */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            7-Day Activity Trend
          </h3>
        </div>
        <div className="space-y-3">
          {timeSeriesData.map((data, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {new Date(data.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <div className="flex gap-4 text-xs">
                  <span className="text-blue-600 dark:text-blue-400">
                    {data.page_views} views
                  </span>
                  <span className="text-green-600 dark:text-green-400">
                    {data.cta_clicks} clicks
                  </span>
                  <span className="text-purple-600 dark:text-purple-400">
                    {data.contact_submissions} submissions
                  </span>
                </div>
              </div>
              <div className="flex gap-1 h-8">
                <div
                  className="bg-blue-500 rounded transition-all"
                  style={{
                    width: `${(data.page_views / Math.max(...timeSeriesData.map(d => d.page_views), 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Top Pages</h3>
          </div>
          <div className="space-y-3">
            {pageViews.length > 0 ? (
              pageViews.map((page, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {page.page_name || page.page_path}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {page.page_path}
                    </p>
                  </div>
                  <span className="ml-4 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                    {page.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No page view data yet
              </p>
            )}
          </div>
        </Card>

        {/* CTA Button Performance */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MousePointerClick className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              CTA Button Performance
            </h3>
          </div>
          <div className="space-y-3">
            {ctaClicks.length > 0 ? (
              ctaClicks.map((cta, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{cta.button_text}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {cta.button_link}
                    </p>
                  </div>
                  <span className="ml-4 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                    {cta.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No CTA click data yet
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Contact Interactions */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Contact Form Interactions
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactInteractions.length > 0 ? (
            contactInteractions.map((interaction, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg"
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 capitalize">
                  {interaction.interaction_type.replace("_", " ")}
                </p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {interaction.count}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8 col-span-3">
              No contact interaction data yet
            </p>
          )}
        </div>
      </Card>

      {/* Setup Instructions */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
          📊 Setup Instructions
        </h3>
        <div className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
          <p>
            To start collecting analytics data, run the SQL schema in your Supabase dashboard:
          </p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Open your Supabase project dashboard</li>
            <li>Go to SQL Editor</li>
            <li>Copy the contents of <code className="bg-white dark:bg-gray-800 px-1 py-0.5 rounded">schema-analytics.sql</code></li>
            <li>Paste and run the SQL commands</li>
            <li>The tracking will automatically start working!</li>
          </ol>
        </div>
      </Card>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: React.ReactNode
  color: "blue" | "green" | "purple" | "orange"
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 text-white",
    green: "from-green-500 to-green-600 text-white",
    purple: "from-purple-500 to-purple-600 text-white",
    orange: "from-orange-500 to-orange-600 text-white",
  }

  return (
    <Card className="overflow-hidden">
      <div className={`bg-gradient-to-br ${colorClasses[color]} p-4`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium opacity-90">{title}</h3>
          {icon}
        </div>
        <p className="text-3xl font-bold mb-1">{value}</p>
        <p className="text-xs opacity-80">{subtitle}</p>
      </div>
    </Card>
  )
}

