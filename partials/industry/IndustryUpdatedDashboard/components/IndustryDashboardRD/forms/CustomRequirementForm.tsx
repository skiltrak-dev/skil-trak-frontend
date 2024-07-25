import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// query

// components
import {
    Button,
    Popup,
    Select,
    ShowErrorNotifications,
    Switch,
    TextArea,
    TextInput,
    Typography,
} from '@components'

const DocumentTypeOptions = [
    { value: 'docs', label: 'Documents' },
    { value: 'images', label: 'Images' },
    { value: 'videos', label: 'Videos' },
]

export const CustomRequirementForm = ({
    result,
    onSubmit,
}: {
    result: any
    onSubmit: (values: any) => void
}) => {
    const validationSchema = yup.object({
        name: yup.string().required('Please provide name for document'),
        capacity: yup
            .string()
            .required('Please provide upload file limit (Number Of Files)'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    return (
        <>
            <div>
                <div>
                    <Typography>Add your custom requirement</Typography>
                    <Typography variant={'muted'} color={'gray'}>
                        Please fill following information
                    </Typography>
                </div>

                <div>
                    <FormProvider {...methods}>
                        <form
                            className="mt-2 w-full"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                                <TextInput
                                    label={'Name'}
                                    name={'name'}
                                    placeholder={'Document Name...'}
                                />
                                <Select
                                    label={'Type'}
                                    name={'type'}
                                    options={DocumentTypeOptions}
                                    onlyValue
                                />
                                <div className="flex flex-col gap-y-2">
                                    <TextInput
                                        label={'Capacity'}
                                        name={'capacity'}
                                        type={'number'}
                                        placeholder={'Capacity...'}
                                    />
                                    <Switch
                                        label={'Is Required?'}
                                        name={'isRequired'}
                                        //   value={values.isRequired}
                                    />
                                </div>
                                <TextArea
                                    label={'Description'}
                                    name={'description'}
                                />
                            </div>

                            <div className="flex items-center gap-x-2">
                                <Button
                                    submit
                                    text={'Add Requirement'}
                                    loading={result?.isLoading}
                                    disabled={result?.isLoading}
                                />
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </>
    )
}
