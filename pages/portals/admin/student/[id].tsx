

import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'


import { StudentProfile } from '@partials/student/pages'

const Detail: NextPageWithLayout = () => {
    return (
        <div className="px-8">
            <StudentProfile noTitle />
        </div>
    )
}

Detail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Detail
