import { Typography } from '@components'
import { ellipsisText } from '@utils'
import Link from 'next/link'
import React from 'react'

export const IndustryDetail = ({
    industries,
    workplaceApprovaleRequest,
}: {
    workplaceApprovaleRequest: any
    industries: any
}) => {
    const appliedIndustry = industries.find(
        (industry: any) => industry?.applied
    )

    return (
        <>
            {appliedIndustry ||
            (workplaceApprovaleRequest &&
                workplaceApprovaleRequest?.length > 0) ? (
                <>
                    {appliedIndustry?.isAutomated && (
                        <div className="bg-success rounded px-1 py-0.5 w-fit mb-0.5">
                            <Typography variant="xs" color="text-white">
                                Auto
                            </Typography>
                        </div>
                    )}
                    <div
                        title={appliedIndustry?.industry?.user?.name}
                        className="bg-white px-3 py-1.5 rounded-md border border-[#128C7E]"
                    >
                        <Typography variant="small" bold>
                            {ellipsisText(
                                appliedIndustry?.industry?.user?.name ||
                                    workplaceApprovaleRequest?.[0]?.industry
                                        ?.user?.name,
                                30
                            )}
                        </Typography>
                    </div>
                    <Link
                        href={`/portals/admin/industry/${
                            appliedIndustry?.industry?.id ||
                            workplaceApprovaleRequest?.[0]?.industry?.id
                        }`}
                        className="text-blue-500 text-xs"
                    >
                        View Details
                    </Link>
                </>
            ) : (
                <Typography variant="small" semibold>
                    N/A
                </Typography>
            )}
        </>
    )
}
