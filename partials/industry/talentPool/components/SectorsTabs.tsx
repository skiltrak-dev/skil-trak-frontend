import { Typography } from '@components'
import { TalentPoolSectorCard } from './TalentPoolSectorCard'

type SectorsTabsProps = {
    sectorsList: any
    selectedSector: any
    onSelectSector: any
}

export const SectorsTabs = ({
    sectorsList,
    selectedSector,
    onSelectSector,
}: SectorsTabsProps) => {
    return (
        <div>
            <div className="px-4">
                <div className="mb-4 mt-2">
                    <Typography variant="label" medium>
                        Sectors
                    </Typography>
                </div>
                <div className="flex flex-col gap-y-2.5 h-[80%] overflow-auto custom-scrollbar pb-2">
                    {sectorsList?.map((sector: any) => (
                        <TalentPoolSectorCard
                            sectorName={sector?.name}
                            active={selectedSector?.id === sector?.id}
                            onClick={() => onSelectSector(sector)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
