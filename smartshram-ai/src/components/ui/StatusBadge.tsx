import React from 'react'
import { GrievanceStatus } from '../../types'

const map: Record<GrievanceStatus, { bg: string; dot: string; text: string }> = {
  'Submitted': { bg: 'bg-blue-50', dot: 'bg-blue-500', text: 'text-blue-700' },
  'Under Review': { bg: 'bg-amber-50', dot: 'bg-amber-500', text: 'text-amber-700' },
  'In Progress': { bg: 'bg-indigo-50', dot: 'bg-indigo-500', text: 'text-indigo-700' },
  'Resolved': { bg: 'bg-green-50', dot: 'bg-green-500', text: 'text-green-700' },
  'Closed': { bg: 'bg-gray-100', dot: 'bg-gray-400', text: 'text-gray-600' },
}

export default function StatusBadge({ status }: { status: GrievanceStatus }) {
  const s = map[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  )
}
