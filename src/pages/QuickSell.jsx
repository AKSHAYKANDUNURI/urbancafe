import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { FiShoppingCart, FiTrash2, FiCheck } from 'react-icons/fi'

export default function QuickSell() {
const { products, addSale, settings, loading } = useApp()
const [cart, setCart] = useState([])

  const onAdd = (product) => {
    setCart((c) => {
      const found = c.find((x) => x.id === product.id)
      if (found) return c.map((x) => (x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x))
      return [...c, { id: product.id, name: product.name, price: product.price, quantity: 1 }]
    })
  }

  const updateQty = (id, q) => setCart((c) => c.map((it) => (it.id === id ? { ...it, quantity: Math.max(1, q) } : it)))
  const remove = (id) => setCart((c) => c.filter((it) => it.id !== id))
  const clear = () => setCart([])

  const total = cart.reduce((a, b) => a + b.price * b.quantity, 0)
  const visibleProducts = products.filter((product) => product.available !== false)

  const saveSale = async () => {
    if (cart.length === 0) return alert('Cart empty')
    await addSale({ date: new Date().toISOString(), items: cart, total })
    clear()
    alert('Sale saved')
  }

  console.log("Products:", products)
console.log("Visible Products:", visibleProducts)

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Quick Sell</h1>
        <p className="page-subtitle">Tap products to add — lightning fast checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="lg:col-span-2">
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
  {loading ? (
    <div className="col-span-full text-center py-10">
      Loading products...
    </div>
  ) : visibleProducts.length === 0 ? (
    <div className="col-span-full card text-center py-12 text-slate-500">
      No available products found.
    </div>
  ) : (
    visibleProducts.map((p, i) => (
      <ProductCard
        key={p.id}
        product={p}
        onAdd={onAdd}
        index={i}
      />
    ))
  )}
</div>
        </div>

        <div className="card-glow lg:sticky lg:top-6 lg:self-start">
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <FiShoppingCart className="text-royal-burgundy text-xl" />
            <h3 className="font-display font-bold text-lg">Order Summary</h3>
            {cart.length > 0 && (
              <span className="ml-auto tag">{cart.length} items</span>
            )}
          </div>

          <div className="space-y-3 relative z-10 max-h-64 lg:max-h-80 overflow-y-auto pr-1">
            {cart.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <FiShoppingCart className="mx-auto text-3xl mb-2 opacity-30" />
                Cart is empty
              </div>
            )}
            {cart.map((it) => (
              <div key={it.id} className="flex items-center justify-between gap-2 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{it.name}</div>
                  <div className="text-sm text-royal-bronze font-body">{settings.currency}{it.price} each</div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => updateQty(it.id, it.quantity - 1)} className="btn-secondary px-2.5 py-1 text-sm">−</button>
                  <span className="font-display font-bold w-6 text-center">{it.quantity}</span>
                  <button onClick={() => updateQty(it.id, it.quantity + 1)} className="btn-secondary px-2.5 py-1 text-sm">+</button>
                  <button onClick={() => remove(it.id)} className="btn-danger px-2 py-1">×</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t flex items-center justify-between relative z-10"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="font-display uppercase tracking-widest text-sm text-slate-500">Total</div>
            <div className="font-display text-2xl sm:text-3xl font-semibold text-royal-gold">{settings.currency}{total}</div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-2 relative z-10">
            <button onClick={saveSale} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3">
              <FiCheck /> Save Sale
            </button>
            <button onClick={clear} className="btn-secondary flex items-center justify-center gap-2 py-3 sm:px-4">
              <FiTrash2 /> Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
