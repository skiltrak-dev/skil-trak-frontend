import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Select, TextArea, TextInput } from '@components'
import { useEffect } from 'react'
import { Country } from 'country-state-city'

export const WorkBaseQueryForm = ({
    onSubmit,
    result,
}: {
    result: any
    onSubmit: (values: any) => void
}) => {
    console.log({ Country: Country.getAllCountries() })
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Name is required!'),
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
        phone: Yup.number()
            .typeError('Phone must be a valid number')
            .required('Phone is required!'),
        dob: Yup.string().required('DOB is required!'),
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
                                onlyValue
                                name={'country'}
                                label={'Country'}
                                options={CountryOptions}
                                placeholder={'Your Country here...'}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-3">
                            <TextInput
                                label={'Course'}
                                name={'course'}
                                placeholder={'Your Course here...'}
                                validationIcons
                                required
                            />
                            <TextInput
                                label={'Institution/College Name'}
                                name={'institute'}
                                placeholder={
                                    'Your Institution/College Name here...'
                                }
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
