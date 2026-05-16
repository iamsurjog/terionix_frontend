import { Link } from '@tanstack/react-router'

export function Navbar({ active, links, logo, siteName }: { active: string; links: { name: string; to: string }[]; logo: string; siteName: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt={siteName} className="h-30 w-auto" />
        </div>
        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`font-sans text-sm font-medium transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all ${
                active === link.name
                  ? 'text-primary after:w-full'
                  : 'text-text/70 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <button className="sm:hidden text-text">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
