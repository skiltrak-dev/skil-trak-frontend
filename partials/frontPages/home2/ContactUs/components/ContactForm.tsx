import { Button, TextArea, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
// import { Turnstile } from '@marsidev/react-turnstile'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const ContactForm = ({
    onSubmit,
    result,
}: {
    onSubmit: (values: any) => void
    result: any
}) => {
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const validationSchema = yup.object({
        name: yup
            .string()
            //    .matches(onlyAlphabets(), 'Please enter valid name')
            .required('Must provide your name'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),
        subject: yup.string().required('Must provide Subject'),

        message: yup.string().required('Must provide Message'),
    })
    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (result?.isSuccess) {
            formMethods.reset()
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
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
                    <div className="flex flex-col w-full">
                        <div
                        //  data-aos="fade-left"
                        >
                            <TextInput
                                color="bg-[#F1DBC6] bg-opacity-25"
                                name="name"
                                placeholder="Name"
                                label={'Full Name'}
                            />
                        </div>
                        <div
                        // data-aos="fade-left"
                        >
                            <TextInput
                                color="bg-[#F1DBC6] bg-opacity-25"
                                name="email"
                                placeholder="Email"
                                label={'Email Address'}
                            />
                        </div>
                        <div
                        // data-aos="fade-left"
                        >
                            <TextInput
                                color="bg-[#F1DBC6] bg-opacity-25"
                                name="subject"
                                placeholder="Subject"
                                label={'Subject'}
                            />
                        </div>

                        <div
                        // data-aos="fade-left"
                        >
                            <TextArea
                                color="bg-[#F1DBC6] bg-opacity-25"
                                rows={6}
                                name="message"
                                placeholder="Message"
                                label={'Messages'}
                            />
                        </div>
                    </div>
                    {/* <div className="my-4 flex justify-center">
                        <Turnstile
                            siteKey={`${process.env.cloudflareSiteKey}`}
                            onSuccess={(token: any) => setCaptchaToken(token)}
                        />
                    </div> */}

                    <div
                        // data-aos="fade-left"
                        className="w-full md:w-2/3 mx-auto"
                    >
                        <Button
                            text={'Submit'}
                            submit
                            fullWidth
                            disabled={result?.isLoading}
                            loading={result?.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
