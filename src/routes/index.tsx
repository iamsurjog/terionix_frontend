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

      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl motion-preset-float motion-duration-4000" />
            <div className="absolute bottom-40 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl motion-preset-float motion-duration-5000 motion-delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl motion-preset-pulse motion-duration-6000" />
          </div>

          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 motion-preset-slide-up motion-duration-700">
              <span className="w-2 h-2 rounded-full bg-primary motion-preset-pulse" />
              E-Waste Management
            </div>

            <h1 className="font-title text-5xl sm:text-7xl lg:text-8xl font-bold text-text mb-6 leading-[1.1] motion-preset-slide-up motion-duration-700 motion-delay-100">
              {heading}
            </h1>

            <p className="text-lg sm:text-xl text-text/60 max-w-2xl mx-auto mb-10 motion-preset-slide-up motion-duration-700 motion-delay-200">
              {tagline}
            </p>

            <div className="flex flex-wrap gap-4 justify-center motion-preset-slide-up motion-duration-700 motion-delay-300">
              {pageButtons.map((btn, i) => {
                const baseStyle = btn.style || ''
                const isBordered = baseStyle.includes('border')
                return (
                  <a
                    key={i}
                    href={btn.href}
                    className={`group relative font-sans font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 ${
                      isBordered
                        ? 'border-2 border-accent text-accent hover:bg-accent hover:text-white shadow-lg shadow-accent/10 hover:shadow-accent/25'
                        : baseStyle.includes('primary')
                          ? 'bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/25 hover:shadow-primary/40'
                          : 'bg-secondary text-white hover:brightness-110 shadow-lg shadow-secondary/25 hover:shadow-secondary/40'
                    }`}
                  >
                    <span className="relative z-10">{btn.label}</span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-preset-bounce motion-duration-2000 motion-loop-infinite">
            <svg className="w-6 h-6 text-text/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Game Section */}
        <section className="px-4 py-24 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 motion-preset-slide-up">
              <h2 className="font-title text-3xl sm:text-4xl font-bold text-text mb-4">
                Test Your <span className="text-primary">Knowledge</span>
              </h2>
              <p className="text-text/60 max-w-xl mx-auto">Learn what's recyclable while racing against the clock</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-primary/10 p-8 max-w-md mx-auto shadow-xl shadow-primary/5 motion-preset-pop motion-duration-700">
              <RecyclingGame items={content.game.items} />
              <Leaderboard scores={content.leaderboard} />
            </div>
          </div>
        </section>

        {/* About Preview Section */}
        <section className="px-4 py-24 relative" id="about-preview">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-6">
              About Terionix
            </div>

            <p className="text-lg sm:text-xl text-text/70 leading-relaxed mb-10 max-w-3xl mx-auto motion-preset-blur-up">
              {aboutPreview}
            </p>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:brightness-110 transition-all duration-300"
            >
              <span>{previewCta.label}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Footer decorative gradient */}
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      </main>
    </div>
  )
}
