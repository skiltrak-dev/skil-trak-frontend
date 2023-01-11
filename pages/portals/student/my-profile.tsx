import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { Profile } from '@partials/student'

const MyProfile: NextPageWithLayout = () => {
    return (
        <>
            <Profile data />
        </>
    )
}

MyProfile.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'My Profile' }}>
            {page}
        </StudentLayout>
    )
}

export default MyProfile
