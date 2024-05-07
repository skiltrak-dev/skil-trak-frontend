import { Typography } from '@components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { DeleteKpiReportModal } from '../modal'
import { MdDeleteOutline } from 'react-icons/md'

export const KpiReportCard = ({ report }: any) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const onCancel = () => {
        setModal(null)
    }
    const onDeleteKpiReport = () => {
        setModal(<DeleteKpiReportModal item={report} onCancel={onCancel} />)
    }
    return (
        <>
            {modal && modal}
            <div className="border-2 border-dashed rounded-md bg-[#F8F8FF] py-4 px-3 w-full">
                <div className="border-2 border-dashed rounded-md px-4 py-1.5">
                    <div className="flex items-center justify-between mb-2">
                        <Typography variant="small" color="text-primaryNew">
                            KPI Date:
                        </Typography>
                        <div
                            className="cursor-pointer delete-icon"
                            onClick={onDeleteKpiReport}
                        >
                            <MdDeleteOutline className="text-red-400" />
                        </div>
                    </div>
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
        </>
    )
}
