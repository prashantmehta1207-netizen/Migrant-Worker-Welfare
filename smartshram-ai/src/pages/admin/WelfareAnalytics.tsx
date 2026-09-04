import React from 'react'
import AnalyticsCharts from '../../components/charts/AnalyticsCharts'
import { schemes } from '../../data/schemes'

export default function WelfareAnalytics() {
  const totalEnrolled = schemes.reduce((s, sc) => s + sc.enrolled, 0)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Welfare Analytics</h1>
        <p className="text-sm text-gray-400 mt-1">Scheme enrolment statistics and industry coverage.</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Schemes', value: schemes.length, color: 'text-blue-400' },
          { label: 'Total Enrolled', value: totalEnrolled.toLocaleString(), color: 'text-green-400' },
          { label: 'Avg per Scheme', value: Math.round(totalEnrolled / schemes.length).toLocaleString(), color: 'text-purple-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-5 mb-5">
        <h3 className="font-semibold text-gray-900 mb-4">Skill Distribution of Registered Workers</h3>
        <AnalyticsCharts type="skill-distribution" height={280} />
      </div>

      {/* Scheme table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-700">
          <h3 className="font-semibold text-white text-sm">Scheme Enrolment Summary</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-700/50">
              <th className="px-5 py-3 text-left text-xs text-gray-400 font-medium">Scheme</th>
              <th className="px-5 py-3 text-left text-xs text-gray-400 font-medium">Ministry</th>
              <th className="px-5 py-3 text-right text-xs text-gray-400 font-medium">Enrolled</th>
              <th className="px-5 py-3 text-right text-xs text-gray-400 font-medium">Monthly Cover</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {schemes.map(s => (
              <tr key={s.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{s.shortName}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[220px]">{s.name}</p>
                </td>
                <td className="px-5 py-3 text-gray-400 text-xs">{s.ministry.substring(0, 30)}</td>
                <td className="px-5 py-3 text-right text-green-400 font-medium">{s.enrolled.toLocaleString()}</td>
                <td className="px-5 py-3 text-right text-blue-400 font-medium">₹{s.monthlyCover.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
