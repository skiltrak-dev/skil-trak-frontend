import { Typography } from '@components'
import { IndustryApi } from '@queries'
type TalentPoolSectorCardProps = {
    active: any
    sectorName: any
    onClick: () => void
    count: any
}
export const TalentPoolSectorCard = ({
    active,
    sectorName,
    onClick,
    count,
}: TalentPoolSectorCardProps) => {
    return (
        <div
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            className={`cursor-pointer rounded-md p-2.5 shadow-lg flex justify-between ${
                active
                    ? 'bg-primaryNew'
                    : 'bg-white border border-secondary-dark '
            }`}
        >
            <div>
                <Typography
                    variant="body"
                    color={`${active ? 'text-white' : ''}`}
                >
                    Sector
                </Typography>
                <Typography
                    variant="body"
                    color={`${active ? 'text-white' : ''}`}
                >
                    {sectorName || 'N/A'}
                </Typography>
            </div>
            <div className="bg-white px-3 border py-2 rounded-md text-center text-[#24556D] font-medium">
                {count}
            </div>
        </div>
    )
}
