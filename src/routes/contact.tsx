import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { readContent } from '#/lib/content'

export const Route = createFileRoute('/contact')({
  loader: async () => readContent(),
  component: ContactUs,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: search.tab as string | undefined,
      position: search.position as string | undefined,
    }
  },
})

const categoryToFirstPosition: Record<string, string> = {
  'collection-logistics': 'e-waste-collection-staff',
  'sorting-processing': 'sorting-operator',
  'technical-it': 'data-destruction-specialist',
  'compliance-certification': 'ehs-officer',
  'business-operations': 'operations-manager',
  'sales-marketing': 'epr-consultant',
  'research-innovation': 'rd-specialist',
  'admin-support': 'hr-executive',
}

function ContactUs() {
  const content = Route.useLoaderData()!
  const { tab, position } = Route.useSearch()
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (tab === 'career') setActiveTab(1)
  }, [tab])

  const tabs = content.contact.tabs
  const { heading, generalSegment, careerSegment } = content.contact

  return (
    <div className="font-sans text-text">
      <Navbar active="Contact Us" links={content.navbar.links} logo={content.site.logo} siteName={content.site.name} />
      <main className="pt-32 pb-24 px-4 relative">
        <div className="absolute top-40 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-secondary rounded-full" />
            <span className="w-16 h-1 bg-primary/30 rounded-full" />
          </div>
          <h1 className="font-title text-5xl sm:text-6xl font-bold text-text mb-8">
            {heading.prefix}<span className="text-primary">{heading.highlight}</span>
          </h1>

          <div className="flex border-b border-primary/20 mb-8">
            {tabs.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)}
                className={`px-6 py-3 font-semibold text-sm transition-all relative ${
                  activeTab === i ? 'text-primary' : 'text-text/50 hover:text-text/80'
                }`}>
                {tab}
                {activeTab === i && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
            ))}
          </div>

          {activeTab === 0 && <GeneralForm segment={generalSegment} />}
          {activeTab === 1 && <CareerForm segment={careerSegment} preselectedPosition={position} />}
        </div>
      </main>
    </div>
  )
}

function GeneralForm({ segment }: { segment: { heading: string; description: string } }) {
  const content = Route.useLoaderData()!
  const { fields, submitText } = content.contact.generalForm

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      <h2 className="font-title text-xl font-bold mb-2">{segment.heading}</h2>
      <p className="text-text/60 mb-6">{segment.description}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <div key={field.label}>
            <label className="block text-sm font-semibold text-text/80 mb-1.5">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea rows={field.rows ?? 4} required={field.required}
                className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors resize-y" />
            ) : (
              <input type={field.type} required={field.required}
                className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors" />
            )}
          </div>
        ))}
        <button type="submit"
          className="bg-primary text-white font-semibold px-8 py-2.5 rounded-lg hover:brightness-110 transition-all">{submitText}</button>
      </form>
    </div>
  )
}

function CareerForm({ segment, preselectedPosition }: { segment: { heading: string; description: string }; preselectedPosition?: string }) {
  const content = Route.useLoaderData()!
  const { fields, submitText, positions } = content.contact.careerForm

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const defaultPosition = preselectedPosition
    ? categoryToFirstPosition[preselectedPosition] || ''
    : ''

  return (
    <div>
      <h2 className="font-title text-xl font-bold mb-2">{segment.heading}</h2>
      <p className="text-text/60 mb-6">{segment.description}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => {
          if (field.type === 'select') {
            return (
              <div key={field.label}>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">{field.label}</label>
                <select required={field.required} defaultValue={defaultPosition}
                  className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors">
                  <option value="">Select a position</option>
                  {positions.map((group) => (
                    <optgroup key={group.group} label={group.group}>
                      {group.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
            )
          }

          if (field.type === 'file') {
            return (
              <div key={field.label}>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">{field.label}</label>
                <input type="file" accept={field.accept} required={field.required}
                  className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary file:font-semibold file:text-sm hover:file:bg-primary/20" />
                {field.note && <p className="text-xs text-text/50 mt-1">{field.note}</p>}
              </div>
            )
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.label}>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">{field.label}</label>
                <textarea rows={field.rows ?? 4} required={field.required}
                  className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors resize-y" />
              </div>
            )
          }

          return (
            <div key={field.label}>
              <label className="block text-sm font-semibold text-text/80 mb-1.5">{field.label}</label>
              <input type={field.type} required={field.required}
                className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors" />
            </div>
          )
        })}
        <button type="submit"
          className="bg-accent text-white font-semibold px-8 py-2.5 rounded-lg hover:brightness-110 transition-all">{submitText}</button>
      </form>
    </div>
  )
}