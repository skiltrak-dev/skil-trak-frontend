import React, { useEffect } from 'react'
import { Button, Select, ShowErrorNotifications, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'

export const BookADemoForm = () => {
    const { notification } = useNotification()
    const [bookADemo, resultBookADemo] = CommonApi.WorkBased.useBookADemo()
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full name is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        rtoName: Yup.string().required('RTO name is required'),
        phoneNumber: Yup.string()
            .matches(/^\d+$/, 'Phone must contain only numbers')
            .min(7, 'Phone number is too short')
            .required('Phone number is required'),
        date: Yup.string().required('Date is required'),
        time: Yup.string().required('Time is required'),
        // aboutUs: Yup.string().required('This field is required'),
    })
    useEffect(() => {
        if (resultBookADemo.isSuccess) {
            notification.success({
                title: 'Request Submitted',
                description: 'Your request has been submitted successfully',
            })
        }
    }, [resultBookADemo.isSuccess])

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (data: any) => {
        // Convert date and time separately to ISO format
        const dateISO = new Date(data.date).toISOString()
        const timeISO = new Date(`1970-01-01T${data.time}`).toISOString()

        // const formattedData = {
        //     ...data,
        //     date: dateISO,
        //     time: timeISO,
        // }
        bookADemo(data)

        console.log('Submitted Data:', data)
    }

    return (
        <>
        <ShowErrorNotifications result={resultBookADemo} />
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="flex gap-x-12 items-center w-full">
                        <div className="flex flex-col gap-y-4">
                            <TextInput
                                name="fullName"
                                placeholder="Your Full Name"
                            />
                            <TextInput name="email" placeholder="Email" />
                            <TextInput
                                name="date"
                                type="date"
                                placeholder="Select Date"
                            />
                        </div>

                        <div className="flex flex-col gap-y-4">
                            <TextInput name="rtoName" placeholder="RTO Name" />
                            <TextInput
                                name="phoneNumber"
                                placeholder="Phone Number"
                            />
                            <TextInput
                                name="time"
                                type="time"
                                placeholder="Select Time"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <Select
                            name="aboutUs"
                            options={[
                                { label: 'LinkedIn', value: 'linkedin' },
                                { label: 'Google Search', value: 'google' },
                                { label: 'Facebook', value: 'facebook' },
                                {
                                    label: 'Word of Mouth',
                                    value: 'wordOfMouth',
                                },
                            ]}
                            placeholder="How did you hear about us?"
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button submit text="Submit" />
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
