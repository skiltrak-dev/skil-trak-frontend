import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// components
import { Button, Select, SelectOption, TextInput } from '@components'
import { CommonApi } from '@queries'
import { Rto } from '@types'
import { useEffect, useMemo, useState } from 'react'

export const AddObserverForm = ({
    edit,
    onSubmit,
    isLoading,
    initialValues,
}: {
    edit?: boolean
    isLoading: boolean
    initialValues?: any
    onSubmit: (values: any) => void
}) => {
    const getRtos = CommonApi.Filter.useRtos()
    useState
    console.log({ initialValues })

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

    const rtoOptions = useMemo(
        () =>
            getRtos?.data?.map((rto: Rto) => ({
                value: rto?.id,
                label: rto?.user?.name,
            })),
        [getRtos?.data]
    )

    useEffect(() => {
        if (rtoOptions && rtoOptions?.length > 0) {
            methods.setValue(
                'rto',
                rtoOptions?.find(
                    (rto: SelectOption) =>
                        rto?.value === initialValues?.rto?.value
                ),
                {
                    shouldValidate: true,
                }
            )
        }
    }, [rtoOptions])

    console.log(
        'Khanka banka',
        rtoOptions?.find(
            (option: SelectOption) =>
                option.value === methods.watch('rto')?.value
        )
    )

    return (
        <div>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <Select
                            label={'Rto Name'}
                            name={'rto'}
                            options={rtoOptions}
                            placeholder={'Select Rto Name...'}
                            loading={getRtos.isLoading}
                            disabled={getRtos.isLoading || edit}
                            onlyValue
                            value={rtoOptions?.find(
                                (option: SelectOption) =>
                                    option.value === methods.watch('rto')?.value
                            )}
                            onChange={(selectedOption: number) => {
                                methods.setValue('rto', selectedOption, {
                                    shouldValidate: true,
                                })
                            }}
                        />

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
