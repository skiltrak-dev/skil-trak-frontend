import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

// components
import {
    ActionAlert,
    BackButton,
    Card,
    Popup,
    ShowErrorNotifications,
} from '@components'
// import { RightSidebarData } from './components'

// hooks
import { useContextBar, useNotification } from '@hooks'

// query
import { useAddJobMutation } from '@queries'

// form

// utills
import { JobForm } from '@partials/industry'
import { trimString } from '@utils'

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
                        description={`Click on button "Back To List" to go back to list or "View Job Detail" to view the job detail`}
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
                                    `/portals/industry/jobs/${addResult?.data?.id}`
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
