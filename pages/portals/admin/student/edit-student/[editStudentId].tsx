import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { StudentProfileForm } from '@partials/common'
import { AdminApi, useUpdateStudentProfileMutation } from '@queries'

const EditStudent: NextPageWithLayout = () => {
    const router = useRouter()
    const editStudentId = Number(router.query.editStudentId)
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const student = AdminApi.Students.useProfile(editStudentId, {
        skip: !editStudentId,
    })

    const [updateProfile, updateProfileResult] =
        useUpdateStudentProfileMutation()

    const onSubmit = (values: any) => {
        updateProfile({
            id: student?.data?.user?.id,
            body: { ...values, courses: values?.courses || [] },
        })
    }

    useEffect(() => {
        navBar.setTitle('Edit Student')
        contextBar.hide()
    }, [])

    return (
        <div className="px-4">
            <StudentProfileForm
                onSubmit={onSubmit}
                profile={student}
                result={updateProfileResult}
            />
        </div>
    )
}

EditStudent.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditStudent
