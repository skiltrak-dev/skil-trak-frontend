import { CommonApi } from '@queries'
import React, { useState } from 'react'
import { AppointmentCard } from '../card'
import { CalendarIcon, Plus } from 'lucide-react'
import { Button } from '@components/ui/button'
import { LoadingAnimation, PageSize, Pagination } from '@components'
import { useRouter } from 'next/router'

export const PastAppointments = () => {
    const [scheduleOpen, setScheduleOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(10)
    const router = useRouter()
    const { data, isLoading, isError } =
        CommonApi.Appointments.useBookedAppointments(
            {
                // userId,
                status: 'past',
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )
    return (
        <div>
            {isLoading ? (
                <LoadingAnimation />
            ) : data?.data && data?.data?.length > 0 ? (
                <>
                    <div className="flex items-center justify-between">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                        />
                        <Pagination
                            pagination={data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                    {data?.data?.map((appointment: any) => (
                        <div key={appointment.id}>
                            <AppointmentCard appointment={appointment} isPast={true} />
                        </div>
                    ))}
                </>
            ) : (
                !isError && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-20"></div>
                            <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                <CalendarIcon className="h-10 w-10 text-primary/40" />
                            </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">
                            No Appointments Found
                        </h3>
                        {/* <p className="text-sm text-muted-foreground max-w-sm mb-4">
                        {searchQuery
                            ? "Try adjusting your search or filters"
                            : "Schedule your first appointment to get started"}
                    </p> */}
                        <Button
                            className="gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-glow-primary"
                            onClick={() => setScheduleOpen(true)}
                        >
                            <Plus className="h-4 w-4" />
                            Schedule Appointment
                        </Button>
                    </div>
                )
            )}
        </div>
    )
}
