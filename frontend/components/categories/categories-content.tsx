'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { categoryAPI } from '@/lib/api'
import { Plus, Edit, Trash2, Loader } from 'lucide-react'
import { cn } from '@/lib/utils'

async function categoriesFetcher() {
  return await categoryAPI.getAll()
}

export function CategoriesContent() {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ nom: '', description: '' })
  const { data: categories = [], isLoading, mutate } = useSWR('categories', categoriesFetcher)
  const [deleting, setDeleting] = useState<number | null>(null)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await categoryAPI.create({
        nom: formData.nom,
        description: formData.description,
      })
      setFormData({ nom: '', description: '' })
      setIsAdding(false)
      mutate()
    } catch (error) {
      console.error('Failed to add category:', error)
    }
  }

  const handleDelete = async (id: number | undefined) => {
    if (!id) return
    try {
      setDeleting(id)
      await categoryAPI.delete(id)
      mutate()
    } catch (error) {
      console.error('Failed to delete category:', error)
    } finally {
      setDeleting(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin text-primary" />
          <p className="text-secondary">Loading categories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Categories</h1>
        <p className="text-secondary">Manage product categories</p>
      </div>

      <button
        onClick={() => setIsAdding(true)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg',
          'hover:bg-primary-dark transition-colors'
        )}
      >
        <Plus className="w-4 h-4" />
        Add Category
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add Form Card */}
        {isAdding && (
          <div className="bg-white rounded-lg border border-primary p-6 shadow-sm">
            <form onSubmit={handleAdd} className="space-y-4">
              <input
                type="text"
                placeholder="Category name"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
                className={cn(
                  'w-full px-3 py-2 bg-white border border-border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                )}
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={cn(
                  'w-full px-3 py-2 bg-white border border-border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                  'resize-none'
                )}
                rows={2}
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
                    setFormData({ nom: '', description: '' })
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

        {/* Category Cards */}
        {categories.map((category: any) => (
          <div
            key={category.id}
            className="bg-white rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">{category.nom}</h3>
            <p className="text-sm text-secondary mb-4">
              {category.description || 'No description'}
            </p>
            <div className="flex gap-2">
              <button className={cn(
                'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg',
                'text-secondary hover:bg-blue-50 hover:text-blue-600 transition-colors'
              )}>
                <Edit className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                disabled={deleting === category.id}
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

      {categories.length === 0 && !isAdding && (
        <div className="bg-white rounded-lg border border-border p-12 text-center shadow-sm">
          <p className="text-secondary mb-2">No categories found</p>
          <p className="text-xs text-secondary">Add your first category to get started</p>
        </div>
      )}
    </div>
  )
}
