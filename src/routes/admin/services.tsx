import { createFileRoute } from '@tanstack/react-router'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent, updateSection } from '#/lib/content'
import { useState } from 'react'

export const Route = createFileRoute('/admin/services')({
  loader: async () => readContent(),
  component: AdminServices,
})

function AdminServices() {
  const data = Route.useLoaderData()!
  const [json, setJson] = useState(JSON.stringify(data.services, null, 2))
  const [msg, setMsg] = useState('')

  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Services & Solutions" />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-title text-3xl font-bold mb-2">Services</h1>
          <textarea value={json} onChange={e => setJson(e.target.value)} rows={6}
            className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors resize-y font-mono text-sm mb-4"
          />
          <button onClick={async () => {
            try { await updateSection({ data: { section: 'services', content: JSON.parse(json) } }); setMsg('Saved!') }
            catch { setMsg('Invalid JSON') }
          }} className="bg-primary text-white font-semibold px-8 py-2.5 rounded-lg hover:brightness-110 transition-all">
            Save
          </button>
          {msg && <p className="text-sm mt-2 text-text/60">{msg}</p>}
        </div>
      </main>
    </div>
  )
}
