import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { isAuthenticated } from '#/lib/auth'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent, updatePassword } from '#/lib/content'
import { AdminSection, Field, Input, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/settings')({
  loader: async () => readContent(),
  component: AdminSettings,
})

const platformOptions = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook' },
]

function PasswordSection() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }
    if (newPassword.length < 4) {
      setMessage({ type: 'error', text: 'New password must be at least 4 characters' })
      return
    }

    setLoading(true)
    try {
      const result = await updatePassword({ data: { currentPassword, newPassword } })
      if (result.success) {
        setMessage({ type: 'success', text: 'Password updated successfully' })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update password' })
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-3">
      <h3 className="font-medium text-sm text-primary">Change Admin Password</h3>
      <p className="text-xs text-text/50">Update the admin panel password. The default password is "admin" until you change it.</p>

      <form onSubmit={handleChangePassword} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-text/60 mb-1.5">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-white/60 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-text/60 mb-1.5">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-white/60 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              required
              minLength={4}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-text/60 mb-1.5">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-white/60 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              required
              minLength={4}
            />
          </div>
        </div>

        {message && (
          <p className={`text-xs flex items-center gap-1 ${message.type === 'success' ? 'text-success' : 'text-error'}`}>
            {message.type === 'success' ? (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:brightness-110 transition-all duration-300 disabled:opacity-60"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}

function AdminSettings() {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate({ to: '/admin/login' }) }, [navigate])
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Settings" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="font-title text-3xl font-bold">Site Settings</h1>

          <PasswordSection />

          <AdminSection
            title=""
            onSave={(vals) => writeSection('social', vals)}
            defaultValues={data.social || { links: [] }}
          >
            {(values, onChange) => (
              <>
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
      </main>
    </div>
  )
}
