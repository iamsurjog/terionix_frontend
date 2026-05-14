import { Link, createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/careers')({ component: Careers })

function Careers() {
    return (
        <div className="font-sans text-text">
            <Navbar active="Careers in Terionix" />
            <main className="pt-32 pb-24 px-4 relative">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h1 className="font-title text-4xl sm:text-5xl font-bold text-text">
                        PAGE COMING SOON...
                    </h1>
                    <Link
                        to="/contact"
                        search={{ tab: 'career' }}
                        className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:brightness-110 transition-all"
                    >
                        Contact Us About Careers
                    </Link>
                </div>
            </main>
        </div>
    )
}
