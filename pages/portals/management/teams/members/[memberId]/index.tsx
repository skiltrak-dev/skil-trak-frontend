import {
    GlobalModal,
    ManagementNavbar,
    NoData,
    Typography,
    LoadingAnimation,
    TechnicalError,
} from '@components'
import { ManagementLayout } from '@layouts'
import {
    ChangeTeamLeadModal,
    CreateKpiTargetModal,
    KpiProgressCard,
    KpiRecordCount,
    KpiReportCards,
    SwitchMemberTeamModal,
    TeamMemberAvatar,
    TeamSideBar,
    UploadKpiModal,
} from '@partials/management'
import { ManagementApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { PuffLoader } from 'react-spinners'

const MemberDetailPage: NextPageWithLayout = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const router = useRouter()
    const memberId = router?.query?.memberId
    // useKpiTargets
    const kpiTargetsList = ManagementApi.CheckKpi.useKpiTargets(memberId, {
        skip: !memberId,
    })
    const { data, isLoading, isError } = ManagementApi.Team.useTeamMemberDetail(
        memberId,
        {
            skip: !memberId,
        }
    )
    const onCancel = () => {
        setModal(null)
    }

    const onCreateNewKpi = () => {
        // if (applyForTalentPoolResult.isSuccess) {
        setModal(
            <GlobalModal>
                <div className="overflow-auto remove-scrollbar">
                    <UploadKpiModal
                        onCancel={onCancel}
                        member={data?.subadmin?.id}
                    />
                </div>
            </GlobalModal>
        )
        // }
    }
    const onCreateKpiTarget = () => {
        // if (applyForTalentPoolResult.isSuccess) {
        setModal(
            <GlobalModal>
                <div className="overflow-auto remove-scrollbar">
                    <CreateKpiTargetModal onCancel={onCancel} />
                </div>
            </GlobalModal>
        )
    }
    const kpiCountData = [
        {
            title: 'Workplace Requests',
            count: data?.placementStarted || 0,
            classes: 'flex-row justify-between items-center gap-x-12',
        },
        {
            title: 'Agreements uploaded',
            count: data?.agreementUploaded || 0,
            classes: 'flex-row justify-between items-center gap-x-12',
        },
        {
            title: 'Student own workplace',
            count: data?.studentProvided || 0,
            classes: 'flex-row justify-between items-center gap-x-12',
        },
        {
            title: 'Appointment booked',
            count: data?.appointments || 0,
            classes: 'flex-row justify-between items-center gap-x-12',
        },
    ]
    const onSwitchMemberTeam = () => {
        // if (applyForTalentPoolResult.isSuccess) {
        setModal(
            <GlobalModal>
                <SwitchMemberTeamModal onCancel={onCancel} />
            </GlobalModal>
        )
        // }
    }

    return (
        <>
            {modal && modal}
            <div className=" bg-white/80 rounded-lg py-6 px-5 w-full">
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation />
                ) : data && Object.keys(data)?.length > 0 ? (
                    <div className="container mx-auto flex gap-x-5">
                        <div className="flex flex-col gap-x-4 gap-y-4 w-full">
                            {isLoading ? (
                                <PuffLoader />
                            ) : (
                                <TeamSideBar>
                                    <div className="flex gap-x-12 items-center justify-between">
                                        <TeamSideBar.Avatar>
                                            <TeamMemberAvatar
                                                name={
                                                    data?.subadmin?.user?.name
                                                }
                                                // isLead={data?.isLead}
                                                avatarUrl={
                                                    data?.subadmin?.user?.avatar
                                                }
                                                onSwitchMemberTeam={
                                                    onSwitchMemberTeam
                                                }
                                            />
                                        </TeamSideBar.Avatar>
                                        <div>
                                            <TeamSideBar.Title>
                                                <div className="flex justify-between items-center mb-4">
                                                    <Typography
                                                        variant="label"
                                                        color="text-primaryNew"
                                                        bold
                                                    >
                                                        Total KPIs Record
                                                    </Typography>
                                                    <button
                                                        onClick={onCreateNewKpi}
                                                        className="text-blue-500 font-medium text-sm uppercase underline"
                                                    >
                                                        + Create New kpi
                                                    </button>
                                                </div>
                                            </TeamSideBar.Title>
                                            <TeamSideBar.KpiCountCard>
                                                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                                    {kpiCountData.map(
                                                        (item) => (
                                                            <div
                                                                key={
                                                                    item?.title
                                                                }
                                                            >
                                                                <KpiRecordCount
                                                                    title={
                                                                        item.title
                                                                    }
                                                                    count={
                                                                        item.count
                                                                    }
                                                                    classes={
                                                                        item.classes
                                                                    }
                                                                    loading={
                                                                        isLoading
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </TeamSideBar.KpiCountCard>
                                        </div>
                                    </div>
                                </TeamSideBar>
                            )}
                            <KpiReportCards id={data?.subadmin?.id} />
                        </div>
                        {/* CreateKpiTargetModal */}
                        <div className="w-full">
                            <div className="flex items-center w-full justify-between mb-2">
                                <Typography
                                    variant="label"
                                    color="text-primaryNew"
                                    semibold
                                >
                                    KPIs Progress
                                </Typography>
                                {kpiTargetsList?.data?.length < 4 && (
                                    <button
                                        onClick={onCreateKpiTarget}
                                        className="text-blue-500 font-medium text-sm uppercase underline"
                                    >
                                        + Create KPI Target
                                    </button>
                                )}
                            </div>
                            {kpiTargetsList.isLoading ? (
                                <>
                                    <PuffLoader />
                                </>
                            ) : kpiTargetsList?.data &&
                              kpiTargetsList?.data?.length > 0 ? (
                                <div className={`grid grid-cols-2 gap-2.5`}>
                                    {kpiTargetsList?.data?.map((item: any) => (
                                        <>
                                            <KpiProgressCard
                                                achieved={
                                                    item?.status ===
                                                    'appointment'
                                                        ? data?.appointments
                                                        : item?.status ===
                                                          'placementStarted'
                                                        ? data?.placementStarted
                                                        : item?.status ===
                                                          'agreementUploaded'
                                                        ? data?.agreementUploaded
                                                        : data?.studentProvided
                                                }
                                                data={item}
                                            />
                                        </>
                                    ))}
                                </div>
                            ) : (
                                !kpiTargetsList.isError && (
                                    <div className="w-full py-36 px-20 bg-white rounded-xl h-[27rem]">
                                        <NoData text="No Data Found" />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ) : (
                    !isError && <NoData text={'No Data Found'} />
                )}
            </div>
        </>
    )
}
MemberDetailPage.getLayout = (page: ReactElement) => {
    return <ManagementLayout>{page}</ManagementLayout>
}
export default MemberDetailPage
