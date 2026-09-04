import React from 'react'
import { Link } from 'react-router-dom'
import { Users, AlertTriangle, HeartHandshake, TrendingDown, ArrowRight } from 'lucide-react'
import Card, { CardBody } from '../../components/ui/Card'
import AnalyticsCharts from '../../components/charts/AnalyticsCharts'
import { grievances } from '../../data/grievances'
import { mapDistricts } from '../../data/mapData'

export default function AdminOverview() {
  const totalWorkers = mapDistricts.reduce((s, d) => s + d.workerCount, 0)
  const totalAlerts = mapDistricts.reduce((s, d) => s + d.alertCount, 0)
  const openGrievances = grievances.filter(g => g.status !== 'Resolved' && g.status !== 'Closed').length
  const criticalGrievances = grievances.filter(g => g.priority === 'Critical').length

  const kpis = [
    { label: 'Total Registered Workers', value: totalWorkers.toLocaleString(), icon: Users, color: 'blue', link: '/admin/map' },
    { label: 'Active Wage Alerts', value: totalAlerts, icon: TrendingDown, color: 'red', link: '/admin/wages' },
    { label: 'Open Grievances', value: openGrievances, icon: AlertTriangle, color: 'amber', link: '/admin/grievances' },
    { label: 'Critical Cases', value: criticalGrievances, icon: AlertTriangle, color: 'red', link: '/admin/grievances' },
  ]

  const colorMap: Record<string, { bg: string; icon: string; text: string }> = {
    blue:  { bg: 'bg-blue-900/20', icon: 'text-blue-400', text: 'text-blue-400' },
    red:   { bg: 'bg-red-900/20',  icon: 'text-red-400',  text: 'text-red-400' },
    amber: { bg: 'bg-amber-900/20',icon: 'text-amber-400',text: 'text-amber-400' },
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Gujarat Labour Authority — Real-time overview</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map(k => {
          const c = colorMap[k.color]
          return (
            <Link key={k.label} to={k.link}>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-gray-500 transition-colors cursor-pointer">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.bg}`}>
                  <k.icon size={18} className={c.icon} />
                </div>
                <p className={`text-2xl font-bold ${c.text}`}>{k.value}</p>
                <p className="text-sm text-gray-400 mt-0.5">{k.label}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h3 className="font-semibold text-white mb-4 text-sm">Workers by Industry</h3>
          <AnalyticsCharts type="workers-by-industry" height={200} />
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h3 className="font-semibold text-white mb-4 text-sm">Complaints Over Time</h3>
          <AnalyticsCharts type="complaints-time" height={200} />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h3 className="font-semibold text-white mb-4 text-sm">Skill Distribution</h3>
          <AnalyticsCharts type="skill-distribution" height={200} />
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h3 className="font-semibold text-white mb-4 text-sm">Wage Alerts by District</h3>
          <AnalyticsCharts type="wage-alerts" height={200} />
        </div>
      </div>

      {/* Recent Grievances */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
          <h3 className="font-semibold text-white text-sm">Recent High-Priority Cases</h3>
          <Link to="/admin/grievances" className="text-xs text-blue-400 flex items-center gap-1">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="divide-y divide-gray-700">
          {grievances.filter(g => g.priority === 'High' || g.priority === 'Critical').map(g => (
            <div key={g.id} className="px-5 py-3 flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full shrink-0 ${g.priority === 'Critical' ? 'bg-red-500' : 'bg-amber-400'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{g.type}</p>
                <p className="text-xs text-gray-400">{g.id} · {g.workerName} · {g.district}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                g.status === 'In Progress' ? 'bg-blue-900/50 text-blue-400' :
                g.status === 'Under Review' ? 'bg-amber-900/50 text-amber-400' :
                'bg-gray-700 text-gray-400'
              }`}>{g.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
