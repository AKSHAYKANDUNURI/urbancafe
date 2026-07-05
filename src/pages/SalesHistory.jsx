import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FiCalendar, FiSearch, FiEye, FiTrash2 } from 'react-icons/fi'

export default function SalesHistory() {
  const { sales, deleteSale, settings } = useApp()
  const [q, setQ] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const filtered = sales.filter((s) => {
    if (q && !s.items.some((it) => it.name.toLowerCase().includes(q.toLowerCase()))) return false
    if (from && new Date(s.date) < new Date(from)) return false
    if (to && new Date(s.date) > new Date(to)) return false
    return true
  })

  const totalFiltered = filtered.reduce((a, s) => a + s.total, 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Sales History</h1>
        <p className="page-subtitle">Browse and filter past transactions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="search-bar flex-1">
          <FiSearch className="text-royal-bronze shrink-0" />
          <input
            placeholder="Search by item name..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 sm:flex-none">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none" />
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="input-field pl-9 text-sm w-full sm:w-auto" />
          </div>
          <div className="relative flex-1 sm:flex-none">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none" />
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="input-field pl-9 text-sm w-full sm:w-auto" />
          </div>
        </div>
      </div>

      <div className="card-glow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 relative z-10">
          <h3 className="font-display font-bold text-lg">
            Sales <span className="text-royal-burgundy">({filtered.length})</span>
          </h3>
          <div className="tag">
            Total: <span className="font-display text-royal-gold">{settings.currency}{totalFiltered}</span>
          </div>
        </div>

        <ul className="space-y-3 relative z-10">
          {filtered.map((s, i) => (
            <li
              key={s.id}
              className="p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                animationDelay: `${i * 0.05}s`
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                    <FiCalendar className="text-royal-bronze" />
                    {new Date(s.date).toLocaleString()}
                  </div>
                  <div className="font-display text-xl font-semibold text-royal-gold mt-1">
                    {settings.currency}{s.total}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    {s.items.map((it) => `${it.name} ×${it.quantity}`).join(' · ')}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => alert(JSON.stringify(s.items, null, 2))}
                    className="btn-secondary py-2 px-3 text-sm flex items-center gap-1.5"
                  >
                    <FiEye size={14} /> Details
                  </button>
                  <button
                    onClick={() => deleteSale(s.id)}
                    className="btn-danger py-2 px-3 flex items-center gap-1.5"
                  >
                    <FiTrash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="text-center py-12 text-slate-500">No sales found matching your filters</li>
          )}
        </ul>
      </div>
    </div>
  )
}
