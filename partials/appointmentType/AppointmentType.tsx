import { Typography } from '@components/Typography'
import { useEffect, useState } from 'react'
import { AppointmentTypeCard } from './AppointmentTypeCard'

// query
import { NoData } from '@components'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { CommonApi } from '@queries'

type Props = {
    setAppointmentTypeId: Function
    appointmentFor: string
}

export const AppointmentType = ({
    setAppointmentTypeId,
    appointmentFor,
}: Props) => {
    const [selected, setSelected] = useState<string | null>(null)
    const appointmentTypes = CommonApi.Appointments.appointmentType(
        appointmentFor,
        { skip: !appointmentFor }
    )

    useEffect(() => {
        if (appointmentTypes?.data && appointmentTypes?.data.length) {
            setSelected(appointmentTypes?.data[0].title)
            setAppointmentTypeId(appointmentTypes?.data[0]?.id)
        }
    }, [appointmentTypes?.data])

    return (
        <div>
            <Typography variant={'label'} color={'text-gray-700'}>
                Please select type of appointment you want to book?
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
