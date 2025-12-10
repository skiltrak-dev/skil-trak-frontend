import { Button, Select, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { Sector } from '@types'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface IndustryCheckFormProps {
    onSubmit: any
    edit?: boolean
    initialValues?: any
    result: any
}

const validationSchema = yup.object({
    name: yup.string().required('Name is required!'),
    sector: yup.number().required('Sector is required!'),
    capacity: yup.number().required('Capacity is required!'),
    link: yup.string().url('Must be a valid URL').required('Link is required!'),
    description: yup.string(),
    isRequired: yup.boolean(),
})

export const IndustryCheckForm = ({
    result,
    onSubmit,
    edit,
    initialValues,
}: IndustryCheckFormProps) => {
    const sectors = AdminApi.Sectors.useListQuery({
        limit: 100,
        skip: 0,
        search: '',
    })
    const [selectedSector, setSelectedSector] = useState<number | null>(null)

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: initialValues?.name || '',
            sector: initialValues?.sector?.id || null,
            capacity: initialValues?.capacity || 0,
            link: initialValues?.link || '',
            description: initialValues?.description || '',
            isRequired: initialValues?.isRequired || false,
        },
        mode: 'all',
    })

    useEffect(() => {
        if (edit && initialValues) {
            setSelectedSector(initialValues?.sector?.id)
        }
    }, [initialValues, edit])

    const sectorOptions = sectors.data?.data?.map((sector: Sector) => ({
        label: sector?.name,
        value: sector?.id,
    }))

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="mb-8 space-y-1">
                    <div className="mb-3 pb-2 border-b">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            Industry Check Details
                        </Typography>
                    </div>

                    <Select
                        name={'sector'}
                        label={'Sector'}
                        options={sectorOptions}
                        value={sectorOptions?.find(
                            (sector) => sector?.value === selectedSector
                        )}
                        onChange={(e: number) => {
                            setSelectedSector(e)
                        }}
                        onlyValue
                        disabled={sectors?.isLoading || edit}
                        loading={sectors.isLoading}
                        required
                    />

                    <TextInput
                        label={'Name'}
                        name={'name'}
                        placeholder={'Industry check name...'}
                        required
                        validationIcons
                    />

                    <TextInput
                        label={'Capacity'}
                        name={'capacity'}
                        type="number"
                        placeholder={'Enter capacity...'}
                        required
                        validationIcons
                    />

                    <TextInput
                        label={'Link'}
                        name={'link'}
                        type="url"
                        placeholder={'Enter link...'}
                        required
                        validationIcons
                    />

                    <TextInput
                        label={'Description'}
                        name={'description'}
                        placeholder={'Enter description...'}
                        validationIcons
                    />

                    <div>
                        <Button
                            submit
                            loading={result.isLoading}
                            disabled={result.isLoading}
                            {...(edit ? { outline: true } : {})}
                        >
                            {edit
                                ? 'Update Industry Check'
                                : 'Add Industry Check'}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
