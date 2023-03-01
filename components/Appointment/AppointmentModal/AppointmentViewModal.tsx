import { Card } from '@components/cards'
import moment from 'moment'
import { BsDot } from 'react-icons/bs'
import { FaDotCircle, FaMapMarkerAlt, FaTimes } from 'react-icons/fa'
import { GoPrimitiveDot } from 'react-icons/go'
import Image from 'next/image'
import { getAppointmentTypeIcon } from '@partials/appointmentType/AppointmentTypeCard'

export const AppointmentViewModal = ({ appointment, onCancel }: any) => {
    console.log('::: APPOINTMENT', appointment)
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

                {/* Body */}
                <div className="p-4">
                    <div>
                        <p className="text-xs font-medium text-slate-500 mb-2">
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
                        <p className="text-xs font-medium text-slate-500">
                            Venue
                        </p>

                        {/* Date & Time */}
                        <div>
                            <div className="flex items-center gap-x-2">
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
                                <p className="text-xs flex gap-x-1 items-center mt-0.5">
                                    <span className=" text-slate-300">
                                        <GoPrimitiveDot />
                                    </span>
                                    <span className="text-indigo-500">
                                        ~{appointment?.type.duration} Minutes
                                    </span>
                                </p>
                                <p className="text-xs flex gap-x-1 items-center mt-0.5">
                                    <span className=" text-slate-300">
                                        <GoPrimitiveDot />
                                    </span>
                                    <span className="text-orange-400">
                                        {appointment?.type.breakDuration}{' '}
                                        Minutes Break
                                    </span>
                                </p>
                            </div>
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

                    <div className="my-4" />

                    <div>
                        <p className="text-xs font-medium text-slate-500">
                            Appointment With
                        </p>

                        {/* Date & Time */}
                        <div>
                            <p className="text-md font-semibold">
                                {appointment.appointmentFor.name}
                            </p>
                            <p className="text-sm font-medium text-slate-600">
                                {appointment.appointmentFor.email}
                            </p>
                        </div>
                    </div>

                    <div className="my-4" />

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
