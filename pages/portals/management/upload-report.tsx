import { ManagementNavbar } from '@components'
import { UploadReportKpiForm } from '@partials/management'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
                setIsExpanded={setIsExpanded}
                isExpanded={isExpanded}
            />
            <div className="overflow-auto remove-scrollbar">
                <UploadReportKpiForm
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                />
            </div>
        </div>
    )
}
// UploadReport.getLayout = (page: ReactElement) => {
//     return <ManagementLayout>{page}</ManagementLayout>
// }
export default UploadReport
