import { Typography } from '@components/Typography'
import { Button } from '@components/buttons'
import { TextArea, TextInput } from '@components/inputs'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { getUserCredentials } from '@utils'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const RaiseConcernModal = ({ onCloseModal }: any) => {
    const { notification } = useNotification()
    const [sendConcern, sendConcernResult] = CommonApi.Messages.useContactUs()
    const user = getUserCredentials()

    const validationSchema = yup.object({
        name: yup.string().required('Must provide your name'),
        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),
        subject: yup.string().required('Must provide Subject'),
        phone: yup.string().required('Must provide Phone'),
        message: yup.string().required('Must provide your concern details'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: '',
            subject: '',
            message: '',
        },
    })

    const onSubmit = (data: any) => {
        sendConcern({
            ...data,
            subject: `CONCERN: ${data.subject}`, // Prefix to identify concerns
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Concern Submitted',
                    description: `Your concern has been submitted successfully. We will get back to you soon.`,
                })
                formMethods.reset()
                onCloseModal()
            }
        })
    }

    const handleSubmit = (values: any) => {
        onSubmit(values)
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <div className="mb-4">
                <Typography variant="h4">Raise a Concern</Typography>
                <Typography variant="body" color="text-gray-600">
                    Share your concerns with us and we'll address them promptly.
                </Typography>
            </div>

            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
                    <div className="flex flex-col w-full space-y-4">
                        <div className="hidden">
                            <TextInput
                                color="bg-[#F1DBC6] bg-opacity-25"
                                name="name"
                                placeholder="Your Name"
                            />
                            <TextInput
                                color="bg-[#F1DBC6] bg-opacity-25"
                                name="email"
                                placeholder="Your Email"
                            />
                            <TextInput
                                color="bg-[#F1DBC6] bg-opacity-25"
                                name="phone"
                                placeholder="Your Phone"
                            />
                        </div>
                        <TextInput
                            color="bg-[#F1DBC6] bg-opacity-25"
                            name="subject"
                            placeholder="Concern Subject"
                        />
                        <div>
                            <Typography variant="label">
                                Describe your concern in detail
                            </Typography>
                            <TextArea
                                color="bg-[#F1DBC6] bg-opacity-25"
                                rows={5}
                                name="message"
                                placeholder="Please provide detailed information about your concern..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <Button
                            text="Cancel"
                            variant="secondary"
                            onClick={onCloseModal}
                        />
                        <Button
                            text="Submit Concern"
                            submit
                            disabled={sendConcernResult?.isLoading}
                            loading={sendConcernResult?.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
