import { ReactElement, useEffect } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import * as yup from 'yup'

import { getDate, onlyAlphabets } from '@utils'

import { Button, Card, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// query
import {
    useGetStudentProfileDetailQuery,
    useUpdateStudentProfileMutation,
} from '@queries'
import { StudentProfileForm } from '@partials/common'

const MyProfile: NextPageWithLayout = () => {
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
