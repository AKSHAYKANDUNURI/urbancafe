import React from 'react'
import { useApp } from '../context/AppContext'

export default function Footer() {
  const { settings } = useApp()
  return (
    <footer className="mt-10 pt-6 border-t text-center text-sm text-stone-500 font-body"
      style={{ borderColor: 'rgba(201, 169, 97, 0.12)' }}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
        <span className="font-display text-sm tracking-wide text-royal-gold">
          {settings.cafeName || 'Urban Cafe'}
        </span>
        <span className="hidden sm:inline text-stone-600">·</span>
        <span>Crafted with care · Local Storage Demo</span>
      </div>
    </footer>
  )
}
