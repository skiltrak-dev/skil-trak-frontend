import { RtoLayout } from '@layouts'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '@types'
import { Card, PageTitle } from '@components'

import { AddIndividualStudentForm } from '@partials/rto/student/form'

const AddIndividualStudent: NextPageWithLayout = () => {
    return (
        <div className="p-6 flex flex-col gap-y-4 mb-20">
            <PageTitle title="Add Individual Student" backTitle="students" />
            <div className="w-3/4">
                <Card>
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
