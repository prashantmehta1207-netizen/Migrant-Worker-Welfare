export type Role = 'worker' | 'admin'

export type Industry =
  | 'Construction'
  | 'Textile'
  | 'Diamond'
  | 'Manufacturing'
  | 'Hospitality'

export type GrievanceStatus =
  | 'Submitted'
  | 'Under Review'
  | 'In Progress'
  | 'Resolved'
  | 'Closed'

export interface Worker {
  id: string
  name: string
  age: number
  industry: Industry
  location: string
  phone: string
  aadhaar: string
  skills: string[]
  certifications: string[]
  dailyWage: number
  registeredSchemes: string[]
  profileComplete: number
  joinedDate: string
  avatar: string
}

export interface WelfareScheme {
  id: string
  name: string
  shortName: string
  ministry: string
  benefit: string
  eligibility: string[]
  industries: Industry[]
  monthlyCover: number
  enrolled: number
  color: string
}

export interface Grievance {
  id: string
  workerId: string
  workerName: string
  type: string
  description: string
  district: string
  industry: Industry
  status: GrievanceStatus
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  submittedDate: string
  updatedDate: string
  timeline: { date: string; action: string; by: string }[]
}

export interface WageRecord {
  industry: Industry
  district: string
  benchmark: number
  average: number
  minimum: number
  alertCount: number
}

export interface MapDistrict {
  id: string
  name: string
  cx: number
  cy: number
  workerCount: number
  alertCount: number
  industries: Industry[]
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
