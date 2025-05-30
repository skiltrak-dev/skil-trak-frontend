import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { SubAdminApi } from '@queries'
import { SubAdminProfileForm } from '@partials/common'
import { useNotification } from '@hooks'
import { ShowErrorNotifications } from '@components'

const MyProfile: NextPageWithLayout = () => {
    const profile = SubAdminApi.SubAdmin.useProfile()

    const { notification } = useNotification()

    const [updateProfile, updateProfileResult] =
        SubAdminApi.SubAdmin.useUpdateProfile()

    const onSubmit = async (values: any) => {
        const { name, email, ...rest } = values

        const res: any = await updateProfile({
            subadmin: rest,
            user: {
                name,
                email,
            },
        })
        if (res?.data) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
        }
    }

    return (
        <>
            <ShowErrorNotifications result={updateProfileResult} />
            <SubAdminProfileForm
                onSubmit={onSubmit}
                profile={profile}
                result={updateProfileResult}
            />
        </>
    )
}

MyProfile.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'My Profile' }}>
            {page}
        </SubAdminLayout>
    )
}

export default MyProfile
