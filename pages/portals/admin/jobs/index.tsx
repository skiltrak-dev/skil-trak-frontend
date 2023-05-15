import { ReactElement, useEffect } from 'react'

import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { Jobs } from '@partials/admin/job'
import { NextPageWithLayout } from '@types'

const JobsList: NextPageWithLayout = () => {
    const navBar = useNavbar()

    useEffect(() => {
        navBar.setTitle('Jobs')
    }, [])

    return (
        <div className="p-6">
            <Jobs />
        </div>
    )
}

JobsList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default JobsList
