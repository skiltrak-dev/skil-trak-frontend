import { Building2, CheckCircle2, Clock, Plus, Download } from 'lucide-react'
import { Button } from '@components'

interface IndustryHeaderProps {
    totalIndustries: number
    verifiedIndustries: number
    pendingIndustries: number
    onAddIndustry: () => void
    onExport: () => void
}

export const IndustryHeader = ({
    totalIndustries,
    verifiedIndustries,
    pendingIndustries,
    onAddIndustry,
    onExport,
}: IndustryHeaderProps) => {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primaryNew/90 via-primaryNew to-primaryNew/90 p-6 shadow-premium-xl group/header">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-2xl"></div>

            <div className="relative flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary rounded-2xl blur-md opacity-50"></div>
                        <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center shadow-premium-lg backdrop-blur-sm border border-white/20">
                            <Building2
                                className="h-8 w-8 text-white"
                                strokeWidth={2.5}
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/0 to-white/20"></div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-1.5 text-white">
                            Industry Partners
                        </h1>
                        <p className="text-sm text-white/90 mb-2">
                            Manage workplace partners and placement
                            opportunities
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20">
                                <Building2 className="h-3 w-3 text-white" />
                                <span className="font-semibold text-white">
                                    {totalIndustries} Total
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20">
                                <CheckCircle2 className="h-3 w-3 text-white" />
                                <span className="font-semibold text-white">
                                    {verifiedIndustries} Verified
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20">
                                <Clock className="h-3 w-3 text-white" />
                                <span className="font-semibold text-white">
                                    {pendingIndustries} Pending
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="primaryNew"
                        outline
                        onClick={onExport}
                        text="Export"
                        Icon={Download}
                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
                    />
                    <Button
                        onClick={onAddIndustry}
                        text="Add Industry"
                        Icon={Plus}
                        variant="action"
                        // outline
                        // className="!bg-white "
                    />
                </div>
            </div>
        </div>
    )
}
