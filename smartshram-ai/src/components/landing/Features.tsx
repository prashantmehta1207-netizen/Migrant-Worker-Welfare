import React from 'react'
import {
  DollarSign, HeartHandshake, AlertTriangle, MessageSquare,
  Map, BarChart2, Brain, Shield
} from 'lucide-react'

const features = [
  {
    icon: DollarSign,
    title: 'Wage Intelligence',
    description: 'Real-time comparison against district and industry benchmarks. Auto-flags underpayment with legal references.',
    tag: 'Worker',
    color: 'blue',
  },
  {
    icon: HeartHandshake,
    title: 'Welfare Scheme Matching',
    description: 'AI matches workers to 6+ central and state schemes. One-click enrolment assistance.',
    tag: 'Worker',
    color: 'green',
  },
  {
    icon: AlertTriangle,
    title: 'Grievance Filing',
    description: 'Structured grievance submission in under 2 minutes. Auto-generates SS-2026-XXXXXX tracking IDs.',
    tag: 'Worker',
    color: 'amber',
  },
  {
    icon: MessageSquare,
    title: 'Multilingual AI Chat',
    description: 'AI assistant in 6 languages. Answers welfare, wage, and legal queries instantly.',
    tag: 'Worker',
    color: 'indigo',
  },
  {
    icon: Map,
    title: 'District Worker Map',
    description: 'Interactive SVG map of Gujarat districts showing live worker density and alert hotspots.',
    tag: 'Admin',
    color: 'teal',
  },
  {
    icon: BarChart2,
    title: 'Analytics Dashboard',
    description: 'Charts for industry distribution, wage alerts by district, complaints over time.',
    tag: 'Admin',
    color: 'purple',
  },
  {
    icon: Brain,
    title: 'AI Insights Engine',
    description: 'Predictive risk scoring, seasonal migration forecasts, and policy compliance gaps.',
    tag: 'Admin',
    color: 'blue',
  },
  {
    icon: Shield,
    title: 'Case Management',
    description: 'Triage, assign, and track grievance cases from submission to resolution.',
    tag: 'Admin',
    color: 'red',
  },
]

const tagColors: Record<string, string> = {
  Worker: 'bg-blue-100 text-blue-700',
  Admin: 'bg-purple-100 text-purple-700',
}

const iconBg: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700',
  green: 'bg-green-50 text-green-700',
  amber: 'bg-amber-50 text-amber-700',
  indigo: 'bg-indigo-50 text-indigo-700',
  teal: 'bg-teal-50 text-teal-700',
  purple: 'bg-purple-50 text-purple-700',
  red: 'bg-red-50 text-red-700',
}

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Platform Features</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Complete toolset for workers and authorities — all in one platform.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(f => (
            <div key={f.title} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg[f.color]}`}>
                  <f.icon size={20} />
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[f.tag]}`}>{f.tag}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
