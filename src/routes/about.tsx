import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { readContent } from '#/lib/content'

export const Route = createFileRoute('/about')({
  loader: async () => readContent(),
  component: About,
})

function About() {
  const content = Route.useLoaderData()!
  const { heading, paragraphs, cta } = content.about

  return (
    <div className="font-sans text-text">
      <Navbar active="About" links={content.navbar.links} logo={content.site.logo} siteName={content.site.name} />
      <main className="pt-32 pb-24 px-4 relative">
        <div className="absolute top-40 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-secondary rounded-full" />
            <span className="w-16 h-1 bg-primary/30 rounded-full" />
          </div>
          <h1 className="font-title text-5xl sm:text-6xl font-bold text-text mb-8">
            {heading.prefix}<span className="text-primary">{heading.highlight}</span>
          </h1>
          <div className="space-y-6 text-text/70 leading-relaxed text-lg">
            {paragraphs.map((para, i) => (
              <p key={i} className={para.className ?? ''}>
                {para.segments.map((seg, j) =>
                  seg.className ? (
                    <span key={j} className={seg.className}>{seg.text}</span>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  )
                )}
              </p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            {cta.map((btn, i) => (
              <a key={i} href={btn.href} className={btn.className}>{btn.label}</a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
