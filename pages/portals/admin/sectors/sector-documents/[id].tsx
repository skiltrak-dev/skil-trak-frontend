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
import { SectorDocumentForm } from '@partials/admin/sector/form'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'

const EditSectorDocuments: NextPageWithLayout = () => {
    const router = useRouter()
    const { notification } = useNotification()
    const navBar = useNavbar()
    const id = Number(router.query?.id || -1)

    const [update, updateResult] =
        AdminApi.SectorDocuments.updateSectorDocument()
    const { data, isLoading } = AdminApi.SectorDocuments.sectorDocumentDetail(
        id,
        {
            skip: !id,
        }
    )

    useEffect(() => {
        navBar.setTitle('Edit Sector Document')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    const onSubmit = async (values: { name: string; sector: number }) => {
        const res: any = await update({ id, name: values?.name })
        if (res?.data) {
            router.push(
                '/portals/admin/sectors?tab=sector-documents&page=1&pageSize=50'
            )
            notification.success({
                title: 'Sector Document Updated',
                description: 'A sector document has been updated',
            })
        }
    }

    return (
        <div className="p-6 flex flex-col gap-y-4">
            <ShowErrorNotifications result={updateResult} />
            <BackButton text="Sector Documents" />
            <PageHeading
                title="Edit Sector Document"
                subtitle={`You are editing a Sector Document`}
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
                        <SectorDocumentForm
                            edit
                            onSubmit={onSubmit}
                            initialValues={data}
                            result={updateResult}
                        />
                    )
                ) : (
                    <LoadingAnimation />
                )}
            </Card>
        </div>
    )
}

EditSectorDocuments.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditSectorDocuments
