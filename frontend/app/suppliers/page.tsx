'use client'

import { Navbar } from '@/components/navbar'
import { SuppliersContent } from '@/components/suppliers/suppliers-content'

export default function SuppliersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <SuppliersContent />
      </div>
    </main>
  )
}
