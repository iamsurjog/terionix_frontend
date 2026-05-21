import { useState } from 'react'
import { Link } from '@tanstack/react-router'

export function Navbar({ active, links, logo, siteName }: { active: string; links: { name: string; to: string }[]; logo: string; siteName: string }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-primary/10 motion-preset-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt={siteName} className="h-30 w-auto" />
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`relative px-4 py-2 font-sans text-sm font-medium rounded-full transition-all duration-300 ${
                active === link.name
                  ? 'text-white bg-primary shadow-lg shadow-primary/25'
                  : 'text-text/70 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-text hover:bg-primary/5 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>
      </div>

      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-t border-primary/10 px-4 pb-4 pt-2 space-y-1">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                active === link.name
                  ? 'text-white bg-primary shadow-lg shadow-primary/20'
                  : 'text-text/70 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
