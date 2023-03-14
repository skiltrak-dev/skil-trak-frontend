import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

// components
import {
    EmptyData,
    LoadingAnimation,
    ShowErrorNotifications,
    TechnicalError,
} from '@components'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { StudentSignUpForm } from '@partials/student'
import { UpdateDetails } from '@partials/sub-admin/students/form/UpdateDetails'
import { useContextBar, useNotification } from '@hooks'

// queries
import {
    SubAdminApi,
    useGetSubAdminStudentDetailQuery,
    useUpdateStudentProfileMutation,
} from '@queries'
import { StudentProfileForm } from '@partials/common'

const EditStudentDetail: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const { notification } = useNotification()

    const router = useRouter()
    const { id } = router.query

    const student = useGetSubAdminStudentDetailQuery(Number(id), {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })
    const courses = SubAdminApi.Student.useCourses(Number(id), {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })
    const [updateDetail, updateDetailResult] = useUpdateStudentProfileMutation()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    const onSubmit = (values: any) => {
        updateDetail({ id: values?.id, body: values })
    }
    return (
        <>
            <ShowErrorNotifications result={updateDetailResult} />
            {/* <UpdateDetails onSubmit={onSubmit} result={updateDetailResult} /> */}
            <div className="px-4">
                {student.isError && <TechnicalError />}
                {student.isLoading ? (
                    <LoadingAnimation height={'h-[70vh]'} />
                ) : student.data && student.isSuccess ? (
                    <StudentProfileForm
                        onSubmit={onSubmit}
                        profile={student}
                        result={updateDetailResult}
                        courses={courses}
                    />
                ) : (
                    !student.isError && student.isSuccess && <EmptyData />
                )}
            </div>
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
