import {
    EmptyData,
    LoadingAnimation, NoData,
    PageSize,
    Pagination, PastAppointmentCard,
    Typography
} from '@components'

// queries
import { CommonApi } from '@queries'
import { useState } from 'react'

export const PastAppointments = () => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(25)

    const pastAppointments = CommonApi.Appointments.useBookedAppointments({
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
                    <NoData text={'Some Network issue, Try Reload'} />
                )}
                {pastAppointments.isLoading ? (
                    <LoadingAnimation size={90} />
                ) : pastAppointments.data?.data &&
                  pastAppointments.data?.data?.length ? (
                    <div className=" flex flex-wrap gap-x-2">
                        {pastAppointments.data?.data?.map(
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
