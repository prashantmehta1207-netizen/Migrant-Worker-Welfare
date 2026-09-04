import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, User, Wrench, HeartHandshake, DollarSign,
  AlertTriangle, FileText, MessageSquare, LogOut, Zap
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

const navItems = [
  { to: '/worker', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/worker/profile', label: 'My Profile', icon: User },
  { to: '/worker/skills', label: 'My Skills', icon: Wrench },
  { to: '/worker/welfare', label: 'Welfare Schemes', icon: HeartHandshake },
  { to: '/worker/wage', label: 'Wage Check', icon: DollarSign },
  { to: '/worker/grievance', label: 'Report Grievance', icon: AlertTriangle },
  { to: '/worker/complaints', label: 'My Complaints', icon: FileText },
  { to: '/worker/assistant', label: 'AI Assistant', icon: MessageSquare },
]

export default function WorkerSidebar() {
  const { currentWorker } = useApp()
  const navigate = useNavigate()

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center">
          <Zap size={14} className="text-white" />
        </div>
        <span className="font-bold text-gray-900">SmartShram <span className="text-blue-700">AI</span></span>
      </div>

      {/* Worker Card */}
      <div className="px-4 py-3 bg-blue-50 mx-3 mt-3 rounded-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {currentWorker.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{currentWorker.name}</p>
            <p className="text-xs text-gray-500">{currentWorker.industry} · {currentWorker.location}</p>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Profile</span>
            <span className="font-medium text-blue-700">{currentWorker.profileComplete}%</span>
          </div>
          <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${currentWorker.profileComplete}%` }} />
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-gray-100">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <LogOut size={17} />Back to Home
        </button>
      </div>
    </aside>
  )
}
