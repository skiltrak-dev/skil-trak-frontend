import { ReactElement, useEffect } from 'react'

import { RtoContactPersonLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    ShowErrorNotifications,
    TechnicalError,
} from '@components'
import { useActionModal, useContextBar, useNotification } from '@hooks'
import { AddObserverForm } from '@partials/admin/rtoObserver/form'
import { ObserverApi } from '@queries'
import { useRouter } from 'next/router'

const MyProfile: NextPageWithLayout = () => {
    const router = useRouter()

    const contextBar = useContextBar()
    const { onUpdatePassword, passwordModal } = useActionModal()

    const { notification } = useNotification()
    const [updateProfile, updateProfileResult] =
        ObserverApi.Students.useRtoObserverProfileUpdate()
    const profile = ObserverApi.Students.myProfile()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    const onSubmit = async (values: any) => {
        const res: any = await updateProfile(values)

        if (res?.data) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
            router.back()
        }
    }

    const initialValues = {
        id: profile?.data?.id,
        name: profile?.data?.user?.name,
        email: profile?.data?.user?.email,
        phone: profile?.data?.phone,
        rto: {
            label: profile?.data?.rto?.user?.name,
            value: profile?.data?.rto?.id,
        },
    }
    return (
        <>
            {passwordModal}
            <ShowErrorNotifications result={updateProfileResult} />
            <div className="p-8">
                {profile?.isError ? <TechnicalError /> : null}
                {profile?.isLoading ? (
                    <LoadingAnimation />
                ) : profile?.data && profile?.isSuccess ? (
                    <Card>
                        <Button
                            text="Update Password"
                            onClick={() => {
                                onUpdatePassword(profile?.data)
                            }}
                        />

                        <AddObserverForm
                            onSubmit={onSubmit}
                            edit
                            initialValues={initialValues}
                            isLoading={
                                updateProfileResult?.isLoading as boolean
                            }
                        />
                    </Card>
                ) : profile?.isSuccess ? (
                    <EmptyData />
                ) : null}
            </div>
        </>
    )
}

MyProfile.getLayout = (page: ReactElement) => {
    return <RtoContactPersonLayout>{page}</RtoContactPersonLayout>
}

export default MyProfile
