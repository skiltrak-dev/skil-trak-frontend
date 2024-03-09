import { Card, Typography } from '@components'
import { TalentPoolSectorCard } from './TalentPoolSectorCard'
import { IndustryApi } from '@queries'
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
    const countBySector = IndustryApi.TalentPool.useTalentPoolCountBySector()
    if (!selectedSector && sectorsList && sectorsList.length > 0) {
        onSelectSector(sectorsList[0])
    }
    const count = countBySector && countBySector.data ? countBySector.data : {}
    return (
        <div className="">
            <Card noPadding>
                <div className="px-4 pt-5 pb-4 border-b mb-6">
                    <Typography variant="title">Sectors</Typography>
                </div>
                <div className="pb-4 md:h-[44rem]">
                    <div className="px-4 flex flex-col gap-y-2.5 overflow-auto custom-scrollbar pb-2">
                        {sectorsList?.map((sector: any) => (
                            <TalentPoolSectorCard
                                sectorName={sector?.name}
                                count={count[sector?.name] || 0}
                                active={selectedSector?.id === sector?.id}
                                onClick={() => onSelectSector(sector)}
                            />
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    )
}
