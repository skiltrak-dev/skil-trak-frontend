import { ManagementNavbar, Typography } from '@components'
import { ManagementLayout } from '@layouts'
import { KpiRecordCount, TeamSideBar, TeamMembers } from '@partials/management'
import { ManagementApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'

const TeamDetailPage: NextPageWithLayout = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const router = useRouter()
    const teamId = router?.query?.id
    const teamMembersList = ManagementApi.Team.useTeamMembersList(teamId, {
        skip: !teamId,
    })
    const kpiCountData = [
        {
            title: 'Workplace Requests',
            count: teamMembersList?.data?.placementStarted || 0,
            classes: 'flex-col',
        },
        {
            title: 'Agreements uploaded',
            count: teamMembersList?.data?.agreementUploaded || 0,
            classes: 'flex-col',
        },
        {
            title: 'Student own workplace',
            count: teamMembersList?.data?.studentProvided || 0,
            classes: 'flex-col',
        },
        {
            title: 'Appointment booked',
            count: teamMembersList?.data?.appointments || 0,
            classes: 'flex-col',
        },
    ]
    return (
        <div className="management-portal-log h-screen flex flex-col gap-y-4 overflow-hidden pb-8 px-6 pt-6 w-full">
            <ManagementNavbar
                setIsExpanded={setIsExpanded}
                isExpanded={isExpanded}
            />
            <div className="flex gap-x-4">
                {/* <TeamSideBar
                    title="Commercial Cookery"
                    subtitle="TEAM KPIs Record"
                    KpiCountCard={kpiCountData.map((item) => (
                        <KpiRecordCount
                            title={item.title}
                            count={item.count}
                            classes={item.classes}
                        />
                    ))}
                /> */}
                <TeamSideBar sideBar>
                    <TeamSideBar.Title>
                        <div className="mb-8">
                            <Typography
                                variant="title"
                                color="text-primaryNew"
                                bold
                            >
                                Commercial Cookery
                            </Typography>
                        </div>
                        <div className="mb-4">
                            <Typography
                                variant="small"
                                color="text-primaryNew"
                                medium
                            >
                                TEAM KPIs Record
                            </Typography>
                        </div>
                    </TeamSideBar.Title>
                    <TeamSideBar.KpiCountCard>
                        <div className="flex flex-col gap-y-2">
                            {kpiCountData.map((item) => (
                                <div key={item?.title}>
                                    <KpiRecordCount
                                        title={item.title}
                                        count={item.count}
                                        classes={item.classes}
                                    />
                                </div>
                            ))}
                        </div>
                    </TeamSideBar.KpiCountCard>
                </TeamSideBar>
                 <TeamMembers data={teamMembersList} /> 
            </div>
        </div>
    )
}
// TeamDetailPage.getLayout = (page: ReactElement) => {
//     return <ManagementLayout>{page}</ManagementLayout>
// }
export default TeamDetailPage
