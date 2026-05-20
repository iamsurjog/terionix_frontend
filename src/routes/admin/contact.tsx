import { createFileRoute } from '@tanstack/react-router'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, Textarea, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/contact')({
  loader: async () => readContent(),
  component: AdminContact,
})

function AdminContact() {
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Contact Us" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="Contact Page"
        onSave={(vals) => writeSection('contact', vals)}
        defaultValues={data.contact}
        validate={(v: unknown) => {
          const o = v as { heading?: { prefix?: string; highlight?: string } }
          if (!o.heading?.prefix?.trim()) return 'Heading prefix is required'
          if (!o.heading?.highlight?.trim()) return 'Heading highlight is required'
          return null
        }}
      >
        {(values, onChange) => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Heading Prefix (before highlight)">
                <Input
                  value={values.heading.prefix}
                  onChange={(v) => onChange('heading.prefix', v)}
                  placeholder="e.g. Contact"
                />
              </Field>
              <Field label="Heading Highlight (colored part)">
                <Input
                  value={values.heading.highlight}
                  onChange={(v) => onChange('heading.highlight', v)}
                  placeholder="e.g. Us"
                />
              </Field>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-sm">Form Tabs</h3>
              <Field label="Tab 1">
                <Input
                  value={values.tabs[0]}
                  onChange={(v) => onChange('tabs.0', v)}
                  placeholder="e.g. General Inquiry"
                />
              </Field>
              <Field label="Tab 2">
                <Input
                  value={values.tabs[1]}
                  onChange={(v) => onChange('tabs.1', v)}
                  placeholder="e.g. Career"
                />
              </Field>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-sm">General Inquiry Form</h3>
              <Field label="Submit Button Text">
                <Input
                  value={values.generalForm.submitText}
                  onChange={(v) => onChange('generalForm.submitText', v)}
                  placeholder="e.g. Send Message"
                />
              </Field>
              {values.generalForm.fields.map((f: { label: string; type: string; required: boolean; rows?: number }, i: number) => (
                <div key={i} className="p-3 bg-white/50 rounded-lg border border-primary/10 space-y-1.5">
                  <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Field {i + 1}: {f.label}</div>
                  <Field label="Label">
                    <Input value={f.label} onChange={(v) => onChange(`generalForm.fields.${i}.label`, v)} placeholder="Label" />
                  </Field>
                  <Field label="Type">
                    <Input value={f.type} onChange={(v) => onChange(`generalForm.fields.${i}.type`, v)} placeholder="text, email, textarea" />
                  </Field>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-sm">Career Form</h3>
              <Field label="Submit Button Text">
                <Input
                  value={values.careerForm.submitText}
                  onChange={(v) => onChange('careerForm.submitText', v)}
                  placeholder="e.g. Submit Application"
                />
              </Field>
              {values.careerForm.fields.map((f: { label: string; type: string; required: boolean; rows?: number; note?: string; accept?: string }, i: number) => (
                <div key={i} className="p-3 bg-white/50 rounded-lg border border-primary/10 space-y-1.5">
                  <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Field {i + 1}: {f.label}</div>
                  <Field label="Label">
                    <Input value={f.label} onChange={(v) => onChange(`careerForm.fields.${i}.label`, v)} placeholder="Label" />
                  </Field>
                  <Field label="Type">
                    <Input value={f.type} onChange={(v) => onChange(`careerForm.fields.${i}.type`, v)} placeholder="text, email, tel, select, textarea, file" />
                  </Field>
                  {f.note && (
                    <Field label="Note">
                      <Input value={f.note} onChange={(v) => onChange(`careerForm.fields.${i}.note`, v)} placeholder="Note" />
                    </Field>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </AdminSection>
    </div>
  )
}