'use client'

import { useState } from 'react'
import { Categorie, Fournisseur, productAPI } from '@/lib/api'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  categories: Categorie[]
  suppliers: Fournisseur[]
  onSuccess: () => void
}

export function ProductFormModal({
  isOpen,
  onClose,
  categories,
  suppliers,
  onSuccess,
}: ProductFormModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prixUnitaire: '',
    quantiteStock: '',
    quantiteMinimale: '',
    categorie: '',
    fournisseur: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)

      const selectedCategory = categories.find((c) => c.id?.toString() === formData.categorie)
      const selectedSupplier = suppliers.find((s) => s.id?.toString() === formData.fournisseur)

      if (!selectedCategory || !selectedSupplier) {
        alert('Please select a category and supplier')
        return
      }

      await productAPI.create({
        nom: formData.nom,
        description: formData.description,
        prixUnitaire: parseFloat(formData.prixUnitaire),
        quantiteStock: parseInt(formData.quantiteStock),
        quantiteMinimale: parseInt(formData.quantiteMinimale),
        categorie: selectedCategory,
        fournisseur: selectedSupplier,
      })

      setFormData({
        nom: '',
        description: '',
        prixUnitaire: '',
        quantiteStock: '',
        quantiteMinimale: '',
        categorie: '',
        fournisseur: '',
      })

      onSuccess()
    } catch (error) {
      console.error('Failed to create product:', error)
      alert('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Add New Product</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className={cn(
                'w-full px-3 py-2 bg-white border border-border rounded-lg',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              )}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={cn(
                'w-full px-3 py-2 bg-white border border-border rounded-lg',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                'resize-none'
              )}
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price *
              </label>
              <input
                type="number"
                name="prixUnitaire"
                value={formData.prixUnitaire}
                onChange={handleChange}
                required
                step="0.01"
                className={cn(
                  'w-full px-3 py-2 bg-white border border-border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                )}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="quantiteStock"
                value={formData.quantiteStock}
                onChange={handleChange}
                required
                className={cn(
                  'w-full px-3 py-2 bg-white border border-border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                )}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Minimum Stock Level *
            </label>
            <input
              type="number"
              name="quantiteMinimale"
              value={formData.quantiteMinimale}
              onChange={handleChange}
              required
              className={cn(
                'w-full px-3 py-2 bg-white border border-border rounded-lg',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              )}
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category *
            </label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              required
              className={cn(
                'w-full px-3 py-2 bg-white border border-border rounded-lg',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              )}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Supplier *
            </label>
            <select
              name="fournisseur"
              value={formData.fournisseur}
              onChange={handleChange}
              required
              className={cn(
                'w-full px-3 py-2 bg-white border border-border rounded-lg',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              )}
            >
              <option value="">Select a supplier</option>
              {suppliers.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                'flex-1 px-4 py-2 rounded-lg border border-border text-foreground',
                'hover:bg-gray-50 transition-colors'
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                'flex-1 px-4 py-2 rounded-lg bg-primary text-white',
                'hover:bg-primary-dark transition-colors disabled:opacity-50'
              )}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
