import { ReactElement, useEffect } from 'react'

import { RtoContactPersonLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import {
    Avatar,
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
        const data = {
            phone: values?.phone,
            user: {
                name: values?.name,
                email: values?.email,
            },
        }
        const res: any = await updateProfile(data)

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
                        <div className="grid grid-cols-3 gap-x-5">
                            <div className="flex flex-col gap-y-8">
                                <div>
                                    <Button
                                        text="Update Password"
                                        onClick={() => {
                                            onUpdatePassword(profile?.data)
                                        }}
                                    />
                                </div>

                                <Avatar
                                    user={profile?.data?.user?.id}
                                    avatar={profile?.data?.user?.avatar}
                                />
                            </div>

                            <div className="col-span-2">
                                <AddObserverForm
                                    onSubmit={onSubmit}
                                    edit
                                    initialValues={initialValues}
                                    isLoading={
                                        updateProfileResult?.isLoading as boolean
                                    }
                                />
                            </div>
                        </div>
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
