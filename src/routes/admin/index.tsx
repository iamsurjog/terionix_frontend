import { createFileRoute } from '@tanstack/react-router'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'

export const Route = createFileRoute('/admin/')({
  loader: async () => readContent(),
  component: AdminDashboard,
})

const sections = [
  { key: 'home', label: 'Home', desc: 'Landing page heading and section' },
  { key: 'about', label: 'About Us', desc: 'About page content and links' },
  { key: 'services', label: 'Services & Solutions', desc: 'Services page content' },
  { key: 'history', label: 'Our History', desc: 'History page content' },
  { key: 'about-recycling', label: 'About Recycling', desc: 'About recycling page content' },
  { key: 'careers', label: 'Careers', desc: 'Job categories, roles, and why Terionix' },
  { key: 'contact', label: 'Contact Us', desc: 'Contact form fields and segments' },
  { key: 'game', label: 'Recycling Game', desc: 'Game items and leaderboard' },
]

function AdminDashboard() {
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Home" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-title text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-text/60 mb-10">Edit website content. Changes are saved to content.json.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((s) => (
              <a
                key={s.key}
                href={`/admin/${s.key}`}
                className="block p-5 rounded-xl border border-primary/10 bg-white/50 hover:border-primary/30 hover:bg-white/80 transition-all"
              >
                <h2 className="font-title text-lg font-bold text-primary capitalize">{s.label}</h2>
                <p className="text-sm text-text/60 mt-1">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
