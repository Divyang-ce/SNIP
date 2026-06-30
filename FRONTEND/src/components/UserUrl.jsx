import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  })
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-mist border-t-accent"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-4 bg-accent/10 border border-accent/30 text-accent-dark rounded-lg text-sm">
        Couldn't load your links: {error.message}
      </div>
    )
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-paper-dim rounded-2xl border border-dashed border-mist">
        <span className="font-mono text-3xl text-ink-soft/40">&raquo;&raquo;</span>
        <p className="mt-3 font-display font-medium text-ink">No links yet</p>
        <p className="mt-1 text-sm text-ink-soft">Shorten your first URL above to see it here.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_24px_-4px_rgba(20,21,26,0.08)] border border-mist overflow-hidden animate-rise">
      <div className="px-6 py-4 border-b border-mist">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
          {urls.urls.length} {urls.urls.length === 1 ? 'link' : 'links'}
        </p>
      </div>
      <div className="divide-y divide-mist max-h-[28rem] overflow-y-auto">
        {urls.urls.slice().reverse().map((url) => {
          const fullShort = `${API_URL}/${url.short_url}`
          return (
            <div key={url._id} className="px-6 py-4 flex items-center gap-4 hover:bg-paper-dim/60 transition-colors">
              <div className="min-w-0 flex-1">
                <a
                  href={fullShort}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-link hover:underline font-medium"
                >
                  {`${API_URL.replace(/^https?:\/\//, '')}/${url.short_url}`}
                </a>
                <p className="text-xs text-ink-soft truncate mt-0.5">{url.full_url}</p>
              </div>

              <span className="shrink-0 text-xs font-medium font-mono px-2.5 py-1 rounded-full bg-success/10 text-success">
                {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
              </span>

              <button
                onClick={() => handleCopy(fullShort, url._id)}
                className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  copiedId === url._id
                    ? 'bg-success text-white border-success'
                    : 'border-mist text-ink-soft hover:border-ink/30 hover:text-ink'
                }`}
              >
                {copiedId === url._id ? 'Copied' : 'Copy'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserUrl
