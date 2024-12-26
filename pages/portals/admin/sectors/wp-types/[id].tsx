import { ReactElement, useEffect } from 'react'

import {
    BackButton,
    Card,
    LoadingAnimation,
    Popup,
    ShowErrorNotifications,
} from '@components'
import { PageHeading } from '@components/headings'
import { useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { WorkplaceTypeForm } from '@partials/admin/sector/form'
import { AdminApi } from '@queries'
import { NextPageWithLayout, Sector } from '@types'
import { useRouter } from 'next/router'

const EditWorkplaceTypes: NextPageWithLayout = () => {
    const router = useRouter()
    const { notification } = useNotification()
    const navBar = useNavbar()
    const id = Number(router.query?.id || -1)

    const [update, updateResult] = AdminApi.WpTypes.updateWpType()
    const { data, isLoading } = AdminApi.WpTypes.wpTypeDetail(id, {
        skip: !id,
    })

    useEffect(() => {
        navBar.setTitle('Edit Workplace Type')
    }, [])

    const onSubmit = async (values: any) => {
        const res: any = await update(values)
        if (res?.data) {
            router.push(
                '/portals/admin/sectors?tab=wp-types&page=1&pageSize=50'
            )
            notification.success({
                title: 'Workplace Type Updated',
                description: 'A new workplace type has been updated',
            })
        }
    }

    return (
        <div className="p-6 flex flex-col gap-y-4">
            <ShowErrorNotifications result={updateResult} />
            <BackButton text="Sectors" />
            <PageHeading
                title="Edit Workplace Type"
                subtitle={`You are editing a Workplace Type`}
            ></PageHeading>
            <Card>
                {(data && !isLoading) || true ? (
                    updateResult.isLoading || updateResult.isSuccess ? (
                        <Popup
                            title="Updating..."
                            subtitle="You will be redirected on submission"
                            variant="info"
                        />
                    ) : (
                        <WorkplaceTypeForm
                            edit
                            onSubmit={onSubmit}
                            initialValues={data}
                        />
                    )
                ) : (
                    <LoadingAnimation />
                )}
            </Card>
        </div>
    )
}

EditWorkplaceTypes.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditWorkplaceTypes
