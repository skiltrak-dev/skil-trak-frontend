import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout, RtoLayout } from '@layouts'
import { Course, NextPageWithLayout } from '@types'
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

    const navBar = useNavbar()
    const contextBar = useContextBar()

    const student = AdminApi.Students.useProfile(Number(router.query.id), {
        skip: !router.query.id,
    })
    const courses = SubAdminApi.Student.useCourses(Number(router.query.id), {
        skip: !router.query.id,
    })

    const [updateProfile, updateProfileResult] =
        useUpdateStudentProfileMutation()

    const onSubmit = (values: any) => {
        updateProfile({
            id: student?.data?.user?.id,
            body: {
                ...values,
                courses:
                    values?.courses?.map((course: any) => course?.value) || [],
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
