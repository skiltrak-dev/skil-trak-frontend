import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { SubAdminApi } from '@queries'
import { Profile } from '@partials/sub-admin'

const MyProfile: NextPageWithLayout = () => {
    const profile = SubAdminApi.SubAdmin.useProfile()
    return (
        <>
            <Profile data={profile?.data} />
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
