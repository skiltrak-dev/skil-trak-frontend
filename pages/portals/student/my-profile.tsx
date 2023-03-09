import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query

import {
    useGetStudentProfileDetailQuery,
    useUpdateStudentProfileMutation,
} from '@queries'

import { StudentProfileForm } from '@partials/common'

import { useRouter } from 'next/router'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'

const MyProfile: NextPageWithLayout = () => {
    const router = useRouter()
    const profile = useGetStudentProfileDetailQuery()
    const [updateProfile, updateProfileResult] =
        useUpdateStudentProfileMutation()

    const onSubmit = (values: any) => {
        updateProfile({ body: values })
    }

    return (
        <div className="px-4">
            {profile.isError && <TechnicalError />}
            {profile.isLoading ? (
                <LoadingAnimation height={'h-[70vh]'} />
            ) : profile.data && profile.isSuccess ? (
                <StudentProfileForm
                    onSubmit={onSubmit}
                    profile={profile}
                    result={updateProfileResult}
                    studentId
                    courses={{
                        ...profile,
                        data: [...profile?.data?.courses],
                    }}
                />
            ) : (
                !profile.isError && profile.isSuccess && <EmptyData />
            )}
        </div>
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
