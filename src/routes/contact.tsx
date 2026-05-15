import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/contact')({
    component: ContactUs,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            tab: search.tab as string | undefined,
            position: search.position as string | undefined,
        }
    },
})

const tabs = ['General Inquiry', 'Career']

function ContactUs() {
    const { tab, position } = Route.useSearch()
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        if (tab === 'career') setActiveTab(1)
    }, [tab])

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
                    {activeTab === 1 && <CareerForm preselectedPosition={position} />}
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

const categoryToFirstPosition: Record<string, string> = {
    'collection-logistics': 'e-waste-collection-staff',
    'sorting-processing': 'sorting-operator',
    'technical-it': 'data-destruction-specialist',
    'compliance-certification': 'ehs-officer',
    'business-operations': 'operations-manager',
    'sales-marketing': 'epr-consultant',
    'research-innovation': 'rd-specialist',
    'admin-support': 'hr-executive',
}

function CareerForm({ preselectedPosition }: { preselectedPosition?: string }) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const defaultPosition = preselectedPosition
        ? categoryToFirstPosition[preselectedPosition] || ''
        : ''

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
                    defaultValue={defaultPosition}
                    className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white/50 focus:bg-white focus:border-primary outline-none transition-colors"
                >
                    <option value="">Select a position</option>
                    <optgroup label="Collection & Logistics">
                        <option value="e-waste-collection-staff">E-Waste Collection Staff</option>
                        <option value="reverse-logistics-coordinator">Reverse Logistics Coordinator</option>
                        <option value="driver-vehicle-operator">Driver / Vehicle Operator</option>
                        <option value="field-coordinator">Field Coordinator</option>
                    </optgroup>
                    <optgroup label="Sorting & Processing">
                        <option value="sorting-operator">Sorting Operator</option>
                        <option value="disassembly-technician">Disassembly Technician</option>
                        <option value="hazardous-waste-handler">Hazardous Waste Handler</option>
                        <option value="recycling-plant-operator">Recycling Plant Operator</option>
                    </optgroup>
                    <optgroup label="Technical & IT">
                        <option value="data-destruction-specialist">Data Destruction Specialist</option>
                        <option value="asset-recovery-technician">Asset Recovery Technician</option>
                        <option value="it-hardware-technician">IT Hardware Technician</option>
                        <option value="inventory-tracking-executive">Inventory & Tracking Executive</option>
                    </optgroup>
                    <optgroup label="Compliance & Certification">
                        <option value="ehs-officer">EHS (Environment, Health & Safety) Officer</option>
                        <option value="compliance-manager">Compliance Manager</option>
                        <option value="certification-officer">Certification Officer</option>
                    </optgroup>
                    <optgroup label="Business & Operations">
                        <option value="operations-manager">Operations Manager</option>
                        <option value="procurement-officer">Procurement Officer</option>
                        <option value="business-development-executive">Business Development Executive</option>
                        <option value="client-relationship-manager">Client Relationship Manager</option>
                    </optgroup>
                    <optgroup label="Sales & Marketing">
                        <option value="epr-consultant">EPR Consultant</option>
                        <option value="sales-executive">Sales Executive</option>
                        <option value="marketing-coordinator">Marketing Coordinator</option>
                        <option value="csr-coordinator">CSR Coordinator</option>
                    </optgroup>
                    <optgroup label="Research & Innovation">
                        <option value="rd-specialist">R&D Specialist</option>
                        <option value="sustainability-analyst">Sustainability Analyst</option>
                        <option value="circular-economy-consultant">Circular Economy Consultant</option>
                    </optgroup>
                    <optgroup label="Administration & Support">
                        <option value="hr-executive">HR Executive</option>
                        <option value="accounts-finance-officer">Accounts & Finance Officer</option>
                        <option value="customer-support-executive">Customer Support Executive</option>
                        <option value="office-administrator">Office Administrator</option>
                    </optgroup>
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
