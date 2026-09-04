import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from 'recharts'
import {
  workersByIndustry, skillDistribution,
  complaintsOverTime, wageAlertsByDistrict
} from '../../data/wageData'

const PIE_COLORS = ['#1d4ed8', '#7c3aed', '#0891b2', '#059669', '#d97706']

interface Props {
  type: 'workers-by-industry' | 'skill-distribution' | 'complaints-time' | 'wage-alerts'
  height?: number
}

export default function AnalyticsCharts({ type, height = 220 }: Props) {
  if (type === 'workers-by-industry') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={workersByIndustry} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="industry" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e5e7eb' }}
            formatter={(val: number) => [val.toLocaleString(), 'Workers']}
          />
          <Bar dataKey="count" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (type === 'skill-distribution') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={skillDistribution}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {skillDistribution.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e5e7eb' }}
            formatter={(val: number) => [`${val}%`, 'Share']}
          />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  if (type === 'complaints-time') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={complaintsOverTime} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e5e7eb' }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#4f46e5"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#4f46e5' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (type === 'wage-alerts') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={wageAlertsByDistrict} layout="vertical" margin={{ top: 5, right: 10, left: 30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis dataKey="district" type="category" tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e5e7eb' }}
          />
          <Bar dataKey="alerts" fill="#dc2626" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return null
}
