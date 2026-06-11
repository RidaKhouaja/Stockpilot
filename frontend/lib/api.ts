import axios, { AxiosInstance, AxiosError } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('[API Error]', error.message)
    return Promise.reject(error)
  }
)

// Types for API responses
export interface Produit {
  id?: number
  nom: string
  description?: string
  prixUnitaire: number
  quantiteStock: number
  quantiteMinimale: number
  categorie: Categorie
  fournisseur: Fournisseur
  dateCreation?: string
}

export interface Categorie {
  id?: number
  nom: string
  description?: string
}

export interface Fournisseur {
  id?: number
  nom: string
  adresse?: string
  telephone?: string
  email?: string
}

export interface MouvementStock {
  id?: number
  produit: Produit
  type: 'ENTREE' | 'SORTIE'
  quantite: number
  dateMovement: string
  motif?: string
}

export interface StatistiquesDTO {
  totalProduits: number
  valeurTotalStock: number
  stockBasPrix: number
  mouvementsDerniers7Jours: number
  meilleurProduit: Produit | null
  pirePerformance: Produit | null
  mouvementsParJour?: Array<{
    date: string
    entrees: number
    sorties: number
  }>
  topCategories?: Array<{
    nom: string
    valeur: number
  }>
}

// Product API
export const productAPI = {
  getAll: async (page: number = 0, size: number = 10) => {
    const response = await apiClient.get('/produits', {
      params: { page, size },
    })
    return response.data
  },

  getById: async (id: number) => {
    const response = await apiClient.get(`/produits/${id}`)
    return response.data
  },

  create: async (produit: Produit) => {
    const response = await apiClient.post('/produits', produit)
    return response.data
  },

  update: async (id: number, produit: Partial<Produit>) => {
    const response = await apiClient.put(`/produits/${id}`, produit)
    return response.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`/produits/${id}`)
  },
}

// Category API
export const categoryAPI = {
  getAll: async () => {
    const response = await apiClient.get('/categories')
    return response.data
  },

  create: async (categorie: Categorie) => {
    const response = await apiClient.post('/categories', categorie)
    return response.data
  },

  update: async (id: number, categorie: Partial<Categorie>) => {
    const response = await apiClient.put(`/categories/${id}`, categorie)
    return response.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`/categories/${id}`)
  },
}

// Supplier API
export const supplierAPI = {
  getAll: async () => {
    const response = await apiClient.get('/fournisseurs')
    return response.data
  },

  create: async (fournisseur: Fournisseur) => {
    const response = await apiClient.post('/fournisseurs', fournisseur)
    return response.data
  },

  update: async (id: number, fournisseur: Partial<Fournisseur>) => {
    const response = await apiClient.put(`/fournisseurs/${id}`, fournisseur)
    return response.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`/fournisseurs/${id}`)
  },
}

// Stock Movement API
export const movementAPI = {
  getByProduct: async (productId: number) => {
    const response = await apiClient.get(`/mouvements-stock/produit/${productId}`)
    return response.data
  },

  create: async (mouvement: Omit<MouvementStock, 'id'>) => {
    const response = await apiClient.post('/mouvements-stock', mouvement)
    return response.data
  },
}

// Statistics API
export const statisticsAPI = {
  getStats: async (): Promise<StatistiquesDTO> => {
    const response = await apiClient.get('/statistiques')
    return response.data
  },
}

export default apiClient
