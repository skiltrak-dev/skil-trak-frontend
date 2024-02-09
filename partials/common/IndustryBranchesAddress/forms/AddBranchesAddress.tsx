import { Button, Checkbox, LoadingAnimation, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { IndustryBranchesAddressType, LoginCredentials } from '@types'
import Link from 'next/link'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const AddBranchesAddress = ({
    onSubmit,
    result,
    edit,
    branch,
}: {
    edit?: boolean
    branch?: IndustryBranchesAddressType
    onSubmit: any
    result: any
}) => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
        password: Yup.string().required('Password is required'),
    })

    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        mode: 'all',
        defaultValues: {
            ...branch,
        },
    })

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="">
                    <TextInput
                        label={'Contact Person Name'}
                        name={'contactPerson'}
                        placeholder={'Contact Person Name Here...'}
                        validationIcons
                        required
                    />
                    <TextInput
                        label={'Contact Person Phone'}
                        name={'contactPersonPhone'}
                        placeholder={'Contact Person Phone Here...'}
                        validationIcons
                        required
                    />
                    <TextInput
                        label={'Contact Person Email'}
                        name={'contactPersonEmail'}
                        type="email"
                        placeholder={'Contact Person Email Here...'}
                        validationIcons
                        required
                    />
                    <TextInput
                        label={'Address'}
                        name={'address'}
                        placeholder={'Address Here...'}
                        validationIcons
                        required
                    />
                    <TextInput
                        label={'Suburb'}
                        name={'suburb'}
                        placeholder={'Suburb Here...'}
                        validationIcons
                        required
                    />

                    <TextInput
                        label={'Student Capacity'}
                        name={'studentCapacity'}
                        type={'number'}
                        placeholder={'Your Student Capacity here Here...'}
                        validationIcons
                        required
                    />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <Button
                        submit
                        variant={edit ? 'info' : 'primary'}
                        loading={result.isLoading}
                        disabled={result.isLoading}
                    >
                        {edit ? 'Update' : 'Add'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}
