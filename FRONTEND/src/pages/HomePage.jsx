import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-rise">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight">
            Long link in.<br />
            <span className="text-accent">Short link out.</span>
          </h1>
          <p className="mt-3 text-ink-soft text-sm">
            No clutter, no signup needed — just a clean, trackable link.
          </p>
        </div>

        <div className="bg-white p-7 sm:p-8 rounded-2xl shadow-[0_2px_24px_-4px_rgba(20,21,26,0.08)] border border-mist">
          <UrlForm />
        </div>
      </div>
    </div>
  )
}

export default HomePage
