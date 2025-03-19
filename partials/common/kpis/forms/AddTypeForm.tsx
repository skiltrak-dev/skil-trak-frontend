import { Button, Select, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { KpiTypesEnum } from '../enums'

interface SectorFormProps {
    onSubmit: any
    result: any
}

export const AddTypeForm = ({ onSubmit, result }: SectorFormProps) => {
    const validationSchema = yup.object({
        name: yup.string().required('Kpi Type is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const nameOptions = Object.entries(KpiTypesEnum).map(([key, value]) => ({
        label: key,
        value,
    }))

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="mb-8">
                    <div className="mb-3 pb-2 border-b">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            Kpi Type
                        </Typography>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-2">
                        <Select
                            name="name"
                            label={'Add Type'}
                            options={nameOptions}
                            onlyValue
                        />
                    </div>

                    <div>
                        <Button
                            submit
                            loading={result?.isLoading}
                            disabled={result?.isLoading}
                        >
                            Add Type
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
