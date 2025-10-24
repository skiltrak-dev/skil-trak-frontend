import { ReactElement, useEffect } from 'react'

import { BackButton, Card, Popup, ShowErrorNotifications } from '@components'
import { PageHeading } from '@components/headings'
import { useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { IndustryCheckForm } from '@partials/admin/sector/form'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'

const EditIndustryCheck: NextPageWithLayout = () => {
    const router = useRouter()
    const { notification } = useNotification()
    const navBar = useNavbar()

    const [update, updateResult] = AdminApi.IndustryChecks.updateIndustryCheck()
    const industryCheck = AdminApi.IndustryChecks.industryCheckDetail(
        Number(router.query.id)
    )

    useEffect(() => {
        navBar.setTitle('Edit Industry Check')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    const onSubmit = async (values: any) => {
        const res: any = await update({
            id: Number(router.query.id),
            ...values,
        })
        if (res?.data) {
            router.push(
                '/portals/admin/sectors?tab=industry-checks&page=1&pageSize=50'
            )
            notification.success({
                title: 'Industry Check Updated',
                description: 'Industry check has been updated successfully',
            })
        }
    }

    if (industryCheck?.isLoading) {
        return (
            <div className="p-6 flex flex-col gap-y-4">
                <BackButton text="Industry Checks" />
                <PageHeading
                    title={'Edit Industry Check'}
                    subtitle={`You are editing an industry check`}
                />
                <div className="w-2/5">
                    <Card>
                        <Popup
                            title="Loading..."
                            subtitle="Loading industry check details"
                            variant="info"
                        />
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 flex flex-col gap-y-4">
            <ShowErrorNotifications result={updateResult} />
            <BackButton text="Industry Checks" />
            <PageHeading
                title={'Edit Industry Check'}
                subtitle={`You are editing "${industryCheck?.data?.name}"`}
            ></PageHeading>

            <div className="w-2/5">
                <Card>
                    {updateResult.isLoading || updateResult.isSuccess ? (
                        <Popup
                            title="Updating..."
                            subtitle="You will be redirected on update"
                            variant="info"
                        />
                    ) : (
                        <IndustryCheckForm
                            onSubmit={onSubmit}
                            result={updateResult}
                            edit
                            initialValues={industryCheck?.data}
                        />
                    )}
                </Card>
            </div>
        </div>
    )
}

EditIndustryCheck.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditIndustryCheck
