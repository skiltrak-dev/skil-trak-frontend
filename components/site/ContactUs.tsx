import { Typography } from '@components/Typography'
import { TextArea, TextInput } from '@components/inputs'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@components/buttons'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CommonApi } from '@queries'
import { useEffect } from 'react'
import { useNotification } from '@hooks'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
export const ContactUs = ({ contactUsRef }: any) => {
    const { notification } = useNotification()
    const [sendUsQuery, sendUsQueryResult] = CommonApi.Messages.useContactUs()
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
        if (sendUsQueryResult.isSuccess) {
            notification.success({
                title: 'Query Sent',
                description: `Your query sent successfully.`,
            })
        }
    }, [sendUsQueryResult.isSuccess])
    const onSubmit = (data: any) => {
        sendUsQuery(data)
    }
    return (
        <div ref={contactUsRef} className="md:p-24 px-4 py-8">
            <ShowErrorNotifications result={sendUsQueryResult} />
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-y-10 md:gap-x-20 md:justify-between">
                <div className="md:w-2/3 w-full">
                    <div className="mb-2">
                        <h2 className="md:text-[64px] text-5xl  font-bold">
                            Lets Talk
                        </h2>
                        <p className="md:text-[48px] text-3xl font-medium">
                            Tell us about you!
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-y-4 md:gap-x-20 mt-4">
                        <div className="flex items-center gap-x-4">
                            <div className="p-4 rounded-2xl bg-[#F1DBC6]">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <Typography variant="label">
                                    Call us at
                                </Typography>
                                <Typography
                                    variant="subtitle"
                                    color="text-[#EA9037]"
                                >
                                    03-9363-6378
                                </Typography>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className="p-4 rounded-2xl bg-[#F1DBC6]">
                                <MdOutlineAlternateEmail />
                            </div>
                            <div>
                                <Typography variant="label">
                                    Mail us at
                                </Typography>
                                <Typography
                                    variant="subtitle"
                                    color="text-[#EA9037]"
                                >
                                    info@skiltrak.com.au
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/3 w-full">
                    <div className="mb-3">
                        <Typography variant="h4">Send Us A Message</Typography>
                    </div>
                    <FormProvider {...formMethods}>
                        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                            <div className="flex flex-col w-full">
                                <TextInput
                                    color="bg-[#F1DBC6] bg-opacity-25"
                                    name="name"
                                    placeholder="Name"
                                />
                                <TextInput
                                    color="bg-[#F1DBC6] bg-opacity-25"
                                    name="email"
                                    placeholder="Email"
                                />
                                <TextInput
                                    color="bg-[#F1DBC6] bg-opacity-25"
                                    name="subject"
                                    placeholder="Subject"
                                />
                                <Typography variant="label">
                                    Tell us about your query
                                </Typography>
                                <TextArea
                                    color="bg-[#F1DBC6] bg-opacity-25"
                                    rows={5}
                                    name="message"
                                    placeholder="Message"
                                />
                            </div>
                            <Button
                                text={'Submit'}
                                submit
                                disabled={sendUsQueryResult?.isLoading}
                                loading={sendUsQueryResult?.isLoading}
                            />
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}
