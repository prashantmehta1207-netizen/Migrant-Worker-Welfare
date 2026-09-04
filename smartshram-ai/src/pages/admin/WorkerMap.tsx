import React from 'react'
import GujaratMap from '../../components/map/GujaratMap'
import { mapDistricts } from '../../data/mapData'

export default function WorkerMap() {
  const totalWorkers = mapDistricts.reduce((s, d) => s + d.workerCount, 0)
  const totalAlerts = mapDistricts.reduce((s, d) => s + d.alertCount, 0)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Worker Map</h1>
        <p className="text-sm text-gray-400 mt-1">Geographic distribution of registered migrant workers across Gujarat districts.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Workers', value: totalWorkers.toLocaleString(), color: 'text-blue-400' },
          { label: 'Districts Active', value: mapDistricts.length, color: 'text-green-400' },
          { label: 'Total Alerts', value: totalAlerts, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-5">
        <GujaratMap />
      </div>
    </div>
  )
}
