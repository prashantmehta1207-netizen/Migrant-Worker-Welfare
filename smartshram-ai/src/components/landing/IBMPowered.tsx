import React from 'react'

const agents = [
  { name: 'Wage Analysis Agent', desc: 'Compares wages against minimum wage benchmarks in real-time', ibm: 'watsonx.ai' },
  { name: 'Welfare Eligibility Agent', desc: 'Matches worker profiles to government welfare schemes', ibm: 'watsonx.data' },
  { name: 'Risk Assessment Agent', desc: 'Identifies safety risks and generates priority scores', ibm: 'watsonx.ai' },
  { name: 'Case Assignment Agent', desc: 'Routes grievances to appropriate labour inspectors', ibm: 'IBM Orchestrate' },
  { name: 'Report Generation Agent', desc: 'Creates structured compliance reports for authorities', ibm: 'watsonx.governance' },
]

export default function IBMPowered() {
  return (
    <section id="ibm" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-5">
              IBM Watsonx Platform
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powered by IBM's Enterprise AI Stack
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              SmartShram AI is built on IBM Watsonx — combining foundation models, governed data
              pipelines, and multi-agent orchestration to deliver accurate, trusted, and auditable AI decisions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'watsonx.ai', desc: 'Foundation models for chat & analysis' },
                { name: 'watsonx.data', desc: 'Governed data lakehouse' },
                { name: 'watsonx.governance', desc: 'AI monitoring & compliance' },
                { name: 'IBM Orchestrate', desc: 'Multi-agent workflow automation' },
              ].map(t => (
                <div key={t.name} className="p-3 border border-gray-200 rounded-xl">
                  <p className="font-semibold text-blue-700 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">5-Agent Architecture</p>
            {agents.map((a, i) => (
              <div key={a.name} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="w-7 h-7 bg-blue-700 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{a.ibm}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
