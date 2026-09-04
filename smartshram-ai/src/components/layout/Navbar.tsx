import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, Users, Shield, ChevronDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Navbar() {
  const { role, setRole } = useApp()
  const navigate = useNavigate()

  const switchToWorker = () => {
    setRole('worker')
    navigate('/worker')
  }
  const switchToAdmin = () => {
    setRole('admin')
    navigate('/admin')
  }

  return (
    <>
      {/* Demo Banner */}
      <div className="bg-indigo-700 text-white text-center py-1.5 text-xs font-medium sticky top-0 z-50 flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5"><Zap size={12} />SIH 2026 Demo Mode</span>
        <div className="flex items-center gap-2">
          <button
            onClick={switchToWorker}
            className={`px-3 py-0.5 rounded-full text-xs transition-colors ${role === 'worker' ? 'bg-white text-indigo-700 font-semibold' : 'bg-indigo-600 hover:bg-indigo-500'}`}
          >
            <Users size={10} className="inline mr-1" />Worker Demo
          </button>
          <button
            onClick={switchToAdmin}
            className={`px-3 py-0.5 rounded-full text-xs transition-colors ${role === 'admin' ? 'bg-white text-indigo-700 font-semibold' : 'bg-indigo-600 hover:bg-indigo-500'}`}
          >
            <Shield size={10} className="inline mr-1" />Authority Demo
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-7 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              <span className="font-bold text-gray-900 text-lg">SmartShram<span className="text-blue-700"> AI</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/#how" className="text-gray-600 hover:text-blue-700 transition-colors">How It Works</Link>
              <Link to="/#features" className="text-gray-600 hover:text-blue-700 transition-colors">Features</Link>
              <Link to="/#ibm" className="text-gray-600 hover:text-blue-700 transition-colors">IBM Powered</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/onboarding"
                className="px-4 py-1.5 text-sm font-medium text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Register
              </Link>
              <button
                onClick={() => role === 'worker' ? navigate('/worker') : navigate('/admin')}
                className="px-4 py-1.5 text-sm font-medium bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-1"
              >
                {role === 'worker' ? 'Worker Portal' : 'Admin Portal'}
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
