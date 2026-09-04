import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminSidebar from '../../components/layout/AdminSidebar'
import ToastContainer from '../../components/ui/Toast'
import AdminOverview from './AdminOverview'
import WorkerMap from './WorkerMap'
import WelfareAnalytics from './WelfareAnalytics'
import WageAlerts from './WageAlerts'
import SafetyGrievances from './SafetyGrievances'
import AIInsights from './AIInsights'

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="map" element={<WorkerMap />} />
          <Route path="welfare" element={<WelfareAnalytics />} />
          <Route path="wages" element={<WageAlerts />} />
          <Route path="grievances" element={<SafetyGrievances />} />
          <Route path="insights" element={<AIInsights />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  )
}
