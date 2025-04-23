import { BackButton, Card, ShowErrorNotifications } from '@components'
import { PageHeading } from '@components/headings'
import { useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { AddCategoryForm } from '@partials/admin/invoices'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const AddCategories: NextPageWithLayout = () => {
    const { notification } = useNotification()

    const [add, addResult] = AdminApi.Invoice.addInvoiceCategory()
    const onSubmit = async (values: any) => {
        const res: any = await add(values)

        if (res?.data) {
            notification.success({
                title: 'Success',
                description: 'Invoice Category added successfully',
            })
        }
    }
    return (
        <>
            <ShowErrorNotifications result={addResult} />
            <div className="p-6 flex flex-col gap-y-4">
                <BackButton text="Invoice Categories" />
                <PageHeading
                    title={'Add Invoice Categories'}
                    subtitle={`You are creating a Invoice Categories`}
                ></PageHeading>

                <div className="w-2/5">
                    <Card>
                        <AddCategoryForm
                            onSubmit={onSubmit}
                            result={addResult}
                        />
                    </Card>
                </div>
            </div>
        </>
    )
}
AddCategories.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AddCategories
