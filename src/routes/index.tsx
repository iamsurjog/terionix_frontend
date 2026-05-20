import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { readContent } from '#/lib/content'
import { RecyclingGame, Leaderboard } from '#/components/RecyclingGame'

export const Route = createFileRoute('/')({
  loader: async () => readContent(),
  component: Home,
})

function Home() {
  const content = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <Navbar active="Home" links={content.navbar.links} logo={content.site.logo} siteName={content.site.name} />
      <main className="pt-32 pb-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-title text-4xl sm:text-5xl font-bold text-text mb-4">
            {content.home.heading}
          </h1>
          <div className="mt-16 bg-white/50 rounded-2xl border border-primary/10 p-8 max-w-md mx-auto">
            <RecyclingGame items={content.game.items} />
            <Leaderboard scores={content.leaderboard} />
          </div>
        </div>
      </main>
    </div>
  )
}