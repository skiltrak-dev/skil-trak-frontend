import { Typography } from '@components'
type TalentPoolSectorCardProps = {
    active: any
    sectorName: any
    onClick: () => void
}
export const TalentPoolSectorCard = ({
    active,
    sectorName,
    onClick,
}: TalentPoolSectorCardProps) => {
    return (
        <div
            onClick={() => {
                if (onClick) {
                    onClick()
                }
            }}
            className={`cursor-pointer rounded-md p-2.5 shadow-lg ${
                active
                    ? 'bg-primaryNew'
                    : 'bg-white border border-secondary-dark '
            }`}
        >
            <div>
                <Typography variant="body" color="white">
                    Sector
                </Typography>
                <Typography variant="body" color="white">
                    {sectorName || 'N/A'}
                </Typography>
            </div>
            <div className="bg-white px-3 py-2 rounded-md text-[#24556D] font-medium">
                3
            </div>
        </div>
    )
}
