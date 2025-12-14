import { Card } from '@components'

interface DocumentsStatsProps {
    enabledCount: number
    totalCount: number
    mandatoryCount: number
    activeSector: string
}

export function DocumentsStats({
    enabledCount,
    totalCount,
    mandatoryCount,
    activeSector,
}: DocumentsStatsProps) {
    return (
        <div className="grid grid-cols-3 gap-3">
            <Card className="bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] p-3">
                <p className="text-[10px] font-medium text-[#64748B] mb-1 uppercase tracking-wide">
                    Active Documents
                </p>
                <p className="font-bold text-[#1A2332]">
                    {enabledCount}
                    <span className="text-sm text-[#94A3B8]">
                        /{totalCount}
                    </span>
                </p>
            </Card>
            <Card className="bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] p-3">
                <p className="text-[10px] font-medium text-[#64748B] mb-1 uppercase tracking-wide">
                    Mandatory
                </p>
                <p className="font-bold text-[#1A2332]">{mandatoryCount}</p>
            </Card>
            <Card className="bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] p-3">
                <p className="text-[10px] font-medium text-[#64748B] mb-1 uppercase tracking-wide">
                    Sector
                </p>
                <p className="font-bold text-[#1A2332] text-sm truncate">
                    {activeSector}
                </p>
            </Card>
        </div>
    )
}
