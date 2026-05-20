import { createFileRoute } from '@tanstack/react-router'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, writeSection } from '#/components/AdminSection'
import { useState } from 'react'

export const Route = createFileRoute('/admin/game')({
  loader: async () => readContent(),
  component: AdminGame,
})

function AdminGame() {
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

  const updateName = (i: number, name: string) => {
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, name } : item))
  }

  const updateRecyclable = (i: number, recyclable: boolean) => {
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, recyclable } : item))
  }

  return (
    <main className="pt-32 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-title text-3xl font-bold mb-2">Recycling Game Items</h1>
        <p className="text-text/60 mb-6">Manage the list of items shown in the recycling game.</p>
        <div className="bg-white/50 rounded-xl border border-primary/20 p-6 space-y-3">
          {items.map((item: { name: string; recyclable: boolean }, i: number) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-primary/10">
              <input
                type="checkbox"
                checked={item.recyclable}
                onChange={e => updateRecyclable(i, e.target.checked)}
                className="w-5 h-5 accent-green-600"
                title="Recyclable"
              />
              <Field label="">
                <Input
                  value={item.name}
                  onChange={v => updateName(i, v)}
                  placeholder="Item name"
                />
              </Field>
              <span className="text-xs text-text/50 whitespace-nowrap">{item.recyclable ? 'Recyclable' : 'Not Recyclable'}</span>
              <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 font-bold text-lg leading-none">×</button>
            </div>
          ))}
          <button onClick={addItem} className="text-sm text-primary font-medium hover:underline">+ Add Item</button>
          <div className="pt-4 border-t border-primary/10">
            <button onClick={handleSave} disabled={saving} className="bg-primary text-white font-semibold px-8 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {msg && <p className={`mt-2 text-sm ${msg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{msg.text}</p>}
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
    <main className="pt-12 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-title text-2xl font-bold mb-2">Leaderboard</h2>
        <p className="text-text/60 mb-6">Manage leaderboard scores. Lower time is better.</p>
        <div className="bg-white/50 rounded-xl border border-primary/20 p-6 space-y-3">
          {scores.map((s: { name: string; time: number }, i: number) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-primary/10">
              <span className="text-xs text-text/50 w-6 text-center">#{i + 1}</span>
              <div className="flex-1">
                <Input value={s.name} onChange={v => updateName(i, v)} placeholder="Name" />
              </div>
              <div className="w-24">
                <Input value={String(s.time)} onChange={v => updateTime(i, parseFloat(v) || 0)} placeholder="Seconds" />
              </div>
              <button onClick={() => removeScore(i)} className="text-red-400 hover:text-red-600 font-bold text-lg leading-none">×</button>
            </div>
          ))}
          <button onClick={addScore} className="text-sm text-primary font-medium hover:underline">+ Add Score</button>
          <div className="pt-4 border-t border-primary/10">
            <button onClick={handleSave} disabled={saving} className="bg-primary text-white font-semibold px-8 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {msg && <p className={`mt-2 text-sm ${msg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{msg.text}</p>}
          </div>
        </div>
      </div>
    </main>
  )
}