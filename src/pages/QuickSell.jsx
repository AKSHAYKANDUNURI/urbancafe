import React, { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import {
  FiShoppingCart,
  FiTrash2,
  FiCheck,
  FiChevronUp,
  FiChevronDown,
} from 'react-icons/fi'

export default function QuickSell() {
  const { products, addSale, settings } = useApp()

 const [cart, setCart] = useState([])
const [showCart, setShowCart] = useState(false)
const [selectedCategory, setSelectedCategory] = useState('All')

  const onAdd = (product) => {
    setCart((c) => {
      const found = c.find((x) => x.id === product.id)

      if (found) {
        return c.map((x) =>
          x.id === product.id
            ? { ...x, quantity: x.quantity + 1 }
            : x
        )
      }

      return [
        ...c,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]
    })
  }

  const updateQty = (id, q) =>
    setCart((c) =>
      c.map((it) =>
        it.id === id
          ? { ...it, quantity: Math.max(1, q) }
          : it
      )
    )

  const remove = (id) =>
    setCart((c) => c.filter((it) => it.id !== id))

  const clear = () => setCart([])

  const total = cart.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  )

  const categories = useMemo(() => {
    const cats = [
      ...new Set(
        products
          .filter((p) => p.available !== false)
          .map((p) => p.category)
          .filter(Boolean)
      ),
    ]

    return ['All', ...cats]
  }, [products])

  const visibleProducts = products.filter((product) => {
    if (product.available === false) return false

    if (selectedCategory === 'All') return true

    return product.category === selectedCategory
  })

  const saveSale = async () => {
    if (cart.length === 0) return alert('Cart empty')

    await addSale({
      date: new Date().toISOString(),
      items: cart,
      total,
    })

    clear()

    alert('Sale saved')
  }

  return (
    <div>
     <div className="mb-4">
  <h1 className="page-title">Quick Sell</h1>

  <p className="page-subtitle">
    Tap products to add — lightning fast checkout
  </p>
</div>

{/* MOBILE FLOATING HEADER */}
<div
  className="lg:hidden sticky top-0 z-50  px-4 pt-2 pb-3"
  style={{
    background: "#1C1410",
        boxShadow: "0 8px 20px rgba(0,0,0,.45)",

  }}
>
  {/* Categories */}
  <div className="flex gap-3 overflow-x-auto pb-3 no-scrollbar">
    {categories.map((category) => {
      const count =
        category === "All"
          ? products.filter((p) => p.available !== false).length
          : products.filter(
              (p) =>
                p.available !== false &&
                p.category === category
            ).length

      return (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`whitespace-nowrap rounded-full px-5 py-2 ${
            selectedCategory === category
              ? "btn-primary"
              : "btn-secondary"
          }`}
        >
          {category} ({count})
        </button>
      )
    })}
  </div>

  {/* View Cart */}
  <div
    className="rounded-2xl px-4 py-3 flex items-center justify-between"
    style={{
      background: "rgba(44,36,22,.95)",
      border: "1px solid rgba(201,169,97,.2)",
      backdropFilter: "blur(12px)",
    }}
  >
    <div>
      <div className="font-semibold">
        🛒 {cart.length} Item{cart.length !== 1 ? "s" : ""}
      </div>

      <div className="text-royal-gold font-display">
        {settings.currency}
        {total}
      </div>
    </div>

    <button
      className="btn-primary flex items-center gap-2"
      onClick={() => setShowCart(true)}
    >
      View Cart
      <FiChevronUp />
    </button>
  </div>
</div>
      
   

<div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">        {/* PRODUCTS */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {visibleProducts.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={onAdd}
                index={i}
              />
            ))}

            {visibleProducts.length === 0 && (
              <div className="col-span-full card text-center py-12 text-slate-500">
                No products available in this category.
              </div>
            )}
          </div>
        </div>

        {/* ORDER SUMMARY */}
<div className="hidden lg:block card-glow lg:sticky lg:top-6 lg:self-start">          <div className="flex items-center gap-2 mb-4 relative z-10">
            <FiShoppingCart className="text-royal-burgundy text-xl" />
            <h3 className="font-display font-bold text-lg">
              Order Summary
            </h3>

            {cart.length > 0 && (
              <span className="ml-auto tag">
                {cart.length} items
              </span>
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
              <div
                key={it.id}
                className="flex items-center justify-between gap-2 p-3 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border:
                    '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">
                    {it.name}
                  </div>

                  <div className="text-sm text-royal-bronze font-body">
                    {settings.currency}
                    {it.price} each
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() =>
                      updateQty(it.id, it.quantity - 1)
                    }
                    className="btn-secondary px-2.5 py-1 text-sm"
                  >
                    −
                  </button>

                  <span className="font-display font-bold w-6 text-center">
                    {it.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQty(it.id, it.quantity + 1)
                    }
                    className="btn-secondary px-2.5 py-1 text-sm"
                  >
                    +
                  </button>

                  <button
                    onClick={() => remove(it.id)}
                    className="btn-danger px-2 py-1"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-5 pt-4 border-t flex items-center justify-between"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="font-display uppercase tracking-widest text-sm text-slate-500">
              Total
            </div>

            <div className="font-display text-3xl font-semibold text-royal-gold">
              {settings.currency}
              {total}
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              onClick={saveSale}
              className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
            >
              <FiCheck />
              Save Sale
            </button>

            <button
              onClick={clear}
              className="btn-secondary flex items-center justify-center gap-2 py-3 sm:px-4"
            >
              <FiTrash2 />
              Clear
            </button>
          </div>
        </div>
      </div>
      {/* MOBILE CART */}
<div
  className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
    showCart
      ? 'pointer-events-auto'
      : 'pointer-events-none'
  }`}
>
  {/* Overlay */}
  <div
    onClick={() => setShowCart(false)}
    className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
      showCart ? 'opacity-100' : 'opacity-0'
    }`}
  />

  {/* Bottom Sheet */}
 <div
  className={`absolute left-3 right-3 rounded-t-3xl shadow-2xl transition-transform duration-300 ${
    showCart ? "translate-y-0" : "translate-y-full"
  }`}
  style={{
    bottom: "88px",                 // keep above bottom nav
    background: "#2C2416",
    maxHeight: "calc(100vh - 180px)",
    overflowY: "auto",
    paddingBottom: "20px",
  }}
>
    <div className="flex justify-between items-center mb-5">
      <h3 className="font-display text-xl">
        Order Summary
      </h3>

      <button
        onClick={() => setShowCart(false)}
        className="btn-secondary"
      >
        <FiChevronDown />
      </button>
    </div>

    {cart.length === 0 ? (
      <div className="text-center py-10 text-stone-500">
        Cart Empty
      </div>
    ) : (
      <>
        <div className="space-y-3">
          {cart.map((it) => (
            <div
              key={it.id}
              className="rounded-xl p-3 flex justify-between items-center"
              style={{
                background:
                  'rgba(255,255,255,.05)',
              }}
            >
              <div>
                <div className="font-semibold">
                  {it.name}
                </div>

                <div className="text-sm text-royal-bronze">
                  {settings.currency}
                  {it.price}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="btn-secondary px-2"
                  onClick={() =>
                    updateQty(
                      it.id,
                      it.quantity - 1
                    )
                  }
                >
                  −
                </button>

                {it.quantity}

                <button
                  className="btn-secondary px-2"
                  onClick={() =>
                    updateQty(
                      it.id,
                      it.quantity + 1
                    )
                  }
                >
                  +
                </button>

                <button
                  className="btn-danger px-2"
                  onClick={() =>
                    remove(it.id)
                  }
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

       <div
  className="mt-6 pt-4 border-t flex items-center justify-between"
  style={{
    borderColor: "rgba(201,169,97,0.12)",
  }}
>
  <span className="text-lg font-semibold">
    Total
  </span>

  <span className="text-3xl font-bold text-royal-gold">
    {settings.currency}
    {total}
  </span>
</div>

<div
  className="sticky mt-5 flex gap-2 pt-3 pb-3"
  style={{
    bottom: 0,
    background: "#2C2416",
    borderTop: "1px solid rgba(201,169,97,.15)",
    zIndex: 5,
  }}
>
  <button
    className="btn-primary flex-1"
    onClick={async () => {
      await saveSale()
      setShowCart(false)
    }}
  >
    <FiCheck />
    Save Sale
  </button>

  <button
    className="btn-secondary"
    onClick={clear}
  >
    <FiTrash2 />
  </button>
</div>
      </>
    )}
  </div>
</div>
    </div>
  )
}