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
      <Navbar active="/services" links={content.navbar.links} cta={content.navbar.cta} logo={content.site.logo} siteName={content.site.name} />

      <main className="relative overflow-hidden">
        <div className="absolute top-40 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 motion-preset-float motion-duration-4000" />
        <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl -z-10 motion-preset-float motion-duration-5000 motion-delay-1000" />

        <div className="pt-32 pb-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 motion-preset-slide-up">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-10 h-1 bg-secondary rounded-full" />
                <span className="w-20 h-1 bg-primary/40 rounded-full" />
              </div>
              <h1 className="font-title text-5xl sm:text-6xl lg:text-7xl font-bold text-text mb-4">
                {heading.prefix}<span className="text-gradient">{heading.highlight}</span>
              </h1>
              <p className="text-lg text-text/60 max-w-2xl font-light">{intro}</p>
            </div>

            <div className="space-y-3">
              {segments.map((seg, i) => (
                <SegmentItem key={i} seg={seg} index={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      </main>
    </div>
  )
}

const icons = [
  'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
  'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
]

function SegmentItem({ seg, index }: { seg: { title: string; body: string }; index: number }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div
      className={`group bg-white/40 backdrop-blur-sm rounded-2xl border transition-all duration-500 overflow-hidden card-hover ${
        open
          ? 'border-primary/30 shadow-lg shadow-primary/5'
          : 'border-primary/10 hover:border-primary/20 hover:bg-white/60'
      } motion-preset-slide-up`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left"
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
          open ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-primary/10 text-primary'
        }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={icons[index % icons.length]} />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-title text-lg font-bold text-text block">{seg.title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full transition-all duration-300 ${
            open ? 'bg-primary/10 text-primary' : 'bg-text/5 text-text/40'
          }`}>
            {open ? 'Hide' : 'View'}
          </span>
          <svg
            className={`w-5 h-5 text-text/40 transition-all duration-300 ${open ? 'rotate-180 text-primary' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-0">
          <div className="pl-14">
            <div className="w-12 h-0.5 bg-primary/20 rounded-full mb-3" />
            <p className="text-text/70 leading-relaxed">{seg.body}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
