import { Card } from '@components'
import {
    Building2,
    MapPin,
    Globe,
    Mail,
    Phone,
    User,
    ExternalLink,
    Info,
} from 'lucide-react'

interface QuickSummaryProps {
    data: {
        organizationName: string
        tradingName?: string
        abn: string
        industrySector: string
        address: string
        website: string
        email: string
        phone: string
        primaryContact: string
        bio: string
    }
}

export function QuickSummary({ data }: QuickSummaryProps) {
    return (
        <div className="space-y-6">
            {/* Organization Info */}
            <Card className="shadow-xl border-2 border-[#044866]/10 hover:shadow-2xl hover:border-[#044866]/20 transition-all overflow-hidden">
                <div className="bg-gradient-to-r from-[#044866]/5 via-[#0D5468]/5 to-[#044866]/5 px-6 py-4 border-b-2 border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#044866] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-[#044866] mb-0.5 truncate">
                                {data.organizationName}
                            </h3>
                            {data.tradingName && (
                                <p className="text-sm text-slate-600">
                                    Trading as: {data.tradingName}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <div className="space-y-5">
                        {/* Bio */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <p className="text-sm text-slate-700 leading-relaxed">
                                {data.bio}
                            </p>
                        </div>

                        {/* Key Details Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="w-8 h-8 bg-[#044866]/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Building2 className="w-4 h-4 text-[#0D5468]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-slate-500 mb-1">
                                        Industry Sector
                                    </div>
                                    <div className="text-sm text-slate-900">
                                        {data.industrySector}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="w-8 h-8 bg-[#044866]/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Building2 className="w-4 h-4 text-[#0D5468]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-slate-500 mb-1">
                                        ABN
                                    </div>
                                    <div className="text-sm text-slate-900">
                                        {data.abn}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="w-8 h-8 bg-[#044866]/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <MapPin className="w-4 h-4 text-[#0D5468]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-slate-500 mb-1">
                                        Address
                                    </div>
                                    <div className="text-sm text-slate-900">
                                        {data.address}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="w-8 h-8 bg-[#044866]/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Globe className="w-4 h-4 text-[#0D5468]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-slate-500 mb-1">
                                        Website
                                    </div>
                                    <a
                                        href={data.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[#044866] hover:underline inline-flex items-center gap-1"
                                    >
                                        Visit Website
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="w-8 h-8 bg-[#044866]/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <User className="w-4 h-4 text-[#0D5468]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-slate-500 mb-1">
                                        Primary Contact
                                    </div>
                                    <div className="text-sm text-slate-900">
                                        {data.primaryContact}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="w-8 h-8 bg-[#044866]/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Phone className="w-4 h-4 text-[#0D5468]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-slate-500 mb-1">
                                        Phone
                                    </div>
                                    <div className="text-sm text-slate-900">
                                        {data.phone}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors sm:col-span-2">
                                <div className="w-8 h-8 bg-[#044866]/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Mail className="w-4 h-4 text-[#0D5468]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-slate-500 mb-1">
                                        Email
                                    </div>
                                    <a
                                        href={`mailto:${data.email}`}
                                        className="text-sm text-[#044866] hover:underline break-all"
                                    >
                                        {data.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Important Note */}
            <Card className="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-2 border-amber-300 shadow-md">
                <div className="pt-5 pb-5">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30">
                            <Info className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-amber-900 mb-2">
                                Important: Website Note
                            </h4>
                            <p className="text-sm text-amber-900 leading-relaxed">
                                Organization websites may not always be fully
                                updated. Base your decision on the{' '}
                                <strong>full evidence in this account</strong>,
                                including compliance checklists and verified
                                documentation, not solely on the website.
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
