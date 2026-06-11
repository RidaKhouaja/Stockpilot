'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Produit } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'

interface TopProductsChartProps {
  bestProduct: Produit | null | undefined
  worstProduct: Produit | null | undefined
  categories: Array<{
    nom: string
    valeur: number
  }>
}

export function TopProductsChart({
  bestProduct,
  worstProduct,
  categories,
}: TopProductsChartProps) {
  const chartData = categories.slice(0, 6)

  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Top Categories
        </h3>
        <div className="h-64 flex items-center justify-center text-secondary">
          No data available
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Top Categories by Value</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="nom"
            stroke="#64748b"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
            }}
            formatter={(value) => formatCurrency(value as number)}
          />
          <Bar
            dataKey="valeur"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
            name="Total Value"
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Best and Worst Products */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {bestProduct && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-xs font-medium text-green-700 mb-1">Best Product</p>
            <p className="font-semibold text-foreground text-sm truncate">
              {bestProduct.nom}
            </p>
            <p className="text-xs text-secondary mt-1">
              Stock: {bestProduct.quantiteStock}
            </p>
          </div>
        )}
        {worstProduct && (
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="text-xs font-medium text-red-700 mb-1">Needs Attention</p>
            <p className="font-semibold text-foreground text-sm truncate">
              {worstProduct.nom}
            </p>
            <p className="text-xs text-secondary mt-1">
              Stock: {worstProduct.quantiteStock}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
