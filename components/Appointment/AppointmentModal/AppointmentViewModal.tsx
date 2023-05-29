import { getAppointmentTypeIcon } from '@partials/appointmentType/AppointmentTypeCard'
import moment from 'moment'
import Image from 'next/image'
import { FaExclamationTriangle, FaMapMarkerAlt, FaTimes } from 'react-icons/fa'
import { GoPrimitiveDot } from 'react-icons/go'
import { UserRoles } from '@constants'
import { Typography } from '@components/Typography'
import { UserCellInfo } from './UserCellInfo'

import { CommonApi } from '@queries'
import { NoData } from '@components/ActionAnimations'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { StudentRtoCellInfo } from './StudentRtoCellInfo'

export const AppointmentViewModal = ({
    id,
    onCancel,
}: {
    id: number
    onCancel: any
}) => {
    const appointment = CommonApi.Appointments.appointmentDetail(id, {
        skip: !id,
    })

    console.log('appointment', appointment)
    return (
        <>
            <div className="fixed w-full h-screen bg-black/50 top-0 left-0 z-[1000] flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-md min-w-[500px]">
                    {appointment.isError && (
                        <div className="relative">
                            <NoData
                                text={'No Appointment were found, try reload'}
                            />
                            <div className="absolute top-0 right-0">
                                <button
                                    onClick={onCancel}
                                    className="p-4 text-lg text-gray-400 hover:text-gray-600"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                    )}
                    {appointment?.isLoading ? (
                        <LoadingAnimation />
                    ) : (
                        appointment?.isSuccess && (
                            <>
                                <div className="pl-4 py-2 flex justify-between items-center border-b">
                                    <div>
                                        <p className="text-md font-semibold">
                                            Appointment Detail
                                        </p>
                                        <p className="text-sm font-medium text-gray-400">
                                            Detail for appointment you have
                                            selected
                                        </p>
                                    </div>
                                    <button
                                        onClick={onCancel}
                                        className="p-4 text-lg text-gray-400 hover:text-gray-600"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>

                                <div className="h-[80vh] overflow-auto custom-scrollbar">
                                    <div className="flex border-b">
                                        {/* Type & With */}
                                        <div className="border-r px-8 py-4">
                                            <div>
                                                <p className="text-xs font-medium text-slate-400 mb-2">
                                                    Appointment Type
                                                </p>
                                                <div className="flex items-center gap-x-2">
                                                    <div className="border p-2 rounded-md">
                                                        <Image
                                                            src={getAppointmentTypeIcon(
                                                                appointment
                                                                    ?.data?.type
                                                                    ?.title
                                                            )}
                                                            width={16}
                                                            height={16}
                                                            alt="appointment type"
                                                        />
                                                    </div>
                                                    <p className="text-lg font-semibold">
                                                        {
                                                            appointment?.data
                                                                ?.type?.title
                                                        }
                                                    </p>
                                                    <div
                                                        className={`w-4 h-4 rounded-full`}
                                                        style={{
                                                            backgroundColor: `${appointment?.data?.type?.color}`,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="my-4" />

                                            <div>
                                                <p className="text-xs font-medium text-slate-600">
                                                    Appointment Between
                                                </p>

                                                {/* Date & Time */}
                                                <div>
                                                    <UserCellInfo
                                                        user={
                                                            appointment?.data
                                                                ?.appointmentFor
                                                        }
                                                    />
                                                    <p className="text-sm text-gray-700 font-semibold">
                                                        and
                                                    </p>
                                                    <UserCellInfo
                                                        user={
                                                            appointment?.data
                                                                ?.appointmentBy
                                                        }
                                                    />
                                                    {/* <p className="text-md font-semibold">
                                    {appointment?.appointmentFor?.name}(
                                    {appointment?.appointmentFor?.role})
                                </p>
                                <p className="text-sm text-gray-600 font-semibold">
                                    and
                                </p>
                                <p className="text-md font-semibold">
                                    {appointment?.appointmentBy?.name}(
                                    {appointment?.appointmentBy?.role})
                                </p> */}
                                                    {/* <p className="text-sm font-medium text-slate-600">
                                    {appointment?.appointmentFor?.email ||
                                        appointment?.appointmentBy?.email}
                                </p> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-8 py-4">
                                            <div>
                                                <p className="text-xs font-medium text-slate-400">
                                                    Venue
                                                </p>

                                                {/* Date & Time */}
                                                <div>
                                                    <div className="">
                                                        <p className="text-xl font-bold">
                                                            {moment(
                                                                appointment
                                                                    ?.data
                                                                    ?.startTime,
                                                                'hh:mm:ss'
                                                            ).format(
                                                                'hh:mm a'
                                                            )}{' '}
                                                            -{' '}
                                                            {moment(
                                                                appointment
                                                                    ?.data
                                                                    ?.endTime,
                                                                'hh:mm:ss'
                                                            ).format('hh:mm a')}
                                                        </p>
                                                        <div className="flex items-center gap-x-2 -mt-1.5">
                                                            <p className="text-xs flex gap-x-1 items-center mt-0.5">
                                                                {/* <span className=" text-slate-300">
                                                <GoPrimitiveDot />
                                            </span> */}
                                                                <span className="text-indigo-500">
                                                                    ~
                                                                    {
                                                                        appointment
                                                                            ?.data
                                                                            ?.type
                                                                            ?.duration
                                                                    }{' '}
                                                                    Minutes
                                                                </span>
                                                            </p>
                                                            <p className="text-xs flex gap-x-1 items-center mt-0.5">
                                                                <span className=" text-slate-300">
                                                                    <GoPrimitiveDot />
                                                                </span>
                                                                <span className="text-orange-400">
                                                                    {
                                                                        appointment
                                                                            ?.data
                                                                            ?.type
                                                                            ?.breakDuration
                                                                    }{' '}
                                                                    Minutes
                                                                    Break
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="my-4" />
                                                    <p className="text-md font-medium text-slate-600">
                                                        {moment(
                                                            appointment?.data
                                                                ?.date
                                                        ).format(
                                                            'dddd, Do MMMM, YYYY'
                                                        )}
                                                    </p>

                                                    {/* <div className="mt-2 flex items-center gap-x-2">
                                    <span className="text-slate-300 text-sm">
                                        <FaMapMarkerAlt />
                                    </span>
                                    <p className="text-sm text-slate-400">
                                        Address Not Provided
                                    </p>
                                </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex border-b">
                                        {/* Type & With */}
                                        <div className="border-r px-8 py-4">
                                            <div>
                                                <p className="text-xs font-medium text-slate-400">
                                                    Course
                                                </p>
                                                {appointment?.data?.course ? (
                                                    <div className="">
                                                        <p className="text-sm">
                                                            {
                                                                appointment
                                                                    ?.data
                                                                    .course.code
                                                            }
                                                        </p>
                                                        <p className="text-md font-medium">
                                                            {
                                                                appointment
                                                                    ?.data
                                                                    .course
                                                                    .title
                                                            }
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-orange-500 text-xs font-medium flex items-center gap-x-2">
                                                        <span>
                                                            <FaExclamationTriangle />
                                                        </span>
                                                        <span>
                                                            No Course Was
                                                            Selected
                                                        </span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            {(appointment?.data.appointmentBy
                                                ?.role === UserRoles.STUDENT ||
                                                appointment?.data.appointmentFor
                                                    ?.role ===
                                                    UserRoles.STUDENT) && (
                                                <div>
                                                    <Typography
                                                        variant={'title'}
                                                    >
                                                        RTO
                                                    </Typography>
                                                    <StudentRtoCellInfo
                                                        rto={
                                                            appointment?.data
                                                                .appointmentFor
                                                                ?.student
                                                                ?.rto ||
                                                            appointment?.data
                                                                .appointmentBy
                                                                ?.student?.rto
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-4">
                                        <div>
                                            <p className="text-xs font-medium text-slate-500">
                                                Attached Note
                                            </p>

                                            {/* Date & Time */}
                                            <div>
                                                <p className="text-sm font-medium text-slate-600">
                                                    {appointment?.data.note}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    )}
                </div>
            </div>
        </>
    )
}
