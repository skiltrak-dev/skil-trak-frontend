import { Card, PageTitle } from '@components'
import { useAlert, useContextBar } from '@hooks'
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { AddIndividualStudentForm } from '@partials/rto/student/form'

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
    return <RtoLayout>{page}</RtoLayout>
}

export default AddIndividualStudent
