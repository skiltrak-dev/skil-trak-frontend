import { getAppointmentTypeIcon } from '@partials/appointmentType/AppointmentTypeCard'
import moment from 'moment'
import Image from 'next/image'
import { FaExclamationTriangle, FaMapMarkerAlt, FaTimes } from 'react-icons/fa'
import { GoPrimitiveDot } from 'react-icons/go'
import { UserRoles } from '@constants'
import { Typography } from '@components/Typography'

export const AppointmentViewModal = ({ appointment, onCancel }: any) => {
    return (
        <div className="fixed w-full h-screen bg-black/50 top-0 left-0 z-50 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-md min-w-[500px]">
                <div className="pl-4 py-2 flex justify-between items-center border-b">
                    <div>
                        <p className="text-md font-semibold">
                            Appointment Detail
                        </p>
                        <p className="text-sm font-medium text-gray-400">
                            Detail for appointment you have selected
                        </p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-4 text-lg text-gray-400 hover:text-gray-600"
                    >
                        <FaTimes />
                    </button>
                </div>

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
                                            appointment.type.title
                                        )}
                                        width={16}
                                        height={16}
                                        alt="appointment type"
                                    />
                                </div>
                                <p className="text-lg font-semibold">
                                    {appointment.type.title}
                                </p>
                                <div
                                    className={`w-4 h-4 rounded-full`}
                                    style={{
                                        backgroundColor: `${appointment.type.color}`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="my-4" />

                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Appointment With
                            </p>

                            {/* Date & Time */}
                            <div>
                                <p className="text-md font-semibold">
                                    {appointment.appointmentFor?.name ||
                                        appointment.appointmentBy?.name}
                                </p>
                                <p className="text-sm font-medium text-slate-600">
                                    {appointment.appointmentFor?.email ||
                                        appointment.appointmentBy?.email}
                                </p>
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
                                            appointment?.startTime,
                                            'hh:mm:ss'
                                        ).format('hh:mm a')}{' '}
                                        -{' '}
                                        {moment(
                                            appointment?.endTime,
                                            'hh:mm:ss'
                                        ).format('hh:mm a')}
                                    </p>
                                    <div className="flex items-center gap-x-2 -mt-1.5">
                                        <p className="text-xs flex gap-x-1 items-center mt-0.5">
                                            {/* <span className=" text-slate-300">
                                                <GoPrimitiveDot />
                                            </span> */}
                                            <span className="text-indigo-500">
                                                ~{appointment?.type.duration}{' '}
                                                Minutes
                                            </span>
                                        </p>
                                        <p className="text-xs flex gap-x-1 items-center mt-0.5">
                                            <span className=" text-slate-300">
                                                <GoPrimitiveDot />
                                            </span>
                                            <span className="text-orange-400">
                                                {
                                                    appointment?.type
                                                        .breakDuration
                                                }{' '}
                                                Minutes Break
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="my-4" />
                                <p className="text-md font-medium text-slate-600">
                                    {moment(appointment?.date).format(
                                        'dddd, Do MMMM, YYYY'
                                    )}
                                </p>

                                <div className="mt-2 flex items-center gap-x-2">
                                    <span className="text-slate-300 text-sm">
                                        <FaMapMarkerAlt />
                                    </span>
                                    <p className="text-sm text-slate-400">
                                        Address Not Provided
                                    </p>
                                </div>
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
                            {appointment.course ? (
                                <div className="">
                                    <p className="text-sm">
                                        {appointment.course.code}
                                    </p>
                                    <p className="text-md font-medium">
                                        {appointment.course.title}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-orange-500 text-xs font-medium flex items-center gap-x-2">
                                    <span>
                                        <FaExclamationTriangle />
                                    </span>
                                    <span>No Course Was Selected</span>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="p-3">
                        {(appointment.appointmentBy?.role ===
                            UserRoles.STUDENT ||
                            appointment.appointmentBy?.role ===
                                UserRoles.STUDENT) && (
                            <div>
                                <Typography variant={'title'}>RTO</Typography>
                                <Typography variant={'subtitle'}>
                                    {appointment.appointmentFor?.student?.rto
                                        ?.user?.name ||
                                        appointment.appointmentBy?.student?.rto
                                            ?.user?.name}
                                </Typography>
                                <Typography variant={'label'} color={"text-gray-500"}>
                                    {appointment.appointmentFor?.student?.rto
                                        ?.user?.email ||
                                        appointment.appointmentBy?.student?.rto
                                            ?.user?.email}
                                </Typography>
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
                                {appointment.note}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
