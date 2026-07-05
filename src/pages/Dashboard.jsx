import React from 'react'
import { useApp } from '../context/AppContext'
import DashboardCard from '../components/DashboardCard'
import { FiDollarSign, FiShoppingBag, FiPackage, FiBox, FiTrendingUp, FiClock } from 'react-icons/fi'

export default function Dashboard() {
  const { sales, products, settings } = useApp()

  const today = new Date().toDateString()
  const todaysSales = sales.filter((s) => new Date(s.date).toDateString() === today)
  const todaysRevenue = todaysSales.reduce((acc, s) => acc + s.total, 0)
  const totalItems = todaysSales.reduce((acc, s) => acc + s.items.reduce((a, i) => a + i.quantity, 0), 0)

  const productCount = products.length

  const best = (() => {
    const map = {}
    sales.forEach((s) => s.items.forEach((it) => (map[it.id] = (map[it.id] || 0) + it.quantity)))
    const bestId = Object.keys(map).sort((a, b) => map[b] - map[a])[0]
    return products.find((p) => p.id === bestId)?.name || '—'
  })()

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Real-time overview of your cafe performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 animate-stagger">
        <DashboardCard
          title="Today's Revenue"
          value={`${settings.currency}${todaysRevenue}`}
          icon={FiDollarSign}
          accent="gold"
        />
        <DashboardCard
          title="Total Sales Today"
          value={todaysSales.length}
          icon={FiShoppingBag}
          accent="burgundy"
        />
        <DashboardCard
          title="Items Sold Today"
          value={totalItems}
          icon={FiPackage}
          accent="bronze"
        />
        <DashboardCard
          title="Total Products"
          value={productCount}
          icon={FiBox}
          accent="wine"
        />
        <DashboardCard
          title="Best Selling"
          value={best}
          icon={FiTrendingUp}
          accent="sage"
        />
        <div className="card-glow sm:col-span-2 xl:col-span-1">
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <FiClock className="text-royal-gold" />
            <h3 className="text-xs uppercase tracking-[0.15em] text-stone-500 font-body">Recent Sales</h3>
          </div>
          <ul className="space-y-3 relative z-10">
            {sales.slice(0, 5).map((s) => (
              <li key={s.id} className="flex justify-between items-center py-2 border-b last:border-0"
                style={{ borderColor: 'rgba(201, 169, 97, 0.1)' }}>
                <span className="text-sm text-stone-500 font-body">{new Date(s.date).toLocaleString()}</span>
                <span className="font-display font-semibold text-royal-gold">{settings.currency}{s.total}</span>
              </li>
            ))}
            {sales.length === 0 && (
              <li className="text-sm text-slate-500 text-center py-4">No sales yet — head to Quick Sell!</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
