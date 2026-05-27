import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { gsap } from 'gsap'

interface ChildLink {
  name: string
  to: string
}

interface NavLink {
  name: string
  type: 'link' | 'dropdown'
  to?: string
  children?: ChildLink[]
}

interface CtaConfig {
  label: string
  to: string
}

export function Navbar({
  active,
  links,
  cta,
  logo,
  siteName,
}: {
  active: string
  links: NavLink[]
  cta?: CtaConfig
  logo: string
  siteName: string
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const location = useLocation()
  const logoRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    }

    if (navRef.current) {
      const linkEls = navRef.current.querySelectorAll<HTMLAnchorElement>('.nav-link')
      gsap.fromTo(linkEls,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power2.out' }
      )
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: [0.3, 0.6, 0.3],
        duration: 3,
        repeat: -1,
        ease: 'sine.inOut',
      })
    }
  }, [])

  const isChildActive = (children?: ChildLink[]) => {
    if (!children) return false
    return children.some((child) => active === child.to || location.pathname === child.to)
  }

  const isAnyDropdownActive = (link: NavLink) => {
    if (link.type === 'dropdown' && link.children) {
      return isChildActive(link.children)
    }
    return active === link.to || location.pathname === link.to
  }

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-primary/5 motion-preset-fade">
      <div ref={glowRef} className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        <Link to="/" ref={logoRef} className="flex items-center gap-2 group shrink-0">
          <img src={logo} alt={siteName} className="h-30 w-auto drop-shadow-glow group-hover:drop-shadow-glow-strong transition-all duration-500" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) =>
            link.type === 'dropdown' && link.children ? (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(link.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`nav-link relative px-4 py-2 font-sans text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                    isAnyDropdownActive(link)
                      ? 'text-white bg-gradient-to-r from-primary to-primary-deep shadow-lg shadow-primary/30'
                      : 'text-text/60 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <svg
                    className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  {isAnyDropdownActive(link) && (
                    <span className="absolute inset-0 rounded-full animate-pulse bg-primary/20" style={{ animationDuration: '2s' }} />
                  )}
                </button>

                {/* Dropdown panel */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                    openDropdown === link.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
                  }`}
                >
                  <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-primary/10 shadow-2xl shadow-primary/10 py-2 min-w-[200px] overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
                    {link.children.map((child, ci) => (
                      <Link
                        key={child.name}
                        to={child.to}
                        className={`block px-5 py-2.5 font-sans text-sm transition-all duration-200 ${
                          active === child.to
                            ? 'text-primary font-semibold bg-primary/5'
                            : 'text-text/70 hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1 h-1 rounded-full transition-all duration-200 ${
                            active === child.to ? 'bg-primary scale-150' : 'bg-transparent'
                          }`} />
                          {child.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.to!}
                className={`nav-link relative px-4 py-2 font-sans text-sm font-medium rounded-full transition-all duration-300 ${
                  active === link.to
                    ? 'text-white bg-gradient-to-r from-primary to-primary-deep shadow-lg shadow-primary/30'
                    : 'text-text/60 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {active === link.to && (
                  <span className="absolute inset-0 rounded-full animate-pulse bg-primary/20" style={{ animationDuration: '2s' }} />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            )
          )}

          {/* CTA Button */}
          {cta && (
            <Link
              to={cta.to}
              className="ml-3 nav-link relative font-sans font-semibold text-sm px-5 py-2.5 rounded-full bg-accent text-white hover:brightness-110 shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                {cta.label}
              </span>
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-text hover:bg-primary/5 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-background/95 backdrop-blur-2xl border-t border-primary/10 px-4 pb-4 pt-2 space-y-1">
          {links.map((link) =>
            link.type === 'dropdown' && link.children ? (
              <MobileDropdownItem
                key={link.name}
                link={link}
                active={active}
                onClose={() => setMobileOpen(false)}
              />
            ) : (
              <Link
                key={link.name}
                to={link.to!}
                onClick={() => setMobileOpen(false)}
                className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                  active === link.to
                    ? 'text-white bg-gradient-to-r from-primary to-primary-deep shadow-lg shadow-primary/20'
                    : 'text-text/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.name}
              </Link>
            )
          )}

          {/* Mobile CTA */}
          {cta && (
            <Link
              to={cta.to}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 px-4 rounded-xl text-sm font-semibold text-center text-white bg-accent shadow-lg shadow-accent/25 hover:brightness-110 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                {cta.label}
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

function MobileDropdownItem({ link, active, onClose }: { link: NavLink; active: string; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const location = useLocation()
  const hasActiveChild = link.children?.some((c) => active === c.to || location.pathname === c.to)

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center justify-between py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
          hasActiveChild
            ? 'text-primary bg-primary/5'
            : 'text-text/70 hover:text-primary hover:bg-primary/5'
        }`}
      >
        <span>{link.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="ml-4 pl-3 border-l-2 border-primary/10 space-y-0.5 py-1">
          {link.children?.map((child) => (
            <Link
              key={child.name}
              to={child.to}
              onClick={onClose}
              className={`block py-2 px-4 rounded-lg text-sm transition-all ${
                active === child.to
                  ? 'text-primary font-semibold bg-primary/5'
                  : 'text-text/60 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {child.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
