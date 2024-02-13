import { IndustryLayout } from '@layouts'
import { AddTaskForm } from '@partials/industry/tasks/form'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const AddScheduleForm: NextPageWithLayout = () => {
    return (
        <>
            <AddTaskForm />
        </>
    )
}

AddScheduleForm.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default AddScheduleForm
