import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Map, BarChart2, DollarSign, Shield,
  Brain, LogOut, Zap, Menu, X, Users
} from 'lucide-react'

const navItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/map', label: 'Worker Map', icon: Map },
  { to: '/admin/welfare', label: 'Welfare Analytics', icon: BarChart2 },
  { to: '/admin/wages', label: 'Wage Alerts', icon: DollarSign },
  { to: '/admin/grievances', label: 'Safety & Grievances', icon: Shield },
  { to: '/admin/insights', label: 'AI Insights', icon: Brain },
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} shrink-0 bg-gray-900 text-white flex flex-col h-screen sticky top-0 transition-all duration-200`}>
      <div className="px-4 py-4 border-b border-gray-700 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm">SmartShram <span className="text-blue-400">AI</span></span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded hover:bg-gray-700 text-gray-400">
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      {!collapsed && (
        <div className="px-4 py-3 bg-gray-800 mx-3 mt-3 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Shield size={14} />
            </div>
            <div>
              <p className="text-sm font-semibold">Labour Authority</p>
              <p className="text-xs text-gray-400">Gujarat Admin</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon size={17} className="shrink-0" />
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-gray-700">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut size={17} />
          {!collapsed && 'Back to Home'}
        </button>
      </div>
    </aside>
  )
}
