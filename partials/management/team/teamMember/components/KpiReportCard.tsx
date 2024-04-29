import { Typography } from '@components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const KpiReportCard = ({ report }: any) => {
    const router = useRouter()
    return (
        <div className="border-2 border-dashed rounded-md bg-[#F8F8FF] py-4 px-3 w-full">
            <div className="border-2 border-dashed rounded-md px-4 py-1.5">
                <Typography variant="small" color="text-primaryNew">
                    KPI Date:
                </Typography>
                <div className="whitespace-nowrap">
                    <Typography
                        variant="small"
                        color="text-primaryNew"
                        semibold
                    >
                        {report?.from} - {report?.to}
                    </Typography>
                </div>
            </div>
            <div className="flex justify-center">
                <Link
                    href={`/portals/management/teams/members/${router.query.memberId}/${report?.id}`}
                    className="text-blue-400 text-xs mt-3"
                >
                    View All Details-&gt;
                </Link>
            </div>
        </div>
    )
}
