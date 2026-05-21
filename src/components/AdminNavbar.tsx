import { useState } from 'react'
import { logout } from '#/lib/auth'
import { useNavigate } from '@tanstack/react-router'

export function AdminNavbar({ active, links, logo, siteName }: { active: string; links: { name: string; to: string }[]; logo: string; siteName: string }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/admin/login' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt={siteName} className="h-30 w-auto" />
          <div className="w-px h-8 bg-primary/20" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent motion-preset-pulse" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Admin</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.name}
              href={`/admin${link.to}`}
              className={`px-4 py-2 font-sans text-sm font-medium rounded-full transition-all duration-300 ${
                active === link.name
                  ? 'text-white bg-primary shadow-lg shadow-primary/25'
                  : 'text-text/70 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/admin/game"
            className={`px-4 py-2 font-sans text-sm font-medium rounded-full transition-all duration-300 ${
              active === 'Recycling Game'
                ? 'text-white bg-primary shadow-lg shadow-primary/25'
                : 'text-text/70 hover:text-primary hover:bg-primary/5'
            }`}
          >
            Game
          </a>
          <a
            href="/admin/json"
            className={`px-4 py-2 font-sans text-sm font-medium rounded-full transition-all duration-300 ${
              active === 'JSON'
                ? 'text-white bg-primary shadow-lg shadow-primary/25'
                : 'text-text/70 hover:text-primary hover:bg-primary/5'
            }`}
          >
            JSON
          </a>
          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 font-sans text-sm font-medium rounded-full text-red-500 hover:bg-red-50 transition-all"
          >
            Logout
          </button>
        </div>

        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors px-2 py-1"
          >
            Logout
          </button>
          <button onClick={() => setOpen(!open)} className="relative w-10 h-10 flex items-center justify-center rounded-lg text-text hover:bg-primary/5 transition-colors" aria-label="Toggle menu">
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      <div className={`sm:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-background/95 backdrop-blur-xl border-t border-primary/10 px-4 pb-4 pt-2 space-y-1">
          {links.map((link) => (
            <a key={link.name} href={`/admin${link.to}`} onClick={() => setOpen(false)}
              className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                active === link.name ? 'text-white bg-primary shadow-lg shadow-primary/20' : 'text-text/70 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a href="/admin/game" onClick={() => setOpen(false)}
            className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${active === 'Recycling Game' ? 'text-white bg-primary shadow-lg shadow-primary/20' : 'text-text/70 hover:text-primary hover:bg-primary/5'}`}
          >
            Game
          </a>
          <a href="/admin/json" onClick={() => setOpen(false)}
            className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${active === 'JSON' ? 'text-white bg-primary shadow-lg shadow-primary/20' : 'text-text/70 hover:text-primary hover:bg-primary/5'}`}
          >
            JSON
          </a>
        </div>
      </div>
    </nav>
  )
}
