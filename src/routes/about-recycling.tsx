import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { readContent } from '#/lib/content'

export const Route = createFileRoute('/about-recycling')({
  loader: async () => readContent(),
  component: AboutRecycling,
})

function AboutRecycling() {
  const content = Route.useLoaderData()!
  const { heading, intro, facts } = content.aboutRecycling

  return (
    <div className="font-sans text-text">
      <Navbar active="/about-recycling" links={content.navbar.links} cta={content.navbar.cta} logo={content.site.logo} siteName={content.site.name} />

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

            <div className="grid gap-6 md:grid-cols-2">
              {facts.map((fact, i) => (
                <div
                  key={i}
                  className={`group bg-white/40 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 card-hover ${
                    i === 0
                      ? 'border-l-4 border-l-secondary border-primary/10 md:col-span-2'
                      : 'border-primary/10 hover:border-primary/20 hover:bg-white/60'
                  } motion-preset-slide-up`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      i % 3 === 0 ? 'bg-primary/10 text-primary' : i % 3 === 1 ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                        {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />}
                        {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />}
                        {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        {i === 4 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />}
                        {i > 4 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />}
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-title text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">{fact.title}</h2>
                      <p className="text-text/70 leading-relaxed text-sm">{fact.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      </main>
    </div>
  )
}
