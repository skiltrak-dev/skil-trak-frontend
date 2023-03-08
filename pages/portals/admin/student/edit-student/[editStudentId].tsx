import { useContextBar, useNavbar } from '@hooks'
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

    const student = AdminApi.Students.useProfile(editStudentId, {
        skip: !editStudentId,
    })
    const courses = SubAdminApi.Student.useCourses(editStudentId, {
        skip: !editStudentId,
    })

    const [updateProfile, updateProfileResult] =
        useUpdateStudentProfileMutation()

    const onSubmit = (values: any) => {
        console.log('before', values)
        if (!values?.courses) {
            delete values?.courses
        }
        console.log('after', values)
        updateProfile({
            id: student?.data?.user?.id,
            body: {
                ...values,
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
    return <AdminLayout>{page}</AdminLayout>
}

export default EditStudent
