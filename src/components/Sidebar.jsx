import React from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { FiHome, FiBox, FiShoppingCart, FiFileText, FiBarChart2, FiSettings } from 'react-icons/fi'
import { FaCoffee } from 'react-icons/fa'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome, color: 'text-royal-gold' },
  { to: '/products', label: 'Products', icon: FiBox, color: 'text-royal-bronze' },
  { to: '/quick-sell', label: 'Quick Sell', icon: FiShoppingCart, color: 'text-royal-burgundy' },
  { to: '/sales', label: 'Sales History', icon: FiFileText, color: 'text-royal-gold' },
  { to: '/reports', label: 'Reports', icon: FiBarChart2, color: 'text-royal-bronze' },
  { to: '/settings', label: 'Settings', icon: FiSettings, color: 'text-royal-sage' }
]

export default function Sidebar() {
  const { settings } = useApp()
  return (
    <aside className="w-64 lg:w-72 shrink-0 h-screen hidden md:flex flex-col border-r backdrop-blur-xl sticky top-0 z-20"
      style={{
        background: 'rgba(28, 20, 16, 0.92)',
        borderColor: 'rgba(201, 169, 97, 0.2)'
      }}>
      <div className="p-5 lg:p-6 border-b" style={{ borderColor: 'rgba(201, 169, 97, 0.12)' }}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #722F37, #5C2330)', border: '1px solid rgba(201, 169, 97, 0.35)' }}>
            <FaCoffee className="text-royal-gold text-lg" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold leading-tight text-royal-gold">
              {settings.cafeName || 'Urban Cafe'}
            </h1>
            <p className="text-xs text-stone-500 tracking-[0.2em] uppercase font-body">Royal POS</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((l) => {
          const Icon = l.icon
          return (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active font-medium' : ''}`
              }
            >
              <Icon className={`nav-icon text-lg shrink-0 relative z-10 ${l.color}`} />
              <span className="relative z-10">{l.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="p-5 border-t" style={{ borderColor: 'rgba(201, 169, 97, 0.12)' }}>
        <div className="rounded-xl p-3 text-center"
          style={{ background: 'rgba(201, 169, 97, 0.06)', border: '1px solid rgba(201, 169, 97, 0.15)' }}>
          <div className="text-xs font-display text-royal-gold tracking-wider">Est. 2024</div>
          <div className="text-xs text-stone-500 mt-1 font-body">Fine café service</div>
        </div>
      </div>
    </aside>
  )
}
