import { createFileRoute } from '@tanstack/react-router'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/services')({
  loader: async () => readContent(),
  component: AdminServices,
})

function AdminServices() {
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Services & Solutions" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="Services Page"
        onSave={(vals) => writeSection('services', vals)}
        defaultValues={data.services}
        validate={(v: unknown) => {
          const o = v as { heading?: string }
          if (!o.heading?.trim()) return 'Heading is required'
          return null
        }}
      >
        {(values, onChange) => (
          <Field label="Main Heading">
            <Input
              value={values.heading}
              onChange={(v) => onChange('heading', v)}
              placeholder="Enter the main heading text"
            />
          </Field>
        )}
      </AdminSection>
    </div>
  )
}