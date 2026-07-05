import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/products', label: 'Products' },
  { to: '/quick-sell', label: 'Quick Sell' },
  { to: '/sales', label: 'Sales' },
  { to: '/reports', label: 'Reports' },
  { to: '/settings', label: 'Settings' }
]

export default function Topbar() {
  const { settings } = useApp()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="md:hidden p-2.5 rounded-xl transition-all duration-300"
          style={{ background: 'rgba(201, 169, 97, 0.08)', border: '1px solid rgba(201, 169, 97, 0.2)' }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu className="text-royal-gold" />
        </button>
        <div className="md:hidden min-w-0">
          <h2 className="font-display text-lg font-semibold truncate text-royal-gold">
            {settings.cafeName || 'Urban Cafe'}
          </h2>
        </div>
        <div className="hidden md:block">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-body">Point of Sale</span>
        </div>
      </div>

      <div className="flex-1 hidden md:flex items-center justify-center max-w-xl w-full">
        <div className="search-bar">
          <FiSearch className="text-royal-bronze shrink-0" />
          <input
            placeholder="Search products or sales..."
            className="w-full bg-transparent outline-none text-sm font-body"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: 'rgba(201, 169, 97, 0.08)', border: '1px solid rgba(201, 169, 97, 0.15)' }}>
          <div className="w-2 h-2 rounded-full bg-royal-sage" />
          <span className="text-sm font-medium font-body">Staff</span>
        </div>
      </div>

      {open && (
        <div className="mobile-menu md:hidden" onClick={() => setOpen(false)}>
          <div className="mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <div className="font-display font-semibold text-royal-gold">{settings.cafeName}</div>
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <FiX className="text-lg" />
              </button>
            </div>
            <nav className="space-y-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                      ? 'sidebar-link-active font-medium'
                      : 'hover:bg-white/5'}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
