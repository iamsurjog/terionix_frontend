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

      <main className="relative overflow-hidden">
        <div className="absolute top-40 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 motion-preset-float motion-duration-4000" />
        <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl -z-10 motion-preset-float motion-duration-5000 motion-delay-1000" />

        <div className="pt-32 pb-24 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-10 motion-preset-slide-up">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-10 h-1 bg-secondary rounded-full" />
                <span className="w-20 h-1 bg-primary/40 rounded-full" />
              </div>
              <h1 className="font-title text-5xl sm:text-6xl lg:text-7xl font-bold text-text">
                {heading.prefix}<span className="text-primary">{heading.highlight}</span>
              </h1>
            </div>

            {/* Tabs */}
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-1.5 border border-primary/10 flex mb-8 motion-preset-slide-up motion-delay-100">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 ${
                    activeTab === i
                      ? 'bg-white text-primary shadow-lg shadow-primary/10'
                      : 'text-text/50 hover:text-text/80'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Form content */}
            <div className="motion-preset-pop motion-duration-500">
              {activeTab === 0 && <GeneralForm segment={generalSegment} />}
              {activeTab === 1 && <CareerForm segment={careerSegment} preselectedPosition={position} />}
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
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
    <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-primary/10">
      <h2 className="font-title text-2xl font-bold mb-2">{segment.heading}</h2>
      <p className="text-text/60 mb-8">{segment.description}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <div key={field.label} className="group">
            <label className="block text-sm font-semibold text-text/80 mb-1.5 group-focus-within:text-primary transition-colors">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                rows={field.rows ?? 4}
                required={field.required}
                className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 resize-y"
              />
            ) : (
              <input
                type={field.type}
                required={field.required}
                className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-primary/80 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110 transition-all duration-300"
        >
          {submitText}
        </button>
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
    <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-primary/10">
      <h2 className="font-title text-2xl font-bold mb-2">{segment.heading}</h2>
      <p className="text-text/60 mb-8">{segment.description}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => {
          if (field.type === 'select') {
            return (
              <div key={field.label} className="group">
                <label className="block text-sm font-semibold text-text/80 mb-1.5 group-focus-within:text-primary transition-colors">{field.label}</label>
                <select
                  required={field.required}
                  defaultValue={defaultPosition}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                >
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
              <div key={field.label} className="group">
                <label className="block text-sm font-semibold text-text/80 mb-1.5 group-focus-within:text-primary transition-colors">{field.label}</label>
                <input
                  type="file"
                  accept={field.accept}
                  required={field.required}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary/10 file:text-primary file:font-semibold file:text-sm hover:file:bg-primary/20"
                />
                {field.note && <p className="text-xs text-text/50 mt-1.5">{field.note}</p>}
              </div>
            )
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.label} className="group">
                <label className="block text-sm font-semibold text-text/80 mb-1.5 group-focus-within:text-primary transition-colors">{field.label}</label>
                <textarea
                  rows={field.rows ?? 4}
                  required={field.required}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 resize-y"
                />
              </div>
            )
          }

          return (
            <div key={field.label} className="group">
              <label className="block text-sm font-semibold text-text/80 mb-1.5 group-focus-within:text-primary transition-colors">{field.label}</label>
              <input
                type={field.type}
                required={field.required}
                className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
              />
            </div>
          )
        })}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-accent to-accent/80 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:brightness-110 transition-all duration-300"
        >
          {submitText}
        </button>
      </form>
    </div>
  )
}
