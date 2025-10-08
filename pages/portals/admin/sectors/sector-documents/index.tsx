import { ReactElement, useEffect } from 'react'

import { BackButton, Card, Popup, ShowErrorNotifications } from '@components'
import { PageHeading } from '@components/headings'
import { useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { SectorDocumentForm } from '@partials/admin/sector/form'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'

const AddSectorDocuments: NextPageWithLayout = () => {
    const router = useRouter()
    const { notification } = useNotification()
    const navBar = useNavbar()

    const [add, addResult] = AdminApi.SectorDocuments.addSectorDocument()

    useEffect(() => {
        navBar.setTitle('Sector Document')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    const onSubmit = async (values: any) => {
        const res: any = await add(values)
        if (res?.data) {
            router.push(
                '/portals/admin/sectors?tab=sector-documents&page=1&pageSize=50'
            )
            notification.success({
                title: 'Sector Document Added',
                description: 'A new sector document has been created',
            })
        }
    }

    return (
        <div className="p-6 flex flex-col gap-y-4">
            <ShowErrorNotifications result={addResult} />
            <BackButton text="Sector Documents" />
            <PageHeading
                title={'Add Sector Document'}
                subtitle={`You are creating a sector document`}
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
                        <SectorDocumentForm
                            onSubmit={onSubmit}
                            result={addResult}
                        />
                    )}
                </Card>
            </div>
        </div>
    )
}

AddSectorDocuments.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AddSectorDocuments
