import React, { useEffect } from 'react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'

// query
import { useAddDocumentMutation } from 'redux/query'

// components
import {
    Popup,
    Button,
    Textarea,
    InputField,
    Typography,
    SwitchField,
    SelectFieldOption,
    ShowErrorNotifications,
} from 'components'
import { PopupTypes } from 'components'

const DocumentTypeOptions = [
    { value: 'docs', label: 'Documents' },
    { value: 'images', label: 'Images' },
    { value: 'videos', label: 'Videos' },
]

export const CustomRequirementForm = ({ courseId, onCancel }) => {
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

    const onSubmit = async (values) => {
        addDocument({
            ...values,
            courseId: courseId,
            isCustom: true,
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
                    type={PopupTypes.INFO}
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
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            enableReinitialize
                        >
                            {({ values, touched, errors, setFieldValue }) => {
                                return (
                                    <Form className="mt-2">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                                            <InputField
                                                label={'Name'}
                                                name={'name'}
                                                placeholder={'Document Name...'}
                                                touched={touched}
                                                errors={errors}
                                            />
                                            <SelectFieldOption
                                                label={'Type'}
                                                setFieldValue={setFieldValue}
                                                name={'type'}
                                                options={DocumentTypeOptions}
                                                onlyValue
                                            />
                                            <div className="flex flex-col gap-y-2">
                                                <InputField
                                                    label={'Capacity'}
                                                    name={'capacity'}
                                                    type={'number'}
                                                    placeholder={'Capacity...'}
                                                    touched={touched}
                                                    errors={errors}
                                                />
                                                <SwitchField
                                                    label={'Is Required?'}
                                                    name={'isRequired'}
                                                    value={values.isRequired}
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                />
                                            </div>
                                            <Textarea
                                                label={'Description'}
                                                name={'description'}
                                                touched={touched}
                                                errors={errors}
                                            />
                                        </div>

                                        <div className="flex items-center gap-x-2">
                                            <Button
                                                submit
                                                text={'Add Requirement'}
                                            />

                                            <Button
                                                variant={'secondary'}
                                                onClick={() => {
                                                    onCancel()
                                                }}
                                                text={'Cancel'}
                                            />
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            )}
        </>
    )
}
