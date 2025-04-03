import { Button, Select, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
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

    const itemsList = AdminApi.Kpi.kpiTypes()

    const nameOptions = Object.entries(KpiTypesEnum).map(([key, value]) => ({
        label: key,
        value,
    }))

    const objectConverted = nameOptions.reduce((obj: any, item) => {
        obj[item.value] = item?.label
        return obj
    }, {})

    const updatedNameOptions = nameOptions?.filter(
        (name) =>
            !itemsList?.data
                ?.map((item: any) => item?.name)
                ?.includes(name?.value)
    )

    return (
        <>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="mb-8">
                        <div className="mb-3 pb-2 border-b">
                            <Typography
                                variant={'muted'}
                                color={'text-gray-400'}
                            >
                                Kpi Type
                            </Typography>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-2">
                            <Select
                                name="name"
                                label={'Add Type'}
                                options={updatedNameOptions}
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

            {/*  */}
            <div>
                {itemsList?.data && itemsList?.data?.length > 0 && (
                    <>
                        <Typography variant="small" medium>
                            Added Types
                        </Typography>
                        <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
                            {itemsList?.data?.map((uj: any) => (
                                <div className="px-1 py-0.5 rounded bg-secondary-dark">
                                    <Typography uppercase variant="small">
                                        {objectConverted[uj?.name]}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
