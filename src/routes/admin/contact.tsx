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
        title="Contact Us Page"
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
              <Field label="Heading Prefix">
                <Input value={values.heading.prefix} onChange={(v) => onChange('heading.prefix', v)} placeholder="e.g. Contact" />
              </Field>
              <Field label="Heading Highlight (colored)">
                <Input value={values.heading.highlight} onChange={(v) => onChange('heading.highlight', v)} placeholder="e.g. Us" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Tab 1">
                <Input value={values.tabs[0]} onChange={(v) => onChange('tabs.0', v)} placeholder="e.g. General Inquiry" />
              </Field>
              <Field label="Tab 2">
                <Input value={values.tabs[1]} onChange={(v) => onChange('tabs.1', v)} placeholder="e.g. Career" />
              </Field>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-sm">General Inquiry Segment</h3>
              <Field label="Segment Heading">
                <Input value={values.generalSegment.heading} onChange={(v) => onChange('generalSegment.heading', v)} />
              </Field>
              <Field label="Segment Description">
                <Textarea value={values.generalSegment.description} onChange={(v) => onChange('generalSegment.description', v)} rows={2} />
              </Field>
              <Field label="Submit Button Text">
                <Input value={values.generalForm.submitText} onChange={(v) => onChange('generalForm.submitText', v)} />
              </Field>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Career Segment</h3>
              <Field label="Segment Heading">
                <Input value={values.careerSegment.heading} onChange={(v) => onChange('careerSegment.heading', v)} />
              </Field>
              <Field label="Segment Description">
                <Textarea value={values.careerSegment.description} onChange={(v) => onChange('careerSegment.description', v)} rows={2} />
              </Field>
              <Field label="Submit Button Text">
                <Input value={values.careerForm.submitText} onChange={(v) => onChange('careerForm.submitText', v)} />
              </Field>
            </div>
          </>
        )}
      </AdminSection>
    </div>
  )
}