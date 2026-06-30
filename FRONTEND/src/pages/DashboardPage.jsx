import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 animate-rise">
          <h1 className="font-display text-3xl font-bold text-ink">Your links</h1>
          <p className="text-ink-soft text-sm mt-1">Create new links and keep an eye on how they perform.</p>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-[0_2px_24px_-4px_rgba(20,21,26,0.08)] border border-mist">
          <UrlForm />
        </div>

        <div className="mt-8">
          <UserUrl />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
