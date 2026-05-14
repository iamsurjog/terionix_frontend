import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/careers')({ component: Careers })

function Careers() {
    return (
        <div className="font-sans text-text">
            <Navbar active="Careers in Terionix" />
            <main className="pt-32 pb-24 px-4 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-title text-4xl sm:text-5xl font-bold text-text">
                        PAGE COMING SOON...
                    </h1>
                </div>
            </main>
        </div>
    )
}
