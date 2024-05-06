import { Typography } from '@components'
import { DashedCountCard } from '@partials/management/components'
import Link from 'next/link'
import React, { useState, ReactElement } from 'react'
import { DeleteTeamModal } from '../modal'
import { MdDeleteOutline } from 'react-icons/md'

export const TeamCard = ({ team }: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const onCancel = () => {
        setModal(null)
    }
    const onDeleteTeam = () => {
        setModal(<DeleteTeamModal item={team} onCancel={onCancel} />)
    }
    return (
        <>
        {modal && modal}
            <div className="p-4 bg-white rounded-2xl shadow-md flex flex-col gap-y-2.5">
                <div className="flex items-center justify-between">
                    <Typography variant="small" bold>
                        {team?.name || 'N/A'}
                    </Typography>
                    <div className="cursor-pointer" onClick={onDeleteTeam}>
                        <MdDeleteOutline className="text-red-400" />
                    </div>
                </div>
                <div className="flex items-center gap-x-1">
                    <Typography variant="small">Team Members :</Typography>
                    <Typography variant="small" bold>
                        {team?.membersCount || 0}
                    </Typography>
                </div>

                <div className="bg-[#F5F4FF] border-2 border-dashed px-3 py-2 rounded-md">
                    <Typography variant="small" color="text-primaryNew" bold>
                        {team?.members?.[0]?.subadmin?.user?.name ||
                            'No member added yet'}
                    </Typography>

                    <Typography variant="small" color="text-[#25516C]">
                        {team?.members && team?.members?.length > 0
                            ? 'TEAM LEAD'
                            : '-'}
                    </Typography>
                </div>

                <div className="flex items-center gap-x-2 w-full">
                    <DashedCountCard
                        title="Team KPI"
                        subtitle={team?.members?.[0]?.kpiReportsCount || 0}
                        align="center"
                    />
                    <DashedCountCard
                        title="KPI Doubling"
                        subtitle={
                            team?.members?.[0]?.kpiReportsCount
                                ?.kpiDuplicationsCount || 0
                        }
                        align="center"
                    />
                </div>

                <Link
                    href={`/portals/management/teams/${team?.id}`}
                    className="text-blue-400 text-sm mt-3"
                >
                    View All Details-&gt;
                </Link>
            </div>
        </>
    )
}
