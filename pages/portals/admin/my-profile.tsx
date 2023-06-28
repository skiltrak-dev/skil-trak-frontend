import { ReactElement, useEffect } from 'react'

import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import * as yup from 'yup'

import { onlyAlphabets } from '@utils'

import { Avatar, Button, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// hooks
import {
    useActionModal,
    useContextBar,
    useNavbar,
    useNotification,
} from '@hooks'

// query
import { AdminApi } from '@queries'

type onSubmitType = {
    name: string
    email: string
}

const MyProfile: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const navbar = useNavbar()
    const { notification } = useNotification()

    const { onUpdatePassword, passwordModal } = useActionModal()

    const profile = AdminApi.Admin.useProfile()
    const [updateProfile, updateProfileResult] =
        AdminApi.Admin.useUpdateProfile()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
        navbar.setTitle('Edit My Profile')
    }, [])

    useEffect(() => {
        if (updateProfileResult.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
        }
    }, [updateProfileResult])

    const validationSchema = yup.object({
        // Profile Information
        name: yup
            .string()
            .matches(onlyAlphabets(), 'Please enter valid name')
            .required('Must provide your name'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),
    })

    const formMethods = useForm<onSubmitType>({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (profile?.data && profile.isSuccess) {
            const values: onSubmitType = {
                name: profile?.data?.name,
                email: profile?.data?.email,
            }
            Object.entries(values)?.forEach(([key, value]) => {
                formMethods.setValue(key as keyof onSubmitType, value)
            })

            // for (let key in values) {
            //     formMethods.setValue(
            //         key as keyof onSubmitType,
            //         (values as keyof typeof values)[key]
            //     )
            // }
        }
    }, [profile])

    const onSubmit = (values: onSubmitType) => {
        updateProfile(values)
    }
    return (
        <>
            {passwordModal && passwordModal}
            <div className="p-4 mb-4">
                <Avatar avatar={profile?.data?.avatar} />

                <div className="flex justify-between gap-x-16 border-t py-4">
                    <FormProvider {...formMethods}>
                        <form
                            className="w-4/6"
                            onSubmit={formMethods.handleSubmit(onSubmit)}
                        >
                            {/* Personal Information */}
                            <TextInput
                                label={'Name'}
                                name={'name'}
                                placeholder={'Student Name...'}
                                validationIcons
                                required
                            />

                            <TextInput
                                label={'Email'}
                                name={'email'}
                                type={'email'}
                                placeholder={'Your Email...'}
                                validationIcons
                                required
                                disabled
                            />

                            <div>
                                <Button
                                    text={'Update'}
                                    submit
                                    loading={updateProfileResult.isLoading}
                                    disabled={updateProfileResult.isLoading}
                                />
                            </div>
                        </form>
                    </FormProvider>
                    <div>
                        <Button
                            text={'Update Password'}
                            onClick={() => onUpdatePassword(profile?.data)}
                        />
                    </div>
                    {/* <Avatar avatar={profile?.data?.avatar} /> */}
                </div>
            </div>
        </>
    )
}

MyProfile.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default MyProfile
