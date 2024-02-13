import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useContext, useEffect, useState } from 'react'

// components
import {
    Card,
    Popup,
    ActionAlert,
    BackButton,
    ActionAlertType,
    ShowErrorNotifications,
} from '@components'
// import { RightSidebarData } from './components'

// hooks
import { useContextBar, useNotification } from '@hooks'

// query
import {
    useAddJobMutation,
    useUpdateJobMutation,
    useGetJobDetailQuery,
} from '@queries'

// form

// utills
import { trimString } from '@utils'
import { JobForm } from '@partials/industry'

const AdvertisesNewJob: NextPageWithLayout = () => {
    const router = useRouter()

    // hooks
    const { setContent } = useContextBar()
    const { notification } = useNotification()

    // query
    const [add, addResult] = useAddJobMutation()

    useEffect(() => {
        if (addResult.isSuccess) {
            notification.success({
                title: 'Job Added Successfully',
                description: 'Job Added Successfully',
            })
        }
    }, [addResult.isSuccess])

    const isLoading = addResult.isLoading
    // const isError = addResult.isError
    const isSuccess = addResult.isSuccess

    const onSubmit = async (values: any) => {
        const trimValues = trimString(values)
        await add(trimValues)
    }

    return (
        <>
            <ShowErrorNotifications result={addResult} />

            <BackButton link={'/portals/industry/jobs'} text={'Back To Jobs'} />

            <Card>
                {isLoading && (
                    <Popup
                        title={'Saving Job'}
                        subtitle={'Please wait for a moment'}
                        variant={'success'}
                    />
                )}

                {isSuccess && (
                    <ActionAlert
                        title={'Job Advertisement Created Successfully!'}
                        description={
                            'You will be redirected to jobs in a moment.'
                        }
                        variant={'primary'}
                        primaryAction={{
                            text: 'Back To List',
                            onClick: () => {
                                router.push(
                                    `/portals/industry/jobs/advertised-jobs`
                                )
                            },
                        }}
                        secondaryAction={{
                            text: 'View Job Detail',
                            onClick: () => {
                                router.push(
                                    `/portals/industry/jobs/${addResult.data.id}`
                                )
                            },
                        }}
                    />
                )}

                {!isLoading && !isSuccess && <JobForm onSubmit={onSubmit} />}
            </Card>
        </>
    )
}

AdvertisesNewJob.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default AdvertisesNewJob
