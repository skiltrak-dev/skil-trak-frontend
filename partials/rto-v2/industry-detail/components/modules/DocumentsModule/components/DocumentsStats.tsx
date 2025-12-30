import { Card } from '@components'

interface DocumentsStatsProps {
    enabledCount: number
    totalCount: number
    mandatoryCount: number
    activeSector?: string
}

export function DocumentsStats({
    enabledCount,
    totalCount,
    mandatoryCount,
    activeSector,
}: DocumentsStatsProps) {
    const statsData = [
        {
            id: 'active-documents',
            label: 'Active Documents',
            value: enabledCount,
            subValue: `/${totalCount}`,
        },
        {
            id: 'mandatory',
            label: 'Mandatory',
            value: mandatoryCount,
        },
        {
            id: 'sector',
            label: 'Sector',
            value: activeSector,
            truncate: true,
        },
    ]
    return (
        <div className="grid grid-cols-3 gap-3">
            {statsData.map((stat) => (
                <Card
                    key={stat.id}
                    className="bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] p-3"
                >
                    <p className="text-[10px] font-medium text-[#64748B] mb-1 uppercase tracking-wide">
                        {stat.label}
                    </p>
                    <p
                        className={`font-bold text-[#1A2332] ${
                            stat.truncate ? 'text-sm truncate' : ''
                        }`}
                    >
                        {stat.value}
                        {stat.subValue && (
                            <span className="text-sm text-[#94A3B8]">
                                {stat.subValue}
                            </span>
                        )}
                    </p>
                </Card>
            ))}
        </div>
    )
}
