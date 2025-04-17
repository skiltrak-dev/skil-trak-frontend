import { ReactElement, useEffect } from 'react'

import { BackButton, Card, LoadingAnimation, Popup } from '@components'
import { PageHeading } from '@components/headings'
import { useAlert, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { SectorForm } from '@partials/admin/sector/form'
import { AdminApi } from '@queries'
import { NextPageWithLayout, Sector } from '@types'
import { useRouter } from 'next/router'

const SectorEditPage: NextPageWithLayout = () => {
    const router = useRouter()
    const { alert } = useAlert()
    const { notification } = useNotification()
    const navBar = useNavbar()
    const id = Number(router.query?.id || -1)

    const [update, updateResult] = AdminApi.Sectors.useUpdateMutation()
    const { data, isLoading } = AdminApi.Sectors.useDetailQuery(id, {
        skip: !id,
    })

    useEffect(() => {
        navBar.setTitle('Sectors')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    const onSubmit = async (values: Sector) => {
        await update(values)
    }

    useEffect(() => {
        if (!updateResult.isUninitialized) {
            if (updateResult.isSuccess) {
                router.push('/portals/admin/sectors?tab=sectors')
                alert.info({
                    title: 'Sector Updated',
                    description: `Sector '${data?.name}' has been updated`,
                })
            }

            if (updateResult.isError) {
                notification.error({
                    title: 'Failed to update sector',
                    description: 'New sector add failed',
                })
            }
        }
    }, [updateResult])

    return (
        <div className="p-6 flex flex-col gap-y-4">
            <BackButton text="Sectors" />
            <PageHeading
                title="Edit Sector"
                subtitle={`You are editing a sector`}
            ></PageHeading>
            <Card>
                {data && !isLoading ? (
                    updateResult.isLoading || updateResult.isSuccess ? (
                        <Popup
                            title="Updating..."
                            subtitle="You will be redirected on submission"
                            variant="info"
                        />
                    ) : (
                        <SectorForm
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

SectorEditPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default SectorEditPage
