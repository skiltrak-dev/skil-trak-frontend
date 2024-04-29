import { GlobalModal, ManagementNavbar, Typography } from '@components'
import { ManagementLayout } from '@layouts'
import {
    ChangeTeamLeadModal,
    CheckKpi,
    FirstTimeStudent,
    KpiProgressCard,
    KpiRecordCount,
    KpiReportCards,
    KpiResultsCard,
    StudentDuplication,
    TeamMemberAvatar,
    TeamSideBar,
    UploadKpiModal,
} from '@partials/management'
import { ManagementApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { camelToKebabCase } from '@utils'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type TabOption = 'firstTimeStudent' | 'studentDuplication'

const ReportDetailPage: NextPageWithLayout = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [filter, setFilter] = useState(undefined)
    const router = useRouter()
    const reportId = router?.query?.reportId
    const memberId = router.query.memberId

    const [activeTab, setActiveTab] = useState<TabOption>('firstTimeStudent')

    // Function to handle tab change
    const handleTabChange = (tab: any) => {
        setActiveTab(tab)
        router.push(
            {
                pathname:
                    '/portals/management/teams/members/[memberId]/[reportId]',
                query: {
                    memberId: memberId,
                    reportId: reportId,
                    tab: camelToKebabCase(tab),
                },
            },
            undefined,
            { shallow: true }
        )
    }
    // useEffect(() => {
    //     if (
    //         router.pathname ===
    //         `'/portals/management/teams/members/${memberId}/${reportId}`
    //     ) {
    //         handleTabChange(activeTab)
    //     }
    // }, [activeTab, router.query.tab])
    const { data, isLoading, isError } =
        ManagementApi.CheckKpi.useKpiReportDetail(reportId, {
            skip: !reportId,
        })

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
    const achieved = 50
    const total = 100
    return (
        <>
            {modal && modal}
            <div className="management-portal-log h-screen flex flex-col gap-y-4 overflow-hidden pb-8 px-6 pt-6 w-full">
                <ManagementNavbar
                    setIsExpanded={setIsExpanded}
                    isExpanded={isExpanded}
                />
                <div className="w-full flex flex-col gap-y-2.5">
                    <KpiResultsCard
                        handleTabChange={handleTabChange}
                        activeTab={activeTab}
                        setFilter={setFilter}
                    />
                    <div className="w-full">
                        {activeTab === 'firstTimeStudent' && (
                            <FirstTimeStudent filter={filter} />
                        )}
                        {activeTab === 'studentDuplication' && (
                            <StudentDuplication filter={filter} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
// MemberDetailPage.getLayout = (page: ReactElement) => {
//     return <ManagementLayout>{page}</ManagementLayout>
// }
export default ReportDetailPage
