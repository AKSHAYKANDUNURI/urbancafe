import React from 'react'

const accentColors = {
  burgundy: { icon: 'text-royal-burgundy', glow: 'rgba(114, 47, 55, 0.15)' },
  gold: { icon: 'text-royal-gold', glow: 'rgba(201, 169, 97, 0.15)' },
  bronze: { icon: 'text-royal-bronze', glow: 'rgba(166, 124, 82, 0.15)' },
  wine: { icon: 'text-royal-wine', glow: 'rgba(92, 35, 48, 0.15)' },
  sage: { icon: 'text-royal-sage', glow: 'rgba(92, 107, 82, 0.15)' },
  cream: { icon: 'text-royal-gold', glow: 'rgba(201, 169, 97, 0.1)' }
}

export default function DashboardCard({ title, value, icon: Icon, accent = 'gold', children }) {
  const colors = accentColors[accent] || accentColors.gold

  return (
    <div className="card-glow group">
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1 min-w-0">
          <h3 className="text-xs uppercase tracking-[0.15em] text-stone-500 font-body">{title}</h3>
          <div className="stat-value truncate">{value}</div>
        </div>
        {Icon && (
          <div className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-105 shrink-0 ml-3"
            style={{ background: colors.glow, border: `1px solid ${colors.glow}` }}>
            <Icon className={`text-xl ${colors.icon}`} />
          </div>
        )}
      </div>
      {children && <div className="mt-4 relative z-10">{children}</div>}
    </div>
  )
}
