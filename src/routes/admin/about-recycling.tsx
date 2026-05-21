import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { isAuthenticated } from '#/lib/auth'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, Textarea, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/about-recycling')({
  loader: async () => readContent(),
  component: AdminAboutRecycling,
})

function AdminAboutRecycling() {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate({ to: '/admin/login' }) }, [navigate])
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="About Recycling" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="About Recycling Page"
        onSave={(vals) => writeSection('aboutRecycling', vals)}
        defaultValues={data.aboutRecycling}
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
                <Input value={values.heading.prefix} onChange={(v) => onChange('heading.prefix', v)} placeholder="e.g. About" />
              </Field>
              <Field label="Heading Highlight (colored)">
                <Input value={values.heading.highlight} onChange={(v) => onChange('heading.highlight', v)} placeholder="e.g. Recycling" />
              </Field>
            </div>
            <Field label="Intro Text">
              <Textarea value={values.intro} onChange={(v) => onChange('intro', v)} placeholder="Short intro below the heading" rows={2} />
            </Field>
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Facts / Sections</h3>
              {values.facts.map((fact: { title: string; body: string }, i: number) => (
                <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2">
                  <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Section {i + 1}</div>
                  <Field label="Title">
                    <Input value={fact.title} onChange={(v) => onChange(`facts.${i}.title`, v)} placeholder="Fact title" />
                  </Field>
                  <Field label="Description">
                    <Textarea value={fact.body} onChange={(v) => onChange(`facts.${i}.body`, v)} placeholder="Description text" rows={4} />
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