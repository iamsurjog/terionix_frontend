import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { isAuthenticated } from '#/lib/auth'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/settings')({
  loader: async () => readContent(),
  component: AdminSettings,
})

const platformOptions = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'twitter', label: 'X (Twitter)' },
  { value: 'youtube', label: 'YouTube' },
]

function AdminSettings() {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate({ to: '/admin/login' }) }, [navigate])
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Settings" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="Site Settings"
        onSave={(vals) => writeSection('social', vals)}
        defaultValues={data.social || { whatsapp: { number: '', message: '', label: '', enabled: true }, links: [] }}
      >
        {(values, onChange) => (
          <>
            {/* WhatsApp Settings */}
            <div className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-3">
              <h3 className="font-medium text-sm text-primary">WhatsApp Integration</h3>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Phone Number (with country code)">
                  <Input
                    value={values.whatsapp?.number || ''}
                    onChange={(v) => onChange('whatsapp.number', v)}
                    placeholder="e.g. 919999999999"
                  />
                </Field>
                <Field label="Enabled">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={values.whatsapp?.enabled ?? true}
                      onChange={(e) => onChange('whatsapp.enabled', e.target.checked)}
                      className="w-4 h-4 rounded border-primary/30 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text/60">Show WhatsApp button</span>
                  </label>
                </Field>
              </div>
              <Field label="Pre-filled Message">
                <input
                  className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-white/60 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  value={values.whatsapp?.message || ''}
                  onChange={(e) => onChange('whatsapp.message', e.target.value)}
                  placeholder="Hi Terionix, I want to recycle some home e-waste..."
                />
              </Field>
              <Field label="Button Label">
                <input
                  className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-white/60 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  value={values.whatsapp?.label || ''}
                  onChange={(e) => onChange('whatsapp.label', e.target.value)}
                  placeholder="Quick Pickup via WhatsApp"
                />
              </Field>
            </div>

            {/* Social Media Links */}
            <div className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-3">
              <h3 className="font-medium text-sm text-primary">Social Media Links</h3>
              <p className="text-xs text-text/50">Add or remove social media platform links. These appear in the navigation bar and footer.</p>
              {Array.isArray(values.links) && values.links.map((link: { platform: string; url: string; label: string }, i: number) => (
                <div key={i} className="p-3 bg-background/50 rounded-lg border border-primary/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-text/40 uppercase">Link {i + 1}</span>
                    <button
                      onClick={() => {
                        const updated = [...values.links]
                        updated.splice(i, 1)
                        onChange('links', updated)
                      }}
                      className="text-xs text-error hover:text-error-deep transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Field label="Platform">
                      <select
                        className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-white/60 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        value={link.platform}
                        onChange={(e) => {
                          const plat = e.target.value
                          const opt = platformOptions.find((o) => o.value === plat)
                          onChange(`links.${i}.platform`, plat)
                          onChange(`links.${i}.label`, opt?.label || plat)
                        }}
                      >
                        {platformOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </Field>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-text/60 mb-1.5">URL</label>
                      <input
                        className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-white/60 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        value={link.url}
                        onChange={(e) => onChange(`links.${i}.url`, e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const updated = [...(values.links || []), { platform: 'linkedin', url: '', label: 'LinkedIn' }]
                  onChange('links', updated)
                }}
                className="text-sm text-primary hover:text-primary-deep font-medium transition-colors"
              >
                + Add Social Link
              </button>
            </div>
          </>
        )}
      </AdminSection>
    </div>
  )
}
