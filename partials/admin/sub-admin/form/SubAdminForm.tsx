import { Button, TextArea, TextInput, ActionAlert } from '@components'
import { useRouter } from 'next/router'
import { UserRoles } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { onlyAlphabets } from '@utils'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useState, useEffect } from 'react'

export const SubAdminForm = () => {
    const router = useRouter()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [createSubAmin, createSubAminResult] =
        AdminApi.SubAdmins.createSubAmin()

    useEffect(() => {
        if (createSubAminResult.isSuccess) {
            setIsSuccess(createSubAminResult.isSuccess)
        }
    }, [createSubAminResult.isSuccess])

    const validationSchema = yup.object({
        // Profile Information
        name: yup
            .string()
            .matches(onlyAlphabets(), 'Please enter valid name')
            .required('Must provide your name'),
        coordinatorId: yup.string().required('Must provide your name'),
        phone: yup.string().required('Must provide your name'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),

        // Address Information
        address: yup.string().required('Must provide address'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (values: any) => {
        createSubAmin({ ...values, role: UserRoles.SUBADMIN })
    }

    return (
        <>
            {isSuccess && (
                <ActionAlert
                    title={'Sub Admin Created Successfully!'}
                    description={'You will be redirected to jobs in a moment.'}
                    variant={'primary'}
                    primaryAction={{
                        text: 'Back To List',
                        onClick: () => {
                            router.push(`/portals/admin/sub-admin?tab=pending`)
                        },
                    }}
                    secondaryAction={{
                        text: 'Add New',
                        onClick: () => {
                            setIsSuccess(false)
                        },
                    }}
                />
            )}
            {!isSuccess && (
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                            <TextInput
                                label={'Full Name'}
                                name={'name'}
                                placeholder={'Your Full Name...'}
                                validationIcons
                                required
                            />

                            <TextInput
                                label={'Coordinator Id'}
                                name={'coordinatorId'}
                                placeholder={'Coordinator Id...'}
                                validationIcons
                                required
                            />

                            <TextInput
                                label={'Phone No'}
                                name={'phone'}
                                placeholder={'Phone No...'}
                                validationIcons
                                required
                            />
                            <TextInput
                                label={'Password'}
                                name={'password'}
                                placeholder={'Password...'}
                                validationIcons
                                required
                            />
                        </div>
                        <div className="w-full grid grid-cols-1 gap-x-8">
                            <TextInput
                                label={'Email'}
                                type={'email'}
                                name={'email'}
                                placeholder={'Email...'}
                                validationIcons
                                required
                            />
                            <TextArea
                                label={'Address'}
                                name={'address'}
                                placeholder={'Address...'}
                            />
                        </div>
                        <Button
                            submit
                            text={'Continue'}
                            variant={'primary'}
                            loading={createSubAminResult.isLoading}
                            disabled={createSubAminResult.isLoading}
                        />

                        {/* <Button text={'Update'} submit /> */}
                    </form>
                </FormProvider>
            )}
        </>
    )
}
