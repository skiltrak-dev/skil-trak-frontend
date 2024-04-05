import { ReactElement, useEffect, useState } from 'react'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ManagementNavbar, ManagementSideBar, Typography } from '@components'
import {
    ManagementStudentList,
    TeamSelectionTab,
    UploadReportKpiForm,
} from '@partials/management'
import { useRouter } from 'next/router'

type TabOption = 'subadmin' | 'sourcing'
const UploadReport: NextPageWithLayout = () => {
    const [activeTab, setActiveTab] = useState<TabOption>('subadmin')

    const handleTabChange = (tab: TabOption) => {
        setActiveTab(tab)
    }
    const router = useRouter()
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
        <div className="management-portal-log h-screen flex flex-col gap-y-4 overflow-hidden pb-8 px-6 pt-6 w-full">
            <ManagementNavbar
                // handleTabChange={handleTabChange}
                // activeTab={activeTab}
                setIsExpanded={setIsExpanded}
                isExpanded={isExpanded}
            />
            <TeamSelectionTab
                activeTab={activeTab}
                handleTabChange={handleTabChange}
            />
            <UploadReportKpiForm name={'file'} />
        </div>
    )
}

// ManagementDashboard.getLayout = (page: ReactElement) => {
//     return <AdminLayout>{page}</AdminLayout>
// }

export default UploadReport
