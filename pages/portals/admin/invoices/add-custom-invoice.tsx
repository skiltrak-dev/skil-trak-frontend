import { ReactElement, useEffect } from 'react'

import { BackButton, Card, Popup, ShowErrorNotifications } from '@components'
import { PageHeading } from '@components/headings'
import { useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { AddCustomInvoiceForm } from '@partials/admin/invoices'

const AddCustomInvoice: NextPageWithLayout = () => {
    const router = useRouter()
    const { notification } = useNotification()
    const navBar = useNavbar()

    const [add, addResult] = AdminApi.Invoice.addCustomInvoice()

    useEffect(() => {
        navBar.setTitle('Add Custom Invoice')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    const onSubmit = async (values: any) => {
        const res: any = await add({
            ...values,
            rto: Number(router?.query?.rto),
        })
        if (res?.data) {
            router.back()
            notification.success({
                title: 'Custom Invoice Added',
                description: 'A new Custom Invoice has been created',
            })
        }
    }

    return (
        <div className="p-6 flex flex-col gap-y-4">
            <ShowErrorNotifications result={addResult} />
            <BackButton text="Invoice" />
            <PageHeading
                title={'Add Custom Invoice'}
                subtitle={`You are creating a custom invoice`}
            ></PageHeading>

            <div className="w-2/5">
                <Card>
                    {addResult.isLoading || addResult.isSuccess ? (
                        <Popup
                            title="Submitting..."
                            subtitle="You will be redirected on submission"
                            variant="info"
                        />
                    ) : (
                        <AddCustomInvoiceForm
                            onSubmit={onSubmit}
                            result={addResult}
                        />
                    )}
                </Card>
            </div>
        </div>
    )
}

AddCustomInvoice.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AddCustomInvoice
