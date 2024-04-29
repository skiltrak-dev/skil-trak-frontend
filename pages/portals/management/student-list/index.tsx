import { ReactElement, useEffect, useState } from 'react'
import { AdminLayout, ManagementLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ManagementNavbar, ManagementSideBar } from '@components'
import { ManagementStudentList } from '@partials/management'
import { useRouter } from 'next/router'

const StudentListPage: NextPageWithLayout = () => {
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

            <ManagementStudentList />
        </div>
    )
}

// StudentListPage.getLayout = (page: ReactElement) => {
//     return <ManagementLayout>{page}</ManagementLayout>
// }

export default StudentListPage
