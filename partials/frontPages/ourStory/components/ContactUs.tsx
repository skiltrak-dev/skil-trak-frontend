import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { Typography } from '@components/Typography'
import { Button } from '@components/buttons'
import { TextArea, TextInput } from '@components/inputs'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
export const ContactUs = () => {
    const { notification } = useNotification()
    const [sendUsQuery, sendUsQueryResult] =
        CommonApi.Messages.ourStoryContactUs()
    const validationSchema = yup.object({
        name: yup
            .string()
            //    .matches(onlyAlphabets(), 'Please enter valid name')
            .required('Must provide your name'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),
        phone: yup.string().required('Must provide Phone'),

        designation: yup.string().required('Must provide Designation'),
    })
    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = async (data: any) => {
        const res: any = await sendUsQuery(data)
        if (res?.data) {
            notification.success({
                title: 'Query Sent',
                description: `Your query sent successfully.`,
            })
            formMethods.reset()
        }
    }
    return (
        <div className="w-full">
            <ShowErrorNotifications result={sendUsQueryResult} />
            <div className="">
                <div className="w-full">
                    <div className="mb-3">
                        <Typography variant="h4">Avail the offer now</Typography>
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
                                    name="phone"
                                    placeholder="Phone"
                                />
                                <TextInput
                                    color="bg-[#F1DBC6] bg-opacity-25"
                                    name="designation"
                                    placeholder="Designation"
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
