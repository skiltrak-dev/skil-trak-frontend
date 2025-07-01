import { ReactElement, useEffect } from 'react'

import { BackButton, Card, Popup, TabNavigation, TabProps } from '@components'
import { useAlert, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout, Sector } from '@types'
import { PageHeading } from '@components/headings'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { CountryForm } from '@partials/admin/countries'

const CountryAddPage: NextPageWithLayout = () => {
    const router = useRouter()
    const { alert } = useAlert()
    const { notification } = useNotification()
    const navBar = useNavbar()

    const [add, addResult] = CommonApi.Countries.useAddCountry()

    useEffect(() => {
        navBar.setTitle('Sectors')
    }, [])

    const onSubmit = async (values: Sector) => {
        await add(values)
    }

    useEffect(() => {
        if (!addResult.isUninitialized) {
            if (addResult.isSuccess) {
                router.push('/portals/admin/countries?tab=countries')
                alert.success({
                    title: 'Country Added',
                    description: 'A new country has been added',
                })
            }

            if (addResult.isError) {
                notification.error({
                    title: 'Failed to add country',
                    description: 'New country add failed',
                })
            }
        }
    }, [addResult])

    return (
        <div className="p-6 flex flex-col gap-y-4">
            <BackButton text="Countries" />
            <PageHeading
                title={'Add Country'}
                subtitle={`You are adding a country`}
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
                        <CountryForm onSubmit={onSubmit} />
                    )}
                </Card>
            </div>
        </div>
    )
}

CountryAddPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default CountryAddPage
