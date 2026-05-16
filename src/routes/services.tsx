import { Navbar } from '#/components/Navbar'
import { createFileRoute } from '@tanstack/react-router'
import { readContent } from '#/lib/content'

export const Route = createFileRoute('/services')({
  loader: async () => readContent(),
  component: Services,
})

function Services() {
  const content = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <Navbar active="Services & Solutions" links={content.navbar.links} logo={content.site.logo} siteName={content.site.name} />
      <main className="pt-32 pb-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-title text-4xl sm:text-5xl font-bold text-text">
            {content.services.heading}
          </h1>
        </div>
      </main>
    </div>
  )
}
