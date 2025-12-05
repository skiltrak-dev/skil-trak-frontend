import { Badge, LoadingAnimation, NoData } from '@components'
import { CommonApi } from '@queries'
import { Appointment } from '@types'
import { CompletedAppointmentCard } from '../cards'

export const CompletedAppointments = ({
    studentUserId,
}: {
    studentUserId: number
}) => {
    const appointments = CommonApi.Appointments.useBookedAppointments(
        {
            userId: studentUserId,
            status: 'past',
        },
        {
            skip: !studentUserId,
            refetchOnMountOrArgChange: 300,
        }
    )
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl p-4 hover:shadow-2xl transition-all space-y-2">
            <h4 className="text-slate-900 flex items-center gap-2">
                <span>Completed Appointments</span>
                <Badge
                    variant="success"
                    text={`${appointments?.data?.data?.length}`}
                />
            </h4>

            {/*  */}
            <div className="space-y-2.5">
                {appointments?.isError ? (
                    <NoData text="There is Some technical issue" isError />
                ) : null}
                {appointments?.isLoading ? (
                    <LoadingAnimation size={60} />
                ) : appointments?.data?.data &&
                  appointments?.data?.data?.length > 0 &&
                  appointments?.isSuccess ? (
                    appointments?.data?.data?.map(
                        (appointment: Appointment) => (
                            <CompletedAppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                            />
                        )
                    )
                ) : (
                    appointments?.isSuccess && (
                        <NoData text="There is no upcoming appointments" />
                    )
                )}
            </div>
        </div>
    )
}
