import { Badge, Card } from '@components'
import {
    FileText,
    Image as ImageIcon,
    Construction,
    Download,
} from 'lucide-react'

export function ResourcesView() {
    const resources = [
        {
            id: 1,
            name: 'Sunnydale Care Services Brochure 2025',
            type: 'PDF',
            size: '2.4 MB',
            uploadDate: '20 October 2025',
            category: 'Organization Materials',
        },
        {
            id: 2,
            name: 'Aged Care Programs Overview',
            type: 'PDF',
            size: '1.8 MB',
            uploadDate: '20 October 2025',
            category: 'Program Information',
        },
        {
            id: 3,
            name: 'Facility Photos - Main Care Center',
            type: 'Images (5)',
            size: '8.2 MB',
            uploadDate: '22 October 2025',
            category: 'Facility Images',
        },
        {
            id: 4,
            name: 'WHS Policy Document',
            type: 'PDF',
            size: '1.2 MB',
            uploadDate: '15 October 2025',
            category: 'Compliance Documents',
        },
    ]

    const categoryColors: Record<string, string> = {
        'Organization Materials': 'bg-blue-100 text-blue-700',
        'Program Information': 'bg-purple-100 text-purple-700',
        'Facility Images': 'bg-emerald-100 text-emerald-700',
        'Compliance Documents': 'bg-amber-100 text-amber-700',
    }

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30 animate-scale-in">
                        <Construction className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-amber-900 mb-2">
                            Feature Rolling Out Soon
                        </h3>
                        <p className="text-sm text-amber-800 leading-relaxed">
                            SkilTrak is deploying a dedicated resources folder
                            for Industry Accounts. Once available, host
                            employers and RTOs can store and view supporting
                            materials including brochures, facility photos, and
                            program documentation.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="border-2 border-slate-100">
                <div className="bg-slate-50">
                    <div className="text-[#044866] flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Preview: Available Resources
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                        Example resources that will be accessible once this
                        feature is fully deployed
                    </p>
                </div>
                <div className="pt-5">
                    <div className="space-y-3">
                        {resources.map((resource) => (
                            <div
                                key={resource.id}
                                className="group flex items-center justify-between p-4 border-2 border-slate-100 rounded-lg hover:border-[#044866]/20 hover:bg-slate-50 transition-all"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 bg-[#044866]/5 rounded-lg flex items-center justify-center group-hover:bg-[#044866]/10 transition-colors">
                                        {resource.category ===
                                        'Facility Images' ? (
                                            <ImageIcon className="w-5 h-5 text-[#044866]" />
                                        ) : (
                                            <FileText className="w-5 h-5 text-[#044866]" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-slate-900 mb-1">
                                            {resource.name}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {resource.type} • {resource.size} •
                                            Uploaded {resource.uploadDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge
                                        className={
                                            categoryColors[resource.category] ||
                                            'bg-slate-100 text-slate-700'
                                        }
                                        text={resource.category}
                                    ></Badge>
                                    <button
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors opacity-50 cursor-not-allowed"
                                        disabled
                                    >
                                        <Download className="w-4 h-4 text-slate-400" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-blue-50 border-2 border-blue-200">
                    <div className="pt-5">
                        <h4 className="text-sm text-blue-900 mb-2">
                            Using Additional Resources
                        </h4>
                        <p className="text-sm text-blue-800 leading-relaxed">
                            When available, these resources should be considered
                            alongside formal checklists and placement
                            requirements when assessing workplace suitability.
                        </p>
                    </div>
                </Card>

                <Card className="bg-purple-50 border-2 border-purple-200">
                    <div className="pt-5">
                        <h4 className="text-sm text-purple-900 mb-2">
                            Privacy & Confidentiality
                        </h4>
                        <p className="text-sm text-purple-800 leading-relaxed">
                            All materials are subject to privacy requirements.
                            No identifiable client information is included in
                            any uploaded documents.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
