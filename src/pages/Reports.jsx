import React from 'react'
import { useApp } from '../context/AppContext'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { FiBarChart2, FiPieChart } from 'react-icons/fi'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Reports() {
  const { sales, products, settings } = useApp()

  const labels = products.map((p) => p.name)
  const dataset = products.map((p) =>
    sales.reduce((a, s) => a + s.items.filter((it) => it.id === p.id).reduce((x, y) => x + y.quantity, 0), 0)
  )

  const totalRevenue = sales.reduce((a, s) => a + s.total, 0)
  const totalItemsSold = sales.reduce(
    (a, s) => a + s.items.reduce((x, y) => x + y.quantity, 0), 0
  )

  const data = {
    labels,
    datasets: [{
      label: 'Quantity Sold',
      data: dataset,
      backgroundColor: labels.map((_, i) => {
        const colors = [
          'rgba(114, 47, 55, 0.85)',
          'rgba(201, 169, 97, 0.85)',
          'rgba(166, 124, 82, 0.85)',
          'rgba(92, 35, 48, 0.85)',
          'rgba(92, 107, 82, 0.85)',
          'rgba(30, 42, 58, 0.85)'
        ]
        return colors[i % colors.length]
      }),
      borderRadius: 8,
      borderSkipped: false
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(44, 36, 22, 0.95)',
        borderColor: 'rgba(201, 169, 97, 0.3)',
        borderWidth: 1,
        titleFont: { family: 'Playfair Display' },
        bodyFont: { family: 'DM Sans' },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: 'rgba(245, 240, 232, 0.5)', font: { family: 'DM Sans', size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: 'rgba(245, 240, 232, 0.5)', font: { family: 'DM Sans' } },
        beginAtZero: true
      }
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Reports</h1>
        <p className="page-subtitle">Analytics & performance insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        <div className="card-glow">
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <FiBarChart2 className="text-royal-gold text-xl" />
            <h3 className="font-display font-bold text-lg">Product-wise Sales</h3>
          </div>
          <div className="relative z-10">
            {products.length > 0 ? (
              <Bar data={data} options={options} />
            ) : (
              <div className="text-center py-12 text-slate-500">No products to chart</div>
            )}
          </div>
        </div>

        <div className="card-glow">
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <FiPieChart className="text-royal-burgundy text-xl" />
            <h3 className="font-display font-bold text-lg">Summary</h3>
          </div>
          <div className="space-y-4 relative z-10">
            <div className="p-4 rounded-xl" style={{ background: 'rgba(114, 47, 55, 0.08)', border: '1px solid rgba(114, 47, 55, 0.15)' }}>
              <div className="text-xs uppercase tracking-[0.15em] text-stone-500 font-body">Total Sales</div>
              <div className="stat-value">{sales.length}</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(201, 169, 97, 0.08)', border: '1px solid rgba(201, 169, 97, 0.15)' }}>
              <div className="text-xs uppercase tracking-[0.15em] text-stone-500 font-body">Total Revenue</div>
              <div className="stat-value">{settings.currency}{totalRevenue}</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(92, 107, 82, 0.08)', border: '1px solid rgba(92, 107, 82, 0.15)' }}>
              <div className="text-xs uppercase tracking-[0.15em] text-stone-500 font-body">Items Sold</div>
              <div className="stat-value">{totalItemsSold}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
