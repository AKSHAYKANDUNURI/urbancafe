import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FiSearch } from 'react-icons/fi'

export default function Topbar() {
  const { settings } = useApp()
  const [q, setQ] = useState('')

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">

      {/* Left */}
      <div className="min-w-0">
        {/* Mobile */}
        <div className="md:hidden">
          <h2 className="font-display text-xl font-semibold text-royal-gold truncate">
            {settings.cafeName || 'Urban Cafe'}
          </h2>

          <p className="text-xs text-stone-500 tracking-widest uppercase">
            Point of Sale
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
            Point of Sale
          </span>
        </div>
      </div>

      {/* Desktop Search */}
      <div className="hidden md:flex flex-1 justify-center max-w-xl">
        <div className="search-bar">
          <FiSearch className="text-royal-bronze shrink-0" />

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent outline-none text-sm font-body"
          />
        </div>
      </div>

      {/* Right */}
      <div
        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: 'rgba(201,169,97,.08)',
          border: '1px solid rgba(201,169,97,.15)',
        }}
      >
        <div className="w-2 h-2 rounded-full bg-green-500" />

        <span className="text-sm font-medium">
          Staff
        </span>
      </div>

    </header>
  )
}