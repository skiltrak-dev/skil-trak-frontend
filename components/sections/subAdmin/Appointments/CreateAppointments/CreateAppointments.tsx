import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

// Icons
import { BsDot } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'
import { FiArrowRight } from 'react-icons/fi'

// components
import { CreateAppointmentCard } from './components'
import { TimeSlots } from '@components/sections/student'
import { Card, Typography, Button, TextInput } from '@components'
import { AppointmentFor, AppointmentWithData } from './appointmentData'

export const CreateAppointments = () => {
    const [selectedAppointmentFor, setSelectedAppointmentFor] = useState<
        string | null
    >(null)
    const [appointmentWith, setAppointmentWith] = useState<any[] | null>(null)
    const [selectedAppointmentWith, setSelectedAppointmentWith] = useState<
        string | null
    >(null)
    const [selectedAppointmentType, setSelectedAppointmentType] = useState<
        string | null
    >(null)

    useEffect(() => {
        setAppointmentWith(
            AppointmentWithData.filter((f) =>
                f.type.includes(selectedAppointmentFor || '')
            )
        )
        setSelectedAppointmentWith(null)
    }, [selectedAppointmentFor])

    const formMethods = useForm({
        mode: 'all',
    })

    const onSubmit = (values: any) => {}

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-2">
                    <Card>
                        <div className="grid grid-cols-7">
                            <div className="col-span-3">
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    Book Appointment For
                                </Typography>
                                <div className="flex justify-between items-center gap-x-3">
                                    {AppointmentFor.map(({ text, icon }) => (
                                        <CreateAppointmentCard
                                            key={text}
                                            text={text}
                                            icon={icon}
                                            selected={selectedAppointmentFor}
                                            onClick={() => {
                                                setSelectedAppointmentFor(text)
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-x-0.5 col-span-1">
                                <BiMinus className="text-gray-400" />
                                <BiMinus className="text-gray-400" />
                                <BiMinus className="text-gray-400" />
                                <FiArrowRight className="text-gray-400" />
                            </div>
                            <div className="col-span-3">
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    Book Appointment For
                                </Typography>
                                <div className="flex justify-between items-center gap-x-3">
                                    {appointmentWith?.map(({ text, icon }) => (
                                        <CreateAppointmentCard
                                            key={text}
                                            text={text}
                                            icon={icon}
                                            selected={selectedAppointmentWith}
                                            onClick={() => {
                                                setSelectedAppointmentWith(text)
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Select Industry
                        </Typography>
                        <div>
                            <div className="grid grid-cols-3 gap-x-5 my-5">
                                <TextInput
                                    label={'Search BY Name'}
                                    name={'name'}
                                    placeholder={'Search BY Name...'}
                                    validationIcons
                                />
                                <TextInput
                                    label={'Search BY Code'}
                                    name={'name'}
                                    placeholder={'Search BY Code...'}
                                    validationIcons
                                />
                                <TextInput
                                    label={'Search BY Email'}
                                    name={'name'}
                                    placeholder={'Search BY Email...'}
                                    validationIcons
                                />
                            </div>

                            {/*  */}
                            <div className="bg-gray-100 px-6 py-4 rounded-lg flex justify-between items-center">
                                <div className="flex items-center relative">
                                    <div className="flex items-center gap-x-2">
                                        <img
                                            className="rounded-full w-7 h-7"
                                            src={
                                                'https://picsum.photos/100/100'
                                            }
                                            alt={''}
                                        />
                                        <div>
                                            <div className="flex items-center gap-x-1">
                                                <Typography variant={'xs'}>
                                                    20930
                                                </Typography>
                                                <BsDot className="text-gray-400" />
                                                <Typography
                                                    variant={'xs'}
                                                    color={'text-success-dark'}
                                                >
                                                    Completed
                                                </Typography>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                                <Typography
                                                    variant={'label'}
                                                    color={'gray'}
                                                >
                                                    <span className="font-semibold">
                                                        Raminder Kaur Sharma
                                                    </span>
                                                </Typography>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                                <Typography
                                                    variant={'muted'}
                                                    color={'text-gray-500'}
                                                >
                                                    k_thabal@yahoo.co.in
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*  */}
                                <div>
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-400'}
                                    >
                                        Phone
                                    </Typography>
                                    <Typography
                                        variant={'label'}
                                        color={'text-gray-700'}
                                    >
                                        0401748554
                                    </Typography>
                                </div>

                                {/*  */}
                                <div>
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-400'}
                                    >
                                        Address
                                    </Typography>
                                    <Typography
                                        variant={'label'}
                                        color={'text-gray-700'}
                                    >
                                        Wallan, Vic 3756
                                    </Typography>
                                </div>

                                {/*  */}
                                <div>
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-400'}
                                    >
                                        RTO
                                    </Typography>
                                    <Typography
                                        variant={'label'}
                                        color={'text-gray-700'}
                                    >
                                        Job Training Institute
                                    </Typography>
                                </div>

                                {/*  */}
                                <div className="bg-primary-light px-5 py-1 flex items-center gap-x-2 rounded">
                                    <BsDot className="text-primary" />
                                    <Typography
                                        variant={'xs'}
                                        color={'text-primary'}
                                    >
                                        Request Sent
                                    </Typography>
                                </div>
                            </div>

                            {/*  */}
                            <div className="mt-5">
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    Book Appointment For
                                </Typography>
                                <div className="grid grid-cols-3 gap-x-5 mb-2">
                                    <TextInput
                                        label={'Name'}
                                        name={'name'}
                                        placeholder={'Name...'}
                                        validationIcons
                                    />
                                    <TextInput
                                        label={'Email'}
                                        name={'email'}
                                        placeholder={'Email...'}
                                        validationIcons
                                    />
                                    <TextInput
                                        label={'Phone'}
                                        name={'phone'}
                                        placeholder={'Phone...'}
                                        validationIcons
                                    />
                                </div>
                                <TextInput
                                    label={'Address'}
                                    name={'address'}
                                    placeholder={'Address...'}
                                    validationIcons
                                />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <Typography variant={'label'}>
                            What kind of appointment you want to book?
                        </Typography>
                        <div className="flex justify-between items-center gap-x-3 w-5/12">
                            {[
                                'Industry Consultation',
                                'Placement Strategy',
                            ].map((text) => (
                                <CreateAppointmentCard
                                    key={text}
                                    text={text}
                                    selected={selectedAppointmentType}
                                    onClick={() => {
                                        setSelectedAppointmentType(text)
                                    }}
                                />
                            ))}
                        </div>

                        {/*  */}
                        <div className="my-5">
                            <Typography
                                variant={'small'}
                                color={'text-gray-500'}
                            >
                                Select Time Slot
                            </Typography>
                            <TimeSlots
                                daysAvailability={[1]}
                                timeAvailability={['']}
                                setSelectedDate={() => {}}
                                selectedDate={new Date()}
                                setSelectedTime={() => {}}
                                selectedTime={''}
                                coordinatorAvailability={''}
                            />
                        </div>
                        <TextInput
                            name="notes"
                            label={'Notes'}
                            placeholder={'Notes'}
                        />
                        <div className="mt-4">
                            <Button
                                text={'Book Appointment'}
                                variant={'info'}
                            />
                        </div>
                    </Card>
                </div>
            </form>
        </FormProvider>
    )
}
