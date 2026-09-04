import React from 'react'
import { UserPlus, ScanLine, Bell, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Register in 4 Steps',
    description: 'Workers register with basic details, Aadhaar, industry, and skills via a simple guided onboarding flow.',
    color: 'blue',
  },
  {
    icon: ScanLine,
    step: '02',
    title: 'AI Profile Analysis',
    description: 'Multi-agent system analyses the profile for wage benchmarks, welfare eligibility, and risk flags.',
    color: 'indigo',
  },
  {
    icon: Bell,
    step: '03',
    title: 'Instant Alerts',
    description: 'Workers receive alerts for underpayment, welfare scheme deadlines, and safety notifications.',
    color: 'amber',
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Grievance Resolution',
    description: 'Report issues in seconds. AI auto-assigns to the right authority and tracks resolution.',
    color: 'green',
  },
]

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
  green: 'bg-green-50 text-green-700 border-green-100',
}

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">How SmartShram AI Works</h2>
          <p className="text-gray-500 max-w-xl mx-auto">A seamless four-step process that puts AI to work for worker protection.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-9 left-full w-full h-0.5 bg-gray-100 z-0 -translate-y-1/2" style={{ width: 'calc(100% - 2.5rem)', left: '4rem' }} />
              )}
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 ${colorMap[s.color]}`}>
                  <s.icon size={24} />
                </div>
                <span className="text-xs font-bold text-gray-400 tracking-wider">STEP {s.step}</span>
                <h3 className="text-base font-semibold text-gray-900 mt-1 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
