import { createFileRoute } from '@tanstack/react-router'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, Textarea, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/home')({
  loader: async () => readContent(),
  component: AdminHome,
})

function AdminHome() {
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Home" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="Home Page"
        onSave={(vals) => writeSection('home', vals)}
        defaultValues={data.home}
        validate={(v: unknown) => {
          const o = v as { heading?: string; tagline?: string; aboutPreview?: string }
          if (!o.heading?.trim()) return 'Heading is required'
          if (!o.tagline?.trim()) return 'Tagline is required'
          if (!o.aboutPreview?.trim()) return 'About preview is required'
          return null
        }}
      >
        {(values, onChange) => (
          <>
            <Field label="Main Heading">
              <Input value={values.heading} onChange={(v) => onChange('heading', v)} placeholder="Main heading" />
            </Field>
            <Field label="Tagline">
              <Input value={values.tagline} onChange={(v) => onChange('tagline', v)} placeholder="Short tagline below heading" />
            </Field>
            <Field label="About Preview Text">
              <Textarea value={values.aboutPreview} onChange={(v) => onChange('aboutPreview', v)} placeholder="Brief about Terionix text" rows={3} />
            </Field>
            <Field label="Preview CTA Button Label">
              <Input value={values.previewCta.label} onChange={(v) => onChange('previewCta.label', v)} placeholder="Button label" />
            </Field>
          </>
        )}
      </AdminSection>
    </div>
  )
}