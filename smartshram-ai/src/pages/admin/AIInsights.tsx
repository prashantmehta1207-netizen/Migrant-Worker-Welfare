import React from 'react'
import AgentActivityPanel from '../../components/agents/AgentActivityPanel'
import { Brain, TrendingUp, AlertTriangle, Users } from 'lucide-react'

const insights = [
  {
    icon: AlertTriangle,
    color: 'red',
    title: 'Surat Textile — High Risk Zone',
    desc: 'Wage compliance rate in Surat Textile sector has dropped to 78% over the last 30 days. 31 active alerts. Recommend immediate inspection sweep.',
    confidence: 94,
    date: 'Jan 16, 2026',
  },
  {
    icon: TrendingUp,
    color: 'amber',
    title: 'Seasonal Migration Surge Predicted',
    desc: 'Construction worker inflow expected to increase 23% in Bharuch and Ahmedabad districts over Feb–Mar 2026. Pre-register workers now.',
    confidence: 87,
    date: 'Jan 15, 2026',
  },
  {
    icon: Users,
    color: 'blue',
    title: 'Welfare Scheme Under-enrolment',
    desc: '62% of eligible Diamond workers are not enrolled in ABVKY. Targeted outreach campaign recommended for Surat and Vadodara districts.',
    confidence: 91,
    date: 'Jan 14, 2026',
  },
  {
    icon: Brain,
    color: 'green',
    title: 'Case Resolution Improvement',
    desc: 'Average grievance resolution time has decreased from 12 days to 7.3 days this month — a 39% improvement driven by AI auto-assignment.',
    confidence: 99,
    date: 'Jan 13, 2026',
  },
]

const colorMap: Record<string, { border: string; icon: string; bar: string; badge: string }> = {
  red:   { border: 'border-red-700/40 bg-red-900/10',   icon: 'text-red-400',    bar: 'bg-red-500',    badge: 'bg-red-900/50 text-red-400' },
  amber: { border: 'border-amber-700/40 bg-amber-900/10',icon: 'text-amber-400', bar: 'bg-amber-500',  badge: 'bg-amber-900/40 text-amber-400' },
  blue:  { border: 'border-blue-700/40 bg-blue-900/10', icon: 'text-blue-400',   bar: 'bg-blue-500',   badge: 'bg-blue-900/50 text-blue-400' },
  green: { border: 'border-green-700/40 bg-green-900/10',icon: 'text-green-400', bar: 'bg-green-500',  badge: 'bg-green-900/50 text-green-400' },
}

export default function AIInsights() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">AI Insights</h1>
        <p className="text-sm text-gray-400 mt-1">Predictive intelligence powered by IBM watsonx.ai — updated every 6 hours.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {insights.map(ins => {
          const c = colorMap[ins.color]
          return (
            <div key={ins.title} className={`border rounded-xl p-5 ${c.border}`}>
              <div className="flex items-start gap-3 mb-3">
                <ins.icon size={18} className={`mt-0.5 shrink-0 ${c.icon}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm font-semibold text-white">{ins.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>{ins.confidence}% confidence</span>
                  </div>
                  <p className="text-xs text-gray-400">{ins.date}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-3">{ins.desc}</p>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">AI Confidence</span>
                  <span className={c.icon}>{ins.confidence}%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${ins.confidence}%` }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Agent Panel */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain size={16} className="text-blue-400" />
          <h3 className="font-semibold text-white text-sm">Run On-Demand Analysis</h3>
          <span className="text-xs text-gray-500 ml-1">Execute all 5 AI agents against current dataset</span>
        </div>
        <AgentActivityPanel />
      </div>
    </div>
  )
}
