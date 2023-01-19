import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { IndustryProfileFrom } from '@partials/common'
import {
    useIndustryProfileQuery,
    useUpdateIndustryProfileMutation,
} from '@queries'

const MyProfile: NextPageWithLayout = () => {
    const profile = useIndustryProfileQuery()
    const [updateProfile, updateProfileResult] =
        useUpdateIndustryProfileMutation()

    const onSubmit = (values: any) => {
        updateProfile({ body: values })
    }

    return (
        <IndustryProfileFrom
            onSubmit={onSubmit}
            profile={profile}
            result={updateProfileResult}
        />
    )
}

MyProfile.getLayout = (page: ReactElement) => {
    return (
        <IndustryLayout pageTitle={{ title: 'My Profile' }}>
            {page}
        </IndustryLayout>
    )
}

export default MyProfile
