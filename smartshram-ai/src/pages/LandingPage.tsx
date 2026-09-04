import React from 'react'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import Features from '../components/landing/Features'
import IBMPowered from '../components/landing/IBMPowered'
import ToastContainer from '../components/ui/Toast'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <IBMPowered />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Rights?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Join 1.4 lakh workers in Gujarat who use SmartShram AI for wage protection, welfare access, and grievance resolution.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/onboarding')}
              className="px-8 py-3.5 bg-white text-blue-800 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Register as Worker
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="px-8 py-3.5 border border-white/50 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              Authority Portal
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-lg" />
              <span className="font-bold text-white">SmartShram AI</span>
              <span className="text-xs ml-2 bg-gray-800 px-2 py-0.5 rounded">SIH 2026</span>
            </div>
            <p className="text-sm text-gray-500">
              Powered by IBM Watsonx · Ministry of Labour & Employment · Government of Gujarat
            </p>
            <p className="text-xs">© 2026 SmartShram AI. Demo Mode.</p>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  )
}
