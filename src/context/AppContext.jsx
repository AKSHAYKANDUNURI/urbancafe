import React, { createContext, useContext, useEffect, useState } from 'react'
import { sampleCategoryNames, sampleProductDefs, sampleSaleDefs } from '../utils/sampleData'

const AppContext = createContext()
const DEFAULT_SETTINGS = { cafeName: 'Urban Cafe', currency: '₹' }
const BASE = import.meta.env.VITE_API_BASE_URL || '/api'

const request = async (path, options = {}) => {
  const response = await fetch(`${BASE}${path}`, options)
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data?.error || `Request failed with status ${response.status}`)
  }
  return data
}

const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
}

const normalizeProduct = (product) => ({
  ...product,
  id: product?.id || product?._id || '',
  name: String(product?.name || ''),
  category: String(product?.category || ''),
  price: Number(product?.price ?? 0),
  available: product?.available !== false,
  image: product?.image || null,
})

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [cats, prods, sls, sett] = await Promise.all([
          api.get('/categories'),
          api.get('/products'),
          api.get('/sales'),
          api.get('/settings'),
        ])
        console.log('AppContext - Raw products from API:', prods)
        const normalizedProducts = Array.isArray(prods) ? prods.map(normalizeProduct) : []
        console.log('AppContext - Normalized products:', normalizedProducts)
        setCategories(Array.isArray(cats) ? cats : [])
        setProducts(normalizedProducts)
        setSales(Array.isArray(sls) ? sls : [])
        setSettings(sett && sett.cafeName ? sett : DEFAULT_SETTINGS)
      } catch (e) {
        console.error('AppContext - Error loading data:', e)
        setError('Cannot connect to the server. Make sure the backend is running and MongoDB Atlas is reachable.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const addCategory = async (cat) => {
    const newCat = await api.post('/categories', { name: cat.name })
    setCategories(prev => [...prev, newCat])
    return newCat
  }

  const updateCategory = async (id, data) => {
    const updated = await api.put(`/categories/${id}`, data)
    setCategories(prev => prev.map(c => c.id === id ? updated : c))
  }

  const deleteCategory = async (id) => {
    await api.delete(`/categories/${id}`)
    setCategories(prev => prev.filter(c => c.id !== id))
  }

 const addProduct = async (prod) => {
  const payload = {
    name: String(prod?.name || '').trim(),
    category: String(prod?.category || '').trim(),
    price: Number(prod?.price),
    available: prod?.available !== false,
    image: prod?.image || null,
  }

  const newProd = normalizeProduct(
    await api.post('/products', payload)
  )

  setProducts(prev => [...prev, newProd])

  return newProd
}

 const updateProduct = async (id, data) => {
  const payload = {
    name:
      data?.name !== undefined
        ? String(data.name).trim()
        : undefined,

    category:
      data?.category !== undefined
        ? String(data.category).trim()
        : undefined,

    price:
      data?.price !== undefined
        ? Number(data.price)
        : undefined,

    available:
      data?.available !== undefined
        ? data.available
        : undefined,

    image:
      data?.image !== undefined
        ? data.image
        : undefined,
  }

  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined) delete payload[key]
  })

  const updated = normalizeProduct(
    await api.put(`/products/${id}`, payload)
  )

  setProducts(prev =>
    prev.map(p => (p.id === id ? updated : p))
  )
}

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const addSale = async (sale) => {
    const newSale = await api.post('/sales', sale)
    setSales(prev => [newSale, ...prev])
  }

  const deleteSale = async (id) => {
    await api.delete(`/sales/${id}`)
    setSales(prev => prev.filter(s => s.id !== id))
  }

  const updateSettings = async (newSettings) => {
    const updated = await api.put('/settings', newSettings)
    setSettings(updated)
  }

  const seedSampleData = async () => {
    await Promise.all([
      api.delete('/categories'),
      api.delete('/products'),
      api.delete('/sales'),
    ])

    const cats = await Promise.all(
      sampleCategoryNames.map(name => api.post('/categories', { name }))
    )
    setCategories(cats)

    const prods = await Promise.all(
      sampleProductDefs.map(p => api.post('/products', p))
    )
    setProducts(prods)

    const prodByName = {}
    prods.forEach(p => { prodByName[p.name] = p })

    const now = new Date()
    const sls = await Promise.all(
      sampleSaleDefs.map(({ daysAgo, items }) => {
        const date = new Date(now)
        date.setDate(now.getDate() - daysAgo)
        const saleItems = items.map(({ name, qty }) => {
          const p = prodByName[name]
          return { id: p.id, name: p.name, price: p.price, quantity: qty }
        })
        const total = saleItems.reduce((a, b) => a + b.price * b.quantity, 0)
        return api.post('/sales', { date: date.toISOString(), items: saleItems, total })
      })
    )
    setSales(sls.sort((a, b) => new Date(b.date) - new Date(a.date)))

    const defaultSett = await api.put('/settings', DEFAULT_SETTINGS)
    setSettings(defaultSett)
  }

  const clearAllData = async () => {
    await Promise.all([
      api.delete('/categories'),
      api.delete('/products'),
      api.delete('/sales'),
    ])
    setCategories([])
    setProducts([])
    setSales([])
    const defaultSett = await api.put('/settings', DEFAULT_SETTINGS)
    setSettings(defaultSett)
  }

  return (
    <AppContext.Provider value={{
      categories, products, sales, settings,
      loading, error,
      updateSettings,
      addCategory, updateCategory, deleteCategory,
      addProduct, updateProduct, deleteProduct,
      addSale, deleteSale,
      seedSampleData, clearAllData
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
