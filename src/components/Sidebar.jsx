import React from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiFileText,
  FiBarChart2,
} from 'react-icons/fi'
import { FaCoffee } from 'react-icons/fa'

const links = [
  { to: '/dashboard', label: 'Home', icon: FiHome },
  { to: '/products', label: 'Products', icon: FiBox },
  { to: '/quick-sell', label: 'Sell', icon: FiShoppingCart },
  { to: '/sales', label: 'Sales', icon: FiFileText },
  { to: '/reports', label: 'Reports', icon: FiBarChart2 },
]

export default function Sidebar() {
  const { settings } = useApp()

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="hidden md:flex w-64 lg:w-72 shrink-0 h-screen flex-col border-r backdrop-blur-xl sticky top-0 z-20"
        style={{
          background: 'rgba(28,20,16,0.92)',
          borderColor: 'rgba(201,169,97,.2)',
        }}
      >
        <div
          className="p-6 border-b"
          style={{ borderColor: 'rgba(201,169,97,.15)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg,#722F37,#5C2330)',
              }}
            >
              <FaCoffee className="text-royal-gold text-lg" />
            </div>

            <div>
              <h1 className="font-display text-lg font-semibold text-royal-gold">
                {settings.cafeName || 'Urban Cafe'}
              </h1>

              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
                Royal POS
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? 'sidebar-link-active' : ''
                  }`
                }
              >
                <Icon className="nav-icon text-lg" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div
          className="p-5 border-t"
          style={{
            borderColor: 'rgba(201,169,97,.12)',
          }}
        >
          <div
            className="rounded-xl p-3 text-center"
            style={{
              background: 'rgba(201,169,97,.06)',
              border:
                '1px solid rgba(201,169,97,.15)',
            }}
          >
            <div className="text-xs text-royal-gold font-semibold">
              Urban Cafe
            </div>

            <div className="text-xs text-stone-500 mt-1">
              POS System
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MOBILE BOTTOM BAR ================= */}

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#241A14]/95 backdrop-blur-xl border-t border-[#3d2c22] shadow-2xl"
      style={{
  background: "rgba(28,20,16,.98)",
  backdropFilter: "blur(16px)",
}}>
        <div className="grid grid-cols-5 h-16">
          {links.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'text-royal-gold'
                      : 'text-stone-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`text-xl mb-1 ${
                        isActive ? 'scale-110' : ''
                      }`}
                    />

                    <span
                      className={`text-[11px] ${
                        isActive
                          ? 'font-semibold'
                          : ''
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </>
  )
}