import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// components
import { Avatar, Button, Card, TextInput } from '@components'

// hooks
import { useActionModal, useContextBar } from '@hooks'

export const SubAdminProfileForm = ({
    result,
    profile,
    onSubmit,
}: {
    result: any
    profile: any
    onSubmit: any
}) => {
    const contextBar = useContextBar()

    const { onUpdatePassword, passwordModal } = useActionModal()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    const validationSchema = yup.object({
        // Profile Information
        name: yup.string().required('Must provide your name'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),

        phone: yup.string().required('Must provide phone number'),

        // Contact Person Information

        // Address Information
        addressLine1: yup.string().required('Must provide address'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (profile?.data && profile.isSuccess) {
            const { coordinatorId, phone, addressLine1 } = profile?.data
            const { name, email } = profile?.data?.user
            const values: any = {
                coordinatorId,
                phone,
                addressLine1,
                name,
                email,
            }

            for (const key in values) {
                formMethods.setValue(key, values[key])
            }
        }
    }, [profile])
    return (
        <Card>
            {passwordModal && passwordModal}
            <div className="mb-3 flex justify-end">
                <Button
                    text={'Update Password'}
                    onClick={() => onUpdatePassword(profile?.data)}
                />
            </div>
            <div className="flex justify-between gap-x-16 border-t py-4">
                <div className="w-4/6">
                    <FormProvider {...formMethods}>
                        <form
                            className="flex flex-col gap-y-4"
                            onSubmit={formMethods.handleSubmit(onSubmit)}
                        >
                            {/* Personal Information */}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                <TextInput
                                    label={'Name'}
                                    name={'name'}
                                    placeholder={'Student Name...'}
                                    validationIcons
                                    required
                                />
                                <TextInput
                                    label={'Coordinator ID'}
                                    name={'coordinatorId'}
                                    placeholder={'Your Coordinator ID...'}
                                    validationIcons
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                <TextInput
                                    label={'Phone Number'}
                                    name={'phone'}
                                    placeholder={'Your phone number...'}
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
                                />
                            </div>
                            <TextInput
                                label={'Address'}
                                name={'addressLine1'}
                                placeholder={'Your Address ...'}
                                validationIcons
                            />
                            <div>
                                <Button
                                    text={'Update'}
                                    submit
                                    loading={result.isLoading}
                                    disabled={result.isLoading}
                                />
                            </div>
                        </form>
                    </FormProvider>
                </div>
                <Avatar avatar={profile?.data?.user?.avatar} />
            </div>
        </Card>
    )
}
