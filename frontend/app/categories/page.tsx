'use client'

import { Navbar } from '@/components/navbar'
import { CategoriesContent } from '@/components/categories/categories-content'

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <CategoriesContent />
      </div>
    </main>
  )
}
