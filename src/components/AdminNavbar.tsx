import { useState } from 'react'

export function AdminNavbar({ active, links, logo, siteName }: { active: string; links: { name: string; to: string }[]; logo: string; siteName: string }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt={siteName} className="h-30 w-auto" />
        </div>
        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={`/admin${link.to}`}
              className={`font-sans text-sm font-medium transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all ${
                active === link.name
                  ? 'text-primary after:w-full'
                  : 'text-text/70 hover:text-primary'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a href="/admin/game" className={`font-sans text-sm font-medium ${active === 'Recycling Game' ? 'text-primary' : 'text-text/70 hover:text-primary'}`}>
            Game
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="sm:hidden text-text">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>
      {open && (
        <div className="sm:hidden bg-background/95 border-t border-primary/10 px-4 pb-4 space-y-1">
          {links.map((link) => (
            <a key={link.name} href={`/admin${link.to}`} onClick={() => setOpen(false)}
              className={`block py-2 px-3 rounded-lg text-sm font-medium ${
                active === link.name ? 'text-primary bg-primary/5' : 'text-text/70 hover:text-primary'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a href="/admin/game" onClick={() => setOpen(false)}
            className={`block py-2 px-3 rounded-lg text-sm font-medium ${active === 'Recycling Game' ? 'text-primary bg-primary/5' : 'text-text/70'}`}>
            Game
          </a>
        </div>
      )}
    </nav>
  )
}
