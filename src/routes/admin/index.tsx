import { createFileRoute } from '@tanstack/react-router'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'

export const Route = createFileRoute('/admin/')({
  loader: async () => readContent(),
  component: AdminDashboard,
})

const sections = [
  { key: 'home', label: 'Home', desc: 'Landing page heading and section', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { key: 'about', label: 'About Us', desc: 'About page content and links', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { key: 'services', label: 'Services & Solutions', desc: 'Services page content', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { key: 'history', label: 'Our History', desc: 'History page content', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { key: 'about-recycling', label: 'About Recycling', desc: 'About recycling page content', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { key: 'careers', label: 'Careers', desc: 'Job categories, roles, and why Terionix', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { key: 'contact', label: 'Contact Us', desc: 'Contact form fields and segments', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { key: 'game', label: 'Recycling Game', desc: 'Game items and leaderboard', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
]

function AdminDashboard() {
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Home" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 motion-preset-slide-up">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-1 bg-accent rounded-full" />
              <span className="w-16 h-1 bg-primary/30 rounded-full" />
            </div>
            <h1 className="font-title text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-text/60">Edit website content. Changes are saved to content.json.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((s, i) => (
              <a
                key={s.key}
                href={`/admin/${s.key}`}
                className="group block p-6 rounded-2xl border border-primary/10 bg-white/40 backdrop-blur-sm hover:border-primary/30 hover:bg-white/60 hover:shadow-xl transition-all duration-500 motion-preset-slide-up motion-delay-${(i + 1) * 100}"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-title text-lg font-bold text-text group-hover:text-primary transition-colors">{s.label}</h2>
                    <p className="text-sm text-text/60 mt-1">{s.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
