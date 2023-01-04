import { BackButton, Card, PageTitle } from '@components'
import { useAlert, useContextBar } from '@hooks'
import { AdminLayout, RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { PageHeading } from '@components/headings'
import { SubAdminForm } from '@partials/admin/sub-admin/form'
import { RtoApi } from '@queries'
import { UserRoles } from '@constants'
import { AuthUtils } from '@utils'
import { AddIndividualStudentForm } from '@partials/admin/rto/students/AddIndividualStudentForm'

const AddIndividualStudent: NextPageWithLayout = () => {
    const { alert } = useAlert()
    const router = useRouter()
    const contextBar = useContextBar()
    // const [addStudent, addStudentResult] =
    //     RtoApi.Coordinator.useCreate()

    // // const credentials = AuthUtils.getUserCredentials()

    // const onSubmit = async (values: any) => {
    //     await addStudent({
    //         // id: credentials.id,
    //         ...values,
    //         role: UserRoles.STUDENT,
    //         status: 'approved',
    //     })
    // }

    // useEffect(() => {
    //     if (addStudentResult.isSuccess) {
    //         alert.success({
    //             title: 'Student added successfully',
    //             description: 'A new student has been added',
    //         })

    //         router.back()
    //     }
    // }, [addStudentResult])

    return (
        <div className="p-6 flex flex-col gap-y-4 mb-20">
            <PageTitle title="Add Individual Student" backTitle="students" />
            <div className="w-3/4">
                <Card>
                    {/* <AddIndividualStudentForm onSubmit={onSubmit} /> */}
                    <AddIndividualStudentForm />
                </Card>
            </div>
        </div>
    )
}

AddIndividualStudent.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AddIndividualStudent
