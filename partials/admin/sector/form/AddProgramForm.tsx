import { Button, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface CourseFolderFormProps {
    onSubmit: (values: any) => void
}

export const AddProgramForm = ({ onSubmit }: CourseFolderFormProps) => {
    const validationSchema = yup.object({
        title: yup.string().required('Title is Required'),
        hours: yup
            .number()
            .required('Hour is required')
            .typeError('Hour must be a number')
            .positive('Hour must be a positive number')
            .integer('Hour must be a whole number'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    return (
        <FormProvider {...methods}>
            <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
                <TextInput
                    label={'Title'}
                    name={'title'}
                    placeholder={'Title...'}
                    required
                />
                <TextInput
                    name={'hours'}
                    label={'Hours'}
                    placeholder="Add Hours..."
                />
                <Button
                    submit
                    loading={methods?.formState?.isSubmitting}
                    disabled={methods?.formState?.isSubmitting}
                >
                    Add
                </Button>
            </form>
        </FormProvider>
    )
}
