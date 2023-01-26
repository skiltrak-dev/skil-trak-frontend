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
    LoadingAnimation,
    ShowErrorNotifications,
} from 'components'
// import { RightSidebarData } from './components'

// hooks
import { useContextBar, useNotification } from 'hooks'

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

const EditJob: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query

    // hooks
    const { setContent } = useContextBar()
    const { notification } = useNotification()

    // query
    const editValues = useGetJobDetailQuery(id, { skip: !id })
    const [update, updateResult] = useUpdateJobMutation()

    useEffect(() => {
        if (updateResult.isSuccess) {
            notification.success({
                title: 'Job Updated Successfully',
                description: 'Job Updated Successfully',
            })
        }
    }, [updateResult.isSuccess])

    const isLoading = updateResult.isLoading
    // const isError = addResult.isError || updateResult.isError;
    const isSuccess = updateResult.isSuccess

    const onSubmit = async (values: any) => {
        const { isEditing, industry, ...rest } = values
        const trimValues = trimString(rest)
        await update(trimValues)
    }

    return (
        <>
            <ShowErrorNotifications result={updateResult} />

            <BackButton link={'jobs'} text={'Back To Jobs'} />

            <Card>
                {isLoading && (
                    <Popup
                        title={'Updating Job'}
                        subtitle={'Please wait for a moment'}
                        variant={'info'}
                    />
                )}

                {isSuccess && (
                    <ActionAlert
                        title={'Job Advertisement Updated Successfully!'}
                        description={
                            'You will be redirected to jobs in a moment.'
                        }
                        variant={'info'}
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
                                router.push(`/portals/industry/jobs/${id}`)
                            },
                        }}
                    />
                )}

                {!isLoading &&
                    !isSuccess &&
                    (editValues.isLoading ? (
                        <LoadingAnimation />
                    ) : (
                        <JobForm
                            onSubmit={onSubmit}
                            initialValues={editValues?.data}
                            edit
                        />
                    ))}
            </Card>
        </>
    )
}

EditJob.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default EditJob
