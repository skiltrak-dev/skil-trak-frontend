import React from 'react'
import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { Button } from 'components/buttons/Button'
import { Select, TextInput, RadioButton, RadioGroup } from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// components
import { Card, Typography } from 'components'
type PersonalInfoProps = {
    setActive: any
}
export const PersonalInfo = ({ setActive }: PersonalInfoProps) => {
    const initialValues = {
        course: '',
        currentQualification: '',
        currentWork: '',
        haveTransport: '',
        haveDrivingLicense: '',
        preferableLocation: '',
    }

    const validationSchema = yup.object({
        // course: yup.string().required('Must provide course'),
        // currentQualification: yup
        //     .string()
        //     .required('Must provide currentQualification'),
        // currentWork: yup.string().required('Must provide currentWork'),
        // haveTransport: yup.string().required('Must provide haveTransport'),
        // haveDrivingLicense: yup
        //     .string()
        //     .required('Must provide haveDrivingLicense'),
        // preferableLocation: yup
        //     .string()
        //     .required('Must provide preferableLocation'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (values: any) => {
        console.log('values', values)
        setActive((active: number) => active + 1)
    }

    return (
        <div>
            <Typography variant={'label'}>
                Please provide following information
            </Typography>
            <Card>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div>
                            <Select
                                id="course"
                                placeholder="Select Your Choice"
                                name="course"
                                label="Course"
                                options={[
                                    { value: '1', label: 'Option 1' },
                                    { value: '2', label: 'Option 2' },
                                    { value: '3', label: 'Option 3' },
                                    { value: '4', label: 'Option 4' },
                                ]}
                            />
                        </div>
                        <div className="flex gap-x-2 mt-4">
                            <TextInput
                                name="currentQualification"
                                label="Current Qualification"
                                placeholder="Current Qualification"
                            />
                            <TextInput
                                name="currentWork"
                                label="Current Work"
                            />
                        </div>
                        <div className=" flex mb-5">
                            <RadioGroup
                                gridColumns="2"
                                layout="grid"
                                // value={'yes'}
                                name="haveTransport"
                                label="Do you have your own transport?"
                                options={[
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
                                ]}
                            />
                            <RadioGroup
                                gridColumns="2"
                                layout="grid"
                                // value={'yes'}
                                name="haveDrivingLicense"
                                label="Do you have Australian driving license?"
                                options={[
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
                                ]}
                            />
                        </div>
                        <div>
                            <TextInput
                                name="preferableLocation"
                                label="Preferable Location"
                                placeholder="Preferable Location"
                            />
                        </div>
                        <Button text={'Continue'} submit />
                    </form>
                </FormProvider>
            </Card>

            {/* 
<Card>
                <Formik
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                >
                    {({ touched, errors, setFieldValue, values }) => {
                        return (
                            <Form>
                                <div className="grid grid-cols-2 gap-2">
                                    <SelectFieldOption
                                        label={'Select a Course'}
                                        setFieldValue={setFieldValue}
                                        name={'course'}
                                        options={[
                                            {
                                                label: 'Saad',
                                                value: 'Saad',
                                            },
                                        ]}
                                        touched={touched}
                                        errors={errors}
                                        errorIcons
                                        onlyValue
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <InputField
                                        label={'Current Qualification'}
                                        name={'currentQualification'}
                                        placeholder={
                                            'Your Current Qualification...'
                                        }
                                        touched={touched}
                                        errors={errors}
                                        errorIcons
                                        required
                                    />
                                    <InputField
                                        label={'Current Work'}
                                        name={'currentWork'}
                                        placeholder={'Your Current Work...'}
                                        touched={touched}
                                        errors={errors}
                                        errorIcons
                                        required
                                    />
                                    <div>
                                        <Typography variant={'label'}>
                                            Do you have your own transport?
                                        </Typography>
                                        <div className="grid grid-cols-2">
                                            <RadioButton
                                                name={'haveTransport'}
                                                value={'Yes'}
                                            />
                                            <RadioButton
                                                name={'haveTransport'}
                                                value={'No'}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Typography variant={'label'}>
                                            Do you have Australian driving
                                            license?
                                        </Typography>
                                        <div className="grid grid-cols-2">
                                            <RadioButton
                                                name={'haveDrivingLicense'}
                                                value={'Yes'}
                                            />
                                            <RadioButton
                                                name={'haveDrivingLicense'}
                                                value={'No'}
                                            />
                                        </div>
                                    </div>

                                    <InputField
                                        label={'Preferable Location'}
                                        name={'preferableLocation'}
                                        placeholder={
                                            'Your Preferable Location...'
                                        }
                                        touched={touched}
                                        errors={errors}
                                        errorIcons
                                        required
                                    />
                                </div>

                                <Button text={'Continue'} submit />
                            </Form>
                        )
                    }}
                </Formik>
            </Card> */}
        </div>
    )
}
