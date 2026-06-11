'use client'

import { useState } from 'react'
import { Produit, Categorie, Fournisseur, productAPI } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import { Edit, Trash2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductsTableProps {
  products: Produit[]
  categories: Categorie[]
  suppliers: Fournisseur[]
  onRefresh: () => void
}

export function ProductsTable({
  products,
  categories,
  suppliers,
  onRefresh,
}: ProductsTableProps) {
  const [deleting, setDeleting] = useState<number | null>(null)

  const handleDelete = async (id: number | undefined) => {
    if (!id) return
    try {
      setDeleting(id)
      await productAPI.delete(id)
      onRefresh()
    } catch (error) {
      console.error('Failed to delete product:', error)
    } finally {
      setDeleting(null)
    }
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-12 text-center shadow-sm">
        <p className="text-secondary mb-2">No products found</p>
        <p className="text-xs text-secondary">Add your first product to get started</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">
                Supplier
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-secondary">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-secondary">
                Stock
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-secondary">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const isLowStock = product.quantiteStock <= product.quantiteMinimale
              return (
                <tr
                  key={product.id}
                  className="border-b border-border hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{product.nom}</p>
                      <p className="text-xs text-secondary mt-1">
                        {product.description || 'No description'}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {product.categorie?.nom || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {product.fournisseur?.nom || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right">
                    {formatCurrency(product.prixUnitaire)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right">
                    {product.quantiteStock}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {isLowStock ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
                        <AlertCircle className="w-3 h-3" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className={cn(
                        'p-2 rounded-lg hover:bg-blue-50 transition-colors',
                        'text-secondary hover:text-blue-600'
                      )}>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleting === product.id}
                        className={cn(
                          'p-2 rounded-lg hover:bg-red-50 transition-colors',
                          'text-secondary hover:text-red-600 disabled:opacity-50'
                        )}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
