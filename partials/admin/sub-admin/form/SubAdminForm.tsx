import {
    Button,
    TextArea,
    TextInput,
    ActionAlert,
    ShowErrorNotifications,
} from '@components'
import { useRouter } from 'next/router'
import { UserRoles } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { onlyAlphabets } from '@utils'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useState, useEffect } from 'react'

export const SubAdminForm = ({ onSubmit }: any) => {
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

    const onSubmitForm = (values: any) => {
        if (onSubmit) {
            onSubmit(values)
        } else
            createSubAmin({
                ...values,
                role: UserRoles.SUBADMIN,
                status: 'approved',
            })
    }

    return (
        <>
            <ShowErrorNotifications result={createSubAminResult} />
            {isSuccess && (
                <ActionAlert
                    title={'Sub Admin Created Successfully!'}
                    description={'You will be redirected to jobs in a moment.'}
                    variant={'primary'}
                    primaryAction={{
                        text: 'Back To List',
                        onClick: () => {
                            router.push(`/portals/admin/sub-admin?tab=active`)
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
                    <form onSubmit={formMethods.handleSubmit(onSubmitForm)}>
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
                                type={'password'}
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
                            text={'Create'}
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
