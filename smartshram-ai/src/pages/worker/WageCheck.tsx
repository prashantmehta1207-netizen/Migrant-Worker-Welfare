import React, { useState } from 'react'
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Card, { CardBody } from '../../components/ui/Card'
import { wageData } from '../../data/wageData'
import { Industry } from '../../types'

const districts = ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bharuch', 'Vapi']
const industries: Industry[] = ['Construction', 'Textile', 'Diamond', 'Manufacturing', 'Hospitality']

export default function WageCheck() {
  const { currentWorker } = useApp()
  const [industry, setIndustry] = useState<Industry>(currentWorker.industry as Industry)
  const [district, setDistrict] = useState(currentWorker.location)
  const [wage, setWage] = useState(String(currentWorker.dailyWage))
  const [result, setResult] = useState<{ benchmark: number; avg: number; min: number; diff: number; pct: number } | null>(null)

  const analyse = () => {
    const record = wageData.find(w => w.industry === industry && w.district === district)
    if (!record) return
    const w = parseFloat(wage)
    const diff = w - record.benchmark
    const pct = ((w - record.benchmark) / record.benchmark) * 100
    setResult({ benchmark: record.benchmark, avg: record.average, min: record.minimum, diff, pct })
  }

  const status = result
    ? result.diff >= 0 ? 'fair' : result.pct >= -10 ? 'warning' : 'underpaid'
    : null

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Wage Check</h1>
        <p className="text-sm text-gray-500 mt-1">Compare your wage against district benchmarks powered by IBM Watsonx.</p>
      </div>

      {/* Calculator */}
      <Card className="mb-5">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <DollarSign size={16} className="text-blue-700" />
          <h3 className="font-semibold text-gray-900">Wage Calculator</h3>
        </div>
        <CardBody className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value as Industry)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Daily Wage (₹)</label>
            <input
              type="number"
              value={wage}
              onChange={e => setWage(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={analyse}
            className="w-full py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors"
          >
            Analyse My Wage
          </button>
        </CardBody>
      </Card>

      {/* Result */}
      {result && (
        <div className="space-y-4 fade-in">
          {/* Status Banner */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            status === 'fair' ? 'bg-green-50 border-green-200' :
            status === 'warning' ? 'bg-amber-50 border-amber-200' :
            'bg-red-50 border-red-200'
          }`}>
            {status === 'fair' ? (
              <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle size={20} className={`shrink-0 mt-0.5 ${status === 'warning' ? 'text-amber-600' : 'text-red-600'}`} />
            )}
            <div>
              <p className={`font-semibold text-sm ${status === 'fair' ? 'text-green-800' : status === 'warning' ? 'text-amber-800' : 'text-red-800'}`}>
                {status === 'fair' ? 'Your wage meets the benchmark!' :
                 status === 'warning' ? 'Your wage is slightly below benchmark' :
                 'Your wage is significantly below benchmark'}
              </p>
              <p className={`text-xs mt-0.5 ${status === 'fair' ? 'text-green-700' : status === 'warning' ? 'text-amber-700' : 'text-red-700'}`}>
                {status === 'fair'
                  ? `You are earning ₹${Math.abs(result.diff)} above the legal benchmark.`
                  : `You are earning ₹${Math.abs(result.diff)} (${Math.abs(result.pct).toFixed(1)}%) below the legal benchmark.`}
                {status !== 'fair' && ' You may file a grievance to claim the difference.'}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <Card>
            <CardBody>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: 'Your Wage', value: `₹${wage}`, color: status === 'fair' ? 'text-green-700' : 'text-red-600' },
                  { label: 'Legal Benchmark', value: `₹${result.benchmark}`, color: 'text-blue-700' },
                  { label: 'District Average', value: `₹${result.avg}`, color: 'text-gray-700' },
                ].map(item => (
                  <div key={item.label} className="p-3 bg-gray-50 rounded-xl">
                    <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Difference from benchmark</span>
                  <span className={`font-bold flex items-center gap-1 ${result.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {result.diff >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {result.diff >= 0 ? '+' : ''}₹{result.diff} ({result.pct >= 0 ? '+' : ''}{result.pct.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-500">Minimum wage (district)</span>
                  <span className="font-medium text-gray-700">₹{result.min}/day</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {status !== 'fair' && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
              <p className="font-semibold mb-1">Next Step</p>
              <p className="text-xs">You can file a grievance with SmartShram AI. Our Wage Enforcement Agent will automatically notify your employer and the Labour Inspector for {district}.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
