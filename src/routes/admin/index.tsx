import { createFileRoute } from '@tanstack/react-router'
import { AdminNavbar } from '#/components/AdminNavbar'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

const sections = [
  { key: 'home', label: 'Home', desc: 'Landing page heading' },
  { key: 'about', label: 'About', desc: 'About page content and CTA' },
  { key: 'history', label: 'History', desc: 'Our History page content' },
  { key: 'services', label: 'Services', desc: 'Services page heading' },
  { key: 'careers', label: 'Careers', desc: 'Job categories and roles' },
  { key: 'contact', label: 'Contact', desc: 'Form fields, tabs, and positions' },
]

function AdminDashboard() {
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Home" />
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
