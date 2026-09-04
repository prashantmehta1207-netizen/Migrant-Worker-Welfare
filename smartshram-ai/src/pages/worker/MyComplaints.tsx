import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Clock, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Card, { CardBody } from '../../components/ui/Card'
import StatusBadge from '../../components/ui/StatusBadge'
import { grievances } from '../../data/grievances'
import { useState } from 'react'

export default function MyComplaints() {
  const { currentWorker } = useApp()
  const myGrievances = grievances.filter(g => g.workerId === currentWorker.id)
  const [expanded, setExpanded] = useState<string | null>(null)

  const priorityColor: Record<string, string> = {
    Low: 'text-gray-500',
    Medium: 'text-blue-600',
    High: 'text-amber-600',
    Critical: 'text-red-600',
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Complaints</h1>
          <p className="text-sm text-gray-500 mt-1">{myGrievances.length} case(s) on record</p>
        </div>
        <Link
          to="/worker/grievance"
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors"
        >
          <Plus size={14} />New Report
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total', count: myGrievances.length, color: 'text-gray-900' },
          { label: 'Open', count: myGrievances.filter(g => g.status === 'Submitted' || g.status === 'Under Review' || g.status === 'In Progress').length, color: 'text-blue-700' },
          { label: 'Resolved', count: myGrievances.filter(g => g.status === 'Resolved').length, color: 'text-green-700' },
          { label: 'High Priority', count: myGrievances.filter(g => g.priority === 'High' || g.priority === 'Critical').length, color: 'text-red-600' },
        ].map(s => (
          <Card key={s.label}>
            <CardBody className="text-center py-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {myGrievances.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FileText size={40} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">No complaints filed yet</p>
          <Link to="/worker/grievance" className="text-blue-700 text-sm font-medium mt-2 inline-block">File your first grievance</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myGrievances.map(g => (
            <Card key={g.id}>
              <CardBody>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-mono text-gray-500">{g.id}</span>
                      <StatusBadge status={g.status} />
                      <span className={`text-xs font-semibold ${priorityColor[g.priority]}`}>{g.priority}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{g.type}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Submitted: {new Date(g.submittedDate).toLocaleDateString('en-IN')} · Updated: {new Date(g.updatedDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <button
                    onClick={() => setExpanded(expanded === g.id ? null : g.id)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 shrink-0"
                  >
                    {expanded === g.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                {expanded === g.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 fade-in">
                    <p className="text-sm text-gray-600 mb-4">{g.description}</p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Timeline</p>
                      {g.timeline.map((t, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 shrink-0" />
                            {i < g.timeline.length - 1 && <div className="flex-1 w-0.5 bg-gray-200 my-1" />}
                          </div>
                          <div className="pb-2">
                            <p className="text-xs text-gray-500">{new Date(t.date).toLocaleDateString('en-IN')} · {t.by}</p>
                            <p className="text-sm text-gray-800">{t.action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
