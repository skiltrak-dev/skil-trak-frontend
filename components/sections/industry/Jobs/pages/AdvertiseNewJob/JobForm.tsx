import * as yup from 'yup'
import { Button } from 'components'

import { InputField } from 'components'
import { SelectFieldOption } from 'components'
import { Typography } from 'components'

import { Formik, Form } from 'formik'
import { Textarea } from 'components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// query
import { Loading } from 'components'

const jobType = [
    {
        value: 'fullTime',
        label: 'Full Time',
    },
    {
        value: 'partTime',
        label: 'Part Time',
    },
    {
        value: 'temporary',
        label: 'Temporary & Casual',
    },
]

export const JobForm = ({ editValues, onSubmit, submitting, editing }) => {
    const [defaultValue, setDefaultValue] = useState(null)

    useEffect(() => {
        if (editValues.data && editValues.isSuccess) {
            setDefaultValue(
                jobType.find(
                    (type) => type.value === editValues.data.employmentType
                )
            )
        }
    }, [editValues])

    const initialValues = {
        // Job Info
        title: '',
        employmentType: '',
        vacancies: '',
        salaryFrom: '',
        salaryTo: '',

        // Contact Info
        phone: '',
        email: '',
        website: '',

        // Address Info
        addressLine1: '',
        description: '',
        addressLine2: '',
        zipCode: '',
        suburb: '',
        state: '',

        // Employer Info
        contactPerson: '',
    }
    const validationSchema = yup.object({
        // Job Validation
        title: yup.string().required('Must provide a meaningful job title'),
        vacancies: yup
            .number()
            .min(1, 'Vacancies must be greater than 0')
            .positive("Vacancies can't be negative")
            .required('Please provide vacancies for your job'),
        salaryFrom: yup
            .number()
            .min(1, 'Salary from range must be greater than 0')
            .positive("Salary from can't be negative")
            .required('Please provide salary for your job'),
        salaryTo: yup
            .number()
            .min(1, 'Salary to range must be greater than 0')
            .positive("Salary to can't be negative")
            .required('Please provide salary for your job'),

        // Contact Validation
        phone: yup.string().required('Some error occured!'),
        email: yup.string().email('Invalid Email').required('Required!'),
        website: yup.string().required('Some error occured!'),

        // Address Validation
        addressLine1: yup.string().required('Some error occured!'),
        addressLine2: yup.string().required('Some error occured!'),
        zipCode: yup.string().required('Some error occured!'),
        suburb: yup.string().required('Some error occured!'),
        state: yup.string().required('Some error occured!'),
    })

    return !editValues.isLoading ? (
        <Formik
            initialValues={editValues?.data || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {(props) => {
                const { touched, errors, setFieldValue } = props
                return (
                    <Form>
                        <div className="mb-8">
                            <div className="mb-3 pb-2 border-b">
                                <Typography variant={'muted'} color={'gray'}>
                                    Job Details
                                </Typography>
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                <InputField
                                    label={'Job Title'}
                                    name={'title'}
                                    // placeholder={"Your Job Title..."}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />

                                <SelectFieldOption
                                    label={'Employment Type'}
                                    setFieldValue={setFieldValue}
                                    name={'employmentType'}
                                    {...(defaultValue
                                        ? {
                                              defaultValue: defaultValue,
                                          }
                                        : {})}
                                    options={jobType}
                                    onlyValue
                                />

                                <InputField
                                    label={'Vacancies'}
                                    name={'vacancies'}
                                    type={'number'}
                                    placeholder={'Vacancies...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />
                                <InputField
                                    label={'Salary From'}
                                    name={'salaryFrom'}
                                    type={'number'}
                                    placeholder={'Salary From...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />
                                <InputField
                                    label={'Salary To'}
                                    name={'salaryTo'}
                                    type={'number'}
                                    placeholder={'Salary To...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />

                                <Textarea
                                    label={'Job Description'}
                                    name={'description'}
                                    placeholder={'Job Description'}
                                    touched={touched}
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="mb-3 pb-2 border-b">
                                <Typography variant={'muted'} color={'gray'}>
                                    Contact Details
                                </Typography>
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                <InputField
                                    label={'Phone'}
                                    name={'phone'}
                                    placeholder={'Phone...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />
                                <InputField
                                    label={'Email'}
                                    name={'email'}
                                    type={'email'}
                                    placeholder={'Email...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />

                                <InputField
                                    label={'Website'}
                                    name={'website'}
                                    type={'url'}
                                    placeholder={'Website...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="mb-3 pb-2 border-b">
                                <Typography variant={'muted'} color={'gray'}>
                                    Address Details
                                </Typography>
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                <InputField
                                    label={'Address 1'}
                                    name={'addressLine1'}
                                    placeholder={'Address Line 1...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />
                                <InputField
                                    label={'Address 2'}
                                    name={'addressLine2'}
                                    placeholder={'Address Line 2...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />
                                <InputField
                                    label={'Zip Code'}
                                    name={'zipCode'}
                                    placeholder={'Zip Code...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />
                                <InputField
                                    label={'Suburb'}
                                    name={'suburb'}
                                    placeholder={'Suburb...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />
                                <InputField
                                    label={'State'}
                                    name={'state'}
                                    placeholder={'State...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="mb-3 pb-2 border-b">
                                <Typography variant={'muted'} color={'gray'}>
                                    Employer Detail
                                </Typography>
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 mt-2 mb-6">
                                <InputField
                                    label={'Contact Person'}
                                    name={'contactPerson'}
                                    placeholder={'Contact Person...'}
                                    touched={touched}
                                    errors={errors}
                                    errorIcons
                                />
                            </div>
                        </div>

                        <Button
                            submit
                            loading={submitting}
                            disabled={submitting}
                            text={`${editing ? 'Update' : 'Save'} Job`}
                            variant={editing ? 'secondary' : 'primary'}
                        />
                    </Form>
                )
            }}
        </Formik>
    ) : (
        <Loading />
    )
}
