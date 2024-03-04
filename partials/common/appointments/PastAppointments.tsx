import {
    EmptyData,
    LoadingAnimation,
    NoData,
    PageSize,
    Pagination,
    PastAppointmentCard,
    Typography,
} from '@components'

// queries
import { CommonApi } from '@queries'
import { Appointment } from '@types'
import { useState } from 'react'

export const PastAppointments = ({ userId }: { userId?: any }) => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(20)

    const pastAppointments = CommonApi.Appointments.useBookedAppointments({
        userId,
        status: 'past',
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    return (
        <div className="mt-6">
            <div className="pb-1 flex items-center justify-between">
                <Typography variant={'label'} color={'text-black'}>
                    Past Appointments
                </Typography>
                {/* {!pastAppointments.isLoading && (
                    <Switch name="Cancelled Appointments" />
                )} */}
            </div>
            {pastAppointments.isSuccess && (
                <div className="flex items-center justify-between">
                    <PageSize
                        itemPerPage={itemPerPage}
                        setItemPerPage={setItemPerPage}
                    />
                    <Pagination
                        pagination={pastAppointments?.data?.pagination}
                        setPage={setPage}
                    />
                </div>
            )}
            <div>
                {pastAppointments.isError && (
                    <NoData text={'Some Technical issue, Try Reload'} />
                )}
                {pastAppointments.isLoading ? (
                    <LoadingAnimation size={90} />
                ) : pastAppointments.data?.data &&
                  pastAppointments.data?.data?.length &&
                  pastAppointments?.isSuccess ? (
                    <div className="flex flex-wrap justify-start gap-x-2 gap-y-2">
                        {pastAppointments.data?.data?.map(
                            (pastAppointment: Appointment, index: number) => (
                                <PastAppointmentCard
                                    key={index}
                                    appointment={pastAppointment}
                                />
                            )
                        )}
                    </div>
                ) : (
                    pastAppointments.isSuccess && (
                        <EmptyData
                            imageUrl="/images/icons/common/appointment-past.png"
                            title={'No Past appointments'}
                            description={'No Past appointments'}
                            height="30vh"
                        />
                    )
                )}
            </div>
        </div>
    )
}
