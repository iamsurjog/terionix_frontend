import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: About })

const navLinks = ['Home', 'About', 'Services', 'Contact']

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo_big.png" alt="Terionix" className="h-30 w-auto" />
        </div>
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-sans text-sm font-medium text-text/70 hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all"
            >
              {link}
            </a>
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

function About() {
  return (
    <div className="font-sans text-text">
      <Navbar />
      <main className="pt-32 pb-24 px-4 relative">
        <div className="absolute top-40 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-secondary rounded-full" />
            <span className="w-16 h-1 bg-primary/30 rounded-full" />
          </div>
          <h1 className="font-title text-5xl sm:text-6xl font-bold text-text mb-8">
            About <span className="text-primary">Us</span>
          </h1>
          <div className="space-y-6 text-text/70 leading-relaxed text-lg">
            <p className="relative pl-6 border-l-4 border-secondary">
              <span className="text-accent font-semibold">Lorem ipsum</span> dolor sit amet, consectetur adipiscing
              elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
              vitae dicta sunt explicabo.
            </p>
            <p>
              <span className="text-secondary font-semibold">Nemo enim ipsam</span> voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
              sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
              aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
              quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#"
              className="bg-primary text-white font-sans font-semibold px-6 py-2.5 rounded-lg hover:brightness-110 transition-all"
            >
              Get in Touch
            </a>
            <a
              href="#"
              className="bg-secondary text-white font-sans font-semibold px-6 py-2.5 rounded-lg hover:brightness-110 transition-all"
            >
              Our Services
            </a>
            <a
              href="#"
              className="border-2 border-accent text-accent font-sans font-semibold px-6 py-2.5 rounded-lg hover:bg-accent hover:text-white transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
