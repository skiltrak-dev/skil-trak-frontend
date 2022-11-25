import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from 'components'
import {
    TextInput,
    Select,
    Typography,
    TextArea,
    LoadingAnimation,
} from '@components'

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

export const JobForm = ({ editValues, onSubmit, submitting, editing }: any) => {
    const [defaultValue, setDefaultValue] = useState<any | null | undefined>(
        null
    )

    useEffect(() => {
        if (editValues.data && editValues.isSuccess) {
            setDefaultValue(
                jobType?.find(
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

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    return !editValues.isLoading ? (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="mb-8">
                    <div className="mb-3 pb-2 border-b">
                        <Typography variant={'muted'} color={'gray'}>
                            Job Details
                        </Typography>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <TextInput
                            label={'Job Title'}
                            name={'title'}
                            // placeholder={"Your Job Title..."}
                            validationIcons
                        />

                        <Select
                            label={'Employment Type'}
                            name={'employmentType'}
                            {...(defaultValue
                                ? {
                                      defaultValue: defaultValue,
                                  }
                                : {})}
                            options={jobType}
                            onlyValue
                        />

                        <TextInput
                            label={'Vacancies'}
                            name={'vacancies'}
                            type={'number'}
                            placeholder={'Vacancies...'}
                            validationIcons
                        />
                        <TextInput
                            label={'Salary From'}
                            name={'salaryFrom'}
                            type={'number'}
                            placeholder={'Salary From...'}
                            validationIcons
                        />
                        <TextInput
                            label={'Salary To'}
                            name={'salaryTo'}
                            type={'number'}
                            placeholder={'Salary To...'}
                            validationIcons
                        />

                        <TextArea
                            label={'Job Description'}
                            name={'description'}
                            placeholder={'Job Description'}
                            validationIcons
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
                        <TextInput
                            label={'Phone'}
                            name={'phone'}
                            placeholder={'Phone...'}
                            validationIcons
                        />
                        <TextInput
                            label={'Email'}
                            name={'email'}
                            type={'email'}
                            placeholder={'Email...'}
                            validationIcons
                        />

                        <TextInput
                            label={'Website'}
                            name={'website'}
                            type={'url'}
                            placeholder={'Website...'}
                            validationIcons
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
                        <TextInput
                            label={'Address 1'}
                            name={'addressLine1'}
                            placeholder={'Address Line 1...'}
                            validationIcons
                        />
                        <TextInput
                            label={'Address 2'}
                            name={'addressLine2'}
                            placeholder={'Address Line 2...'}
                            validationIcons
                        />
                        <TextInput
                            label={'Zip Code'}
                            name={'zipCode'}
                            placeholder={'Zip Code...'}
                            validationIcons
                        />
                        <TextInput
                            label={'Suburb'}
                            name={'suburb'}
                            placeholder={'Suburb...'}
                            validationIcons
                        />
                        <TextInput
                            label={'State'}
                            name={'state'}
                            placeholder={'State...'}
                            validationIcons
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
                        <TextInput
                            label={'Contact Person'}
                            name={'contactPerson'}
                            placeholder={'Contact Person...'}
                            validationIcons
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
            </form>
        </FormProvider>
    ) : (
        <LoadingAnimation />
    )
}
