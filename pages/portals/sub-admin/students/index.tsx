import { ReactElement } from 'react'
import { NextPageWithLayout } from '@types'

import {
    MyStudents,
    SubadminStudents,
    RtoSubadminStudent,
} from '@partials/sub-admin/students'

// query
import { SubAdminApi } from '@queries'

import { SubAdminLayout } from '@layouts'
import { LoadingAnimation, TechnicalError } from '@components'

const Students: NextPageWithLayout = () => {
    const profile = SubAdminApi.SubAdmin.useProfile()

    return (
        <div>
            {profile?.isError && <TechnicalError />}
            {profile.isLoading ? (
                <LoadingAnimation />
            ) : profile?.isSuccess ? (
                profile?.data?.isAssociatedWithRto &&
                !profile?.data?.hasAllStudentAccess ? (
                    <RtoSubadminStudent />
                ) : (
                    <SubadminStudents />
                )
            ) : null}
        </div>
    )
}
Students.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Students' }}>
            {page}
        </SubAdminLayout>
    )
}

export default Students
