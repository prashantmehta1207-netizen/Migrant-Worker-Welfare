import React from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, HeartHandshake, AlertTriangle, FileText, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Card, { CardBody } from '../../components/ui/Card'
import { grievances } from '../../data/grievances'
import { schemes } from '../../data/schemes'

export default function WorkerOverview() {
  const { currentWorker } = useApp()
  const myGrievances = grievances.filter(g => g.workerId === currentWorker.id)
  const mySchemes = schemes.filter(s => currentWorker.registeredSchemes.includes(s.id))

  const kpis = [
    {
      label: 'Daily Wage',
      value: `₹${currentWorker.dailyWage}`,
      sub: '≈ ₹12,600/month',
      icon: DollarSign,
      color: 'blue',
      link: '/worker/wage',
    },
    {
      label: 'Active Schemes',
      value: mySchemes.length,
      sub: `${currentWorker.registeredSchemes.length} enrolled`,
      icon: HeartHandshake,
      color: 'green',
      link: '/worker/welfare',
    },
    {
      label: 'Open Grievances',
      value: myGrievances.filter(g => g.status !== 'Resolved' && g.status !== 'Closed').length,
      sub: 'Active cases',
      icon: AlertTriangle,
      color: 'amber',
      link: '/worker/complaints',
    },
    {
      label: 'Profile Complete',
      value: `${currentWorker.profileComplete}%`,
      sub: 'Update to 100%',
      icon: CheckCircle,
      color: 'indigo',
      link: '/worker/profile',
    },
  ]

  const colorMap: Record<string, { bg: string; icon: string; text: string }> = {
    blue:   { bg: 'bg-blue-50',   icon: 'text-blue-700',   text: 'text-blue-700' },
    green:  { bg: 'bg-green-50',  icon: 'text-green-700',  text: 'text-green-700' },
    amber:  { bg: 'bg-amber-50',  icon: 'text-amber-700',  text: 'text-amber-700' },
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-700', text: 'text-indigo-700' },
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentWorker.name.split(' ')[0]}!</h1>
        <p className="text-gray-500 text-sm mt-1">{currentWorker.industry} Worker · {currentWorker.location} · ID: {currentWorker.id}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map(k => {
          const c = colorMap[k.color]
          return (
            <Link key={k.label} to={k.link}>
              <Card hover className="h-full">
                <CardBody className="py-5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.bg}`}>
                    <k.icon size={18} className={c.icon} />
                  </div>
                  <p className={`text-2xl font-bold ${c.text}`}>{k.value}</p>
                  <p className="text-sm font-medium text-gray-700 mt-0.5">{k.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
                </CardBody>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Wage alert */}
      {currentWorker.dailyWage < 450 && currentWorker.industry === 'Construction' && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <TrendingUp size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Wage Below Benchmark</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Your daily wage of ₹{currentWorker.dailyWage} is below the Construction benchmark of ₹450 in {currentWorker.location}.
              You may be entitled to additional pay.
            </p>
            <Link to="/worker/wage" className="text-xs text-amber-800 font-semibold mt-1 inline-flex items-center gap-1">
              Check Wage Analysis <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {/* Recent Grievances */}
        <Card>
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">My Grievances</h3>
            <Link to="/worker/complaints" className="text-xs text-blue-700 font-medium flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <CardBody className="space-y-3">
            {myGrievances.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No grievances filed yet</p>
            ) : (
              myGrievances.slice(0, 3).map(g => (
                <div key={g.id} className="flex items-start gap-3">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                    g.status === 'Resolved' ? 'bg-green-500' :
                    g.status === 'In Progress' ? 'bg-blue-500' :
                    g.status === 'Under Review' ? 'bg-amber-500' : 'bg-gray-400'
                  }`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{g.type}</p>
                    <p className="text-xs text-gray-500">{g.id} · {g.status}</p>
                  </div>
                </div>
              ))
            )}
          </CardBody>
        </Card>

        {/* Enrolled Schemes */}
        <Card>
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Enrolled Schemes</h3>
            <Link to="/worker/welfare" className="text-xs text-blue-700 font-medium flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <CardBody className="space-y-3">
            {mySchemes.map(s => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <HeartHandshake size={14} className="text-green-700" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.benefit.substring(0, 50)}…</p>
                </div>
                <span className="ml-auto shrink-0 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Active</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
