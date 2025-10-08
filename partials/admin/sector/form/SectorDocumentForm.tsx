import { Button, Select, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { Sector } from '@types'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface SectorDocumentFormProps {
    onSubmit: any
    edit?: boolean
    initialValues?: any
    result: any
}

const validationSchema = yup.object({
    name: yup.string().required('Name is required!'),
    sector: yup.number().required('Sector is required!'),
})

export const SectorDocumentForm = ({
    result,
    onSubmit,
    edit,
    initialValues,
}: SectorDocumentFormProps) => {
    const sectors = AdminApi.Sectors.useListQuery(undefined)
    const [selectedSector, setSelectedSector] = useState<number | null>(null)

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: initialValues?.name || '',
            sector: initialValues?.sector?.id || null,
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
                            Sector Document Details
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
                        placeholder={'Document name...'}
                        required
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
                                ? 'Update Sector Document'
                                : 'Add Sector Document'}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
