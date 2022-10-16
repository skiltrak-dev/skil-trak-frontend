import Image from 'next/image'
import Link from 'next/link'

import { BsCalendarFill } from 'react-icons/bs'
import { MdLocationPin, MdOutlineAccessTimeFilled } from 'react-icons/md'

interface RecentAppointmentCardProps {
    title: string
    caseOfficer: string
    time: string
    date: string
    address: String
}
export const RecentAppointmentCard = ({
    title,
    caseOfficer,
    time,
    date,
    address,
}: RecentAppointmentCardProps) => {
    return (
        <div className="bg-gradient-to-r from-[#3883F3] to-[#5D1BE0] rounded-2xl p-4">
            <div className="flex justify-between items-center mb-1.5">
                <div>
                    <p className="font-medium text-sm text-white">
                        Recent Appointment
                    </p>
                </div>
                <div>
                    <Link href="#">
                        <a className="text-xs rounded-full bg-white px-2 py-1 text-indigo-800">
                            View All
                        </a>
                    </Link>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <div className="mb-4">
                        <h2 className="text-blue-900 font-semibold text-lg">
                            {title}
                        </h2>
                        <p className="text-blue-300 font-medium">
                            {caseOfficer}
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2 mb-2 text-blue-200">
                            <MdOutlineAccessTimeFilled />
                            <p className="font-bold text-sm">{time}</p>
                        </div>
                        <div className="flex items-center gap-x-2 mb-2 text-blue-200">
                            <div className="relative">
                                <span className="text-blue-800 text-[9px] absolute -translate-x-1/2 left-1/2 top-1">
                                    4
                                </span>
                                <BsCalendarFill />
                            </div>
                            <p className="text-blue-200 font-bold text-sm">
                                {date}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2 mb-2 text-blue-200">
                            <MdLocationPin />
                            <p className="font-bold text-sm">{address}</p>
                        </div>
                    </div>
                </div>
                <div className="animate-float">
                    <Image
                        src="/images/card-icons/ic_calendar.png"
                        width={100}
                        height={100}
                    />
                </div>
            </div>
        </div>
    )
}
