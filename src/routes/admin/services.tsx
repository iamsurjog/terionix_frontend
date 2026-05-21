import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { isAuthenticated } from '#/lib/auth'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, Textarea, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/services')({
  loader: async () => readContent(),
  component: AdminServices,
})

function AdminServices() {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate({ to: '/admin/login' }) }, [navigate])
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Services & Solutions" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="Services & Solutions"
        onSave={(vals) => writeSection('services', vals)}
        defaultValues={data.services}
        validate={(v: unknown) => {
          const o = v as { heading?: { prefix?: string; highlight?: string }; intro?: string }
          if (!o.heading?.prefix?.trim()) return 'Heading prefix is required'
          if (!o.heading?.highlight?.trim()) return 'Heading highlight is required'
          if (!o.intro?.trim()) return 'Intro text is required'
          return null
        }}
      >
        {(values, onChange) => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Heading Prefix">
                <Input value={values.heading.prefix} onChange={(v) => onChange('heading.prefix', v)} placeholder="e.g. Services &" />
              </Field>
              <Field label="Heading Highlight (colored)">
                <Input value={values.heading.highlight} onChange={(v) => onChange('heading.highlight', v)} placeholder="e.g. Solutions" />
              </Field>
            </div>
            <Field label="Intro Text">
              <Textarea value={values.intro} onChange={(v) => onChange('intro', v)} placeholder="Short intro below the heading" rows={2} />
            </Field>
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Service Segments (expandable menus)</h3>
              {values.segments.map((seg: { title: string; body: string }, i: number) => (
                <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2">
                  <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Segment {i + 1}</div>
                  <Field label="Title">
                    <Input value={seg.title} onChange={(v) => onChange(`segments.${i}.title`, v)} placeholder="Segment title" />
                  </Field>
                  <Field label="Description">
                    <Textarea value={seg.body} onChange={(v) => onChange(`segments.${i}.body`, v)} placeholder="Description text" rows={3} />
                  </Field>
                </div>
              ))}
            </div>
          </>
        )}
      </AdminSection>
    </div>
  )
}