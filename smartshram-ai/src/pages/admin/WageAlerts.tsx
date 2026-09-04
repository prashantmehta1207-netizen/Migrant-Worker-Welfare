import React, { useState } from 'react'
import { AlertTriangle, TrendingDown } from 'lucide-react'
import AnalyticsCharts from '../../components/charts/AnalyticsCharts'
import { wageData } from '../../data/wageData'
import { Industry } from '../../types'

export default function WageAlerts() {
  const [filter, setFilter] = useState<'all' | Industry>('all')

  const industries: Industry[] = ['Construction', 'Textile', 'Diamond', 'Manufacturing', 'Hospitality']

  const filtered = filter === 'all' ? wageData : wageData.filter(w => w.industry === filter)
  const criticalRows = filtered.filter(w => (w.average - w.benchmark) / w.benchmark < -0.1)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Wage Alerts</h1>
        <p className="text-sm text-gray-400 mt-1">Districts and industries with wages below legal benchmarks.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Monitored', value: wageData.length, color: 'text-blue-400' },
          { label: 'Below Benchmark', value: wageData.filter(w => w.average < w.benchmark).length, color: 'text-amber-400' },
          { label: 'Critical (<10%)', value: criticalRows.length, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-5 mb-5">
        <h3 className="font-semibold text-gray-900 mb-4">Wage Alerts by District</h3>
        <AnalyticsCharts type="wage-alerts" height={220} />
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(['all', ...industries] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-700">
          <h3 className="font-semibold text-white text-sm">Wage Benchmark Comparison</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-700/50">
              <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Industry</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">District</th>
              <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Benchmark</th>
              <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Average</th>
              <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Gap</th>
              <th className="px-4 py-3 text-right text-xs text-gray-400 font-medium">Alerts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtered.map((w, i) => {
              const gap = w.average - w.benchmark
              const pct = (gap / w.benchmark) * 100
              const isCritical = pct < -10
              return (
                <tr key={i} className={`hover:bg-gray-700/30 transition-colors ${isCritical ? 'bg-red-900/10' : ''}`}>
                  <td className="px-4 py-3">
                    <span className="text-white font-medium">{w.industry}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{w.district}</td>
                  <td className="px-4 py-3 text-right text-gray-300">₹{w.benchmark}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    <span className={w.average >= w.benchmark ? 'text-green-400' : isCritical ? 'text-red-400' : 'text-amber-400'}>
                      ₹{w.average}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-xs font-medium flex items-center justify-end gap-1 ${gap < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {gap < 0 && <TrendingDown size={12} />}
                      {gap >= 0 ? '+' : ''}₹{gap} ({pct >= 0 ? '+' : ''}{pct.toFixed(1)}%)
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isCritical ? 'bg-red-900/50 text-red-400' : w.alertCount > 0 ? 'bg-amber-900/40 text-amber-400' : 'bg-gray-700 text-gray-400'}`}>
                      {w.alertCount}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
