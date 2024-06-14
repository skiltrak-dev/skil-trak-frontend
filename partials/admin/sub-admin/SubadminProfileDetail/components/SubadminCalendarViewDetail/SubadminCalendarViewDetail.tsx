import { BigCalendar, CalendarEvent, Card, Typography } from '@components'
import { CommonApi } from '@queries'
import { Appointment } from '@types'
import moment from 'moment'
import React, { useCallback, useState } from 'react'
import { Waypoint } from 'react-waypoint'

export const SubadminCalendarViewDetail = ({
    subadminUserId,
}: {
    subadminUserId: number
}) => {
    const [selectedDates, setSelectedDates] = useState<{
        start: Date | null
        end: Date | null
    }>({
        start: null,
        end: null,
    })
    const [isViewd, setIsViewd] = useState<boolean>(false)

    const futureAppointments = CommonApi.Appointments.useBookedAppointments(
        {
            status: undefined,
            search: `startDate:${moment(selectedDates?.start).format(
                'YYYY-MM-DD'
            )},endDate:${moment(selectedDates?.end).format('YYYY-MM-DD')}`,
            userId: subadminUserId,
        },
        {
            skip: !selectedDates?.start || !selectedDates?.end || !isViewd,
        }
    )
    const events = futureAppointments?.data?.map((appointment: Appointment) => {
        const startTime = new Date(appointment?.date)
        const endTime = new Date(appointment?.date)
        const startHours = Number(
            moment(appointment?.startTime, 'hh:mm:ss').format('HH')
        )
        const startMinutes = Number(
            moment(appointment?.startTime, 'hh:mm:ss').format('mm')
        )
        const endHours = Number(
            moment(appointment?.endTime, 'hh:mm:ss').format('HH')
        )
        const endMinutes = Number(
            moment(appointment?.endTime, 'hh:mm:ss').format('mm')
        )
        startTime.setHours(startHours, startMinutes)
        endTime.setHours(endHours, endMinutes)

        const appointmentUser =
            appointment['appointmentFor'] || appointment['appointmentBy']

        const getPriority = () => {
            if (appointmentUser) {
                switch (appointmentUser['role']) {
                    case 'student':
                        return 'high'
                    case 'rto':
                        return 'medium'
                    case 'industry':
                        return 'low'
                    default:
                        return 'high'
                }
            }

            return 'high'
        }

        return {
            allDay: false,
            start: startTime,
            end: endTime,
            title: appointment?.type?.title,
            priority: getPriority(),
            subTitle:
                appointment.appointmentFor?.name ||
                appointment.appointmentBy?.name,
            appointment,
        }
    })

    const onSelectedDate = useCallback((dates: any) => {
        setSelectedDates(dates)
    }, [])

    return (
        <Waypoint
            onEnter={() => {
                setIsViewd(true)
            }}
        >
            <div className="h-full">
                <Card fullHeight shadowType="profile" noPadding>
                    <div className="h-full overflow-hidden">
                        <div className="px-4 py-3.5 border-b border-secondary-dark">
                            <Typography semibold>
                                <span className="text-[15px]">Calendar</span>
                            </Typography>
                        </div>
                    </div>

                    {/*  */}
                    <div className="p-4">
                        <BigCalendar
                            events={events}
                            loading={
                                futureAppointments.isLoading ||
                                futureAppointments.isFetching
                            }
                            onSelectedDate={onSelectedDate}
                        />
                    </div>
                </Card>
            </div>
        </Waypoint>
    )
}
