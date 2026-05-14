import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/contact')({ component: ContactUs })

const tabs = ['General Inquiry', 'Career']

function ContactUs() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className="font-sans text-text">
            <Navbar active="Contact Us" />
            <main className="pt-32 pb-24 px-4 relative">
                <div className="absolute top-40 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-secondary rounded-full" />
                        <span className="w-16 h-1 bg-primary/30 rounded-full" />
                    </div>
                    <h1 className="font-title text-5xl sm:text-6xl font-bold text-text mb-8">
                        Contact <span className="text-primary">Us</span>
                    </h1>

                    <div className="flex border-b border-primary/20 mb-8">
                        {tabs.map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(i)}
                                className={`px-6 py-3 font-semibold text-sm transition-all relative ${
                                    activeTab === i
                                        ? 'text-primary'
                                        : 'text-text/50 hover:text-text/80'
                                }`}
                            >
                                {tab}
                                {activeTab === i && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {activeTab === 0 && <GeneralForm />}
                    {activeTab === 1 && <CareerForm />}
                </div>
            </main>
        </div>
    )
}

function GeneralForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">Name</label>
                <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">Email</label>
                <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">Subject</label>
                <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">Message</label>
                <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors resize-y"
                />
            </div>
            <button
                type="submit"
                className="bg-primary text-white font-semibold px-8 py-2.5 rounded-lg hover:brightness-110 transition-all"
            >
                Send Message
            </button>
        </form>
    )
}

function CareerForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">Name</label>
                <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">Email</label>
                <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">Phone</label>
                <input
                    type="tel"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">Position Interested In</label>
                <select
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors"
                >
                    <option value="">Select a position</option>
                    <option value="software-engineer">Software Engineer</option>
                    <option value="data-scientist">Data Scientist</option>
                    <option value="devops">DevOps Engineer</option>
                    <option value="product-manager">Product Manager</option>
                    <option value="designer">UI/UX Designer</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">Resume</label>
                <input
                    type="file"
                    accept=".pdf"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary file:font-semibold file:text-sm hover:file:bg-primary/20"
                />
                <p className="text-xs text-text/50 mt-1">PDF files only</p>
            </div>
            <div>
                <label className="block text-sm font-semibold text-text/80 mb-1.5">Cover Letter</label>
                <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors resize-y"
                />
            </div>
            <button
                type="submit"
                className="bg-accent text-white font-semibold px-8 py-2.5 rounded-lg hover:brightness-110 transition-all"
            >
                Submit Application
            </button>
        </form>
    )
}
