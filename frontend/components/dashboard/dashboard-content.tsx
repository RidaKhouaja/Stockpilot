'use client'

import useSWR from 'swr'
import { statisticsAPI } from '@/lib/api'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { StatisticsCard } from './statistics-card'
import { StockChart } from './stock-chart'
import { TopProductsChart } from './top-products-chart'
import { Loader } from 'lucide-react'

async function fetcher() {
  return await statisticsAPI.getStats()
}

export function DashboardContent() {
  const { data: stats, error, isLoading } = useSWR('statistics', fetcher)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin text-primary" />
          <p className="text-secondary">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Connection Error</h3>
        <p className="text-red-700 mb-4">
          Unable to connect to the backend API. Please ensure the server is running.
        </p>
        <p className="text-sm text-red-600">
          Expected API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-secondary">Welcome to your inventory management dashboard</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard
          title="Total Products"
          value={formatNumber(stats?.totalProduits || 0)}
          icon="package"
          color="blue"
        />
        <StatisticsCard
          title="Stock Value"
          value={formatCurrency(stats?.valeurTotalStock || 0)}
          icon="dollar"
          color="green"
        />
        <StatisticsCard
          title="Low Stock Items"
          value={formatNumber(stats?.stockBasPrix || 0)}
          icon="alert"
          color="warning"
        />
        <StatisticsCard
          title="Recent Movements"
          value={formatNumber(stats?.mouvementsDerniers7Jours || 0)}
          icon="trend"
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StockChart data={stats?.mouvementsParJour || []} />
        <TopProductsChart
          bestProduct={stats?.meilleurProduit}
          worstProduct={stats?.pirePerformance}
          categories={stats?.topCategories || []}
        />
      </div>
    </div>
  )
}
