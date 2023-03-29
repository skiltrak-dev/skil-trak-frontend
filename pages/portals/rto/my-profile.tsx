import { ReactElement, useEffect } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { RTOProfileEditForm } from '@partials/common'

// query
import { RtoApi } from '@queries'
import { useContextBar, useNotification } from '@hooks'
import { useRouter } from 'next/router'

const MyProfile: NextPageWithLayout = () => {
    const router = useRouter()

    const contextBar = useContextBar()

    const { notification } = useNotification()
    const profile = RtoApi.Rto.useProfile()
    const [updateProfile, updateProfileResult] = RtoApi.Rto.useUpdateProfile()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    useEffect(() => {
        if (updateProfileResult.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
            router.push(`/portals/rto`)
        }
    }, [updateProfileResult])

    const onSubmit = (values: any) => {
        updateProfile({
            body: {
                ...values,
                courses: values?.courses?.map((id: number) => ({ id })),
            },
        })
    }
    return (
        <>
            <RTOProfileEditForm
                onSubmit={onSubmit}
                profile={profile}
                result={updateProfileResult}
            />
        </>
    )
}

MyProfile.getLayout = (page: ReactElement) => {
    return <RtoLayout pageTitle={{ title: 'My Profile' }}>{page}</RtoLayout>
}

export default MyProfile
