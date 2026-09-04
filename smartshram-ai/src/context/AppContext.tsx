import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Role, ToastMessage, Worker } from '../types'
import { workers as workersData } from '../data/workers'

interface AppContextType {
  role: Role
  setRole: (r: Role) => void
  currentWorker: Worker
  setCurrentWorker: (w: Worker) => void
  toasts: ToastMessage[]
  addToast: (t: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('worker')
  const [currentWorker, setCurrentWorker] = useState<Worker>(workersData[0])
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((t: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { ...t, id }])
    setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), 4000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(x => x.id !== id))
  }, [])

  return (
    <AppContext.Provider value={{ role, setRole, currentWorker, setCurrentWorker, toasts, addToast, removeToast }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
