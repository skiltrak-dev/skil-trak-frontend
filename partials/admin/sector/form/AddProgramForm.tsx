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
