import React, { useState, useEffect } from 'react'
import { NoData } from '@components'
import { Button } from '@components/buttons'
import { getUserCredentials } from '@utils'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BsCalendarDateFill } from 'react-icons/bs'
import { IoLocationSharp, IoTime } from 'react-icons/io5'

// query
import { CommonApi } from '@queries'

type Props = {}

export const RecentAppointment = ({
    userId,
    link,
}: {
    userId?: number | undefined
    link?: string
}) => {
    const [id, setId] = useState(getUserCredentials()?.id)
    const router = useRouter()

    useEffect(() => {
        if (userId) {
            setId(userId)
        }
    }, [router])

    const { data: appointment } =
        CommonApi.Appointments.useUpcommingAppointment(userId)

    const appointmentWith = appointment
        ? appointment?.appointmentBy?.id === id
            ? 'appointmentFor'
            : 'appointmentBy'
        : ''

    const appointmentUser = appointment ? appointment[appointmentWith] : {}

    const appointmentWithUser = appointment
        ? appointmentUser[
              appointmentUser['role'] === 'subadmin'
                  ? 'coordinator'
                  : appointmentUser['role']
          ]
        : {}

    const checkrole = appointment
        ? appointmentUser['role'] === 'subadmin'
            ? appointmentWithUser[0]
            : appointmentWithUser
        : {}

    return (
        <div className="w-full">
            <div className="bg-gradient-to-r from-[#3883F3] to-[#5D1BE0] rounded-2xl p-4">
                <div className="flex gap-x-16 justify-between items-center mb-1.5">
                    <div>
                        <p className="font-medium text-sm text-white">
                            Recent Appointment
                        </p>
                    </div>
                    {appointment && link && (
                        <div>
                            <Button
                                variant={'secondary'}
                                rounded
                                onClick={() => {
                                    if (link) {
                                        router.push(link)
                                    }
                                }}
                            >
                                <span className="text-[#3883F3]">View All</span>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        {appointment ? (
                            <div>
                                <div className="mb-4">
                                    <h2 className="text-[#0644AF] font-semibold text-lg">
                                        {appointment?.type?.title}
                                    </h2>
                                    <p className="text-[#8CD2F9] font-medium ">
                                        {appointment[appointmentWith]?.name} (
                                        {appointmentUser?.role})
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-x-2.5 mb-2">
                                        <IoTime className="text-[#E3F2FF]" />
                                        <p className="text-[#E3F2FF] font-bold text-sm">
                                            {moment(
                                                appointment?.startTime,
                                                'hh:mm:ss'
                                            ).format('hh:m a')}{' '}
                                            -{' '}
                                            {moment(
                                                appointment?.endTime,
                                                'hh:mm:ss'
                                            ).format('hh:mm a')}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-x-2.5 mb-2">
                                        <BsCalendarDateFill className="text-[#E3F2FF]" />
                                        <p className="text-[#E3F2FF] font-bold text-sm">
                                            {moment(appointment?.date).format(
                                                'dddd, Do MMMM, YYYY'
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-x-2.5 mb-2">
                                        <IoLocationSharp className="text-[#E3F2FF]" />
                                        <p className="text-[#E3F2FF] font-bold text-sm">
                                            {`${checkrole?.addressLine1}, ${
                                                checkrole?.addressLine2 || ''
                                            }`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <NoData text={'No Recent Appointment were found'} />
                        )}
                        <div className="animate-float">
                            <Image
                                src="/images/card-icons/ic_calendar.png"
                                width={100}
                                height={100}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
