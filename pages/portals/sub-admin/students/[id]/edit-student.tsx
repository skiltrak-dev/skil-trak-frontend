import { ReactElement } from 'react'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { StudentSignUpForm } from '@partials/student'
import { UpdateDetails } from '@partials/sub-admin/students/form/UpdateDetails'

const EditStudentDetail: NextPageWithLayout = () => {
    const onSubmit = () => {}
    return <UpdateDetails onSubmit={onSubmit} />
}
EditStudentDetail.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Edit Student Detail' }}>
            {page}
        </SubAdminLayout>
    )
}

export default EditStudentDetail
