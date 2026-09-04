import React, { useState } from 'react'
import { Shield, Filter } from 'lucide-react'
import StatusBadge from '../../components/ui/StatusBadge'
import { grievances } from '../../data/grievances'
import { GrievanceStatus } from '../../types'
import { useApp } from '../../context/AppContext'

export default function SafetyGrievances() {
  const { addToast } = useApp()
  const [statusFilter, setStatusFilter] = useState<'all' | GrievanceStatus>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'Critical' | 'High'>('all')

  const statuses: GrievanceStatus[] = ['Submitted', 'Under Review', 'In Progress', 'Resolved']

  const filtered = grievances.filter(g => {
    if (statusFilter !== 'all' && g.status !== statusFilter) return false
    if (priorityFilter !== 'all' && g.priority !== priorityFilter) return false
    return true
  })

  const priorityColor: Record<string, string> = {
    Low: 'bg-gray-700 text-gray-300',
    Medium: 'bg-blue-900/50 text-blue-400',
    High: 'bg-amber-900/50 text-amber-400',
    Critical: 'bg-red-900/50 text-red-400',
  }

  const handleAssign = (id: string) => {
    addToast({ type: 'info', title: 'Case Assigned', message: `Case ${id} assigned to next available inspector.` })
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Safety & Grievances</h1>
        <p className="text-sm text-gray-400 mt-1">All worker complaints and their resolution status.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Cases', value: grievances.length, color: 'text-white' },
          { label: 'Open', value: grievances.filter(g => g.status !== 'Resolved' && g.status !== 'Closed').length, color: 'text-blue-400' },
          { label: 'Critical', value: grievances.filter(g => g.priority === 'Critical').length, color: 'text-red-400' },
          { label: 'Resolved', value: grievances.filter(g => g.status === 'Resolved').length, color: 'text-green-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex gap-1.5">
          {(['all', ...statuses] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {s === 'all' ? 'All Status' : s}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 ml-2">
          {(['all', 'Critical', 'High'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${priorityFilter === p ? 'bg-red-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {p === 'all' ? 'All Priority' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-gray-700/50">
              <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Case ID</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Worker</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Type</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">District</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Status</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Priority</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtered.map(g => (
              <tr key={g.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-blue-400">{g.id}</span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-white font-medium text-sm">{g.workerName}</p>
                  <p className="text-xs text-gray-400">{g.industry}</p>
                </td>
                <td className="px-4 py-3 text-gray-300 text-xs max-w-[140px]">
                  <span className="truncate block">{g.type}</span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{g.district}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={g.status} />
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor[g.priority]}`}>
                    {g.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {g.status !== 'Resolved' && (
                    <button
                      onClick={() => handleAssign(g.id)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Assign
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
