import { BackButton, Card, Popup, ShowErrorNotifications } from '@components'
import { PageHeading } from '@components/headings'
import { AdminLayout } from '@layouts'
import { AddTypeForm } from '@partials/common'
import React, { ReactElement } from 'react'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'

const AddTypes = () => {
    const { notification } = useNotification()

    const [add, addResult] = AdminApi.Kpi.addKpiType()
    const onSubmit = async (values: any) => {
        const res: any = await add(values)

        if (res?.data) {
            notification.success({
                title: 'Success',
                description: 'Kpi Type added successfully',
            })
        }
    }
    return (
        <>
            <ShowErrorNotifications result={addResult} />
            <div className="p-6 flex flex-col gap-y-4">
                <BackButton text="Kpis" />
                <PageHeading
                    title={'Add Kpis Type'}
                    subtitle={`You are creating a Kpis Type`}
                ></PageHeading>

                <div className="w-2/5">
                    <Card>
                        <AddTypeForm onSubmit={onSubmit} result={addResult} />
                    </Card>
                </div>
            </div>
        </>
    )
}
AddTypes.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AddTypes
