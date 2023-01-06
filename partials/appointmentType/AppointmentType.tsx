import { useState } from 'react'
import { Typography } from '@components/Typography'
import { AppointmentTypeCard } from './AppointmentTypeCard'

// query
import { useGetAppointmentsTypesQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { NoData } from '@components'

type Props = {
    setAppointmentTypeId: Function
}

export const AppointmentType = ({ setAppointmentTypeId }: Props) => {
    const [selected, setSelected] = useState<string | null>(null)
    const appointmentTypes = useGetAppointmentsTypesQuery()

    return (
        <div className="mb-5">
            <Typography variant="body" color="text-black">
                What kind of appointment you want to book?
            </Typography>
            <div className="flex flex-wrap gap-y-2 gap-x-4 items-center mt-1">
                {appointmentTypes.isError && (
                    <NoData
                        text={
                            'There is some network issue, please refresh your browser'
                        }
                    />
                )}
                {appointmentTypes.isLoading ? (
                    <LoadingAnimation size={75} />
                ) : appointmentTypes?.data &&
                  appointmentTypes?.data?.length > 0 ? (
                    appointmentTypes?.data?.map(
                        (appointmentType: any, index: number) => (
                            <AppointmentTypeCard
                                key={index}
                                title={appointmentType.title}
                                // imageUrl={appointmentType.imageUrl}
                                // selectedImageUrl={appointmentType.selectedImageUrl}
                                selected={selected}
                                onClick={() => {
                                    setSelected(appointmentType.title)
                                    setAppointmentTypeId(appointmentType.id)
                                }}
                            />
                        )
                    )
                ) : (
                    !appointmentTypes.isError && (
                        <NoData text={'No Appointment Type Found'} />
                    )
                )}
            </div>
        </div>
    )
}
