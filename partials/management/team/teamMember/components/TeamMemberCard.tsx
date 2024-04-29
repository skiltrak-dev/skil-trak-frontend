import { GlobalModal, Typography } from '@components'
import Image from 'next/image'
import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'
import { TeamMemberAvatar } from './TeamMemberAvatar'
import { useRouter } from 'next/router'
import { DashedCountCard } from '@partials/management/components'
import { ChangeTeamLeadModal } from '../../modal/ChangeTeamLeadModal'

export const TeamMemberCard = ({ member }: any) => {
    console.log('data:::', member)

    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)
    const onCancel = () => {
        setModal(null)
    }
    const onChangeTeamLead = () => {
        // if (applyForTalentPoolResult.isSuccess) {
        setModal(
            <GlobalModal>
                <ChangeTeamLeadModal onCancel={onCancel} />
            </GlobalModal>
        )
        // }
    }
    return (
        <>
            {modal && modal}
            <div className="rounded-2xl bg-white px-6 py-4">
                <div className="flex flex-col justify-center items-center gap-y-5">
                    {/* Avatar */}
                    <TeamMemberAvatar
                        name={member?.subadmin?.user?.name}
                        avatarUrl={member?.subadmin?.user?.avatar}
                        isLead={member?.isLead}
                        // teamId={}
                        onChangeTeamLead={onChangeTeamLead}
                    />
                    <div className="flex items-center gap-x-2 w-full">
                        <DashedCountCard
                            title="Total KPI"
                            subtitle={member?.kpiReportsCount || 0}
                            align="center"
                        />
                        <DashedCountCard
                            title="KPI Doubling"
                            subtitle={member?.kpiDuplicationsCount || 0}
                            align="center"
                        />
                    </div>
                    <Link
                        href={`/portals/management/teams/members/${member.id}`}
                        className="text-blue-400 text-sm mt-3"
                    >
                        View All Details-&gt;
                    </Link>
                </div>
                {/* Kpis Record */}
                {/* <div className="mt-5">
                <Typography variant="small" color="text-primaryNew" bold>
                    KPIs Record
                </Typography>
                <div className="grid grid-cols-2 gap-2.5 mt-1.5">
                    <KpiRecordCount
                        title="Workplace Request"
                        count={17500}
                        classes={
                            'flex-row justify-between items-center gap-x-12'
                        }
                    />
                    <KpiRecordCount
                        title="Agreements uploaded"
                        count={17500}
                        classes={
                            'flex-row justify-between items-center gap-x-12'
                        }
                    />
                    <KpiRecordCount
                        title="Student own workplace"
                        count={17500}
                        classes={
                            'flex-row justify-between items-center gap-x-12'
                        }
                    />
                    <KpiRecordCount
                        title="Appointment booked"
                        count={17500}
                        classes={
                            'flex-row justify-between items-center gap-x-12'
                        }
                    />
                </div>
            </div> */}
            </div>
        </>
    )
}
