import {
    EmptyData,
    LoadingAnimation,
    PastAppointmentCard,
    Typography,
    Switch,
    NoData,
} from '@components'

// queries
import { CommonApi } from '@queries'

export const PastAppointments = () => {
    const pastAppointments = CommonApi.Appointments.useBookedAppointments({
        status: 'past',
    })

    console.log('::: PAST APPOINTMENTS', pastAppointments)
    return (
        <div className="mt-6">
            <div className="pb-1 flex items-center justify-between">
                <Typography variant={'label'} color={'text-black'}>
                    Past Appointments
                </Typography>
                {!pastAppointments.isLoading && (
                    <Switch name="Cancelled Appointments" />
                )}
            </div>
            <div>
                {pastAppointments.isError && (
                    <NoData text={'Some Network issue, Try Reload'} />
                )}
                {pastAppointments.isLoading ? (
                    <LoadingAnimation size={90} />
                ) : pastAppointments?.data && pastAppointments?.data?.length ? (
                    <div className=''>
                        {pastAppointments?.data?.map(
                            (pastAppointment: any, index: number) => (
                                <PastAppointmentCard
                                    key={index}
                                    appointment={pastAppointment}
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
                        )}
                    </div>
                ) : (
                    !pastAppointments.isError && (
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
