import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Users } from 'lucide-react'

export default function Hero() {
  const navigate = useNavigate()
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-700/50 border border-blue-500/50 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
              <Zap size={12} className="text-yellow-400" />
              Powered by IBM Watsonx AI · SIH 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              AI-Powered Protection for<br />
              <span className="text-yellow-400">India's Migrant Workers</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              SmartShram AI uses multi-agent intelligence to ensure fair wages, welfare access,
              and rights protection for 140 million unorganised workers across Gujarat.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/onboarding')}
                className="flex items-center gap-2 bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Register as Worker <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 border border-white/50 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Authority Portal <Shield size={16} />
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { value: '1.4L+', label: 'Workers Protected' },
                { value: '6', label: 'Welfare Schemes' },
                { value: '99.2%', label: 'Uptime' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-yellow-400">{s.value}</p>
                  <p className="text-xs text-blue-200 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Card */}
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-yellow-900" />
                </div>
                <div>
                  <p className="font-semibold text-white">Ramesh Kumar</p>
                  <p className="text-xs text-blue-200">Construction Worker, Ahmedabad</p>
                </div>
                <span className="ml-auto text-xs bg-green-500/20 border border-green-400/30 text-green-300 px-2 py-0.5 rounded-full">Active</span>
              </div>

              {[
                { label: 'Daily Wage', value: '₹420 / day', status: 'Below Benchmark', color: 'text-amber-400' },
                { label: 'Welfare Schemes', value: '2 Active', status: 'PM-SYM, BOCW', color: 'text-green-400' },
                { label: 'Open Grievances', value: '1 Case', status: 'In Progress', color: 'text-blue-300' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                  <div>
                    <p className="text-xs text-blue-200">{row.label}</p>
                    <p className="text-sm font-semibold text-white">{row.value}</p>
                  </div>
                  <span className={`text-xs ${row.color}`}>{row.status}</span>
                </div>
              ))}

              <div className="mt-4 p-3 bg-blue-600/30 rounded-xl">
                <p className="text-xs text-blue-200 mb-1">AI Agent Activity</p>
                <div className="flex gap-2">
                  {['Wage', 'Welfare', 'Risk', 'Assign', 'Report'].map(a => (
                    <div key={a} className="flex-1 bg-blue-500/30 rounded py-1 text-center text-xs text-blue-100">
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
