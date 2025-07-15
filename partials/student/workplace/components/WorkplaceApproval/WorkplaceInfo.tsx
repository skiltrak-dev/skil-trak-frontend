import { Typography } from '@components'

export const WorkplaceInfo = ({
    industry,
    direction,
}: {
    direction?: string
    industry: any
}) => {
    return (
        <div className="flex flex-col h-full">
            <Typography variant="label" medium>
                Workplace Information
            </Typography>
            <div
                className={`border border-[#D5D5D5] rounded-[10px] px-2.5 py-2 flex ${
                    direction ? direction : 'flex-col'
                }  gap-y-[11px] flex-grow`}
            >
                <div>
                    <Typography variant="small" semibold color="text-[#24556D]">
                        Name
                    </Typography>
                    <Typography variant="small" semibold color="text-[#24556D]">
                        {industry?.industry?.user?.name}
                    </Typography>
                </div>
                <div>
                    <Typography variant="small" semibold color="text-[#24556D]">
                        Address
                    </Typography>
                    <Typography variant="small" semibold color="text-[#24556D]">
                        {!industry?.location
                            ? industry?.industry?.addressLine1
                            : industry?.location?.address}
                    </Typography>
                </div>
                <div>
                    <Typography variant="small" semibold color="text-[#24556D]">
                        Website
                    </Typography>
                    <Typography variant="xs" color="text-[#24556D]">
                        {industry?.location
                            ? industry?.industry?.website || '---'
                            : industry?.website || '---'}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
