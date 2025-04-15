import { Card, PageTitle } from '@components'
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

import { AddIndividualStudentForm } from '@partials/sub-admin/students/form'

const AddIndividualStudent: NextPageWithLayout = () => {
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
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default AddIndividualStudent
