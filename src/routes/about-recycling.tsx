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
      <Navbar active="About Recycling" links={content.navbar.links} logo={content.site.logo} siteName={content.site.name} />
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
          <div className="space-y-6">
            {facts.map((fact, i) => (
              <div key={i} className={`bg-white/50 rounded-xl p-6 border border-primary/10 ${i === 0 ? 'border-l-4 border-l-secondary' : ''}`}>
                <h2 className="font-title text-xl font-bold text-primary mb-3">{fact.title}</h2>
                <p className="text-text/70 leading-relaxed">{fact.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}