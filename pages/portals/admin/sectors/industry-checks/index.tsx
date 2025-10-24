import { ReactElement, useEffect } from 'react'

import { BackButton, Card, Popup, ShowErrorNotifications } from '@components'
import { PageHeading } from '@components/headings'
import { useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { IndustryCheckForm } from '@partials/admin/sector/form'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'

const AddIndustryChecks: NextPageWithLayout = () => {
    const router = useRouter()
    const { notification } = useNotification()
    const navBar = useNavbar()

    const [add, addResult] = AdminApi.IndustryChecks.addIndustryCheck()

    useEffect(() => {
        navBar.setTitle('Industry Check')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    const onSubmit = async (values: any) => {
        const res: any = await add(values)
        if (res?.data) {
            router.push(
                '/portals/admin/sectors?tab=industry-checks&page=1&pageSize=50'
            )
            notification.success({
                title: 'Industry Check Added',
                description: 'A new industry check has been created',
            })
        }
    }

    return (
        <div className="p-6 flex flex-col gap-y-4">
            <ShowErrorNotifications result={addResult} />
            <BackButton text="Industry Checks" />
            <PageHeading
                title={'Add Industry Check'}
                subtitle={`You are creating an industry check`}
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
                        <IndustryCheckForm
                            onSubmit={onSubmit}
                            result={addResult}
                        />
                    )}
                </Card>
            </div>
        </div>
    )
}

AddIndustryChecks.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AddIndustryChecks
