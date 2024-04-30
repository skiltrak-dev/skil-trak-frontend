import { ReactElement, useEffect, useState } from 'react'
import { AdminLayout, ManagementLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ManagementNavbar, ManagementSideBar } from '@components'
import { ManagementStudentList } from '@partials/management'

const StudentListPage: NextPageWithLayout = () => {
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
