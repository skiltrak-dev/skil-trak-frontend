import { ReactElement, useEffect, useState } from 'react'
import { AdminLayout, ManagementLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ManagementNavbar, ManagementSideBar } from '@components'
import {
    CheckKpi,
    FirstTimeStudent,
    ManagementStudentList,
} from '@partials/management'
import { useRouter } from 'next/router'
import { camelToKebabCase } from '@utils'

type TabOption = 'checkKpi' | 'studentList'
const CheckKpiPage: NextPageWithLayout = () => {
    const router = useRouter()
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
        <div className="management-portal-log h-screen flex flex-col gap-y-4 overflow-hidden pb-8 px-6 pt-6 w-full">
            <ManagementNavbar
                setIsExpanded={setIsExpanded}
                isExpanded={isExpanded}
            />
            <div className="flex gap-x-2.5 ">
                <ManagementSideBar />
                <CheckKpi />
            </div>
        </div>
    )
}

// CheckKpiPage.getLayout = (page: ReactElement) => {
//     return <ManagementLayout>{page}</ManagementLayout>
// }

export default CheckKpiPage
