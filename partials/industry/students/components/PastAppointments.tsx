import React from 'react'
import {
    Typography,
    EmptyData,
    PastAppointmentCard,
    TechnicalError,
} from '@components'
import { Switch } from '@components/inputs'

// query
import { useGetIndustryAppointmentsQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'

type Props = {}

export const PastAppointments = (props: Props) => {
    const industryPastAppointments = useGetIndustryAppointmentsQuery({
        status: 'past',
    })

    return (
        <div className="mt-6">
            <div className="pb-1 flex items-center justify-between">
                <Typography variant={'label'} color={'text-black'}>
                    Past Appointments
                </Typography>
                <Switch name="Cancelled Appointments" />
            </div>
            <div>
                {industryPastAppointments.isError && <TechnicalError />}
                {industryPastAppointments.isLoading ? (
                    <LoadingAnimation />
                ) : industryPastAppointments?.data &&
                  industryPastAppointments?.data?.length ? (
                    industryPastAppointments?.data?.map(
                        (pastAppointment: any, index: number) => {
                            return (
                                <PastAppointmentCard
                                    key={index}
                                    time={pastAppointment.time}
                                    totalMinutes={pastAppointment.totalMinutes}
                                    name={pastAppointment.name}
                                    imageUrl={
                                        '/images/card-images/phone-image.png'
                                    }
                                    post={pastAppointment.post}
                                    status={pastAppointment.status}
                                    address={pastAppointment.address}
                                    date={pastAppointment.date}
                                />
                            )
                        }
                    )
                ) : (
                    !industryPastAppointments.isError && (
                        <EmptyData
                            title={'No Past appointments'}
                            description={'No Past appointments'}
                        />
                    )
                )}
            </div>
        </div>
    )
}
