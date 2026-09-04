import React, { useState } from 'react'
import { Save, User } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Card, { CardBody } from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function MyProfile() {
  const { currentWorker, addToast } = useApp()
  const [editing, setEditing] = useState(false)
  const [phone, setPhone] = useState(currentWorker.phone)
  const [location, setLocation] = useState(currentWorker.location)

  const handleSave = () => {
    setEditing(false)
    addToast({ type: 'success', title: 'Profile Updated', message: 'Your profile has been saved successfully.' })
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Worker ID: {currentWorker.id}</p>
        </div>
        {!editing ? (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
            <Button size="sm" onClick={handleSave}><Save size={14} />Save</Button>
          </div>
        )}
      </div>

      {/* Avatar / Header */}
      <Card className="mb-5">
        <CardBody>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
              {currentWorker.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{currentWorker.name}</h2>
              <p className="text-sm text-gray-500">{currentWorker.industry} Worker · {currentWorker.location}</p>
              <p className="text-xs text-gray-400 mt-0.5">Joined: {new Date(currentWorker.joinedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="ml-auto text-right hidden sm:block">
              <p className="text-xs text-gray-500">Profile Complete</p>
              <p className="text-2xl font-bold text-blue-700">{currentWorker.profileComplete}%</p>
              <div className="w-20 h-1.5 bg-gray-200 rounded-full mt-1">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${currentWorker.profileComplete}%` }} />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Details */}
      <Card className="mb-5">
        <div className="px-5 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Personal Details</h3>
        </div>
        <CardBody className="space-y-4">
          {[
            { label: 'Full Name', value: currentWorker.name, editable: false },
            { label: 'Age', value: `${currentWorker.age} years`, editable: false },
            { label: 'Aadhaar Number', value: currentWorker.aadhaar, editable: false },
            { label: 'Industry', value: currentWorker.industry, editable: false },
          ].map(f => (
            <div key={f.label} className="flex items-center justify-between py-1">
              <span className="text-sm text-gray-500 w-36">{f.label}</span>
              <span className="text-sm font-medium text-gray-900">{f.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-gray-500 w-36">Mobile Number</span>
            {editing ? (
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="text-sm font-medium border border-gray-200 rounded-lg px-2 py-1 w-48 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <span className="text-sm font-medium text-gray-900">{phone}</span>
            )}
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-gray-500 w-36">Location</span>
            {editing ? (
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="text-sm font-medium border border-gray-200 rounded-lg px-2 py-1 w-48 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bharuch', 'Vapi'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            ) : (
              <span className="text-sm font-medium text-gray-900">{location}</span>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Wage Info */}
      <Card>
        <div className="px-5 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Employment Details</h3>
        </div>
        <CardBody className="space-y-3">
          {[
            { label: 'Daily Wage', value: `₹${currentWorker.dailyWage}` },
            { label: 'Enrolled Schemes', value: currentWorker.registeredSchemes.join(', ') },
            { label: 'Certifications', value: currentWorker.certifications.join(', ') },
          ].map(f => (
            <div key={f.label} className="flex items-start justify-between py-1">
              <span className="text-sm text-gray-500 w-36 shrink-0">{f.label}</span>
              <span className="text-sm font-medium text-gray-900 text-right">{f.value}</span>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}
