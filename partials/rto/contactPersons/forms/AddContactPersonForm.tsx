import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

// components
import { Button, TextInput } from '@components'

// query

// query
export const AddContactPersonForm = ({
    edit,
    onSubmit,
    isLoading,
    initialValues,
}: {
    edit: boolean
    isLoading: boolean
    onSubmit: (values: any) => void
    initialValues?: any
}) => {
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
    return (
        <div>
            {' '}
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
