import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { isAuthenticated } from '#/lib/auth'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, Textarea, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/impact-insights')({
  loader: async () => readContent(),
  component: AdminImpactInsights,
})

function AdminImpactInsights() {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate({ to: '/admin/login' }) }, [navigate])
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Impact & Insights" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="Impact & Insights Page"
        onSave={(vals) => writeSection('impactInsights', vals)}
        defaultValues={data.impactInsights}
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
                <Input value={values.heading.prefix} onChange={(v) => onChange('heading.prefix', v)} placeholder="e.g. Impact &" />
              </Field>
              <Field label="Heading Highlight">
                <Input value={values.heading.highlight} onChange={(v) => onChange('heading.highlight', v)} placeholder="e.g. Insights" />
              </Field>
            </div>
            <Field label="Intro Text">
              <Textarea value={values.intro} onChange={(v) => onChange('intro', v)} placeholder="Page intro" rows={2} />
            </Field>

            {/* Sustainability Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Sustainability Section</h3>
              {values.sections
                ?.filter((s: { id: string }) => s.id === 'sustainability')
                .map((sec: { title: string; body: string; metrics: { label: string; value: string; unit: string }[] }, i: number) => (
                  <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2">
                    <Field label="Title">
                      <Input value={sec.title} onChange={(v) => onChange('sections.0.title', v)} />
                    </Field>
                    <Field label="Body">
                      <Textarea value={sec.body} onChange={(v) => onChange('sections.0.body', v)} rows={2} />
                    </Field>
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-text/60">Metrics</div>
                      {sec.metrics?.map((m: { label: string; value: string; unit: string }, j: number) => (
                        <div key={j} className="grid grid-cols-3 gap-2">
                          <Field label="Label">
                            <Input value={m.label} onChange={(v) => onChange(`sections.0.metrics.${j}.label`, v)} />
                          </Field>
                          <Field label="Value">
                            <Input value={m.value} onChange={(v) => onChange(`sections.0.metrics.${j}.value`, v)} />
                          </Field>
                          <Field label="Unit">
                            <Input value={m.unit} onChange={(v) => onChange(`sections.0.metrics.${j}.unit`, v)} />
                          </Field>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Facts Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">E-Waste Facts Section</h3>
              {values.sections
                ?.filter((s: { id: string }) => s.id === 'facts')
                .map((sec: { title: string; body: string; facts: { stat: string; unit: string; description: string }[] }, i: number) => (
                  <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2">
                    <Field label="Title">
                      <Input value={sec.title} onChange={(v) => onChange('sections.1.title', v)} />
                    </Field>
                    <Field label="Body">
                      <Textarea value={sec.body} onChange={(v) => onChange('sections.1.body', v)} rows={2} />
                    </Field>
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-text/60">Facts</div>
                      {sec.facts?.map((f: { stat: string; unit: string; description: string }, j: number) => (
                        <div key={j} className="p-3 bg-white/30 rounded-lg space-y-2 border border-primary/5">
                          <div className="grid grid-cols-2 gap-2">
                            <Field label="Stat">
                              <Input value={f.stat} onChange={(v) => onChange(`sections.1.facts.${j}.stat`, v)} />
                            </Field>
                            <Field label="Unit">
                              <Input value={f.unit} onChange={(v) => onChange(`sections.1.facts.${j}.unit`, v)} />
                            </Field>
                          </div>
                          <Field label="Description">
                            <Textarea value={f.description} onChange={(v) => onChange(`sections.1.facts.${j}.description`, v)} rows={2} />
                          </Field>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Resources Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Resources Section</h3>
              {values.sections
                ?.filter((s: { id: string }) => s.id === 'resources')
                .map((sec: { title: string; body: string; resources: { title: string; type: string }[] }, i: number) => (
                  <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2">
                    <Field label="Title">
                      <Input value={sec.title} onChange={(v) => onChange('sections.2.title', v)} />
                    </Field>
                    <Field label="Body">
                      <Textarea value={sec.body} onChange={(v) => onChange('sections.2.body', v)} rows={2} />
                    </Field>
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-text/60">Resources</div>
                      {sec.resources?.map((r: { title: string; type: string }, j: number) => (
                        <div key={j} className="grid grid-cols-2 gap-2">
                          <Field label="Title">
                            <Input value={r.title} onChange={(v) => onChange(`sections.2.resources.${j}.title`, v)} />
                          </Field>
                          <Field label="Type">
                            <Input value={r.type} onChange={(v) => onChange(`sections.2.resources.${j}.type`, v)} placeholder="Whitepaper | Report | Guide" />
                          </Field>
                        </div>
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
