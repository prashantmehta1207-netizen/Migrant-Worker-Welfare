import React from 'react'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'
import { ToastMessage } from '../../types'
import { useApp } from '../../context/AppContext'

const icons = {
  success: <CheckCircle size={18} className="text-green-600" />,
  error: <AlertCircle size={18} className="text-red-600" />,
  info: <Info size={18} className="text-blue-600" />,
  warning: <AlertTriangle size={18} className="text-amber-500" />,
}

const borders = {
  success: 'border-l-4 border-green-500',
  error: 'border-l-4 border-red-500',
  info: 'border-l-4 border-blue-500',
  warning: 'border-l-4 border-amber-400',
}

function ToastItem({ toast }: { toast: ToastMessage }) {
  const { removeToast } = useApp()
  return (
    <div className={`flex items-start gap-3 bg-white rounded-xl shadow-lg p-4 w-80 fade-in ${borders[toast.type]}`}>
      <div className="mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{toast.message}</p>
      </div>
      <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600">
        <X size={14} />
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const { toasts } = useApp()
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map(t => <ToastItem key={t.id} toast={t} />)}
    </div>
  )
}
