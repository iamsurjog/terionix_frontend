import { createFileRoute } from '@tanstack/react-router'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, Textarea, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/careers')({
  loader: async () => readContent(),
  component: AdminCareers,
})

function AdminCareers() {
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Careers in Terionix" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="Careers Page"
        onSave={(vals) => writeSection('careers', vals)}
        defaultValues={data.careers}
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
                  placeholder="e.g. Careers at"
                />
              </Field>
              <Field label="Heading Highlight (colored part)">
                <Input
                  value={values.heading.highlight}
                  onChange={(v) => onChange('heading.highlight', v)}
                  placeholder="e.g. Terionix"
                />
              </Field>
            </div>
            <Field label="Subtitle / Intro Text">
              <Textarea
                value={values.subtitle}
                onChange={(v) => onChange('subtitle', v)}
                placeholder="Short intro text below the heading"
                rows={2}
              />
            </Field>
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Job Categories</h3>
              {values.categories.map((cat: { title: string; slug: string; roles: string[] }, i: number) => (
                <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2">
                  <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Category {i + 1}</div>
                  <Field label="Category Title">
                    <Input
                      value={cat.title}
                      onChange={(v) => onChange(`categories.${i}.title`, v)}
                      placeholder="e.g. Technical & IT"
                    />
                  </Field>
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-text/60">Roles</div>
                    {cat.roles.map((role: string, j: number) => (
                      <div key={j} className="flex gap-2">
                        <Input
                          value={role}
                          onChange={(v) => onChange(`categories.${i}.roles.${j}`, v)}
                          placeholder="Role description"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-sm">Call to Action</h3>
              <Field label="CTA Text">
                <Textarea
                  value={values.cta.text}
                  onChange={(v) => onChange('cta.text', v)}
                  placeholder="Text shown before the button"
                  rows={2}
                />
              </Field>
              <Field label="Button Label">
                <Input
                  value={values.cta.buttonLabel}
                  onChange={(v) => onChange('cta.buttonLabel', v)}
                  placeholder="e.g. Apply Now"
                />
              </Field>
            </div>
          </>
        )}
      </AdminSection>
    </div>
  )
}