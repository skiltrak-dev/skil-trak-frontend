import {
    Button,
    ShowErrorNotifications,
    TextArea,
    TextInput,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubAdmin, SubadminFromType } from '@types'
import { onlyAlphabets } from '@utils'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const SubAdminForm = ({
    onSubmit,
    result,
    subAdmin,
    edit,
}: {
    edit?: boolean
    onSubmit: (values: SubadminFromType) => void
    result: any
    subAdmin?: SubAdmin
}) => {
    const validationSchema = yup.object({
        // Profile Information
        name: yup.string().required('Must provide your name'),
        coordinatorId: yup.string().required('Must provide your name'),
        phone: yup.string().required('Must provide your name'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),

        // Address Information
        addressLine1: yup.string().required('Must provide address'),
    })

    const formMethods = useForm<SubadminFromType>({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (result.isSuccess) {
            formMethods.reset()
        }
    }, [result])

    useEffect(() => {
        if (subAdmin) {
            const values = {
                name: subAdmin?.user?.name,
                email: subAdmin?.user?.email,
                phone: subAdmin?.phone,
                addressLine1: subAdmin?.addressLine1,
                coordinatorId: subAdmin?.coordinatorId,
            }
            Object.entries(values)?.forEach(([key, value]) => {
                formMethods.setValue(
                    key as keyof SubadminFromType,
                    value as string
                )
            })
            // for (let key in values) {
            //     formMethods.setValue(key, values[key as keyof typeof values])
            // }
        }
    }, [subAdmin])

    return (
        <>
            <ShowErrorNotifications result={result} />
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
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
                    {/* {!edit && (
                        <TextInput
                            label={'Password'}
                            name={'password'}
                            type={'password'}
                            placeholder={'Password...'}
                            validationIcons
                            required
                        />
                    )} */}
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
                        name={'addressLine1'}
                        placeholder={'Address...'}
                    />
                    <Button
                        submit
                        text={edit ? 'Update' : 'Create'}
                        variant={edit ? 'secondary' : 'primary'}
                        loading={result?.isLoading}
                        disabled={result?.isLoading}
                    />
                </form>
            </FormProvider>
        </>
    )
}
