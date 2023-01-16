import React, { useContext, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { ShowErrorNotifications } from '@components'

// components
import { Typography, Button, TextInput } from '@components'

// query
import { RtoApi } from '@queries'
import { useContextBar, useNotification } from '@hooks'

export const AddAdminCB = ({ initialValues, edit }: any) => {
    const { notification } = useNotification()
    const { hide } = useContextBar()
    const [create, createResult] = RtoApi.Rto.useAddContactPerson()
    const [update, updateResult] = RtoApi.Rto.useUpdateContactPerson()

    useEffect(() => {
        if (createResult.isSuccess) {
            notification.success({
                title: 'Contact Person Added',
                description: 'Contact Person Added Successfully',
            })
            hide()
        }
        if (createResult.isError) {
            notification.error({
                title: 'Contact Person Failed',
                description: 'Contact Person Failed To Add',
            })
        }
    }, [createResult])

    // useEffect(() => {
    //     if (updateResult.isSuccess) {
    //         notification.info({
    //             title: 'Admin Updated Successfully',
    //             description: 'Admin Updated Successfully',
    //         })
    //         hide()
    //     }
    //     if (updateResult.isError) {
    //         notification.error({
    //             title: 'Admin Updated Failed',
    //             description: 'Admin Updated Failed',
    //         })
    //     }
    // }, [updateResult])

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!'),
        email: Yup.string().required('Email is required!'),
        phone: Yup.string().required('Phone is required!'),
    })

    const methods = useForm({
        mode: 'all',
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = async (values: any) => {
        if (edit) {
            await update({ id: initialValues?.id, body: values })
        } else {
            await create(values)
        }
    }

    const isLoading = createResult.isLoading || updateResult.isLoading
    const isError = createResult.isError || updateResult.isError
    return (
        <div>
            <ShowErrorNotifications
                result={edit ? updateResult : createResult}
            />
            <Typography variant={'small'} color={'text-gray-500'}>
                Add Contact Person:
            </Typography>

            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <TextInput
                            label={'Name'}
                            name={'name'}
                            placeholder={'Your Name Here...'}
                            validationIcons
                            required
                        />
                        <TextInput
                            label={'Email'}
                            name={'email'}
                            placeholder={'Your Email Here...'}
                            validationIcons
                            required
                        />
                        <TextInput
                            label={'Phone'}
                            name={'phone'}
                            placeholder={'Your Phone Here...'}
                            validationIcons
                            required
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            submit
                            disabled={isLoading}
                            loading={isLoading}
                            variant={edit ? 'secondary' : 'primary'}
                        >
                            {edit ? 'Update' : 'Add'}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
