import { LoadingAnimation, NoData } from '@components'
import { Typography } from '@components/Typography'
import { SubAdminApi } from '@queries'
import { useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'

export const StudentAvailability = ({ wpId }: { wpId: number }) => {
    const [generalAvailability, setGeneralAvailability] = useState<
        any[] | null
    >(null)

    const studentAvailability = SubAdminApi.Workplace.useWorkplaceAvailability(
        wpId,
        {
            skip: !wpId,
        }
    )

    const availability = studentAvailability?.data

    useEffect(() => {
        const weekdays = [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        ]
        const days = {
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6,
            sunday: 7,
        }
        const studentAvailability =
            availability && availability?.length > 0 ? [...availability] : []

        const availabilityDays = studentAvailability?.map((d) => d.name)
        const filteredDays = weekdays.filter(
            (d) => !availabilityDays.includes(d)
        )
        const filteredAvailability = [
            ...studentAvailability,
            ...filteredDays.map((day) => ({ name: day })),
        ]
        // const filteredAvailability = weekdays.map((day) =>
        //    availabilityDays.includes(day)
        //       ? studentAvailability.find((s) => s.name === day)
        //       : { name: day }
        // )

        setGeneralAvailability(
            filteredAvailability?.sort(
                (a: any, b: any) =>
                    days[a.name as keyof typeof days] -
                    days[b.name as keyof typeof days]
            )
        )
    }, [availability])

    const shifts = ['Day', 'morning', 'afternoon', 'evening', 'night']

    const isAvailable = (availability: boolean) => {
        return availability ? (
            <BsCheck size={22} className="mx-auto text-gray-700" />
        ) : (
            <IoClose size={22} className="mx-auto text-gray-300" />
        )
    }

    const schedule = ['morning', 'afternoon', 'evening', 'night']

    return (
        <>
            {studentAvailability.isError ? (
                <NoData text="There is some technical issue, try refresh the page!" />
            ) : null}
            {studentAvailability.isLoading ? (
                <LoadingAnimation size={60} height="h-full" />
            ) : studentAvailability?.data &&
              studentAvailability?.data?.length > 0 ? (
                <div className="w-[700px]">
                    <Typography variant={'label'} color={'text-gray-400'}>
                        Student Availability
                    </Typography>

                    <div className="border border-dashed border-gray-400 rounded-lg p-1 flex flex-col justify-between gap-y-3">
                        <div>
                            <div className="grid grid-cols-5 gap-4 px-3">
                                {shifts.map((shift) => (
                                    <Typography
                                        key={shift}
                                        variant={'label'}
                                        capitalize
                                        center
                                        bold
                                    >
                                        {shift}
                                    </Typography>
                                ))}
                            </div>

                            <div className="flex flex-col gap-y-2">
                                {generalAvailability?.map((time: any) => (
                                    <div
                                        key={time.name}
                                        className="grid grid-cols-5 gap-4 px-3 rounded-lg border-b border-secondary"
                                    >
                                        <Typography
                                            capitalize
                                            variant={'small'}
                                            color={'text-gray-400'}
                                        >
                                            {time?.name}
                                        </Typography>
                                        {schedule?.map((s) =>
                                            isAvailable(time[s])
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : studentAvailability.isSuccess ? (
                <NoData text="There is no general availability!" />
            ) : null}
        </>
    )
}
