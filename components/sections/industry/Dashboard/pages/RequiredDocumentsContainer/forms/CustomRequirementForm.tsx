import React, { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// query
import { useAddDocumentMutation } from '@queries'

// components
import {
    Popup,
    Button,
    TextArea,
    TextInput,
    Typography,
    Switch,
    Select,
    ShowErrorNotifications,
    //   ShowErrorNotifications,
} from 'components'
import { PopupTypes } from 'components'
import { Industry } from '@types'

const DocumentTypeOptions = [
    { value: 'docs', label: 'Documents' },
    { value: 'images', label: 'Images' },
    { value: 'videos', label: 'Videos' },
]

export const CustomRequirementForm = ({
    courseId,
    onCancel,
    industry,
}: {
    courseId: number
    onCancel: () => void
    industry: Industry
}) => {
    const [addDocument, addDocumentResult] = useAddDocumentMutation()

    const initialValues = {
        name: '',
        type: DocumentTypeOptions[0].value,
        capacity: '',
        description: '',
        isRequired: false,
        selectedFolderIds: [],
    }

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

    const onSubmit = async (values: any) => {
        addDocument({
            ...values,
            courseId: courseId,
            isCustom: true,
            industry: industry?.user?.id,
        })
    }

    useEffect(() => {
        if (addDocumentResult.isSuccess) {
            // Success Trigger
            // show alert
            // show notification
            onCancel()
        }

        if (addDocumentResult.isError) {
            // show error alert
            // show error notification
        }
    }, [addDocumentResult.isSuccess, addDocumentResult.isError, onCancel])

    return (
        <>
            <ShowErrorNotifications result={addDocumentResult} />
            {addDocumentResult.isLoading ? (
                <Popup
                    title={'Adding Custom Requirement'}
                    subtitle={'Please wait for a moment'}
                    variant={'info'}
                />
            ) : (
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
                                    <Button submit text={'Add Requirement'} />

                                    <Button
                                        variant={'secondary'}
                                        onClick={() => {
                                            onCancel()
                                        }}
                                        text={'Cancel'}
                                    />
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            )}
        </>
    )
}
