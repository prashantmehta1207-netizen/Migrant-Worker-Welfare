import React, { useState } from 'react'
import { Plus, X, Award, Wrench } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Card, { CardBody } from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const suggestedSkills = [
  'Masonry', 'Shuttering', 'Concrete Mixing', 'Scaffolding', 'Plumbing',
  'Weaving', 'Embroidery', 'Loom Operation', 'Quality Check', 'Dyeing',
  'Diamond Cutting', 'Polishing', 'Grading', 'Laser Marking',
  'Welding', 'CNC Operation', 'Lathe Machine', 'Quality Inspection',
  'Food Service', 'Housekeeping', 'Customer Service', 'Kitchen Helper',
]

export default function MySkills() {
  const { currentWorker, addToast } = useApp()
  const [skills, setSkills] = useState<string[]>(currentWorker.skills)
  const [newSkill, setNewSkill] = useState('')

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills(prev => [...prev, skill])
      setNewSkill('')
      addToast({ type: 'success', title: 'Skill Added', message: `${skill} has been added to your profile.` })
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill))
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Skills</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your skills and certifications to improve job matching.</p>
      </div>

      {/* Current Skills */}
      <Card className="mb-5">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Wrench size={16} className="text-blue-700" />
          <h3 className="font-semibold text-gray-900">Current Skills</h3>
          <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{skills.length} skills</span>
        </div>
        <CardBody>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {skill}
                <button onClick={() => removeSkill(skill)} className="hover:text-blue-900">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          {/* Add skill */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSkill(newSkill)}
              placeholder="Type a skill and press Enter"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="sm" onClick={() => addSkill(newSkill)}>
              <Plus size={14} />Add
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Certifications */}
      <Card className="mb-5">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Award size={16} className="text-green-700" />
          <h3 className="font-semibold text-gray-900">Certifications</h3>
        </div>
        <CardBody>
          <div className="space-y-3">
            {currentWorker.certifications.map(cert => (
              <div key={cert} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                <Award size={16} className="text-green-700 shrink-0" />
                <span className="text-sm font-medium text-green-900">{cert}</span>
                <span className="ml-auto text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Verified</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Suggestions */}
      <Card>
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Suggested Skills for {currentWorker.industry}</h3>
          <p className="text-xs text-gray-500 mt-0.5">Click to add skills you know</p>
        </div>
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills
              .filter(s => !skills.includes(s))
              .slice(0, 12)
              .map(skill => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                  <Plus size={10} />{skill}
                </button>
              ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
