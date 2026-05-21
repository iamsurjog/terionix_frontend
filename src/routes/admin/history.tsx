import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { isAuthenticated } from '#/lib/auth'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, Textarea, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/history')({
  loader: async () => readContent(),
  component: AdminHistory,
})

function AdminHistory() {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate({ to: '/admin/login' }) }, [navigate])
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Our History" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="Our History Page"
        onSave={(vals) => writeSection('history', vals)}
        defaultValues={data.history}
        validate={(v: unknown) => {
          const o = v as { heading?: { prefix?: string; highlight?: string }; paragraphs?: unknown[] }
          if (!o.heading?.prefix?.trim()) return 'Heading prefix is required'
          if (!o.heading?.highlight?.trim()) return 'Heading highlight is required'
          if (!o.paragraphs?.length) return 'At least one paragraph is required'
          return null
        }}
      >
        {(values, onChange) => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Heading Prefix">
                <Input value={values.heading.prefix} onChange={(v) => onChange('heading.prefix', v)} placeholder="e.g. Our" />
              </Field>
              <Field label="Heading Highlight (colored)">
                <Input value={values.heading.highlight} onChange={(v) => onChange('heading.highlight', v)} placeholder="e.g. History" />
              </Field>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Page Content</h3>
              {values.paragraphs.map((p: { className?: string; segments: { text: string; className?: string }[] }, i: number) => (
                <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2">
                  <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Paragraph {i + 1}</div>
                  {p.segments.map((seg: { text: string; className?: string }, j: number) => (
                    <div key={j}>
                      <Field label={j === 0 ? 'Text' : 'Continuation'}>
                        <Textarea value={seg.text} onChange={(v) => onChange(`paragraphs.${i}.segments.${j}.text`, v)} placeholder="Enter text..." rows={3} />
                      </Field>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </AdminSection>
    </div>
  )
}