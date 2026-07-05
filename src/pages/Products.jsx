import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FiEdit2, FiSearch, FiPlus } from 'react-icons/fi'

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct, settings } = useApp()
  const [q, setQ] = useState('')
  const [form, setForm] = useState({ name: '', price: '', category: '', available: true })
  const [editId, setEditId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const filtered = products.filter((p) => String(p?.name || '').toLowerCase().includes(q.toLowerCase()))

  const handleAdd = async () => {
    if (!form.name) return alert('Name required')
    const price = Number(form.price)
    if (!Number.isFinite(price)) return alert('Price required')
    const result = await addProduct({ name: form.name, price, category: form.category, available: form.available })
    setForm({ name: '', price: '', category: '', available: true })
    return result
  }

  const handleEdit = (p) => {
    setEditId(p.id)
    setEditForm({ ...p, price: p.price ?? '', available: !!p.available })
  }

  const handleSaveEdit = async () => {
    if (!editForm.name) return alert('Name required')
    const price = Number(editForm.price)
    if (!Number.isFinite(price)) return alert('Price required')
    await updateProduct(editId, { name: editForm.name, price, available: !!editForm.available })
    setEditId(null)
    setEditForm({})
  }

  const handleCancelEdit = () => {
    setEditId(null)
    setEditForm({})
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle mb-0">Manage your menu items & pricing</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="search-bar flex-1 sm:w-64">
            <FiSearch className="text-royal-bronze shrink-0" />
            <input
              placeholder="Search products..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
          <span className="tag shrink-0">{settings.currency}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-6">
        <div className="card-glow">
          <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
            <FiPlus className="text-royal-gold" /> Add Product
          </h3>
          <div className="space-y-3 relative z-10">
            <input
              placeholder="Product name"
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <select
              className="input-field"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Category (optional)</option>
              <option>Coffee</option>
              <option>Tea</option>
              <option>Pastries</option>
              <option>Sandwiches</option>
              <option>Smoothies</option>
              <option>Snacks</option>
            </select>
            <input
              type="number"
              placeholder="Price"
              className="input-field"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => setForm({ ...form, available: e.target.checked })}
                className="accent-royal-burgundy w-4 h-4"
              />
              Available for sale
            </label>
            <button onClick={handleAdd} className="btn-primary w-full py-2.5 flex items-center justify-center gap-2">
              <FiPlus /> Add Product
            </button>
          </div>
        </div>

        <div className="xl:col-span-2">
          <div className="card-glow">
            <h3 className="font-display font-bold text-lg mb-4 relative z-10">
              Products <span className="text-royal-burgundy">({filtered.length})</span>
            </h3>
            <div className="overflow-x-auto relative z-10 -mx-2 px-2">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="text-xs uppercase tracking-widest text-slate-500 font-display">
                    <th className="pb-3 pr-4">ID</th>
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 pr-4">Price</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, index) => (
                    <React.Fragment key={p.id || p._id || `${p.name}-${index}`}>
                      {editId === p.id ? (
                        <tr className="table-row align-top" style={{ background: 'rgba(114, 47, 55, 0.06)' }}>
                          <td className="py-3 pr-4 text-xs text-slate-500 font-mono">{p.id}</td>
                          <td className="py-3 pr-4">
                            <input className="input-field py-1.5 text-sm" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                          </td>
                          <td className="py-3 pr-4">
                            <input type="number" className="input-field py-1.5 text-sm w-24" value={editForm.price ?? ''} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
                          </td>
                          <td className="py-3 pr-4">
                            <input type="checkbox" checked={editForm.available} onChange={(e) => setEditForm({ ...editForm, available: e.target.checked })} className="accent-royal-burgundy w-4 h-4" />
                          </td>
                          <td className="py-3 space-x-1 whitespace-nowrap">
                            <button onClick={handleSaveEdit} className="btn-success">Save</button>
                            <button onClick={handleCancelEdit} className="btn-secondary py-1.5 px-3 text-sm">Cancel</button>
                          </td>
                        </tr>
                      ) : (
                        <tr className="table-row align-top">
                          <td className="py-3 pr-4 text-xs text-slate-500 font-mono">{p.id}</td>
                          <td className="py-3 pr-4 font-semibold">{p.name}</td>
                          <td className="py-3 pr-4 font-display text-royal-gold">{settings.currency}{p.price}</td>
                          <td className="py-3 pr-4">
                            <span className={`tag ${p.available ? 'tag-available' : 'tag-unavailable'}`}>
                              {p.available ? 'Available' : 'Out'}
                            </span>
                          </td>
                          <td className="py-3 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              <button onClick={() => handleEdit(p)} className="btn-secondary py-1.5 px-2.5 text-sm flex items-center gap-1">
                                <FiEdit2 size={13} /> Edit
                              </button>
                              <button onClick={() => updateProduct(p.id, { available: !p.available })} className="btn-secondary py-1.5 px-2.5 text-sm">Toggle</button>
                              <button onClick={() => deleteProduct(p.id)} className="btn-danger">Delete</button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">No products found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
