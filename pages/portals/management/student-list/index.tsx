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
        <>
            <ManagementStudentList />
        </>
    )
}

StudentListPage.getLayout = (page: ReactElement) => {
    return <ManagementLayout>{page}</ManagementLayout>
}

export default StudentListPage
