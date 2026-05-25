import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, writeSection } from '#/components/AdminSection'
import { useState } from 'react'
import { isAuthenticated } from '#/lib/auth'

export const Route = createFileRoute('/admin/game')({
  loader: async () => readContent(),
  component: AdminGame,
})

function AdminGame() {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate({ to: '/admin/login' }) }, [navigate])
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Home" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <GameItemsSection data={data} />
      <LeaderboardSection data={data} />
    </div>
  )
}

function GameItemsSection({ data }: { data: ReturnType<typeof Route.useLoaderData> }) {
  const [items, setItems] = useState(data!.game.items)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setMsg(null)
    setSaving(true)
    try {
      await writeSection('game', { items })
      setMsg({ type: 'success', text: 'Saved successfully!' })
    } catch (e: unknown) {
      setMsg({ type: 'error', text: 'Error: ' + (e instanceof Error ? e.message : String(e)) })
    } finally {
      setSaving(false)
    }
  }

  const addItem = () => setItems(prev => [...prev, { name: '', recyclable: false }])
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i))
  const updateName = (i: number, name: string) => setItems(prev => prev.map((item, idx) => idx === i ? { ...item, name } : item))
  const updateRecyclable = (i: number, recyclable: boolean) => setItems(prev => prev.map((item, idx) => idx === i ? { ...item, recyclable } : item))

  return (
    <main className="pt-32 pb-12 px-4">
      <div className="max-w-2xl mx-auto motion-preset-slide-up">
        <h1 className="font-title text-3xl font-bold mb-2">Recycling Game Items</h1>
        <p className="text-text/60 mb-6">Manage the list of items shown in the recycling game.</p>
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-primary/20 p-8 space-y-3 shadow-lg">
          {items.map((item: { name: string; recyclable: boolean }, i: number) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-primary/10 hover:border-primary/20 transition-all">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.recyclable}
                  onChange={e => updateRecyclable(i, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-text/20 rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4" />
              </label>
              <div className="flex-1">
                <Input value={item.name} onChange={v => updateName(i, v)} placeholder="Item name" />
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                item.recyclable ? 'bg-success-soft text-success-deep' : 'bg-error-soft text-error-deep'
              }`}>
                {item.recyclable ? 'Recyclable' : 'Not Recyclable'}
              </span>
              <button onClick={() => removeItem(i)} className="w-8 h-8 rounded-lg text-error hover:text-error-deep hover:bg-error-soft transition-all flex items-center justify-center font-bold text-lg leading-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
          <button onClick={addItem} className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary/80 transition-colors py-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Item
          </button>
          <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
            <div>
              {msg && (
                <p className={`text-sm flex items-center gap-1.5 ${msg.type === 'success' ? 'text-success' : 'text-error'}`}>
                  {msg.type === 'success' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {msg.text}
                </p>
              )}
            </div>
            <button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-primary to-primary/80 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {saving ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 motion-preset-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Saving...
                </span>
              ) : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

function LeaderboardSection({ data }: { data: ReturnType<typeof Route.useLoaderData> }) {
  const [scores, setScores] = useState(data!.leaderboard)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setMsg(null)
    setSaving(true)
    try {
      await writeSection('leaderboard', scores)
      setMsg({ type: 'success', text: 'Saved successfully!' })
    } catch (e: unknown) {
      setMsg({ type: 'error', text: 'Error: ' + (e instanceof Error ? e.message : String(e)) })
    } finally {
      setSaving(false)
    }
  }

  const updateName = (i: number, name: string) => setScores(prev => prev.map((s, idx) => idx === i ? { ...s, name } : s))
  const updateTime = (i: number, time: number) => setScores(prev => prev.map((s, idx) => idx === i ? { ...s, time } : s))
  const removeScore = (i: number) => setScores(prev => prev.filter((_, idx) => idx !== i))
  const addScore = () => setScores(prev => [...prev, { name: '', time: 0 }])

  return (
    <main className="pb-24 px-4">
      <div className="max-w-2xl mx-auto motion-preset-slide-up motion-delay-100">
        <h2 className="font-title text-2xl font-bold mb-2 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m0 0a6.023 6.023 0 01-2.77-.896" />
          </svg>
          Leaderboard
        </h2>
        <p className="text-text/60 mb-6">Manage leaderboard scores. Lower time is better.</p>
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-primary/20 p-8 space-y-3 shadow-lg">
          {scores.map((s: { name: string; time: number }, i: number) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-primary/10 hover:border-primary/20 transition-all">
              <span className="text-sm font-mono font-bold text-text/30 w-8 text-center">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1">
                <Input value={s.name} onChange={v => updateName(i, v)} placeholder="Name" />
              </div>
              <div className="w-28">
                <Input value={String(s.time)} onChange={v => updateTime(i, parseFloat(v) || 0)} placeholder="Seconds" />
              </div>
              <span className="text-xs text-text/40 font-mono w-16 text-right">sec</span>
              <button onClick={() => removeScore(i)} className="w-8 h-8 rounded-lg text-error hover:text-error-deep hover:bg-error-soft transition-all flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
          <button onClick={addScore} className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary/80 transition-colors py-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Score
          </button>
          <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
            <div>
              {msg && (
                <p className={`text-sm flex items-center gap-1.5 ${msg.type === 'success' ? 'text-success' : 'text-error'}`}>
                  {msg.type === 'success' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {msg.text}
                </p>
              )}
            </div>
            <button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-primary to-primary/80 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {saving ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 motion-preset-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Saving...
                </span>
              ) : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
