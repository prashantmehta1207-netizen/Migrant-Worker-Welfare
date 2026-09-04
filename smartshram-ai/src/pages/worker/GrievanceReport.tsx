import React, { useState } from 'react'
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Card, { CardBody } from '../../components/ui/Card'

const grievanceTypes = [
  'Wage Theft / Underpayment',
  'Non-payment of Wages',
  'Overtime Denial',
  'Safety Violation',
  'Harassment at Workplace',
  'Contract Violation',
  'Illegal Deduction',
  'Other',
]

const districts = ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bharuch', 'Vapi']

function generateId() {
  return `SS-2026-${String(Math.floor(Math.random() * 900000 + 100000))}`
}

export default function GrievanceReport() {
  const { currentWorker, addToast } = useApp()
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [district, setDistrict] = useState(currentWorker.location)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [caseId, setCaseId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!type || !description) {
      addToast({ type: 'error', title: 'Incomplete Form', message: 'Please fill all required fields.' })
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      const id = generateId()
      setCaseId(id)
      setSubmitted(true)
      setSubmitting(false)
      addToast({ type: 'success', title: 'Grievance Submitted', message: `Case ID: ${id}` })
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center fade-in">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Grievance Submitted!</h2>
          <p className="text-gray-500 text-sm mb-6">Your grievance has been received and assigned to the appropriate authority.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-xs text-blue-600 font-medium mb-1">Your Case ID</p>
            <p className="text-2xl font-bold text-blue-800 font-mono">{caseId}</p>
            <p className="text-xs text-blue-600 mt-1">Save this ID to track your case</p>
          </div>
          <div className="space-y-2 text-sm text-left mb-6">
            {[
              { step: '1', text: 'Case received and logged in SmartShram AI' },
              { step: '2', text: 'AI agents performing priority assessment' },
              { step: '3', text: 'Assigned to Labour Inspector within 24 hours' },
              { step: '4', text: 'You will receive SMS updates on progress' },
            ].map(s => (
              <div key={s.step} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {s.step}
                </div>
                <span className="text-gray-600">{s.text}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setSubmitted(false); setType(''); setDescription('') }}
            className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            File Another Grievance
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Report Grievance</h1>
        <p className="text-sm text-gray-500 mt-1">File a complaint and let our AI agents resolve it quickly.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex items-start gap-3">
        <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-800">
          For emergencies or immediate safety threats, call the Labour Helpline: <strong>1800-11-1999</strong> (toll-free).
          SmartShram AI grievances are handled within 2–5 working days.
        </p>
      </div>

      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grievance Type *</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
                {grievanceTypes.map(t => <option key={t} value={t}>{t}</option>)}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe the issue in detail. Include dates, amounts, and names if possible."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{description.length}/500 characters</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 space-y-1">
              <p className="font-medium text-gray-700">Auto-filled from your profile:</p>
              <p>Worker: {currentWorker.name} (ID: {currentWorker.id})</p>
              <p>Industry: {currentWorker.industry}</p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Submitting…
                </>
              ) : (
                <>Submit Grievance <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
