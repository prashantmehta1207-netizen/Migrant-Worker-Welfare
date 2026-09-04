import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowRight, ArrowLeft, Zap } from 'lucide-react'
import AgentActivityPanel from '../components/agents/AgentActivityPanel'
import { useApp } from '../context/AppContext'

const STEPS = ['Personal Info', 'Work Details', 'Skills & Docs', 'Review & Submit']

const industries = ['Construction', 'Textile', 'Diamond', 'Manufacturing', 'Hospitality']
const allSkills = [
  'Masonry', 'Shuttering', 'Scaffolding', 'Welding', 'CNC Operation',
  'Weaving', 'Embroidery', 'Loom Operation', 'Diamond Cutting', 'Polishing',
  'Food Service', 'Housekeeping', 'Customer Service', 'Lathe Machine', 'Quality Inspection',
]

interface FormData {
  name: string; age: string; phone: string; aadhaar: string
  industry: string; location: string; dailyWage: string; employer: string
  skills: string[]; hasBOCW: boolean; hasAadhaar: boolean
}

const initialForm: FormData = {
  name: '', age: '', phone: '', aadhaar: '',
  industry: '', location: '', dailyWage: '', employer: '',
  skills: [], hasBOCW: false, hasAadhaar: false,
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [agentsDone, setAgentsDone] = useState(false)
  const { addToast, setRole } = useApp()
  const navigate = useNavigate()

  const set = (key: keyof FormData, value: string | boolean | string[]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const toggleSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep(s => Math.max(s - 1, 0))

  const handleSubmit = () => {
    setSubmitted(true)
    addToast({ type: 'success', title: 'Registration Submitted', message: 'AI agents are analysing your profile…' })
  }

  const handleAgentsDone = () => {
    setAgentsDone(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap size={28} className="text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Profile Analysis</h2>
            <p className="text-gray-500 text-sm">Our 5 agents are processing your registration…</p>
          </div>

          <AgentActivityPanel autoStart={true} onComplete={handleAgentsDone} />

          {agentsDone && (
            <div className="mt-6 fade-in">
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 mb-4">
                <CheckCircle size={20} className="text-green-600 shrink-0" />
                <div>
                  <p className="font-semibold text-green-800 text-sm">Profile Analysis Complete</p>
                  <p className="text-xs text-green-700">Worker ID <strong>W006</strong> created · 3 welfare schemes matched</p>
                </div>
              </div>
              <button
                onClick={() => { setRole('worker'); navigate('/worker') }}
                className="w-full py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
              >
                Go to Your Dashboard <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-xl">SmartShram AI</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Worker Registration</h1>
          <p className="text-gray-500 text-sm">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1.5 rounded-full transition-colors ${i <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <p className={`text-xs mt-1 text-center hidden sm:block ${i === step ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>{s}</p>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-900 mb-4">Personal Information</h2>
              {[
                { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Enter your full name' },
                { label: 'Age *', key: 'age', type: 'number', placeholder: 'Your age' },
                { label: 'Mobile Number *', key: 'phone', type: 'tel', placeholder: '10-digit mobile number' },
                { label: 'Aadhaar Number *', key: 'aadhaar', type: 'text', placeholder: 'XXXX-XXXX-XXXX' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof FormData] as string}
                    onChange={e => set(f.key as keyof FormData, e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-900 mb-4">Work Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                <select
                  value={form.industry}
                  onChange={e => set('industry', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select industry</option>
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Location *</label>
                <select
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select district</option>
                  {['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bharuch', 'Vapi'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Daily Wage (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 450"
                  value={form.dailyWage}
                  onChange={e => set('dailyWage', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employer / Contractor Name</label>
                <input
                  type="text"
                  placeholder="Optional"
                  value={form.employer}
                  onChange={e => set('employer', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-semibold text-gray-900 mb-2">Skills & Documents</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Skills</label>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        form.skills.includes(skill)
                          ? 'bg-blue-700 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Documents Available</p>
                {[
                  { key: 'hasBOCW', label: 'BOCW Registration Card' },
                  { key: 'hasAadhaar', label: 'Aadhaar Card (Physical)' },
                ].map(d => (
                  <label key={d.key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form[d.key as keyof FormData] as boolean}
                      onChange={e => set(d.key as keyof FormData, e.target.checked)}
                      className="w-4 h-4 accent-blue-700"
                    />
                    <span className="text-sm text-gray-700">{d.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-900 mb-4">Review & Submit</h2>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Name', value: form.name || '—' },
                  { label: 'Age', value: form.age || '—' },
                  { label: 'Phone', value: form.phone || '—' },
                  { label: 'Aadhaar', value: form.aadhaar || '—' },
                  { label: 'Industry', value: form.industry || '—' },
                  { label: 'Location', value: form.location || '—' },
                  { label: 'Daily Wage', value: form.dailyWage ? `₹${form.dailyWage}` : '—' },
                  { label: 'Skills', value: form.skills.length > 0 ? form.skills.join(', ') : '—' },
                ].map(row => (
                  <div key={row.label} className="flex justify-between py-1.5 border-b border-gray-50">
                    <span className="text-gray-500">{row.label}</span>
                    <span className="font-medium text-gray-900 text-right max-w-[60%]">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-700 mt-3">
                By submitting, you agree to the terms of SmartShram AI. Your data will be processed by IBM Watsonx agents securely.
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              onClick={back}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={16} />Back
            </button>
          )}
          <button
            onClick={step === STEPS.length - 1 ? handleSubmit : next}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors text-sm"
          >
            {step === STEPS.length - 1 ? 'Submit & Analyse' : 'Continue'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
