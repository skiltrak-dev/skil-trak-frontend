import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'




// query
import { StudentProfileForm } from '@partials/common'
import {
    useGetStudentProfileDetailQuery,
    useUpdateStudentProfileMutation
} from '@queries'
import { useRouter } from 'next/router'

const MyProfile: NextPageWithLayout = () => {
    const router = useRouter()
    const profile = useGetStudentProfileDetailQuery()
    const [updateProfile, updateProfileResult] =
        useUpdateStudentProfileMutation()

    const onSubmit = (values: any) => {
        updateProfile({ body: values })
    }

    return (
        <StudentProfileForm
            onSubmit={onSubmit}
            profile={profile}
            result={updateProfileResult}
        />
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
