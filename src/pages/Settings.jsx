import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FiSettings, FiSave, FiDatabase, FiTrash2, FiLoader } from 'react-icons/fi'

export default function Settings() {
  const { settings, updateSettings, seedSampleData, clearAllData } = useApp()
  const [form, setForm] = useState(settings)
  const [saving,    setSaving]    = useState(false)
  const [seeding,   setSeeding]   = useState(false)
  const [clearing,  setClearing]  = useState(false)
  const [feedback,  setFeedback]  = useState(null)

  const flash = (msg) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(null), 3000)
  }

  const save = async () => {
    setSaving(true)
    try {
      await updateSettings(form)
      flash('✅ Settings saved locally')
    } catch {
      flash('❌ Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleSeed = async () => {
    if (!window.confirm('Seed demo data into browser storage? This will overwrite current local data.')) return
    setSeeding(true)
    try {
      await seedSampleData()
      flash('✅ Sample data seeded — check Dashboard & Quick Sell')
    } catch {
      flash('❌ Seeding failed')
    } finally {
      setSeeding(false)
    }
  }

  const handleClear = async () => {
    if (!window.confirm('Clear ALL local data and reset to defaults?')) return
    setClearing(true)
    try {
      await clearAllData()
      flash('✅ All data cleared')
    } catch {
      flash('❌ Clear failed')
    } finally {
      setClearing(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure your cafe &amp; preferences</p>
      </div>

      {feedback && (
        <div className="mb-5 px-4 py-3 rounded-xl text-sm font-body font-medium"
          style={{ background: 'rgba(201, 169, 97, 0.12)', border: '1px solid rgba(201, 169, 97, 0.3)', color: '#C9A961' }}>
          {feedback}
        </div>
      )}

      <div className="card-glow max-w-lg">
        <div className="flex items-center gap-2 mb-6 relative z-10">
          <FiSettings className="text-royal-gold text-xl" />
          <h3 className="font-display font-bold text-lg">Cafe Configuration</h3>
          <span className="ml-auto tag text-xs">Local storage</span>
        </div>

        <div className="space-y-5 relative z-10">
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 font-body mb-2">Cafe Name</label>
            <input
              value={form.cafeName || ''}
              onChange={(e) => setForm({ ...form, cafeName: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 font-body mb-2">Currency Symbol</label>
            <input
              value={form.currency || ''}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
              className="input-field w-24"
            />
          </div>

          <div className="pt-4 border-t flex flex-col sm:flex-row flex-wrap gap-2"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <button
              onClick={save}
              disabled={saving}
              className="btn-primary flex items-center justify-center gap-2 py-2.5 flex-1 sm:flex-none disabled:opacity-60"
            >
              {saving ? <FiLoader className="animate-spin" /> : <FiSave />}
              {saving ? 'Saving…' : 'Save Settings'}
            </button>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="btn-secondary flex items-center justify-center gap-2 py-2.5 flex-1 sm:flex-none disabled:opacity-60"
            >
              {seeding ? <FiLoader className="animate-spin" /> : <FiDatabase />}
              {seeding ? 'Seeding…' : 'Seed Demo Data'}
            </button>
            <button
              onClick={handleClear}
              disabled={clearing}
              className="btn-danger flex items-center justify-center gap-2 py-2.5 flex-1 sm:flex-none disabled:opacity-60"
            >
              {clearing ? <FiLoader className="animate-spin" /> : <FiTrash2 />}
              {clearing ? 'Clearing…' : 'Clear All Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
