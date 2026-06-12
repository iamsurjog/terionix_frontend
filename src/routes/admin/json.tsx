import { useState, useEffect, useRef } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent, contentAction } from '#/lib/content'
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
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const raw = JSON.stringify(data, null, 2)
  const filtered = search
    ? raw.split('\n').filter(l => l.toLowerCase().includes(search.toLowerCase())).join('\n')
    : raw

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editing ? editText : raw)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([editing ? editText : raw], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'content.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const startEditing = () => {
    setEditText(raw)
    setEditing(true)
    setMsg(null)
  }

  const cancelEditing = () => {
    setEditing(false)
    setEditText('')
    setMsg(null)
  }

  const handleSave = async () => {
    setMsg(null)
    setSaving(true)
    try {
      // Validate JSON
      const parsed = JSON.parse(editText)
      // Save via contentAction — write each top-level key individually to avoid conflicts
      // Instead, use a special bulk approach: write the entire root
      // Since contentAction uses data[d.section] = d.content, we can't set root directly.
      // Workaround: write each top-level key
      for (const [key, value] of Object.entries(parsed)) {
        if (key === '$schema') continue
        await contentAction({ action: 'write', section: key, content: value })
      }
      setMsg({ type: 'success', text: 'JSON restored successfully! Refresh the page to see changes.' })
    } catch (e: unknown) {
      setMsg({ type: 'error', text: 'Invalid JSON: ' + (e instanceof Error ? e.message : String(e)) })
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      try {
        JSON.parse(text) // validate
        setEditText(text)
        setEditing(true)
        setMsg({ type: 'success', text: 'File loaded. Review and click Save to restore.' })
      } catch {
        setMsg({ type: 'error', text: 'Invalid JSON file.' })
      }
    }
    reader.readAsText(file)
    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = ''
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
              <p className="text-text/60 text-sm mt-1">
                {editing ? 'Edit JSON directly or upload a file to restore state' : 'View, edit, or restore content.json data'}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/20 bg-white/40 hover:bg-white/60 hover:border-primary/30 transition-all text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Upload JSON
              </button>
              {!editing ? (
                <button
                  onClick={startEditing}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/20 bg-white/40 hover:bg-white/60 hover:border-primary/30 transition-all text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit JSON
                </button>
              ) : (
                <button
                  onClick={cancelEditing}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-error/30 bg-error/10 hover:bg-error/20 transition-all text-sm font-medium text-error"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/20 bg-white/40 hover:bg-white/60 hover:border-primary/30 transition-all text-sm font-medium"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
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

          {/* Status message */}
          {msg && (
            <div className={`mb-4 px-4 py-3 rounded-xl border text-sm flex items-center gap-2 motion-preset-fade ${
              msg.type === 'success' ? 'bg-success/10 border-success/30 text-success-deep' : 'bg-error/10 border-error/30 text-error-deep'
            }`}>
              {msg.type === 'success' ? (
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {msg.text}
            </div>
          )}

          {/* Search (shown only in read-only view) */}
          {!editing && (
            <div className="relative mb-4 motion-preset-slide-up" style={{ animationDelay: '100ms' }}>
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
          )}

          {/* JSON viewer / editor */}
          {editing ? (
            <div className="space-y-4">
              <div className="bg-json-bg rounded-2xl border border-primary/10 overflow-hidden shadow-xl">
                <div className="flex items-center gap-2 px-5 py-3 bg-json-surface border-b border-white/5">
                  <span className="w-3 h-3 rounded-full bg-error/80" />
                  <span className="w-3 h-3 rounded-full bg-warning/80" />
                  <span className="w-3 h-3 rounded-full bg-success/80" />
                  <span className="text-xs text-white/30 ml-2 font-mono">content.json — Edit Mode</span>
                  <span className="text-xs text-white/20 ml-auto font-mono">
                    {(editText.length / 1024).toFixed(1)} KB
                  </span>
                </div>
                <textarea
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  className="w-full p-5 font-mono text-sm leading-relaxed bg-transparent text-text outline-none resize-y min-h-[60vh]"
                  spellCheck={false}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelEditing}
                  className="px-6 py-3 rounded-xl border border-primary/20 bg-white/40 hover:bg-white/60 transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-primary to-primary/80 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 motion-preset-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Saving...
                    </span>
                  ) : 'Restore State'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-json-bg rounded-2xl border border-primary/10 overflow-hidden shadow-xl motion-preset-pop" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-2 px-5 py-3 bg-json-surface border-b border-white/5">
                <span className="w-3 h-3 rounded-full bg-error/80" />
                <span className="w-3 h-3 rounded-full bg-warning/80" />
                <span className="w-3 h-3 rounded-full bg-success/80" />
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
                          <span className="text-json-key">{highlightJson(line)}</span>
                          {'\n'}
                        </span>
                      ))
                    : raw.split('\n').map((line, i) => (
                        <span key={i}>
                          <span className="text-white/20 select-none mr-4 inline-block w-8 text-right">{i + 1}</span>
                          <span className="text-json-key">{highlightJson(line)}</span>
                          {'\n'}
                        </span>
                      ))}
                </code>
              </pre>
            </div>
          )}
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
        <span className="text-json-key">{keyMatch[1]}</span>
        <span className="text-white/50">{key.replace(/^"([^"]+)"\s*:/, '')}</span>
        <span className="text-json-string">{rest}</span>
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
        <span className="text-json-string">"{quote}"{comma}</span>
      </>
    )
  }

  const boolMatch = trimmed.match(/^(true|false|null)[,]?$/)
  if (boolMatch) {
    return (
      <>
        {indentation && <span className="text-white/20">{indentation}</span>}
        <span className="text-json-bool">{boolMatch[0]}</span>
      </>
    )
  }

  const numMatch = trimmed.match(/^(-?\d+\.?\d*)[,]?$/)
  if (numMatch) {
    return (
      <>
        {indentation && <span className="text-white/20">{indentation}</span>}
        <span className="text-json-number">{numMatch[0]}</span>
      </>
    )
  }

  return <span>{line}</span>
}
