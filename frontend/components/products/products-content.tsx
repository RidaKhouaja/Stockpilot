'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { productAPI, categoryAPI, supplierAPI } from '@/lib/api'
import { ProductsTable } from './products-table'
import { ProductFormModal } from './product-form-modal'
import { Plus, Search, Loader } from 'lucide-react'
import { cn } from '@/lib/utils'

async function productsFetcher() {
  return await productAPI.getAll(0, 100)
}

async function categoriesFetcher() {
  return await categoryAPI.getAll()
}

async function suppliersFetcher() {
  return await supplierAPI.getAll()
}

export function ProductsContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const { data: products = [], isLoading, error, mutate } = useSWR('products', productsFetcher)
  const { data: categories = [] } = useSWR('categories', categoriesFetcher)
  const { data: suppliers = [] } = useSWR('suppliers', suppliersFetcher)

  const filteredProducts = (Array.isArray(products.content) ? products.content : products).filter(
    (p: any) =>
      p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin text-primary" />
          <p className="text-secondary">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
        <p className="text-secondary">Manage your inventory products</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              'w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            )}
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg',
            'hover:bg-primary-dark transition-colors'
          )}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700">Failed to load products. Please try again.</p>
        </div>
      ) : (
        <ProductsTable
          products={filteredProducts}
          categories={categories}
          suppliers={suppliers}
          onRefresh={mutate}
        />
      )}

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        suppliers={suppliers}
        onSuccess={() => {
          setIsModalOpen(false)
          mutate()
        }}
      />
    </div>
  )
}
