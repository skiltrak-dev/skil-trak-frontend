import { ReactElement, useEffect, useState } from 'react'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ManagementNavbar } from '@components'

import { useRouter } from 'next/router'

const ManagementDashboard: NextPageWithLayout = () => {
    const router = useRouter()
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
        <div className="management-portal-log h-screen flex flex-col gap-y-4 overflow-hidden pb-8 px-6 pt-6 w-full">
            <ManagementNavbar
                setIsExpanded={setIsExpanded}
                isExpanded={isExpanded}
            />
            Main Dashboard
        </div>
    )
}

// ManagementDashboard.getLayout = (page: ReactElement) => {
//     return <AdminLayout>{page}</AdminLayout>
// }

export default ManagementDashboard
