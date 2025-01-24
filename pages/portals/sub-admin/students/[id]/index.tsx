import { ReactElement, useEffect } from 'react'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { StudentProfile } from '@partials/student/pages'
import { useRouter } from 'next/router'

const StudentsProfile: NextPageWithLayout = () => {
    const router = useRouter()
    useEffect(() => {
        router.push(`/portals/sub-admin/students/${router?.query?.id}/detail`)
    }, [])

    return <StudentProfile />
}
StudentsProfile.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Student Profile' }}>
            {page}
        </SubAdminLayout>
    )
}

export default StudentsProfile
