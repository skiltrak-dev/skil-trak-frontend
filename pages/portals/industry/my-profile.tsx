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
import {
    EmptyData,
    LoadingAnimation,
    SelectOption,
    ShowErrorNotifications,
    TechnicalError,
} from '@components'

const MyProfile: NextPageWithLayout = () => {
    const { notification } = useNotification()
    const profile = useIndustryProfileQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })
    const [updateProfile, updateProfileResult] =
        useUpdateIndustryProfileMutation()

    const onSubmit = (values: any) => {
        delete values?.sectors
        updateProfile({
            body: {
                ...values,
                courses: values?.courses?.map((course: SelectOption) => ({
                    id: course?.value,
                })),
            },
        })
    }

    return (
        <>
            <ShowErrorNotifications result={updateProfileResult} />
            <div className="px-4">
                {profile.isError && <TechnicalError />}
                {profile.isLoading || profile.isFetching ? (
                    <LoadingAnimation height={'h-[70vh]'} />
                ) : profile.data && profile.isSuccess ? (
                    <IndustryProfileFrom
                        onSubmit={onSubmit}
                        profile={profile}
                        result={updateProfileResult}
                    />
                ) : (
                    !profile.isError && profile.isSuccess && <EmptyData />
                )}
            </div>
        </>
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
