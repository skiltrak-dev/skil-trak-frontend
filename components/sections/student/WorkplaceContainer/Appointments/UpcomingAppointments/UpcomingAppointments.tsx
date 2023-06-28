import { FutureAppointments, Typography } from '@components'

// query
import { LoadingAnimation } from '@components/LoadingAnimation'
import { useGetStudentAppointmentsQuery } from '@queries'

type Props = {}

export const UpcomingAppointments = (props: Props) => {
    const studentAppointments = useGetStudentAppointmentsQuery({
        status: 'future',
    })

    return (
        <>
            <div
                className={`grid ${
                    studentAppointments?.data?.length ? 'grid-cols-1' : ''
                } md:grid-cols-2 gap-4`}
            >
                {studentAppointments.isLoading ? (
                    <LoadingAnimation />
                ) : studentAppointments?.data &&
                  studentAppointments?.data?.length ? (
                    <>
                        <div className="pb-1">
                            <Typography variant={'label'} color={'text-black'}>
                                Your Upcoming Appointments
                            </Typography>
                        </div>
                        <FutureAppointments
                            appointments={studentAppointments?.data}
                        />
                    </>
                ) : null}
            </div>
        </>
    )
}
