import {
    FigureCard,
    NotesCard,
    PinnedNotes,
} from '@components/sections/subAdmin/components'
import { Typography, EmptyData, TechnicalError } from '@components'
import { PendingStudents, RecentAppointment } from './components'

// queries
import {
    useGetNotesQuery,
    useGetSubAdminRtosStudentsQuery,
    useGetSubAdminRtoAppointmentsQuery,
} from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'

type Props = {
    rtoId: any
    userId: any
    rtoDetail: any
}

export const RtoProfileOverview = ({ userId, rtoId, rtoDetail }: Props) => {
    // pending students
    const { data, isError, isLoading }: any =
        useGetSubAdminRtosStudentsQuery(rtoId)
    // recent appointments
    const rtoRecentAppointment = useGetSubAdminRtoAppointmentsQuery(rtoId)
    // console.log("rtoRecentAppointment", rtoRecentAppointment)

    const FigureCardData = [
        {
            count: rtoDetail?.subadmin?.length,
            title: 'RTOs',
            imagUrl: '/images/figure-card/school.png',
        },
        {
            count: rtoDetail?.students?.length,
            title: 'Students',
            imagUrl: '/images/figure-card/school.png',
        },
        // {
        //     count: 98,
        //     title: 'Industries',
        //     imagUrl: '/images/figure-card/school.png',
        // },
        // {
        //     count: 98,
        //     title: 'Pending Students',
        //     imageUrl: '/images/figure-card/school.png',
        // },
    ]

    const recentAppointments = [
        {
            date: 'Wed, Jun 29, 2022',
            time: '02:30 pm - 04:00 pm',
            role: 'Staff Training',
            name: 'Yaseen Khan',
            address: 'Address/Link goes here',
        },
        {
            date: 'Wed, Jun 29, 2022',
            time: '02:30 pm - 04:00 pm',
            role: 'Staff Training',
            name: 'Yaseen Khan',
            address: 'Address/Link goes here',
        },
    ]

    return (
        <>
            <div className="">
                <div className="flex gap-x-2 my-6">
                    {FigureCardData?.map((data: any) => (
                        <FigureCard
                            key={data?.id}
                            imageUrl={data?.imageUrl}
                            count={data.count}
                            title={data.title}
                        />
                    ))}
                </div>

                <PinnedNotes id={userId} />

                <div className="flex justify-between mb-3">
                    <Typography variant="muted" color="text-gray-400">
                        Pending Students
                    </Typography>
                    <Typography variant="muted" color="text-gray-400">
                        Recent Appointments
                    </Typography>
                </div>
                <div className="">
                    <div className="grid grid-cols-4 gap-x-4">
                        <div className="flex flex-col col-span-3 gap-y-2">
                            {isError && <TechnicalError />}
                            {isLoading ? (
                                <LoadingAnimation />
                            ) : data?.data?.length ? (
                                data?.data?.map((data: any) => (
                                    <PendingStudents
                                        key={data.id}
                                        name={data.user.name}
                                        email={data.user.email}
                                        phoneNumber={data.phone}
                                        studentId={data.user.id}
                                        imageUrl={
                                            'https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                                        }
                                    />
                                ))
                            ) : (
                                !isError && <EmptyData />
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            {recentAppointments?.map((data: any) => (
                                <div key={data?.id}>
                                    <RecentAppointment
                                        rtoRecentAppointment={rtoRecentAppointment}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
