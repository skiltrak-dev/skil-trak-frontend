import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

// components
import { ShowErrorNotifications } from '@components'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { StudentSignUpForm } from '@partials/student'
import { UpdateDetails } from '@partials/sub-admin/students/form/UpdateDetails'
import { useContextBar, useNotification } from '@hooks'

// queries
import { SubAdminApi } from '@queries'

const EditStudentDetail: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const { notification } = useNotification()

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    // query
    const [updateDetail, updateDetailResult] =
        SubAdminApi.Student.useUpdateDetail()

    useEffect(() => {
        if (updateDetailResult.isSuccess) {
            notification.success({
                title: 'Detail Updated',
                description: 'Student Detail Updated Successfully',
            })
            router.push({
                pathname: `/portals/sub-admin/students/${id}`,
                query: { tab: 'overview' },
            })
        }
    }, [updateDetailResult])

    const onSubmit = (values: any) => {
        updateDetail({ id: values?.id, body: values })
    }
    return (
        <>
            <ShowErrorNotifications result={updateDetailResult} />
            <UpdateDetails onSubmit={onSubmit} result={updateDetailResult} />
        </>
    )
}
EditStudentDetail.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Edit Student Detail' }}>
            {page}
        </SubAdminLayout>
    )
}

export default EditStudentDetail
