import { useState, useRef, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { gsap } from 'gsap'

export function Navbar({ active, links, logo, siteName }: { active: string; links: { name: string; to: string }[]; logo: string; siteName: string }) {
    const [open, setOpen] = useState(false)
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

            // Animate them all together at the exact same moment
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

    return (
        <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-primary/5 motion-preset-fade">
            <div ref={glowRef} className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
                <Link to="/" ref={logoRef} className="flex items-center gap-2 group">
                    <img src={logo} alt={siteName} className="h-30 w-auto drop-shadow-glow group-hover:drop-shadow-glow-strong transition-all duration-500" />
                </Link>

                <div className="hidden sm:flex items-center gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            className={`nav-link relative px-4 py-2 font-sans text-sm font-medium rounded-full transition-all duration-300 ${active === link.name
                                    ? 'text-white bg-gradient-to-r from-primary to-primary-deep shadow-lg shadow-primary/30'
                                    : 'text-text/60 hover:text-primary hover:bg-primary/5'
                                }`}
                        >
                            {active === link.name && (
                                <span className="absolute inset-0 rounded-full animate-pulse bg-primary/20" style={{ animationDuration: '2s' }} />
                            )}
                            <span className="relative z-10">{link.name}</span>
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
                className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-background/95 backdrop-blur-2xl border-t border-primary/10 px-4 pb-4 pt-2 space-y-1">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${active === link.name
                                    ? 'text-white bg-gradient-to-r from-primary to-primary-deep shadow-lg shadow-primary/20'
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
