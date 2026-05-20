import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { readContent } from '#/lib/content'

export const Route = createFileRoute('/services')({
  loader: async () => readContent(),
  component: Services,
})

function Services() {
  const content = Route.useLoaderData()!
  const { heading, intro, segments } = content.services

  return (
    <div className="font-sans text-text">
      <Navbar active="Services & Solutions" links={content.navbar.links} logo={content.site.logo} siteName={content.site.name} />
      <main className="pt-32 pb-24 px-4 relative">
        <div className="absolute top-40 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-secondary rounded-full" />
            <span className="w-16 h-1 bg-primary/30 rounded-full" />
          </div>
          <h1 className="font-title text-5xl sm:text-6xl font-bold text-text mb-4">
            {heading.prefix}<span className="text-primary">{heading.highlight}</span>
          </h1>
          <p className="text-lg text-text/60 max-w-2xl mb-12">{intro}</p>
          <div className="space-y-3">
            {segments.map((seg, i) => (
              <SegmentItem key={i} seg={seg} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function SegmentItem({ seg, defaultOpen }: { seg: { title: string; body: string }; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white/50 rounded-xl border border-primary/10 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left">
        <span className="font-title text-lg font-bold text-primary">{seg.title}</span>
        <svg className={`w-5 h-5 text-text/50 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-text/70 leading-relaxed">{seg.body}</div>
      )}
    </div>
  )
}