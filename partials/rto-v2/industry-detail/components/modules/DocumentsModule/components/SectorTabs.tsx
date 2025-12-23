import { Button, Typography } from '@components'

interface SectorTabsProps {
    sectors: { id: number; name: string }[]
    activeSector: number | null
    onSectorChange: (sectorId: number) => void
}

export function SectorTabs({
    sectors,
    activeSector,
    onSectorChange,
}: SectorTabsProps) {
    return (
        <div>
            <Typography variant={'label'} color={'text-gray-700'}>
                Sectors
            </Typography>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {sectors.map((sector) => (
                    <Button
                        key={sector.id}
                        onClick={() => onSectorChange(sector.id)}
                        variant={'primaryNew'}
                        outline={activeSector !== sector.id}
                        className="!py-1.5 !rounded-sm"
                    >
                        {sector.name}
                    </Button>
                ))}
            </div>
        </div>
    )
}
