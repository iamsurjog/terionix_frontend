import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import content from '#/content.json'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
    return (
        <div className="font-sans text-text">
            <Navbar active="Home" />
            <main className="pt-32 pb-24 px-4 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-title text-4xl sm:text-5xl font-bold text-text">
                        {content.home.heading}
                    </h1>
                </div>
            </main>
        </div>
    )
}
