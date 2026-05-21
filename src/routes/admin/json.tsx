import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { isAuthenticated } from '#/lib/auth'

export const Route = createFileRoute('/admin/json')({
  loader: async () => readContent(),
  component: AdminJson,
})

function AdminJson() {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate({ to: '/admin/login' }) }, [navigate])
  const data = Route.useLoaderData()!
  const [copied, setCopied] = useState(false)
  const [search, setSearch] = useState('')

  const raw = JSON.stringify(data, null, 2)
  const filtered = search
    ? raw.split('\n').filter(l => l.toLowerCase().includes(search.toLowerCase())).join('\n')
    : raw

  const handleCopy = async () => {
    await navigator.clipboard.writeText(raw)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([raw], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'content.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="font-sans text-text">
      <AdminNavbar active="JSON" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8 motion-preset-slide-up">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-1 bg-accent rounded-full" />
                <span className="w-16 h-1 bg-primary/30 rounded-full" />
              </div>
              <h1 className="font-title text-3xl font-bold">Raw JSON</h1>
              <p className="text-text/60 text-sm mt-1">Full content.json data — read-only view</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/20 bg-white/40 hover:bg-white/60 hover:border-primary/30 transition-all text-sm font-medium"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:brightness-110 transition-all text-sm shadow-lg shadow-primary/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4 motion-preset-slide-up motion-delay-100">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search JSON..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/20 bg-white/40 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
            />
          </div>

          {/* JSON viewer */}
          <div className="bg-[#0d1117] rounded-2xl border border-primary/10 overflow-hidden shadow-xl motion-preset-pop motion-delay-200">
            <div className="flex items-center gap-2 px-5 py-3 bg-[#161b22] border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-white/30 ml-2 font-mono">content.json</span>
              <span className="text-xs text-white/20 ml-auto font-mono">
                {(raw.length / 1024).toFixed(1)} KB
              </span>
            </div>
            <pre className="p-5 overflow-auto max-h-[70vh] text-sm leading-relaxed font-mono">
              <code className="text-white/90">
                {search
                  ? filtered.split('\n').map((line, i) => (
                      <span key={i}>
                        <span className="text-white/20 select-none mr-4 inline-block w-8 text-right">{i + 1}</span>
                        <span className="text-green-400">{highlightJson(line)}</span>
                        {'\n'}
                      </span>
                    ))
                  : raw.split('\n').map((line, i) => (
                      <span key={i}>
                        <span className="text-white/20 select-none mr-4 inline-block w-8 text-right">{i + 1}</span>
                        <span className="text-green-400">{highlightJson(line)}</span>
                        {'\n'}
                      </span>
                    ))}
              </code>
            </pre>
          </div>
        </div>
      </main>
    </div>
  )
}

function highlightJson(line: string): React.ReactNode {
  const trimmed = line.trim()
  if (!trimmed) return line

  const indentation = line.match(/^\s*/)?.[0] || ''

  if (/^[{}\[\],]*$/.test(trimmed)) {
    return <span className="text-white/50">{line}</span>
  }

  const keyMatch = trimmed.match(/^"([^"]+)"\s*:/)
  if (keyMatch) {
    const key = keyMatch[0]
    const rest = trimmed.slice(key.length)
    return (
      <>
        {indentation && <span className="text-white/20">{indentation}</span>}
        <span className="text-cyan-400">{keyMatch[1]}</span>
        <span className="text-white/50">{key.replace(/^"([^"]+)"\s*:/, '')}</span>
        <span className="text-amber-300">{rest}</span>
      </>
    )
  }

  const strMatch = trimmed.match(/^"([^"]*)"[,]?$/)
  if (strMatch) {
    const quote = strMatch[1]
    const comma = strMatch[0].endsWith(',') ? ',' : ''
    return (
      <>
        {indentation && <span className="text-white/20">{indentation}</span>}
        <span className="text-amber-300">"{quote}"{comma}</span>
      </>
    )
  }

  const boolMatch = trimmed.match(/^(true|false|null)[,]?$/)
  if (boolMatch) {
    return (
      <>
        {indentation && <span className="text-white/20">{indentation}</span>}
        <span className="text-purple-400">{boolMatch[0]}</span>
      </>
    )
  }

  const numMatch = trimmed.match(/^(-?\d+\.?\d*)[,]?$/)
  if (numMatch) {
    return (
      <>
        {indentation && <span className="text-white/20">{indentation}</span>}
        <span className="text-blue-400">{numMatch[0]}</span>
      </>
    )
  }

  return <span>{line}</span>
}
