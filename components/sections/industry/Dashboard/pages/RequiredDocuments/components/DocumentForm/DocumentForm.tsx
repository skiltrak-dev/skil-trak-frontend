import React from 'react'
import * as yup from 'yup'
import { Formik, Form } from 'formik'

// components
import { Button, TextArea, TextInput, Switch, Select } from '@components'

// functions
import { Console } from 'utills/functions/ShowConsole'

// context
// import { RequiredDocxFolderContext } from "context";

// redux
import { useAddDocumentMutation } from 'redux/query'
export const DocumentForm = ({
    courseID,
    setIsDocxSubmitting,
    setRequiredStudentFormdata,
}) => {
    // context for set selected Docx Ids
    const { selectedFolderIds } = {} // useContext(RequiredDocxFolderContext);

    // add Folder
    const [addFolder, { isLoading }] = useAddDocumentMutation()

    const initialValues = {
        name: '',
        type: {},
        capacity: '',
        description: '',
        isRequired: false,
    }

    const validationSchema = yup.object({
        // businessName: yup.string().required("Some error occured!"),
        // abn: yup.string().required("Some error occured!"),
        // businessPhoneNumber: yup.string().required("Some error occured!"),
    })

    const onSubmit = async (values) => {
        Console('values', values)
        setIsDocxSubmitting(true)

        await addFolder({
            custom: {
                ...values,
                type: values.type.value,
                course: courseID,
            },
            selectedFolderIds,
            industry: 1,
        })
        // getCustomFieldData(values);
    }
    return (
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
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <InputField
                                    label={'Name'}
                                    name={'name'}
                                    placeholder={'Document Name...'}
                                    touched={touched}
                                    errors={errors}
                                />
                                <Select
                                    label={'Type'}
                                    fileupload={setFieldValue}
                                    name={'type'}
                                    options={[
                                        { value: 'docs', label: 'Docx' },
                                        { value: 'images', label: 'Images' },
                                        { value: 'videos', label: 'Videos' },
                                    ]}
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
                                        setFieldValue={setFieldValue}
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
                                    loading={isLoading}
                                    disabled={isLoading}
                                >
                                    Add Requirement
                                </Button>
                                <Button variant={'secondary'}>Cancel</Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
