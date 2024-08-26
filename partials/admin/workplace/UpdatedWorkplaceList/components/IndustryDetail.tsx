import { Typography } from '@components'
import { ellipsisText } from '@utils'
import Link from 'next/link'
import React from 'react'

export const IndustryDetail = ({ industries }: { industries: any }) => {
    const appliedIndustry = industries.find(
        (industry: any) => industry?.applied
    )

    return (
        <>
            {appliedIndustry ? (
                <>
                    <div
                        title={appliedIndustry?.industry?.user?.name}
                        className="bg-white px-3 py-1.5 rounded-md border border-[#128C7E]"
                    >
                        <Typography variant="small" bold>
                            {ellipsisText(
                                appliedIndustry?.industry?.user?.name,
                                30
                            )}
                        </Typography>
                    </div>
                    <Link
                        href={`/portals/admin/industry/${appliedIndustry?.industry?.id}`}
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
