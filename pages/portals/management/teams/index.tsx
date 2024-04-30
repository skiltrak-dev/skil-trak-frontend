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
const TeamsPage: NextPageWithLayout = () => {
    const router = useRouter()
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return <>teams</>
}

TeamsPage.getLayout = (page: ReactElement) => {
    return <ManagementLayout>{page}</ManagementLayout>
}

export default TeamsPage
