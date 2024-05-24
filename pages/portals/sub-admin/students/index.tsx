import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

//components
import {
    RtoSubadminStudent,
    SubadminStudents,
} from '@partials/sub-admin/students'

// query
import { SubAdminApi } from '@queries'

// hooks

//Layouts
import { SubAdminLayout } from '@layouts'
import { LoadingAnimation, TechnicalError } from '@components'

type Props = {}

const filterKeys = [
    'nowp',
    'name',
    'email',
    'phone',
    'rtoId',
    'suburb',
    'status',
    'courseId',
    'studentId',
    'industryId',
    'currentStatus',
]

const Students: NextPageWithLayout = (props: Props) => {
    const profile = SubAdminApi.SubAdmin.useProfile()
    return (
        <div>
            {profile?.isError && <TechnicalError />}
            {profile.isLoading ? (
                <LoadingAnimation />
            ) : profile?.isSuccess ? (
                profile?.data?.isAssociatedWithRto ? (
                    <RtoSubadminStudent />
                ) : (
                    <SubadminStudents />
                )
            ) : null}
        </div>
    )
}
Students.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default Students
