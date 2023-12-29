import { ReactElement, useEffect, useState } from 'react'

import { BackButton, Card, Popup } from '@components'
import { PageHeading } from '@components/headings'
import { useAlert, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'

import { CommonApi } from '@queries'
import {  NextPageWithLayout,  } from '@types'
import { useRouter } from 'next/router'
import { StateForm } from '@partials/admin/countries'

const StateAddPage: NextPageWithLayout = () => {
    const router = useRouter()
    const { alert } = useAlert()
    const { notification } = useNotification()
    const navBar = useNavbar()

    const [add, addResult] = CommonApi.Countries.useAddState()
    const [requirementFile, setRequirementFile] = useState<any>(null)

    useEffect(() => {
        navBar.setTitle('Courses')
    }, [])

    const onSubmit = async (values: any) => {
        const body = {
            ...values,
            country: values.country.value,
            // ...(requirementFile ? { requirements: requirementFile } : {}),
        }
        await add(body)
    }

    useEffect(() => {
        if (!addResult.isUninitialized) {
            if (addResult.isSuccess) {
                router.push('/portals/admin/countries?tab=states')
                alert.success({
                    title: 'state Added',
                    description: 'A new state has been created',
                })
            }

            if (addResult.isError) {
                notification.error({
                    title: 'Failed to add state',
                    description: 'New state add failed',
                })
            }
        }
    }, [addResult])

    return (
        <div className="p-6 flex flex-col gap-y-4 mb-32">
            <BackButton text="Countries" />
            <PageHeading
                title={'Add state'}
                subtitle={`You are creating a state`}
            ></PageHeading>
            <Card>
                {addResult.isLoading || addResult.isSuccess ? (
                    <Popup
                        title="Submitting..."
                        subtitle="You will be redirected on submission"
                        variant="info"
                    />
                ) : (
                    <StateForm
                        result={addResult}
                        onSubmit={onSubmit}
                        // requirementFile={requirementFile}
                        // setRequirementFile={setRequirementFile}
                    />
                )}
            </Card>
        </div>
    )
}

StateAddPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default StateAddPage
