import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { queryClient } from '../main'

const UrlForm = () => {

  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [customSlug, setCustomSlug] = useState("")
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url) return
    setLoading(true)
    try {
      const result = await createShortUrl(url, customSlug)
      setShortUrl(result)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="url" className="block text-xs font-medium uppercase tracking-wider text-ink-soft mb-2">
          Paste a long URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com/a/very/long/path?with=params"
          required
          className="w-full px-4 py-3 font-mono text-sm border border-mist rounded-lg bg-paper focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
        />
      </div>

      {isAuthenticated && (
        <div>
          <label htmlFor="customSlug" className="block text-xs font-medium uppercase tracking-wider text-ink-soft mb-2">
            Custom slug <span className="normal-case text-ink-soft/60">(optional)</span>
          </label>
          <div className="flex items-center font-mono text-sm border border-mist rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent/40 focus-within:border-accent">
            <span className="pl-4 pr-1 py-3 text-ink-soft/60 select-none">snip.app/</span>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="my-link"
              className="w-full py-3 pr-4 bg-paper focus:outline-none"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent hover:bg-accent-dark text-white font-display font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? 'Shortening…' : (<>Shorten <span className="font-mono">&raquo;&raquo;</span></>)}
      </button>

      {error && (
        <div className="p-3 text-sm bg-accent/10 border border-accent/30 text-accent-dark rounded-md animate-rise">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="pt-4 border-t border-mist animate-rise">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-soft mb-2">Your link</p>
          <div className="flex items-stretch gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg bg-ink overflow-hidden">
              <span className="font-mono text-sm text-ink-soft/50 truncate hidden sm:inline">{url}</span>
              <span className="font-mono text-sm text-paper/40 hidden sm:inline">&raquo;&raquo;</span>
              <span className="font-mono text-sm text-success font-medium truncate animate-squeeze">{shortUrl}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 rounded-lg text-sm font-medium transition-colors shrink-0 ${
                copied
                  ? 'bg-success text-white'
                  : 'bg-ink text-paper hover:bg-ink/80'
              }`}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default UrlForm
