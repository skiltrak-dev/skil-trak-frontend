import { ReactElement, useEffect } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { IndustryProfileFrom } from '@partials/common'
import {
    useIndustryProfileQuery,
    useUpdateIndustryProfileMutation,
} from '@queries'
import { useNotification } from '@hooks'

const MyProfile: NextPageWithLayout = () => {
    const { notification } = useNotification()
    const profile = useIndustryProfileQuery()
    const [updateProfile, updateProfileResult] =
        useUpdateIndustryProfileMutation()

    useEffect(() => {
        if (updateProfileResult.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
        }
    }, [updateProfileResult])

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
