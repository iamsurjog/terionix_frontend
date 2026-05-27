import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { readContent } from '#/lib/content'
import { RecyclingGame, Leaderboard } from '#/components/RecyclingGame'
import { ImpactCalculator } from '#/components/ImpactCalculator'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const Route = createFileRoute('/')({
  loader: async () => readContent(),
  component: Home,
})

function AnimatedHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('.word')
    gsap.fromTo(words,
      { opacity: 0, y: 30, rotateX: -40 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: 'back.out(1.4)',
      }
    )
  }, [])

  return (
    <h1 ref={ref} className="font-title text-5xl sm:text-7xl lg:text-8xl font-bold text-text mb-6 leading-[1.1]">
      {text.split(' ').map((word, i) => (
        <span key={i} className="word inline-block mr-[0.3rem]">{word}</span>
      ))}
    </h1>
  )
}

function Home() {
  const content = Route.useLoaderData()!
  const { tagline, heroTitle, heroSubtitle, partnerButton, challengeButton, matrixCards, trustStats, authorization, impactCalculator } = content.home
  const gameRef = useRef<HTMLDivElement>(null)

  const handleB2CClick = () => {
    gameRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="font-sans text-text">
      <Navbar active="/" links={content.navbar.links} cta={content.navbar.cta} logo={content.site.logo} siteName={content.site.name} />

      <main className="relative overflow-hidden">
        {/* ====== 1. HERO SECTION ====== */}
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="absolute inset-0 -z-10">
            <div className="aurora-bg">
              <div className="aurora-wave bg-primary/10" style={{ top: '-50%', left: '-30%', animationDelay: '0s' }} />
              <div className="aurora-wave bg-secondary/8" style={{ top: '-30%', right: '-20%', animationDelay: '-4s' }} />
              <div className="aurora-wave bg-accent/6" style={{ bottom: '-40%', left: '10%', animationDelay: '-8s' }} />
            </div>
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl motion-preset-float motion-duration-4000" />
            <div className="absolute bottom-40 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl motion-preset-float motion-duration-5000 motion-delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl motion-preset-pulse motion-duration-6000" />
          </div>

          <div className="max-w-5xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 motion-preset-slide-up motion-duration-700">
              <span className="w-2 h-2 rounded-full bg-primary motion-preset-pulse" />
              {tagline}
            </div>

            <AnimatedHeading text={heroTitle} />

            <p className="text-lg sm:text-xl text-text/60 max-w-2xl mx-auto mb-10 motion-preset-slide-up motion-duration-700 motion-delay-200 font-light">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 justify-center motion-preset-slide-up motion-duration-700 motion-delay-300">
              {/* Partner with Us — B2B */}
              <Link
                to={partnerButton.href}
                className="group relative font-sans font-semibold px-8 py-3.5 rounded-xl bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {partnerButton.label}
                </span>
                <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              {/* Take the E-Waste Challenge — B2C */}
              <button
                onClick={handleB2CClick}
                className="group relative font-sans font-semibold px-8 py-3.5 rounded-xl border-2 border-accent text-accent hover:bg-accent hover:text-white shadow-lg shadow-accent/10 hover:shadow-accent/25 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {challengeButton.label}
                </span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-preset-bounce motion-duration-2000 motion-loop-infinite">
            <svg className="w-6 h-6 text-text/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* ====== 2. MATRIX GRID — 3 VALUE PILLARS ====== */}
        <section className="px-4 py-24 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 motion-preset-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
                Our Core Pillars
              </div>
              <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
                Built on <span className="text-gradient">Trust & Innovation</span>
              </h2>
              <p className="text-text/60 max-w-2xl mx-auto">Three pillars that define every aspect of our e-waste management services.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {matrixCards.map((card: any, i: number) => (
                <div
                  key={i}
                  className="group bg-white/40 backdrop-blur-sm rounded-2xl border border-primary/10 p-8 hover:border-primary/30 hover:bg-white/60 hover:shadow-xl transition-all duration-500 card-hover motion-preset-slide-up"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 
                    ${i === 0 ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white' : ''}
                    ${i === 1 ? 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white' : ''}
                    ${i === 2 ? 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white' : ''}
                  `}>
                    {card.icon === 'shield' && (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    )}
                    {card.icon === 'lock' && (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    )}
                    {card.icon === 'cpu' && (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                      </svg>
                    )}
                  </div>

                  <h3 className="font-title text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-text/60 leading-relaxed mb-6 text-sm">{card.description}</p>

                  {/* Stat badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                    ${i === 0 ? 'bg-primary/10 text-primary' : ''}
                    ${i === 1 ? 'bg-secondary/10 text-secondary' : ''}
                    ${i === 2 ? 'bg-accent/10 text-accent' : ''}
                  `}>
                    {card.statIcon === 'check' && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                    {card.statIcon === 'shield' && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    )}
                    {card.statIcon === 'trending' && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                    )}
                    {card.stat}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== 3. AUTHORIZATION & TRUST ANCHOR ====== */}
        <section className="px-4 py-20 relative">
          <div className="absolute top-0 left-0 right-0 section-divider" />

          <div className="max-w-5xl mx-auto">
            {/* TNPCB Authorization */}
            <div className="text-center mb-16 motion-preset-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified & Certified
              </div>
              <h2 className="font-title text-2xl sm:text-3xl font-bold text-text mb-4">{authorization.title}</h2>
              <p className="text-text/60 max-w-3xl mx-auto leading-relaxed">{authorization.description}</p>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 motion-preset-slide-up motion-delay-200">
              {trustStats.map((stat: any, i: number) => (
                <div
                  key={i}
                  className="bg-white/40 backdrop-blur-sm rounded-2xl border border-primary/10 p-6 text-center hover:border-primary/20 hover:bg-white/60 transition-all duration-300 card-hover"
                >
                  <div className="font-title text-3xl sm:text-4xl font-bold text-gradient-green mb-1">{stat.value}</div>
                  <div className="text-xs text-text/40 font-medium uppercase tracking-wider">{stat.unit}</div>
                  <div className="text-sm text-text/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== 4. E-WASTE IMPACT CALCULATOR ====== */}
        <section className="px-4 py-24 relative">
          <div className="absolute top-0 left-0 right-0 section-divider" />
          <div className="absolute bottom-40 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

          <div className="max-w-5xl mx-auto motion-preset-slide-up">
            <ImpactCalculator
              title={impactCalculator.title}
              description={impactCalculator.description}
              items={impactCalculator.items}
            />
          </div>
        </section>

        {/* ====== 5. GAMIFIED CHALLENGE — RECYCLING GAME ====== */}
        <section ref={gameRef} className="px-4 py-24 relative scroll-mt-24" id="game-section">
          <div className="absolute top-0 left-0 right-0 section-divider" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 motion-preset-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Take the E-Waste Challenge
              </div>
              <h2 className="font-title text-3xl sm:text-4xl font-bold text-text mb-4">
                Test Your <span className="text-gradient">Recycling IQ</span>
              </h2>
              <p className="text-text/60 max-w-xl mx-auto">Learn what's recyclable while racing against the clock. Complete the challenge and schedule a cleanup drive.</p>
            </div>

            <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-primary/10 p-8 max-w-md mx-auto shadow-2xl shadow-primary/5 motion-preset-pop motion-duration-700 card-hover">
              <RecyclingGame items={content.game.items} />
              <Leaderboard scores={content.leaderboard} />
            </div>

            {/* Post-game CTA hint */}
            <div className="text-center mt-8 text-sm text-text/40 motion-preset-fade">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Complete the challenge and schedule a free household e-waste pickup
              </span>
            </div>
          </div>
        </section>

        {/* ====== FOOTER ====== */}
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 blur-sm" />
        </div>

        <footer className="bg-background/80 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <img src={content.site.logo} alt={content.site.name} className="h-20 w-auto mb-4" />
                <p className="text-text/50 text-sm leading-relaxed max-w-md">
                  Responsible e-waste management for a sustainable future. TNPCB authorized, CPCB compliant.
                </p>
              </div>
              <div>
                <h4 className="font-title font-bold text-text text-sm mb-3 uppercase tracking-wider">Quick Links</h4>
                <div className="space-y-2">
                  {content.navbar.links.map((link: any) => (
                    <div key={link.name}>
                      {link.children?.map((child: any) => (
                        <Link key={child.name} to={child.to} className="block text-sm text-text/50 hover:text-primary transition-colors">
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-title font-bold text-text text-sm mb-3 uppercase tracking-wider">Contact</h4>
                <div className="space-y-2 text-sm text-text/50">
                  <p>Tamil Nadu, India</p>
                  <Link to="/contact" className="block text-primary hover:text-primary-deep transition-colors font-medium">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-primary/10 pt-6 text-center">
              <p className="text-xs text-text/30">
                &copy; {new Date().getFullYear()} Terionix. All rights reserved. — Where Circuits Bloom.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
