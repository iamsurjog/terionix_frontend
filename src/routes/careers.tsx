import { Link, createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'

export const Route = createFileRoute('/careers')({ component: Careers })

const jobCategories = [
    {
        title: 'Collection & Logistics',
        slug: 'collection-logistics',
        roles: [
            'E-Waste Collection Staff – pickup from clients, households, and businesses.',
            'Reverse Logistics Coordinator – manage routes, transport scheduling.',
            'Driver / Vehicle Operator – safe transport of e-waste materials.',
            'Field Coordinator – liaison with collection centres and clients.',
        ],
    },
    {
        title: 'Sorting & Processing',
        slug: 'sorting-processing',
        roles: [
            'Sorting Operator – segregate metals, plastics, PCBs, batteries, etc.',
            'Disassembly Technician – dismantle electronics safely.',
            'Hazardous Waste Handler – manage batteries, CRTs, fluorescent lamps.',
            'Recycling Plant Operator – oversee shredding, crushing, and refining.',
        ],
    },
    {
        title: 'Technical & IT',
        slug: 'technical-it',
        roles: [
            'Data Destruction Specialist – ensure secure erasure/shredding of hard drives.',
            'Asset Recovery Technician – test and refurbish reusable electronics.',
            'IT Hardware Technician – repair and resell usable devices.',
            'Inventory & Tracking Executive – maintain digital records of collected/recycled items.',
        ],
    },
    {
        title: 'Compliance & Certification',
        slug: 'compliance-certification',
        roles: [
            'EHS (Environment, Health & Safety) Officer – ensure safety standards.',
            'Compliance Manager – handle e-waste rules, documentation, CPCB/SPCB licenses.',
            'Certification Officer – issue recycling/disposal certificates to clients.',
        ],
    },
    {
        title: 'Business & Operations',
        slug: 'business-operations',
        roles: [
            'Operations Manager – oversee plant, staff, and workflow.',
            'Procurement Officer – source tools, machinery, and consumables.',
            'Business Development Executive – generate leads for e-waste collection.',
            'Client Relationship Manager – maintain B2B client satisfaction.',
        ],
    },
    {
        title: 'Sales & Marketing',
        slug: 'sales-marketing',
        roles: [
            'EPR Consultant – help producers comply with Extended Producer Responsibility.',
            'Sales Executive – corporate tie-ups for bulk e-waste disposal.',
            'Marketing Coordinator – awareness campaigns, online/offline promotions.',
            'CSR Coordinator – manage community and corporate social responsibility programs.',
        ],
    },
    {
        title: 'Research & Innovation',
        slug: 'research-innovation',
        roles: [
            'R&D Specialist – new recycling technologies, material recovery.',
            'Sustainability Analyst – measure environmental impact, carbon savings.',
            'Circular Economy Consultant – explore reuse/resell opportunities.',
        ],
    },
    {
        title: 'Administration & Support',
        slug: 'admin-support',
        roles: [
            'HR Executive – recruit and train staff.',
            'Accounts & Finance Officer – billing, payroll, tax compliance.',
            'Customer Support Executive – handle client inquiries.',
            'Office Administrator – manage documentation and day-to-day tasks.',
        ],
    },
]

function Careers() {
    return (
        <div className="font-sans text-text">
            <Navbar active="Careers in Terionix" />
            <main className="pt-32 pb-24 px-4 relative">
                <div className="absolute top-40 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-secondary rounded-full" />
                        <span className="w-16 h-1 bg-primary/30 rounded-full" />
                    </div>
                    <h1 className="font-title text-5xl sm:text-6xl font-bold text-text mb-4">
                        Careers at <span className="text-primary">Terionix</span>
                    </h1>
                    <p className="text-lg text-text/60 max-w-2xl mb-12">
                        Join us in building a sustainable future through responsible e-waste management.
                        Explore open positions across our teams.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                        {jobCategories.map((cat) => (
                            <div
                                key={cat.title}
                                className="bg-white/50 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <h2 className="font-title text-xl font-bold text-primary">
                                        {cat.title}
                                    </h2>
                                    <Link
                                        to="/contact"
                                        search={{ tab: 'career', position: cat.slug }}
                                        className="shrink-0 text-xs font-semibold text-white bg-accent px-4 py-1.5 rounded-lg hover:brightness-110 transition-all"
                                    >
                                        Apply
                                    </Link>
                                </div>
                                <ul className="space-y-2">
                                    {cat.roles.map((role) => (
                                        <li key={role} className="text-sm text-text/70 leading-relaxed">
                                            {role}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-text/60 mb-4">
                            Don't see the right fit? Reach out to us — we're always looking for talent.
                        </p>
                        <Link
                            to="/contact"
                            search={{ tab: 'career', position: undefined }}
                            className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:brightness-110 transition-all"
                        >
                            Apply Now
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
