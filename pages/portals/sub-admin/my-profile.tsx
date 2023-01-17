import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { SubAdminApi } from '@queries'
import { SubAdminProfileForm } from '@partials/common'

const MyProfile: NextPageWithLayout = () => {
    

    const profile = SubAdminApi.SubAdmin.useProfile()
    const [updateProfile, updateProfileResult] =
        SubAdminApi.SubAdmin.useUpdateProfile()

    

    const onSubmit = (values: any) => {
        updateProfile(values)
    }

    return (
        <SubAdminProfileForm onSubmit={onSubmit} profile={profile} result={updateProfileResult} />
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
