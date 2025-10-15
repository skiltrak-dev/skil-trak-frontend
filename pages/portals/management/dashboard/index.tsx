import { GlobalModal, NoData, Typography } from '@components'
import { ManagementLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement, useState } from 'react'

import {
    AddNewTeamCard,
    AddNewTeamMemberModal,
    CreateNewTeamModal,
    OverallKpiCard,
    StateSummaryCard,
    TeamCard,
} from '@partials/management'
import { ManagementApi } from '@queries'
import { useRouter } from 'next/router'

const ManagementDashboard: NextPageWithLayout = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [teamId, setTeamId] = useState<any>(undefined)
    const dashboardCount = ManagementApi.CheckKpi.useManagementDashboardCount()
    const statusBasedCount = ManagementApi.CheckKpi.useKpiStatusBasedCount()
    const [createTeam, createTeamResult] = ManagementApi.Team.useCreateTeam()
    const {
        data: teamList,
        isLoading,
        isError,
        isFetching,
    } = ManagementApi.Team.useTeamList()
    const countData = [
        {
            title: 'Total Team',
            count: dashboardCount?.data?.teams,
            percentage: '+5%',
        },
        {
            title: 'Team Members',
            count: dashboardCount?.data?.members,
            percentage: '+20%',
        },
        {
            title: 'Total Sectors',
            count: dashboardCount?.data?.sectors,
            // percentage: '+5%',
        },
        {
            title: 'Total KPIs',
            count: dashboardCount?.data?.kpis,
            // percentage: '+5%',
        },
        {
            title: 'Total Students',
            count: dashboardCount?.data?.students,
            // percentage: '+5%',
        },
    ]
    const [createTeamMember, createTeamMembersResult] =
        ManagementApi.Team.useCreateTeamMembers()

    // useCreateTeamMembers
    const router = useRouter()
    const onCancel = () => {
        setModal(null)
    }

    const onAddNewMember = () => {
        // if (applyForTalentPoolResult.isSuccess) {
        setModal(
            <GlobalModal>
                <AddNewTeamMemberModal onCancel={onCancel} teamId={teamId} />
            </GlobalModal>
        )
        // }
    }

    const onChangeTeamLead = () => {
        // if (applyForTalentPoolResult.isSuccess) {
        setModal(
            <GlobalModal>
                <CreateNewTeamModal
                    onAddNewMember={onAddNewMember}
                    onCancel={onCancel}
                />
            </GlobalModal>
        )
        // }
    }

    return (
        <>
            {modal && modal}
            <div className="bg-white/80 px-4 pt-5 pb-8 rounded-lg w-full">
                <div className="mb-5">
                    <Typography
                        variant="title"
                        color="text-primaryNew"
                        extraBold
                    >
                        Overview
                    </Typography>
                </div>
                <div className="flex items-center gap-x-6">
                    {countData?.map((item, index) => (
                        <div key={item.title} className="w-full">
                            <StateSummaryCard
                                title={item.title}
                                count={item.count}
                                percentage={item.percentage}
                                index={index}
                                loading={dashboardCount.isLoading}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Teams */}
            <div className="flex gap-x-4 justify-between">
                {isError && <NoData text="Something is not right" />}
                <div className="w-2/3 h-screen">
                    <div className="bg-white/80 px-4 py-5 rounded-md overflow-auto custom-scrollbar !h-[calc(100%-340px)]">
                        <div className="pb-5 flex items-center justify-between">
                            <Typography
                                variant="label"
                                bold
                                color="text-primaryNew"
                            >
                                Teams
                            </Typography>
                            <button
                                onClick={onChangeTeamLead}
                                className="text-blue-500 font-medium text-sm uppercase underline"
                            >
                                + add new team
                            </button>
                        </div>
                        {teamList && teamList.length < 9 ? (
                            <div className="grid grid-cols-3 gap-y-4 gap-x-6">
                                <>
                                    {teamList?.map((team: any) => (
                                        <div key={team?.id}>
                                            <TeamCard team={team} />
                                        </div>
                                    ))}
                                    {Array.from({
                                        length: 9 - teamList.length,
                                    }).map((_, index) => (
                                        <div key={`add-new-${index}`}>
                                            <AddNewTeamCard
                                                onChangeTeamLead={
                                                    onChangeTeamLead
                                                }
                                            />
                                        </div>
                                    ))}
                                </>
                            </div>
                        ) : (
                            !isError && <NoData text="No Team Found" />
                        )}
                    </div>
                </div>
                {/* Overall KPIs */}
                <div className="w-1/3 bg-white/80 px-4 py-5 rounded-lg h-[342px]">
                    <div className="flex items-center justify-between pb-5">
                        <Typography
                            variant="label"
                            bold
                            color="text-primaryNew"
                        >
                            Overall KPIs
                        </Typography>
                        {/* <Link
                                href={'/portals/management/upload-report'}
                                className="text-blue-500 font-medium text-sm uppercase underline"
                            >
                                + Create New kpi
                            </Link> */}
                    </div>
                    <OverallKpiCard
                        title="Workplace Request"
                        totalKpi={statusBasedCount?.data?.placementStarted?.all}
                        kpiDoubling={
                            statusBasedCount?.data?.placementStarted?.duplicated
                        }
                    />
                    {/* agreementUploaded */}
                    <OverallKpiCard
                        title="Agreements uploaded"
                        totalKpi={
                            statusBasedCount?.data?.agreementUploaded?.all
                        }
                        kpiDoubling={
                            statusBasedCount?.data?.agreementUploaded
                                ?.duplicated
                        }
                    />
                    {/* studentProvided */}
                    <OverallKpiCard
                        title="Student own workplace"
                        totalKpi={statusBasedCount?.data?.studentProvided?.all}
                        kpiDoubling={
                            statusBasedCount?.data?.studentProvided?.duplicated
                        }
                    />
                    {/* appointment */}
                    <OverallKpiCard
                        title="Appointment booked"
                        totalKpi={statusBasedCount?.data?.appointment?.all}
                        kpiDoubling={
                            statusBasedCount?.data?.appointment?.duplicated
                        }
                    />
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

ManagementDashboard.getLayout = (page: ReactElement) => {
    return <ManagementLayout>{page}</ManagementLayout>
}

export default ManagementDashboard
