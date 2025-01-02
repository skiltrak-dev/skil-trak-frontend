import { Button, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface WPTypeFormProps {
    onSubmit: any
    edit?: boolean
    initialValues?: any
    result: any
}

const validationSchema = yup.object({
    name: yup.string().required('Name is required!'),
})

export const WorkplaceTypeForm = ({
    result,
    onSubmit,
    edit,
    initialValues,
}: WPTypeFormProps) => {
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            ...initialValues,
            sector: { label: 'Sector III', value: 9 },
        },
        mode: 'all',
    })

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="mb-8">
                    <div className="mb-3 pb-2 border-b">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            Workplace Type Details
                        </Typography>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-2">
                        <TextInput
                            label={'Name'}
                            name={'name'}
                            placeholder={'Workplace Type...'}
                            required
                            validationIcons
                        />
                    </div>

                    <div>
                        <Button
                            submit
                            loading={result.isLoading}
                            disabled={result.isLoading}
                            {...(edit ? { outline: true } : {})}
                        >
                            {edit
                                ? 'Update Workplace Type'
                                : 'Add Workplace Type'}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
