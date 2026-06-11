'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { supplierAPI } from '@/lib/api'
import { Plus, Edit, Trash2, Loader, Mail, Phone, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

async function suppliersFetcher() {
  return await supplierAPI.getAll()
}

export function SuppliersContent() {
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    telephone: '',
    email: '',
  })
  const { data: suppliers = [], isLoading, mutate } = useSWR('suppliers', suppliersFetcher)
  const [deleting, setDeleting] = useState<number | null>(null)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await supplierAPI.create({
        nom: formData.nom,
        adresse: formData.adresse,
        telephone: formData.telephone,
        email: formData.email,
      })
      setFormData({ nom: '', adresse: '', telephone: '', email: '' })
      setIsAdding(false)
      mutate()
    } catch (error) {
      console.error('Failed to add supplier:', error)
    }
  }

  const handleDelete = async (id: number | undefined) => {
    if (!id) return
    try {
      setDeleting(id)
      await supplierAPI.delete(id)
      mutate()
    } catch (error) {
      console.error('Failed to delete supplier:', error)
    } finally {
      setDeleting(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin text-primary" />
          <p className="text-secondary">Loading suppliers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Suppliers</h1>
        <p className="text-secondary">Manage your product suppliers</p>
      </div>

      <button
        onClick={() => setIsAdding(true)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg',
          'hover:bg-primary-dark transition-colors'
        )}
      >
        <Plus className="w-4 h-4" />
        Add Supplier
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add Form Card */}
        {isAdding && (
          <div className="bg-white rounded-lg border border-primary p-6 shadow-sm">
            <form onSubmit={handleAdd} className="space-y-4">
              <input
                type="text"
                placeholder="Supplier name"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
                className={cn(
                  'w-full px-3 py-2 bg-white border border-border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                )}
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={cn(
                  'w-full px-3 py-2 bg-white border border-border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                )}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className={cn(
                  'w-full px-3 py-2 bg-white border border-border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                )}
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.adresse}
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                className={cn(
                  'w-full px-3 py-2 bg-white border border-border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                )}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className={cn(
                    'flex-1 px-4 py-2 rounded-lg bg-primary text-white',
                    'hover:bg-primary-dark transition-colors'
                  )}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false)
                    setFormData({ nom: '', adresse: '', telephone: '', email: '' })
                  }}
                  className={cn(
                    'flex-1 px-4 py-2 rounded-lg border border-border',
                    'hover:bg-gray-50 transition-colors'
                  )}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Supplier Cards */}
        {suppliers.map((supplier: any) => (
          <div
            key={supplier.id}
            className="bg-white rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">{supplier.nom}</h3>
            <div className="space-y-3 mb-4">
              {supplier.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-secondary break-all">{supplier.email}</p>
                </div>
              )}
              {supplier.telephone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-secondary">{supplier.telephone}</p>
                </div>
              )}
              {supplier.adresse && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-secondary">{supplier.adresse}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button className={cn(
                'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg',
                'text-secondary hover:bg-blue-50 hover:text-blue-600 transition-colors'
              )}>
                <Edit className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(supplier.id)}
                disabled={deleting === supplier.id}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg',
                  'text-secondary hover:bg-red-50 hover:text-red-600 transition-colors',
                  'disabled:opacity-50'
                )}
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {suppliers.length === 0 && !isAdding && (
        <div className="bg-white rounded-lg border border-border p-12 text-center shadow-sm">
          <p className="text-secondary mb-2">No suppliers found</p>
          <p className="text-xs text-secondary">Add your first supplier to get started</p>
        </div>
      )}
    </div>
  )
}
