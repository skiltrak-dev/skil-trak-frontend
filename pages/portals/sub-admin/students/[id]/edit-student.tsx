import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

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

import { useContextBar, useNotification } from '@hooks'

// queries
import { StudentProfileForm } from '@partials/common'
import {
    SubAdminApi,
    useGetSubAdminStudentDetailQuery,
    useUpdateStudentProfileMutation,
} from '@queries'

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
        if (updateDetailResult.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Student Profile Updated',
            })
            router.back()
        }
    }, [updateDetailResult])

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    const onSubmit = (values: any) => {
        if (!values?.courses) {
            delete values?.courses
        }
        const { name, email, ...rest } = values
        const dob = new Date(values.dob)
        dob.setDate(dob.getDate() + 1)

        updateDetail({
            id: student?.data?.id,
            body: {
                ...rest,
                ...(rest?.courses
                    ? {
                          courses: rest?.courses?.map((course: any) => ({
                              id: course?.value,
                          })),
                      }
                    : {}),
                dob,
                isInternational:
                    values?.isInternational === 'international' ? true : false,
                user: {
                    id: student?.data?.user?.id,
                    name,
                    email,
                },
            },
        })
    }
    return (
        <>
            <ShowErrorNotifications result={updateDetailResult} />
            {/* <UpdateDetails onSubmit={onSubmit} result={updateDetailResult} /> */}
            <div className="px-4">
                {student.isError && <TechnicalError />}
                {student.isLoading || student.isFetching ? (
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
