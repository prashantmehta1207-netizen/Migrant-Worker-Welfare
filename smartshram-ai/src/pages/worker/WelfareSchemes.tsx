import React, { useState } from 'react'
import { HeartHandshake, Filter, ExternalLink, CheckCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Card, { CardBody } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { schemes } from '../../data/schemes'
import { Industry } from '../../types'

const colorVariants: Record<string, string> = {
  blue: 'bg-blue-700',
  orange: 'bg-orange-500',
  green: 'bg-green-600',
  purple: 'bg-purple-600',
  teal: 'bg-teal-600',
  pink: 'bg-pink-600',
}

export default function WelfareSchemes() {
  const { currentWorker, addToast } = useApp()
  const [filter, setFilter] = useState<'all' | 'enrolled' | 'eligible'>('all')
  const [enrolled, setEnrolled] = useState<string[]>(currentWorker.registeredSchemes)

  const isEligible = (schemeId: string) => {
    const scheme = schemes.find(s => s.id === schemeId)
    if (!scheme) return false
    return scheme.industries.includes(currentWorker.industry as Industry)
  }

  const filtered = schemes.filter(s => {
    if (filter === 'enrolled') return enrolled.includes(s.id)
    if (filter === 'eligible') return isEligible(s.id) && !enrolled.includes(s.id)
    return true
  })

  const handleEnroll = (schemeId: string, schemeName: string) => {
    if (!enrolled.includes(schemeId)) {
      setEnrolled(prev => [...prev, schemeId])
      addToast({ type: 'success', title: 'Enrolment Initiated', message: `Application for ${schemeName} submitted.` })
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welfare Schemes</h1>
        <p className="text-sm text-gray-500 mt-1">Government schemes you are eligible for based on your industry and profile.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Schemes', value: schemes.length, color: 'text-gray-900' },
          { label: 'Enrolled', value: enrolled.length, color: 'text-green-700' },
          { label: 'Eligible (Not Enrolled)', value: schemes.filter(s => isEligible(s.id) && !enrolled.includes(s.id)).length, color: 'text-blue-700' },
        ].map(s => (
          <Card key={s.label}>
            <CardBody className="text-center py-5">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {(['all', 'enrolled', 'eligible'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
              filter === f ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
            }`}
          >
            {f === 'eligible' ? 'Not Enrolled' : f}
          </button>
        ))}
      </div>

      {/* Scheme Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(s => {
          const isEnrolled = enrolled.includes(s.id)
          const eligible = isEligible(s.id)
          return (
            <Card key={s.id} className="flex flex-col">
              <div className={`h-1.5 rounded-t-xl ${colorVariants[s.color] ?? 'bg-gray-400'}`} />
              <CardBody className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">{s.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{s.ministry}</p>
                  </div>
                  {isEnrolled && (
                    <span className="shrink-0 flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      <CheckCircle size={10} />Enrolled
                    </span>
                  )}
                </div>
                <div className="p-3 bg-gray-50 rounded-lg mb-3">
                  <p className="text-xs text-gray-600 font-medium">Benefit</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">{s.benefit}</p>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-xs font-medium text-gray-500">Eligibility</p>
                  {s.eligibility.slice(0, 2).map(e => (
                    <p key={e} className="text-xs text-gray-600 flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />{e}
                    </p>
                  ))}
                </div>
                <div className="flex gap-2">
                  {!isEnrolled && eligible && (
                    <button
                      onClick={() => handleEnroll(s.id, s.name)}
                      className="flex-1 py-2 text-sm font-semibold bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      Enrol Now
                    </button>
                  )}
                  {isEnrolled && (
                    <div className="flex-1 py-2 text-sm font-semibold text-center bg-green-50 text-green-700 rounded-lg border border-green-200">
                      Active Member
                    </div>
                  )}
                  {!isEnrolled && !eligible && (
                    <div className="flex-1 py-2 text-sm text-center text-gray-400 rounded-lg bg-gray-50">
                      Not Eligible
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
