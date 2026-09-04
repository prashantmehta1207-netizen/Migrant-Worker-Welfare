import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Languages } from 'lucide-react'
import { ChatMessage } from '../../types'
import { useApp } from '../../context/AppContext'
import { schemes } from '../../data/schemes'

const LANGUAGES = ['English', 'Gujarati', 'Hindi', 'Bengali', 'Marathi', 'Odia']

const GREETINGS: Record<string, string> = {
  English: 'Hello! I am your SmartShram AI assistant. How can I help you today?',
  Gujarati: 'નમસ્તે! હું તમારો SmartShram AI સહાયક છું. હું આજે તમને કેવી રીતે મદદ કરી શકું?',
  Hindi: 'नमस्ते! मैं आपका SmartShram AI सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?',
  Bengali: 'নমস্কার! আমি আপনার SmartShram AI সহকারী। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
  Marathi: 'नमस्कार! मी तुमचा SmartShram AI सहाय्यक आहे. आज मी तुम्हाला कशी मदत करू शकतो?',
  Odia: 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ SmartShram AI ସହାୟକ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିଭାବି ସାହାଯ୍ୟ କରିପାରେ?',
}

function generateResponse(input: string, workerIndustry: string): string {
  const q = input.toLowerCase()

  if (q.includes('welfare') || q.includes('scheme') || q.includes('yojana')) {
    const relevant = schemes.filter(s => s.industries.includes(workerIndustry as any)).slice(0, 3)
    return `Based on your ${workerIndustry} industry profile, here are the top welfare schemes for you:\n\n${relevant.map((s, i) => `${i + 1}. **${s.shortName}** — ${s.benefit}`).join('\n')}\n\nWould you like to know the eligibility criteria for any of these?`
  }

  if (q.includes('wage') || q.includes('salary') || q.includes('pay') || q.includes('underpaid')) {
    return `I can help you check your wage against the legal benchmark. Go to the **Wage Check** section in your sidebar. You can enter your industry, district, and daily wage to get an instant AI-powered analysis.\n\nIf your wage is below benchmark, you have the right to file a grievance and our Wage Enforcement Agent will automatically notify your employer.`
  }

  if (q.includes('report') || q.includes('complain') || q.includes('grievance') || q.includes('problem')) {
    return `To report a grievance, go to **Report Grievance** in your sidebar. Here's what to include:\n\n1. **Type** — e.g., Wage Theft, Safety Violation\n2. **Date(s)** — when the incident occurred\n3. **Description** — detailed explanation (amounts, names)\n4. **District** — your current work location\n\nOnce submitted, our AI agents will assign it a case ID (SS-2026-XXXXXX) and route it to the right Labour Inspector.`
  }

  if (q.includes('document') || q.includes('aadhaar') || q.includes('card') || q.includes('id')) {
    return `Here is the document checklist for migrant workers:\n\n✅ **Aadhaar Card** (mandatory)\n✅ **BOCW Registration Card** (construction workers)\n✅ **Bank Account & Passbook**\n✅ **Employer's address proof** (if available)\n✅ **Skill/Training certificates**\n\nKeep digital copies in the SmartShram app for quick access during inspections.`
  }

  if (q.includes('complaint') || q.includes('status') || q.includes('case')) {
    return `To view your complaint status, go to **My Complaints** in the sidebar. You can see:\n\n• Case ID (SS-2026-XXXXXX)\n• Current status (Submitted → Under Review → In Progress → Resolved)\n• Full timeline with inspector actions\n\nYou will also receive SMS updates at each status change.`
  }

  if (q.includes('pm-sym') || q.includes('pension')) {
    return `**PM-SYM (Pradhan Mantri Shram Yogi Maan-dhan)** is a pension scheme for unorganised workers.\n\n• Monthly pension of ₹3,000 after age 60\n• Contribution: ₹55–₹200/month (age-based)\n• Government matches your contribution\n• Eligibility: Age 18–40, income ≤ ₹15,000/month\n\nYou can enrol via the **Welfare Schemes** section.`
  }

  if (q.includes('bocw') || q.includes('construction') || q.includes('building')) {
    return `**BOCW (Building & Other Construction Workers Welfare Scheme)** provides:\n\n• Death/disability benefit\n• Education assistance for children\n• Medical assistance\n• Housing loan subsidy\n• Maternity benefit\n\nEligibility: Construction worker, 90+ working days/year, registered with BOCW board.\n\nGo to **Welfare Schemes** to apply.`
  }

  return `I understand you're asking about "${input}". I can help you with:\n\n• **Welfare schemes** — type "welfare schemes" or "yojana"\n• **Wage check** — type "check my wage"\n• **Filing a complaint** — type "report grievance"\n• **Document checklist** — type "documents needed"\n• **Complaint status** — type "my complaints"\n\nHow can I help you further?`
}

export default function AIAssistant() {
  const { currentWorker } = useApp()
  const [language, setLanguage] = useState('English')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: GREETINGS[language],
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleLangChange = (lang: string) => {
    setLanguage(lang)
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: GREETINGS[lang],
      timestamp: new Date(),
    }])
  }

  const sendMessage = () => {
    if (!input.trim() || loading) return
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input.trim(), timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    const q = input.trim()
    setInput('')
    setLoading(true)
    setTimeout(() => {
      const response = generateResponse(q, currentWorker.industry)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }])
      setLoading(false)
    }, 800)
  }

  const quickPrompts = [
    'What welfare schemes am I eligible for?',
    'Check my wage against benchmark',
    'How do I report a grievance?',
    'What documents do I need?',
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-h-[800px] p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
          <p className="text-sm text-gray-500 mt-0.5">Powered by IBM watsonx.ai</p>
        </div>
        <div className="flex items-center gap-2">
          <Languages size={16} className="text-gray-500" />
          <select
            value={language}
            onChange={e => handleLangChange(e.target.value)}
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-gray-200 p-4 space-y-4 mb-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} fade-in`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-blue-700' : 'bg-gray-700'}`}>
              {msg.role === 'assistant' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-white" />}
            </div>
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.role === 'assistant' ? 'bg-gray-50 text-gray-900 rounded-tl-sm' : 'bg-blue-700 text-white rounded-tr-sm'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 bg-blue-700 rounded-full flex items-center justify-center">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Prompts */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
        {quickPrompts.map(p => (
          <button
            key={p}
            onClick={() => { setInput(p); }}
            className="shrink-0 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full text-gray-600 hover:border-blue-400 hover:text-blue-700 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about wages, welfare schemes, grievances…"
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="px-4 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 disabled:opacity-40 transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
