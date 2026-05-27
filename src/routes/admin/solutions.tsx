import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { isAuthenticated } from '#/lib/auth'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, Textarea, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/solutions')({
  loader: async () => readContent(),
  component: AdminSolutions,
})

function AdminSolutions() {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate({ to: '/admin/login' }) }, [navigate])
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Solutions" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="Solutions Page"
        onSave={(vals) => writeSection('solutions', vals)}
        defaultValues={data.solutions}
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
                <Input value={values.heading.prefix} onChange={(v) => onChange('heading.prefix', v)} placeholder="e.g. Our" />
              </Field>
              <Field label="Heading Highlight">
                <Input value={values.heading.highlight} onChange={(v) => onChange('heading.highlight', v)} placeholder="e.g. Solutions" />
              </Field>
            </div>
            <Field label="Intro Text">
              <Textarea value={values.intro} onChange={(v) => onChange('intro', v)} placeholder="Page intro" rows={2} />
            </Field>
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Solution Sections</h3>
              {values.sections?.map((sec: { id: string; title: string; body: string; features: string[] }, i: number) => (
                <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2">
                  <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Section {i + 1}</div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="ID (slug)">
                      <Input value={sec.id} onChange={(v) => onChange(`sections.${i}.id`, v)} placeholder="collection" />
                    </Field>
                    <Field label="Title">
                      <Input value={sec.title} onChange={(v) => onChange(`sections.${i}.title`, v)} placeholder="Section title" />
                    </Field>
                  </div>
                  <Field label="Body">
                    <Textarea value={sec.body} onChange={(v) => onChange(`sections.${i}.body`, v)} rows={2} />
                  </Field>
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-text/60">Features</div>
                    {sec.features?.map((feat: string, j: number) => (
                      <Field key={j} label="">
                        <Input value={feat} onChange={(v) => onChange(`sections.${i}.features.${j}`, v)} placeholder="Feature text" />
                      </Field>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-primary/10" />
            <h3 className="font-medium text-sm">Call to Action</h3>
            <Field label="CTA Text">
              <Textarea value={values.cta?.text} onChange={(v) => onChange('cta.text', v)} rows={2} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Button Label">
                <Input value={values.cta?.buttonLabel} onChange={(v) => onChange('cta.buttonLabel', v)} />
              </Field>
              <Field label="Button Href">
                <Input value={values.cta?.buttonHref} onChange={(v) => onChange('cta.buttonHref', v)} />
              </Field>
            </div>
          </>
        )}
      </AdminSection>
    </div>
  )
}
