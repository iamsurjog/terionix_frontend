import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { isAuthenticated } from '#/lib/auth'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, Textarea, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/home')({
  loader: async () => readContent(),
  component: AdminHome,
})

function AdminHome() {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate({ to: '/admin/login' }) }, [navigate])
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Home" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="Home Page"
        onSave={(vals) => writeSection('home', vals)}
        defaultValues={data.home}
        validate={(v: unknown) => {
          const o = v as { tagline?: string; heroTitle?: string }
          if (!o.tagline?.trim()) return 'Tagline is required'
          if (!o.heroTitle?.trim()) return 'Hero title is required'
          return null
        }}
      >
        {(values, onChange) => (
          <>
            {/* Hero Section */}
            <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">Hero Section</h3>
            <div className="grid grid-cols-1 gap-4">
              <Field label="Tagline (e.g. Where Circuits Bloom)">
                <Input value={values.tagline} onChange={(v) => onChange('tagline', v)} placeholder="Tagline" />
              </Field>
              <Field label="Hero Title">
                <Input value={values.heroTitle} onChange={(v) => onChange('heroTitle', v)} placeholder="Main hero title" />
              </Field>
              <Field label="Hero Subtitle">
                <Textarea value={values.heroSubtitle} onChange={(v) => onChange('heroSubtitle', v)} placeholder="Hero subtitle text" rows={2} />
              </Field>
            </div>

            <hr className="border-primary/10" />

            {/* CTA Buttons */}
            <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">CTA Buttons</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Field label="Partner Button Label">
                  <Input value={values.partnerButton?.label} onChange={(v) => onChange('partnerButton.label', v)} placeholder="Partner with Us" />
                </Field>
                <Field label="Partner Button Href">
                  <Input value={values.partnerButton?.href} onChange={(v) => onChange('partnerButton.href', v)} placeholder="/contact" />
                </Field>
              </div>
              <div className="space-y-2">
                <Field label="Challenge Button Label">
                  <Input value={values.challengeButton?.label} onChange={(v) => onChange('challengeButton.label', v)} placeholder="Take the E-Waste Challenge" />
                </Field>
                <Field label="Challenge Button Href">
                  <Input value={values.challengeButton?.href} onChange={(v) => onChange('challengeButton.href', v)} placeholder="#game-section" />
                </Field>
              </div>
            </div>

            <hr className="border-primary/10" />

            {/* Matrix Cards */}
            <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">Matrix Cards (3 pillars)</h3>
            {values.matrixCards?.map((card: { title: string; description: string; stat: string }, i: number) => (
              <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2">
                <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Card {i + 1}</div>
                <Field label="Title">
                  <Input value={card.title} onChange={(v) => onChange(`matrixCards.${i}.title`, v)} placeholder="Card title" />
                </Field>
                <Field label="Description">
                  <Textarea value={card.description} onChange={(v) => onChange(`matrixCards.${i}.description`, v)} rows={2} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Stat Text">
                    <Input value={card.stat} onChange={(v) => onChange(`matrixCards.${i}.stat`, v)} placeholder="e.g. 100% Compliant" />
                  </Field>
                  <Field label="Icon (shield/lock/cpu)">
                    <Input value={card.icon} onChange={(v) => onChange(`matrixCards.${i}.icon`, v)} placeholder="shield | lock | cpu" />
                  </Field>
                </div>
              </div>
            ))}

            <hr className="border-primary/10" />

            {/* Trust Stats */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">Trust Stats (4 counters)</h3>
            </div>
            {values.trustStats?.map((stat: { label: string; value: string; unit: string }, i: number) => (
              <div key={i} className="grid grid-cols-3 gap-3 p-3 bg-white/50 rounded-lg border border-primary/10">
                <Field label="Label">
                  <Input value={stat.label} onChange={(v) => onChange(`trustStats.${i}.label`, v)} placeholder="E-Waste Recycled" />
                </Field>
                <Field label="Value">
                  <Input value={stat.value} onChange={(v) => onChange(`trustStats.${i}.value`, v)} placeholder="500+" />
                </Field>
                <Field label="Unit">
                  <Input value={stat.unit} onChange={(v) => onChange(`trustStats.${i}.unit`, v)} placeholder="Metric Tons" />
                </Field>
              </div>
            ))}

            <hr className="border-primary/10" />

            {/* Authorization */}
            <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">Authorization Badge</h3>
            <Field label="Title">
              <Input value={values.authorization?.title} onChange={(v) => onChange('authorization.title', v)} placeholder="TNPCB Authorized Recycler" />
            </Field>
            <Field label="Badge Image Path">
              <Input value={values.authorization?.badge} onChange={(v) => onChange('authorization.badge', v)} placeholder="/badge.png" />
            </Field>
            <Field label="Description">
              <Textarea value={values.authorization?.description} onChange={(v) => onChange('authorization.description', v)} rows={3} />
            </Field>

            <hr className="border-primary/10" />

            {/* Impact Calculator */}
            <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">Impact Calculator</h3>
            <Field label="Calculator Title">
              <Input value={values.impactCalculator?.title} onChange={(v) => onChange('impactCalculator.title', v)} placeholder="E-Waste Impact Calculator" />
            </Field>
            <Field label="Calculator Description">
              <Textarea value={values.impactCalculator?.description} onChange={(v) => onChange('impactCalculator.description', v)} rows={2} />
            </Field>
          </>
        )}
      </AdminSection>
    </div>
  )
}
