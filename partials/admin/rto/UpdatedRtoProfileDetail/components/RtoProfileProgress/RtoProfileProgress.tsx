import { Typography } from '@components'
import { ProgressView } from './ProgressView'
import { ProgressChart } from './ProgressChart'

export interface RtoProfileProgressTypes {
    title: string
    color: string
    percent: number
}

export const RtoProfileProgress = ({
    statisticsCount,
}: {
    statisticsCount: any
}) => {
    const countsArr = {
        inProgress: statisticsCount?.data?.inProgress || 0,
        noWorkPlace: statisticsCount?.data?.noWorkPlace || 0,
        placementStarted: statisticsCount?.data?.placementStarted || 0,
        appointmentBooked: statisticsCount?.data?.appointmentBooked || 0,
        awaitingAgreementSigned:
            statisticsCount?.data?.awaitingAgreementSigned || 0,
        snoozedStudents: statisticsCount?.data?.snoozedStudents || 0,
        notContactableStudent:
            statisticsCount?.data?.notContactableStudent || 0,
        flaggedStudents: statisticsCount?.data?.flaggedStudents || 0,
        terminated: statisticsCount?.data?.terminated || 0,
        rejected: statisticsCount?.data?.rejected || 0,

    }

    const addedData = Object.values(countsArr)?.reduce(
        (acum: any, curr: any) => acum + curr,
        0
    )

    const percentData = (count: number): number =>
        (+((count * 100) / addedData).toFixed(1) || 0) as number

    const progressData: RtoProfileProgressTypes[] = [
        {
            title: 'Placement Started',
            color: '#34B53A',
            percent: percentData(countsArr?.placementStarted),
        },
        {
            title: 'In Progress',
            color: '#4339F2',
            percent: percentData(countsArr?.inProgress),
        },
        {
            title: 'Agreement Pending',
            color: '#FF3A29',
            percent: percentData(countsArr?.awaitingAgreementSigned),
        },
        {
            title: 'Appointments',
            color: '#02A0FC',
            percent: percentData(countsArr?.appointmentBooked),
        },
        {
            title: 'Students with no workplaces',
            color: '#21516A',
            percent: percentData(countsArr?.noWorkPlace),
        },
        {
            title: 'Snoozed Students',
            color: '#64748b',
            percent: percentData(countsArr?.snoozedStudents),
        },
        {
            title: 'Not Contactable Students',
            color: '#EB4D4B',
            percent: percentData(countsArr?.notContactableStudent),
        },
        {
            title: 'Flagged Students',
            color: '#FF7979',
            percent: percentData(countsArr?.flaggedStudents),
        },
         {
            title: 'Terminated Workplaces',
            color: '#991B1B',
            percent: percentData(countsArr?.terminated),
        },
         {
            title: 'Rejected Workplace',
            color: '#DC2626',
            percent: percentData(countsArr?.rejected),
        },
    ]

    return (
        <div>
            <div>
                <Typography semibold center>
                    <span className="text-[15px]">Progress</span>
                </Typography>
                <div className="flex justify-center items-center">
                    {/* <div>
                        {Object.entries(countsArr)?.map(
                            ([key, value]: [string, number]) => (
                                <div className="flex items-center gap-x-1">
                                    <Typography variant={'small'}>
                                        {key}
                                    </Typography>
                                    :
                                    <Typography variant={'small'}>
                                        {value}
                                    </Typography>
                                </div>
                            )
                        )}
                    </div> */}
                    <ProgressChart data={progressData} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                {progressData.map((progress, i) => (
                    <ProgressView key={i} progress={progress} />
                ))}
            </div>
        </div>
    )
}
