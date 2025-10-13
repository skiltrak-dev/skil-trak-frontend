import { Button, TextArea, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
// import { Turnstile } from '@marsidev/react-turnstile'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const ContactFormV3 = ({
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
        // if (!captchaToken) {
        //     alert('Please complete the captcha verification.')
        //     return
        // }

        onSubmit({ ...values, captchaToken })
    }

    return (
        <div>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
                    <div className="flex flex-col py-10 ">
                        <div
                        //  data-aos="fade-left"
                        >
                            <TextInput
                                // color="border-white/20 bg-white/10 text-white"
                                name="name"
                                placeholder="Name"
                            />
                        </div>
                        <div
                        // data-aos="fade-left"
                        >
                            <TextInput
                                // color="border-white/20 bg-white/10 text-white"
                                name="email"
                                placeholder="Email"
                            />
                        </div>
                        <div
                        // data-aos="fade-left"
                        >
                            <TextInput
                                // color="border-white/20 bg-white/10 text-white"
                                name="subject"
                                placeholder="Subject"
                            />
                        </div>

                        <div
                        // data-aos="fade-left"
                        >
                            <TextArea
                                // color="border-white/20 bg-white/10 text-white"
                                rows={4}
                                name="message"
                                placeholder="Message"
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
                        className="flex justify-center"
                    >
                        <Button
                            text={'Submit'}
                            submit
                            disabled={result?.isLoading}
                            loading={result?.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
