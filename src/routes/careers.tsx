import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { readContent } from '#/lib/content'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/careers')({
  loader: async () => readContent(),
  component: Careers,
})

function Careers() {
  const content = Route.useLoaderData()!
  const { heading, subtitle, whyTerionix, categories, cta } = content.careers

  return (
    <div className="font-sans text-text">
      <Navbar active="Careers" links={content.navbar.links} logo={content.site.logo} siteName={content.site.name} />
      <main className="pt-32 pb-24 px-4 relative">
        <div className="absolute top-40 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-secondary rounded-full" />
            <span className="w-16 h-1 bg-primary/30 rounded-full" />
          </div>
          <h1 className="font-title text-5xl sm:text-6xl font-bold text-text mb-4">
            {heading.prefix}<span className="text-primary">{heading.highlight}</span>
          </h1>
          <p className="text-lg text-text/60 max-w-2xl mb-12">{subtitle}</p>

          <div className="bg-white/50 rounded-xl border border-primary/10 p-6 mb-12">
            <h2 className="font-title text-2xl font-bold text-primary mb-4">Why Terionix?</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {whyTerionix.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text/70">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-white/50 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-title text-xl font-bold text-primary">{cat.title}</h2>
                  <Link to="/contact" search={{ tab: 'career', position: cat.slug }}
                    className="shrink-0 text-xs font-semibold text-white bg-accent px-4 py-1.5 rounded-lg hover:brightness-110 transition-all">Apply</Link>
                </div>
                <ul className="space-y-2">
                  {cat.roles.map((role) => (
                    <li key={role} className="text-sm text-text/70 leading-relaxed">{role}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text/60 mb-4">{cta.text}</p>
            <Link to="/contact" search={{ tab: 'career', position: undefined }}
              className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:brightness-110 transition-all">{cta.buttonLabel}</Link>
          </div>
        </div>
      </main>
    </div>
  )
}