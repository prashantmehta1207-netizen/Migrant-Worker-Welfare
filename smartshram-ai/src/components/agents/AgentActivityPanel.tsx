import React, { useState, useEffect } from 'react'
import { CheckCircle, Loader, Clock } from 'lucide-react'

const AGENTS = [
  {
    id: 'wage',
    name: 'Wage Analysis Agent',
    task: 'Benchmarking daily wage against district average…',
    result: 'Wage 6.7% below Construction benchmark in Ahmedabad',
    ibm: 'watsonx.ai',
    color: 'blue',
  },
  {
    id: 'welfare',
    name: 'Welfare Eligibility Agent',
    task: 'Checking scheme eligibility based on profile…',
    result: 'Eligible for 4 schemes — 2 already enrolled',
    ibm: 'watsonx.data',
    color: 'green',
  },
  {
    id: 'risk',
    name: 'Risk Assessment Agent',
    task: 'Analysing safety & compliance risk signals…',
    result: 'Risk Score: Medium — 1 open safety flag at worksite',
    ibm: 'watsonx.ai',
    color: 'amber',
  },
  {
    id: 'assign',
    name: 'Case Assignment Agent',
    task: 'Routing open grievance to labour inspector…',
    result: 'Assigned to Inspector Mehta, Ahmedabad District',
    ibm: 'IBM Orchestrate',
    color: 'indigo',
  },
  {
    id: 'report',
    name: 'Report Generation Agent',
    task: 'Compiling compliance report for authority…',
    result: 'Report SS-RPT-2026-0142 generated & dispatched',
    ibm: 'watsonx.governance',
    color: 'purple',
  },
]

const colorMap: Record<string, { border: string; dot: string; badge: string; text: string }> = {
  blue:   { border: 'border-blue-200 bg-blue-50',   dot: 'bg-blue-500',   badge: 'bg-blue-100 text-blue-700',   text: 'text-blue-700' },
  green:  { border: 'border-green-200 bg-green-50', dot: 'bg-green-500',  badge: 'bg-green-100 text-green-700', text: 'text-green-700' },
  amber:  { border: 'border-amber-200 bg-amber-50', dot: 'bg-amber-500',  badge: 'bg-amber-100 text-amber-700', text: 'text-amber-700' },
  indigo: { border: 'border-indigo-200 bg-indigo-50',dot: 'bg-indigo-500',badge: 'bg-indigo-100 text-indigo-700',text: 'text-indigo-700'},
  purple: { border: 'border-purple-200 bg-purple-50',dot: 'bg-purple-500',badge: 'bg-purple-100 text-purple-700',text: 'text-purple-700'},
}

type AgentState = 'idle' | 'running' | 'done'

interface AgentActivityPanelProps {
  autoStart?: boolean
  onComplete?: () => void
}

export default function AgentActivityPanel({ autoStart = false, onComplete }: AgentActivityPanelProps) {
  const [states, setStates] = useState<AgentState[]>(AGENTS.map(() => 'idle'))
  const [running, setRunning] = useState(false)

  const startProcessing = () => {
    if (running) return
    setRunning(true)
    setStates(AGENTS.map(() => 'idle'))
    AGENTS.forEach((_, i) => {
      setTimeout(() => {
        setStates(prev => {
          const next = [...prev]
          next[i] = 'running'
          return next
        })
        setTimeout(() => {
          setStates(prev => {
            const next = [...prev]
            next[i] = 'done'
            return next
          })
          if (i === AGENTS.length - 1) {
            setRunning(false)
            onComplete?.()
          }
        }, 1400)
      }, i * 1600)
    })
  }

  useEffect(() => {
    if (autoStart) startProcessing()
  }, [autoStart])

  return (
    <div className="space-y-3">
      {AGENTS.map((agent, i) => {
        const state = states[i]
        const c = colorMap[agent.color]
        return (
          <div
            key={agent.id}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              state === 'running' ? `${c.border} agent-active` :
              state === 'done' ? `${c.border}` :
              'border-gray-100 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                state === 'done' ? c.dot + ' text-white' :
                state === 'running' ? 'bg-gray-200' : 'bg-gray-100'
              }`}>
                {state === 'done' ? (
                  <CheckCircle size={14} className="text-white" />
                ) : state === 'running' ? (
                  <Loader size={14} className="animate-spin text-gray-600" />
                ) : (
                  <Clock size={14} className="text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`text-sm font-semibold ${state !== 'idle' ? c.text : 'text-gray-700'}`}>
                    {agent.name}
                  </p>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${c.badge}`}>
                    {agent.ibm}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {state === 'done' ? agent.result : state === 'running' ? agent.task : 'Waiting…'}
                </p>
              </div>
            </div>
          </div>
        )
      })}
      {!autoStart && (
        <button
          onClick={startProcessing}
          disabled={running}
          className="mt-2 w-full py-2.5 rounded-xl bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 disabled:opacity-50 transition-colors"
        >
          {running ? 'Agents Processing…' : 'Run AI Analysis'}
        </button>
      )}
    </div>
  )
}
