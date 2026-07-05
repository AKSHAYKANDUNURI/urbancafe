import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import QuickSell from './pages/QuickSell'
import SalesHistory from './pages/SalesHistory'
import Reports from './pages/Reports'
import { useApp } from './context/AppContext'
import { FiWifi, FiLoader } from 'react-icons/fi'

function BackgroundOrbs() {
  return (
    <div className="bg-orbs" aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <BackgroundOrbs />
      <div className="text-5xl animate-spin" style={{ color: '#C9A961' }}>
        <FiLoader />
      </div>
      <div className="font-display text-xl text-royal-gold tracking-wider">Loading your cafe data…</div>
      <p className="text-sm text-stone-500 font-body">Reading saved browser data</p>
    </div>
  )
}

function ErrorScreen({ message }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <BackgroundOrbs />
      <div className="text-5xl text-royal-burgundy">
        <FiWifi />
      </div>
      <div className="font-display text-2xl text-royal-gold">Cannot Load Saved Data</div>

      <div className="card-glow max-w-lg w-full space-y-4">
        <p className="text-stone-400 text-sm font-body">{message}</p>

        <div className="space-y-3 text-sm font-body">
          <p className="text-xs uppercase tracking-widest text-stone-500 font-display">Checklist</p>

          <div className="flex gap-3 items-start p-3 rounded-xl" style={{ background: 'rgba(114,47,55,0.08)', border: '1px solid rgba(114,47,55,0.2)' }}>
            <span className="text-royal-gold font-bold shrink-0">1.</span>
            <div>
              <div className="font-semibold text-stone-300 mb-1">Reload the app</div>
              <code className="text-xs text-royal-bronze font-mono block p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                Refresh the page
              </code>
            </div>
          </div>

          <div className="flex gap-3 items-start p-3 rounded-xl" style={{ background: 'rgba(114,47,55,0.08)', border: '1px solid rgba(114,47,55,0.2)' }}>
            <span className="text-royal-gold font-bold shrink-0">2.</span>
            <div>
              <div className="font-semibold text-stone-300 mb-1">Clear browser storage if needed</div>
              <p className="text-stone-500 text-xs">If the app was interrupted, clear this site's storage in your browser settings and reload.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start p-3 rounded-xl" style={{ background: 'rgba(114,47,55,0.08)', border: '1px solid rgba(114,47,55,0.2)' }}>
            <span className="text-royal-gold font-bold shrink-0">3.</span>
            <div>
              <div className="font-semibold text-stone-300 mb-1">No backend setup required</div>
              <p className="text-stone-500 text-xs">All cafe data now stays in this browser, so there is nothing to connect to externally.</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="btn-primary px-8 py-3"
      >
        Reload App
      </button>
    </div>
  )
}

export default function App() {
  const { loading, error } = useApp()

  if (loading) return <LoadingScreen />
  if (error)   return <ErrorScreen message={error} />

  return (
    <div className="min-h-screen flex relative">
      <BackgroundOrbs />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          <Topbar />
          <main className="mt-6 animate-fade-in">
            <Routes>
              <Route path="/"            element={<Navigate to="/quick-sell" replace />} />
              <Route path="/dashboard"   element={<Dashboard />} />
              <Route path="/products"    element={<Products />} />
              <Route path="/quick-sell"  element={<QuickSell />} />
              <Route path="/sales"       element={<SalesHistory />} />
              <Route path="/reports"     element={<Reports />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
