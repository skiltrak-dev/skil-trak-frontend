import { Button, Select, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { ageOptions } from '@utils'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
// import { Turnstile } from '@marsidev/react-turnstile'

export const WorkBaseQueryForm = ({
    onSubmit,
    result,
}: {
    result: any
    onSubmit: (values: any) => void
}) => {
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Name is required!'),
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
        phone: Yup.number()
            .typeError('Phone must be a valid number')
            .required('Phone is required!'),
        age: Yup.string().required('DOB is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    useEffect(() => {
        if (result?.isSuccess) {
            methods.reset()
            setCaptchaToken(null)
        }
    }, [result])

    const handleSubmit = (values: any) => {
        if (!captchaToken) {
            alert('Please complete the captcha verification.')
            return
        }

        onSubmit({ ...values, captchaToken })
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(handleSubmit)}
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
                            <Select
                                label={'Select Age'}
                                name={'age'}
                                options={ageOptions}
                                placeholder={'Select Age...'}
                                validationIcons
                                onlyValue
                            />
                        </div>

                        {/*  */}
                        <div className="flex flex-col gap-y-3">
                            <TextInput
                                label={'Hours'}
                                name={'hours'}
                                placeholder={'Your Hours here...'}
                                validationIcons
                                required
                                type="number"
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
                                label={'Institution/RTO Name'}
                                name={'institute'}
                                placeholder={
                                    'Your Institution/RTO Name here...'
                                }
                                validationIcons
                                required
                            />
                        </div>
                    </div>
                    {/* <div className="mt-4 flex justify-center">
                        <Turnstile
                            siteKey={`${process.env.cloudflareSiteKey}`}
                            onSuccess={(token: any) => setCaptchaToken(token)}
                        />
                    </div> */}
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
