import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement, useEffect } from 'react'

import { StudentProfile } from '@partials/student/pages'
import { useNavbar } from '@hooks'

const Detail: NextPageWithLayout = () => {
    const navbar = useNavbar()
    useEffect(() => {
        navbar.setTitle('Student Detail')
    }, [])

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
