import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { readContent } from '#/lib/content'
import { RecyclingGame, Leaderboard } from '#/components/RecyclingGame'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async () => readContent(),
  component: Home,
})

function Home() {
  const content = Route.useLoaderData()!
  const { heading, tagline, aboutPreview, previewCta, pageButtons } = content.home

  return (
    <div className="font-sans text-text">
      <Navbar active="Home" links={content.navbar.links} logo={content.site.logo} siteName={content.site.name} />
      <main className="pt-32 pb-24 px-4 relative">
        <div className="absolute top-40 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-title text-5xl sm:text-6xl font-bold text-text mb-4">{heading}</h1>
            <p className="text-lg text-text/60 max-w-2xl mx-auto">{tagline}</p>
          </div>

          <div className="bg-white/50 rounded-2xl border border-primary/10 p-8 max-w-md mx-auto mb-20">
            <RecyclingGame items={content.game.items} />
            <Leaderboard scores={content.leaderboard} />
          </div>

          <div className="max-w-2xl mx-auto mb-20 text-center" id="about-preview">
            <p className="text-lg text-text/70 mb-6 leading-relaxed">{aboutPreview}</p>
            <Link to="/about" className="inline-block bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:brightness-110 transition-all">
              {previewCta.label}
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {pageButtons.map((btn, i) => (
              <a key={i} href={btn.href} className={`font-sans font-semibold px-8 py-3 rounded-lg hover:brightness-110 transition-all ${btn.style}`}>
                {btn.label}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}