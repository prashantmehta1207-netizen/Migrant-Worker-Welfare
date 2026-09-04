import React from 'react'
import { Routes, Route } from 'react-router-dom'
import WorkerSidebar from '../../components/layout/WorkerSidebar'
import ToastContainer from '../../components/ui/Toast'
import WorkerOverview from './WorkerOverview'
import MyProfile from './MyProfile'
import MySkills from './MySkills'
import WelfareSchemes from './WelfareSchemes'
import WageCheck from './WageCheck'
import GrievanceReport from './GrievanceReport'
import MyComplaints from './MyComplaints'
import AIAssistant from './AIAssistant'

export default function WorkerDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <WorkerSidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<WorkerOverview />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="skills" element={<MySkills />} />
          <Route path="welfare" element={<WelfareSchemes />} />
          <Route path="wage" element={<WageCheck />} />
          <Route path="grievance" element={<GrievanceReport />} />
          <Route path="complaints" element={<MyComplaints />} />
          <Route path="assistant" element={<AIAssistant />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  )
}
