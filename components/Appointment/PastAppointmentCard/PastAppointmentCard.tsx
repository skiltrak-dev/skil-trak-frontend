import { useMaskText } from '@hooks'
import { Appointment } from '@types'
import moment from 'moment'

import {
    FaCalendarDay,
    FaClock,
    FaIdCardAlt,
    FaMapMarkerAlt,
} from 'react-icons/fa'

type PastAppointmentProps = {
    appointment: Appointment
}

export const PastAppointmentCard = ({ appointment }: PastAppointmentProps) => {
    return (
        <>
            <div className="flex flex-col rounded-xl overflow-hidden bg-white border w-fit">
                <div className="h-full py-2 px-4 bg-indigo-500 text-white">
                    <p className="text-lg font-semibold">
                        {appointment?.type?.title}
                    </p>

                    <div className="mt-4">
                        <p className="text-xs font-medium text-indigo-900">
                            Appointment With
                        </p>
                        <div className="flex gap-x-3">
                            <span className="text-indigo-200 text-sm mt-1">
                                <FaIdCardAlt />
                            </span>
                            {appointment?.appointmentFor ? (
                                <div className="leading-tight">
                                    <p className="font-medium">
                                        {appointment?.appointmentFor?.name}
                                    </p>
                                    <p className="text-sm">
                                        {useMaskText({
                                            key: appointment?.appointmentFor
                                                ?.email,
                                        })}
                                    </p>
                                </div>
                            ) : (
                                <div className="leading-tight">
                                    <p className="font-medium">
                                        {appointment?.coordinator?.name}
                                    </p>
                                    <p className="text-sm text-indigo-200">
                                        {appointment?.coordinator?.email}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="px-4 py-2">
                        <div className="flex items-start gap-x-2">
                            <span className="text-indigo-400 mt-2 text-sm">
                                <FaClock />
                            </span>
                            <div>
                                <div className="items-center gap-x-2">
                                    <p className="text-lg font-bold ">
                                        {moment(
                                            new Date(
                                                `01-01-2023 ${appointment.startTime}`
                                            )
                                        ).format('hh:mm a')}{' '}
                                        -{' '}
                                        {moment(
                                            new Date(
                                                `01-01-2023 ${appointment.endTime}`
                                            )
                                        ).format('hh:mm a')}
                                    </p>
                                    <div className="flex items-center gap-x-4">
                                        <p className="text-xs text-gray-400 -mt-1">
                                            ~ {appointment.type.duration}{' '}
                                            Minutes
                                        </p>

                                        <p className="text-xs text-gray-400 -mt-1">
                                            {appointment.type.breakDuration}{' '}
                                            Minutes Break
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <span className="text-slate-300 mt-1 text-sm">
                                <FaCalendarDay />
                            </span>
                            <p className="font-medium text-gray-500 mt-2">
                                {moment(new Date(appointment.date)).format(
                                    'DD MMM, YYYY'
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-x-2 max-w-[280px] mt-2 border-t px-4 py-2">
                        <span className="text-indigo-400 text-sm mt-1">
                            <FaMapMarkerAlt />
                        </span>
                        <p className="text-sm text-gray-400">
                            {appointment.address || 'Not Provided'}
                        </p>
                    </div>
                </div>

                {/* <div>
                    <div className="flex flex-col items-center gap-y-2">
                        <div
                            className={`${
                                status === 'Completed'
                                    ? 'bg-[#D3F3C6]'
                                    : 'bg-[#FFD1D6]'
                            } py-1 px-2 rounded-lg`}
                        >
                            <Typography
                                variant="muted"
                                color={
                                    status === 'Completed'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }
                            >
                                {status}
                            </Typography>
                        </div>
                        <div>
                            <Image
                                src={imageUrl || ''}
                                alt="Video Conference"
                                width={50}
                                height={50}
                            />
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}
