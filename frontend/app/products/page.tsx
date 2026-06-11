'use client'

import { Navbar } from '@/components/navbar'
import { ProductsContent } from '@/components/products/products-content'

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <ProductsContent />
      </div>
    </main>
  )
}
