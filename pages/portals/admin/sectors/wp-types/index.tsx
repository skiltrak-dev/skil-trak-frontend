import { ReactElement, useEffect } from 'react'

import { BackButton, Card, Popup, ShowErrorNotifications } from '@components'
import { PageHeading } from '@components/headings'
import { useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { WorkplaceTypeForm } from '@partials/admin/sector/form'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'

const AddWorkplaceTypes: NextPageWithLayout = () => {
    const router = useRouter()
    const { notification } = useNotification()
    const navBar = useNavbar()

    const [add, addResult] = AdminApi.WpTypes.addWpType()

    useEffect(() => {
        navBar.setTitle('Workplace Type')
    }, [])

    const onSubmit = async (values: any) => {
        const res: any = await add(values)
        if (res?.data) {
            router.push(
                '/portals/admin/sectors?tab=wp-types&page=1&pageSize=50'
            )
            notification.success({
                title: 'Workplace Type Added',
                description: 'A new workplace type has been created',
            })
        }
    }

    return (
        <div className="p-6 flex flex-col gap-y-4">
            <ShowErrorNotifications result={addResult} />
            <BackButton text="Workplace Types" />
            <PageHeading
                title={'Add Workplace Type'}
                subtitle={`You are creating a workplace type`}
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
                        <WorkplaceTypeForm
                            onSubmit={onSubmit}
                            result={addResult}
                        />
                    )}
                </Card>
            </div>
        </div>
    )
}

AddWorkplaceTypes.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AddWorkplaceTypes
