import { Button } from '@components'

interface SectorTabsProps {
    sectors: string[]
    activeSector: string
    onSectorChange: (sector: string) => void
}

export function SectorTabs({
    sectors,
    activeSector,
    onSectorChange,
}: SectorTabsProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {sectors.map((sector) => (
                <Button
                    key={sector}
                    onClick={() => onSectorChange(sector)}
                    variant={'primaryNew'}
                    outline={activeSector !== sector}
                    className="!py-1.5 !rounded-sm"
                >
                    {sector}
                </Button>
            ))}
        </div>
    )
}
