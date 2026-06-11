'use client'

import { Navbar } from '@/components/navbar'
import { DashboardContent } from '@/components/dashboard/dashboard-content'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <DashboardContent />
      </div>
    </main>
  )
}
