import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Country } from 'country-state-city'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, Select, TextArea, TextInput } from '@components'

export const UpskillForm = ({
    onSubmit,
    result,
}: {
    result: any
    onSubmit: (values: any) => void
}) => {
    const [selectedCountry, setSelectedCountry] = useState('')
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Name is required!'),
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
        phone: Yup.number()
            .typeError('Phone must be a valid number')
            .required('Phone is required!'),
        dob: Yup.string().required('DOB is required!'),
        country: Yup.string().required('Country is required!'),
        program: Yup.string().required('Program is required!'),
        qualification: Yup.string().required('Qualification is required!'),
        experience: Yup.string().required('Experience is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    useEffect(() => {
        if (result?.isSuccess) {
            methods.reset()
        }
    }, [result])

    const CountryOptions = Country.getAllCountries()?.map((country) => ({
        label: country?.name,
        value: country?.name,
    }))
    let typeOptions: any = []
    if (selectedCountry === 'Philippines' || selectedCountry === 'Mauritius') {
        typeOptions = [
            { label: 'RPL', value: 'rpl' },
            { label: '407', value: '407' },
        ]
    } else if (selectedCountry === 'France') {
        typeOptions = [
            { label: 'Internship', value: 'internship' },
            { label: 'Jobs', value: 'jobs' },
        ]
    } else if (selectedCountry === 'Australia') {
        typeOptions = [{ label: 'Placement', value: 'placement' }]
    }
    console.log('selectedCountry', selectedCountry)

    return (
        <div>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-3">
                            <TextInput
                                label={'Full Name'}
                                name={'fullName'}
                                placeholder={'Input your full name in here...'}
                                validationIcons
                                required
                            />
                            <TextInput
                                label={'Email Address'}
                                name={'email'}
                                type={'email'}
                                placeholder={'Your Email Here...'}
                                validationIcons
                                required
                            />
                            <TextInput
                                label={'Phone Number'}
                                name={'phone'}
                                placeholder={'Your Phone Number Here...'}
                                validationIcons
                                required
                            />
                            <TextInput
                                label={'Date of birth'}
                                name={'dob'}
                                type={'date'}
                                placeholder={'Your Date of birth here...'}
                                validationIcons
                                required
                            />
                        </div>

                        {/*  */}
                        <div className="flex flex-col gap-y-3">
                            <Select
                                label={'Country'}
                                name={'country'}
                                options={CountryOptions}
                                placeholder={'Your Country here...'}
                                onlyValue
                                onChange={(e: any) => {
                                    setSelectedCountry(e)
                                }}
                                required
                            />
                            {/* <Select label={'Type'} name={'type'} /> */}
                            <Select
                                label={'Program'}
                                name={'program'}
                                options={typeOptions}
                                placeholder={'Select Program...'}
                                onlyValue
                                disabled={
                                    selectedCountry === '' ||
                                    selectedCountry === undefined
                                }
                            />
                            <TextArea
                                label={
                                    'Do you have any qualifications in the fields we offer?'
                                }
                                name={'qualification'}
                                placeholder={'Write your Answer in here...'}
                                validationIcons
                                required
                            />
                            <TextArea
                                label={
                                    'How much experience do you have in your relevant field?'
                                }
                                name={'experience'}
                                placeholder={'Write your Answer in here...'}
                                validationIcons
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between w-3/5 mx-auto">
                        <Button
                            fullWidth
                            submit
                            loading={result?.isLoading}
                            disabled={result?.isLoading}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
