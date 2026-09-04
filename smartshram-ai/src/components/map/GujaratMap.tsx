import React, { useState } from 'react'
import { mapDistricts } from '../../data/mapData'
import { MapDistrict } from '../../types'

export default function GujaratMap() {
  const [selected, setSelected] = useState<MapDistrict | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const maxWorkers = Math.max(...mapDistricts.map(d => d.workerCount))

  const getRadius = (count: number) => 14 + (count / maxWorkers) * 22

  const getColor = (alertCount: number) => {
    if (alertCount >= 40) return '#dc2626'
    if (alertCount >= 20) return '#f59e0b'
    return '#2563eb'
  }

  return (
    <div className="flex gap-6 flex-wrap">
      {/* SVG Map */}
      <div className="flex-1 min-w-[280px]">
        <svg
          viewBox="0 0 380 420"
          className="w-full h-auto max-h-[420px]"
          style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)', borderRadius: '16px' }}
        >
          {/* Gujarat outline — simplified polygon */}
          <polygon
            points="80,60 120,40 180,35 240,45 290,60 320,100 340,150 330,200 310,240 290,270 270,300 260,340 240,370 200,390 170,380 150,360 130,340 110,310 90,280 70,250 55,210 50,170 60,130 70,90"
            fill="#dbeafe"
            stroke="#93c5fd"
            strokeWidth="2"
          />

          {/* Arabian Sea label */}
          <text x="40" y="380" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Arabian Sea</text>

          {/* State label */}
          <text x="140" y="80" fill="#1d4ed8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">GUJARAT</text>

          {/* District markers */}
          {mapDistricts.map(d => {
            const r = getRadius(d.workerCount)
            const color = getColor(d.alertCount)
            const isHovered = hovered === d.id
            const isSelected = selected?.id === d.id

            return (
              <g
                key={d.id}
                onClick={() => setSelected(selected?.id === d.id ? null : d)}
                onMouseEnter={() => setHovered(d.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Pulse ring */}
                {isHovered && (
                  <circle
                    cx={d.cx}
                    cy={d.cy}
                    r={r + 8}
                    fill={color}
                    fillOpacity="0.15"
                    stroke={color}
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  />
                )}
                {/* Main bubble */}
                <circle
                  cx={d.cx}
                  cy={d.cy}
                  r={r}
                  fill={color}
                  fillOpacity={isSelected ? 1 : 0.75}
                  stroke={isSelected ? '#1e40af' : 'white'}
                  strokeWidth={isSelected ? 3 : 2}
                />
                {/* Worker count */}
                <text
                  x={d.cx}
                  y={d.cy - 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize={r > 28 ? '9' : '7'}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  {(d.workerCount / 1000).toFixed(0)}K
                </text>
                {/* Name label */}
                <text
                  x={d.cx}
                  y={d.cy + r + 12}
                  textAnchor="middle"
                  fill="#1e3a5f"
                  fontSize="9"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {d.name}
                </text>
              </g>
            )
          })}

          {/* Legend */}
          <g transform="translate(230, 20)">
            <rect x="0" y="0" width="110" height="58" fill="white" fillOpacity="0.8" rx="6" />
            <text x="8" y="14" fontSize="8" fontWeight="bold" fill="#374151" fontFamily="sans-serif">ALERT LEVEL</text>
            {[
              { color: '#dc2626', label: 'Critical (40+)' },
              { color: '#f59e0b', label: 'Warning (20-39)' },
              { color: '#2563eb', label: 'Normal (<20)' },
            ].map((l, i) => (
              <g key={l.label} transform={`translate(8, ${22 + i * 13})`}>
                <circle cx="4" cy="4" r="4" fill={l.color} />
                <text x="12" y="8" fontSize="8" fill="#374151" fontFamily="sans-serif">{l.label}</text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Detail Panel */}
      <div className="w-64 shrink-0">
        {selected ? (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-1">{selected.name} District</h3>
            <p className="text-xs text-gray-500 mb-4">Click another district to compare</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Workers</span>
                <span className="text-sm font-semibold">{selected.workerCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Wage Alerts</span>
                <span className={`text-sm font-semibold ${selected.alertCount >= 40 ? 'text-red-600' : selected.alertCount >= 20 ? 'text-amber-600' : 'text-green-600'}`}>
                  {selected.alertCount}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5">Industries</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.industries.map(ind => (
                    <span key={ind} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{ind}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6 text-center">
            <p className="text-sm text-gray-500">Click a district bubble to view details</p>
          </div>
        )}

        {/* Summary */}
        <div className="mt-4 space-y-2">
          {mapDistricts.sort((a, b) => b.workerCount - a.workerCount).map(d => (
            <button
              key={d.id}
              onClick={() => setSelected(d)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selected?.id === d.id ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-100 hover:border-blue-200'}`}
            >
              <span className="font-medium text-gray-900">{d.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{(d.workerCount / 1000).toFixed(0)}K</span>
                <span className={`w-2 h-2 rounded-full ${d.alertCount >= 40 ? 'bg-red-500' : d.alertCount >= 20 ? 'bg-amber-400' : 'bg-green-500'}`} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
