import { useContextBar, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { StudentProfileForm } from '@partials/common'
import {
    AdminApi,
    SubAdminApi,
    useUpdateStudentProfileMutation,
} from '@queries'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'

const EditStudent: NextPageWithLayout = () => {
    const router = useRouter()
    const editStudentId = Number(router.query.editStudentId)
    const navBar = useNavbar()
    const contextBar = useContextBar()
    const { notification } = useNotification()

    const student = AdminApi.Students.useProfile(editStudentId, {
        skip: !editStudentId,
        refetchOnMountOrArgChange: true,
    })
    const courses = SubAdminApi.Student.useCourses(editStudentId, {
        skip: !editStudentId,
        refetchOnMountOrArgChange: true,
    })

    const [updateProfile, updateProfileResult] =
        useUpdateStudentProfileMutation()

    useEffect(() => {
        if (updateProfileResult.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Student Profile Updated',
            })
            router.back()
        }
    }, [updateProfileResult])

    const onSubmit = (values: any) => {
        if (!values?.courses) {
            delete values?.courses
        }
        const { name, email, ...rest } = values

        const dob = new Date(values.dob)
        dob.setDate(dob.getDate() + 1)

        updateProfile({
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
                user: {
                    id: student?.data?.user?.id,
                    name,
                    email,
                },
            },
        })
    }

    useEffect(() => {
        navBar.setTitle('Edit Student')
        contextBar.hide()
    }, [])

    return (
        <div className="px-4">
            {student.isError && <TechnicalError />}
            {student.isLoading || student.isFetching ? (
                <LoadingAnimation height={'h-[70vh]'} />
            ) : student.data && student.isSuccess ? (
                <StudentProfileForm
                    onSubmit={onSubmit}
                    profile={student}
                    result={updateProfileResult}
                    courses={courses}
                />
            ) : (
                !student.isError && student.isSuccess && <EmptyData />
            )}
        </div>
    )
}

EditStudent.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditStudent
