import { Navbar } from '#/components/Navbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services')({
  component: Services,
})

function Services() {
    return (
        <div className="font-sans text-text">
            <Navbar active="Services & Solutions" />
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
