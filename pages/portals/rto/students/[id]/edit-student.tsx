import { useContextBar, useNavbar, useNotification } from '@hooks'
import { AdminLayout, RtoLayout } from '@layouts'
import { Course, NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { StudentProfileForm } from '@partials/common'
import {
    AdminApi,
    SubAdminApi,
    useGetSubAdminStudentDetailQuery,
    useUpdateStudentProfileMutation,
} from '@queries'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'

const EditStudent: NextPageWithLayout = () => {
    const router = useRouter()

    const navBar = useNavbar()
    const contextBar = useContextBar()
    const { notification } = useNotification()

    const student = useGetSubAdminStudentDetailQuery(Number(router.query.id), {
        skip: !router.query.id,
        refetchOnMountOrArgChange: true,
    })
    const courses = SubAdminApi.Student.useCourses(Number(router.query.id), {
        skip: !router.query.id,
    })

    const [updateProfile, updateProfileResult] =
        useUpdateStudentProfileMutation()

    const onSubmit = (values: any) => {
        const { name, email, ...rest } = values

        const dob = new Date(values?.dob)
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
                isInternational:
                    values?.isInternational === 'international' ? true : false,
                user: {
                    id: student?.data?.user?.id,
                    name,
                    email,
                },
            },
        })?.then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Profile Updated',
                    description: 'Student Profile Updated',
                })
                router.back()
            }
        })
    }

    useEffect(() => {
        navBar.setTitle('Edit Student')
        contextBar.hide()
    }, [])

    return (
        <div className="px-4">
            {student.isError && <TechnicalError />}
            {student.isLoading ? (
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
    return <RtoLayout>{page}</RtoLayout>
}

export default EditStudent
